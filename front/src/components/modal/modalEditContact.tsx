import { Dispatch } from "react";
import { ModalContainer } from ".";
import { SetStateAction } from "react";
import Input from "../input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactRegisterData,
  schemaContactsRegister,
} from "@/provider/clientProvider/validator";
import Button from "../button";
import { useClient } from "@/provider/clientProvider";
import ReactLoading from "react-loading";

interface ModalEditContactProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contact: Contact;
}

export function ModalEditContact({
  isOpen,
  setIsOpen,
  contact,
}: ModalEditContactProps) {
  const { editContact, loading, setLoading } = useClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactRegisterData>({
    resolver: zodResolver(schemaContactsRegister),
  });

  function contactEdit(data: ContactRegisterData) {
    editContact(contact.id, { ...data, image: data.image[0] }, setIsOpen);
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      titleModal="Editar Contato"
    >
      <div className="flex flex-col gap-[10px]">
        <form
          className="flex flex-col gap-[10px]"
          onSubmit={handleSubmit(contactEdit)}
        >
          <Input
            defaultValue={contact.full_name}
            type="text"
            id="full_name"
            label="Nome completo"
            placeholder="Nome completo"
            register={register("full_name")}
            error={errors?.full_name?.message}
          />
          <Input
            defaultValue={contact.email}
            type="email"
            id="email"
            label="Email"
            placeholder="email@email.com"
            register={register("email")}
            error={errors?.email?.message}
          />
          <Input
            defaultValue={contact.phone}
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
          <Button color="bg-[--color-purple-600]" type="submit">
            {loading ? (
              <ReactLoading
                type="bubbles"
                color="white"
                height={"20px"}
                width={"20px"}
              />
            ) : (
              "Alterar Dados"
            )}
          </Button>
        </form>
      </div>
    </ModalContainer>
  );
}
