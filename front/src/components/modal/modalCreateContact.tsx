import { Dispatch } from "react";
import { ModalContainer } from ".";
import { SetStateAction } from "react";
import Input from "../input";
import { useForm } from "react-hook-form";
import {
  ContactRegisterData,
  schemaContactsRegister,
} from "@/provider/clientProvider/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../button";
import { useClient } from "@/provider/clientProvider";

interface ModalCreateContactsProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ModalCreateContacts({
  isOpen,
  setIsOpen,
}: ModalCreateContactsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactRegisterData>({
    resolver: zodResolver(schemaContactsRegister),
  });

  const { registerContact, loading } = useClient();

  function createContact(data: ContactRegisterData) {
    registerContact({ ...data, image: data.image[0] }, setIsOpen);
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      titleModal="Criar Contato"
    >
      <div className="flex flex-col gap-[10px]">
        <form
          onSubmit={handleSubmit(createContact)}
          className="flex flex-col gap-[10px]"
        >
          <Input
            type="text"
            id="full_name"
            label="Nome completo"
            placeholder="Nome completo"
            register={register("full_name")}
            error={errors?.full_name?.message}
          />
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="email@email.com"
            register={register("email")}
            error={errors?.email?.message}
          />
          <Input
            type="text"
            id="phone"
            label="Telefone"
            placeholder="(00) 0 0000-0000"
            register={register("phone")}
            error={errors?.phone?.message}
          />
          <Input
            type="file"
            id="image"
            label="Imagem"
            register={register("image")}
            error={errors?.image?.message}
          />
          <Button
            text="Cadastrar"
            color="bg-[--color-purple-600]"
            type="submit"
            loading={loading}
          />
        </form>
      </div>
    </ModalContainer>
  );
}
