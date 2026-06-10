import * as z from "zod";

export const addCredentialFormSchema = z.object({
  name: z.string(),
  identifier: z.string(), // email, username, phone, document, api key
  target: z.string(),
});

export type AddCredentialFormType = z.infer<typeof addCredentialFormSchema>;
