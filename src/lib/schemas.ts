import * as z from "zod";

export const credentialTargetSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("app"), path: z.string().min(1) }),
  z.object({ type: z.literal("web"), url: z.string().min(1) }),
  z.object({ type: z.literal("other"), name: z.string()}),
]);

export const addCredentialFormSchema = z.object({
  name: z.string().min(1),
  identifier: z.string().min(1), // email, username, phone, document, api key
  password: z.string(),
  target: credentialTargetSchema,
});

export type AddCredentialFormType = z.infer<typeof addCredentialFormSchema>;
