import { create } from "zustand";
import {
  loadVault,
  saveCredential,
  getCredential,
  removeCredential,
} from "@/lib/stronghold";

export interface Credential {
  id: string;
  name: string;
  url: string;
  username: string;
  createdAt: number;
  updatedAt: number;
}

interface VaultState {
  isUnlocked: boolean;
  credentials: Credential[];
  searchQuery: string;

  unlock: (password: string) => Promise<boolean>;
  lock: () => void;
  addCredential: (
    cred: Omit<Credential, "id" | "createdAt" | "updatedAt">,
    password: string,
  ) => Promise<void>;
  updateCredential: (
    id: string,
    updates: Partial<Credential>,
    password?: string,
  ) => Promise<void>;
  deleteCredential: (id: string) => Promise<void>;
  loadCredentials: () => Promise<void>;
  setSearch: (query: string) => void;
}

export const useVaultStore = create<VaultState>((set, get) => ({
  isUnlocked: false,
  credentials: [],
  searchQuery: "",

  unlock: async (password) => {
    try {
      await loadVault(password);
      set({ isUnlocked: true });
      await get().loadCredentials();
      return true;
    } catch {
      return false;
    }
  },

  lock: () => set({ isUnlocked: false, credentials: [] }),

  loadCredentials: async () => {
    const raw = await getCredential("index");
    if (!raw) return;

    const ids: string[] = JSON.parse(raw);

    const credentials = await Promise.all(
      ids.map(async (id) => {
        const raw = await getCredential(`meta:${id}`);
        return raw ? (JSON.parse(raw) as Credential) : null;
      }),
    );

    set({ credentials: credentials.filter(Boolean) as Credential[] });
  },

  addCredential: async (cred, password) => {
    const id = crypto.randomUUID();
    const newCred: Credential = {
      ...cred,
      id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Save metadata and secret separately for better security
    await saveCredential(`meta:${id}`, JSON.stringify(newCred));

    await saveCredential(`secret:${id}`, password);

    // Update índice
    const raw = await getCredential("index");
    const ids: string[] = raw ? JSON.parse(raw) : [];
    await saveCredential("index", JSON.stringify([...ids, id]));

    set((state) => ({ credentials: [...state.credentials, newCred] }));
  },

  updateCredential: async (id, updates, password) => {
    const existing = get().credentials.find((c) => c.id === id);
    if (!existing) return;

    const updated = { ...existing, ...updates, updatedAt: Date.now() };
    await saveCredential(`meta:${id}`, JSON.stringify(updated));

    if (password) {
      await saveCredential(`secret:${id}`, password);
    }

    set((state) => ({
      credentials: state.credentials.map((c) => (c.id === id ? updated : c)),
    }));
  },

  deleteCredential: async (id) => {
    await removeCredential(`meta:${id}`);
    await removeCredential(`secret:${id}`);

    // Remove from índice
    const raw = await getCredential("index");
    const ids: string[] = raw ? JSON.parse(raw) : [];
    await saveCredential("index", JSON.stringify(ids.filter((i) => i !== id)));

    set((state) => ({
      credentials: state.credentials.filter((c) => c.id !== id),
    }));
  },

  setSearch: (query) => set({ searchQuery: query }),
}));
