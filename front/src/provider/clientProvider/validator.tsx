import { z } from "zod";

export const schemaContactsRegister = z.object({
  full_name: z.string().nonempty("Nome completo é obrigatório"),
  phone: z.string().nonempty("Phone é obrigatório"),
  image: z.any().optional(),
  email: z.string().email("Deve ser um e-mail"),
});

export type ContactRegisterData = z.infer<typeof schemaContactsRegister>;
