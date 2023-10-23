import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Deve ser um e-mail"),
  password: z.string().nonempty("Senha é obrigatória"),
});

export type LoginData = z.infer<typeof schema>;

export const schemaRegister = z
  .object({
    full_name: z.string().nonempty("Nome completo é obrigatório"),
    phone: z.string().nonempty("Phone é obrigatório"),
    image: z.any().optional(),
    email: z.string().email("Deve ser um e-mail"),
    password: z.string().nonempty("Senha é obrigatória"),
    confirmPassword: z.string().nonempty("Confirmar senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não combinam",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof schemaRegister>;
