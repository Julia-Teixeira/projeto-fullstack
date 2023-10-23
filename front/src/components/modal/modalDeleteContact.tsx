import { Dispatch } from "react";
import { ModalContainer } from ".";
import { SetStateAction } from "react";
import Button from "../button";
import { useClient } from "@/provider/clientProvider";

interface ModalDeleteContactProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contact: Contact;
}

export function ModalDeleteContact({
  isOpen,
  setIsOpen,
  contact,
}: ModalDeleteContactProps) {
  const { getClientData, deleteContact, loading } = useClient();

  function deleteContacts() {
    deleteContact(contact.id, setIsOpen);
  }
  return (
    <ModalContainer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      titleModal="Deletar Contato"
    >
      <div className="flex flex-col items-center gap-8 mt-[35px]">
        <h1 className="text-purple800 text-1xl lg:text-2xl font-semibold">
          Deseja realmente excluir <br /> o contato {contact.full_name}?
        </h1>
        <div className="flex gap-6 flex-col lg:flex-row">
          <Button
            text="Sim"
            type="button"
            loading={loading}
            onClick={() => deleteContacts()}
            color="bg-[--color-purple-600]"
          />
          <Button
            text="Não"
            type="button"
            onClick={() => setIsOpen(false)}
            color="bg-[--color-purple-600]"
          />
        </div>
      </div>
    </ModalContainer>
  );
}
