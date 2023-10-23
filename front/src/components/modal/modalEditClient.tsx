import { Dispatch } from "react";
import { ModalContainer } from ".";
import { SetStateAction } from "react";
import { useClient } from "@/provider/clientProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaRegister,
  RegisterData,
} from "@/provider/authProvider/validator";
import Input from "../input";
import Button from "../button";

interface ModalEditClientProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ModalEditClients({ isOpen, setIsOpen }: ModalEditClientProps) {
  const { client, getClientData, editClient, loading } = useClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(schemaRegister),
  });

  function contactEdit(data: RegisterData) {
    editClient({ ...data, image: data.image[0] }, setIsOpen);
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      titleModal="Editar Usuário"
    >
      <div className="flex flex-col gap-2">
        <form
          className="flex flex-col gap-2 items-center"
          onSubmit={handleSubmit(contactEdit)}
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:w-full">
            <div className="lg:w-1/2">
              <Input
                defaultValue={client!.full_name}
                type="text"
                id="full_name"
                label="Nome completo"
                placeholder="Nome completo"
                register={register("full_name")}
                error={errors?.full_name?.message}
              />
              <Input
                defaultValue={client!.email}
                type="email"
                id="email"
                label="Email"
                placeholder="email@email.com"
                register={register("email")}
                error={errors?.email?.message}
              />
              <Input
                defaultValue={client!.phone}
                type="text"
                id="phone"
                label="Telefone"
                placeholder="(00) 0 0000-0000"
                register={register("phone")}
                error={errors?.phone?.message}
              />
            </div>
            <div>
              <Input
                type="file"
                id="image"
                label="Imagem"
                register={register("image")}
                error={errors?.image?.message}
              />
              <Input
                type="password"
                id="password"
                label="Senha"
                placeholder="***********"
                register={register("password", { required: true })}
                error={errors?.password?.message}
              />

              <Input
                type="password"
                id="confirm_password"
                label="Confirmar senha"
                placeholder="***********"
                register={register("confirmPassword", { required: true })}
                error={errors?.confirmPassword?.message}
              />
            </div>
          </div>

          <Button
            text="Alterar"
            color="bg-[--color-purple-600]"
            type="submit"
            loading={loading}
          />
        </form>
      </div>
    </ModalContainer>
  );
}
