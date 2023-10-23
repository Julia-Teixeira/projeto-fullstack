import Image from "next/image";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { FaUserEdit, FaTrash, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

interface CardProps {
  contact: Contact;
  setIsOpenEdit: Dispatch<SetStateAction<boolean>>;
  setIsOpenDelete: Dispatch<SetStateAction<boolean>>;
  setSelectedContact: Dispatch<SetStateAction<Contact | null>>;
}

export default function Card({
  contact,
  setIsOpenDelete,
  setIsOpenEdit,
  setSelectedContact,
}: CardProps) {
  function openModalDelete() {
    setSelectedContact(contact);
    setIsOpenDelete(true);
  }

  function openModalEdit() {
    setSelectedContact(contact);
    setIsOpenEdit(true);
  }

  return (
    <div className="px-[20px] flex flex-col gap-2 bg-purple-100 w-[100%] h-[102px] rounded-lg hover:bg-purple-300 box-border">
      <header className="flex justify-between mt-1">
        <p className="text-purple800 text-sm md:text-xl lg:text-2xl">
          {contact.full_name}
        </p>
        <div className="flex gap-3.5">
          <FaUserEdit
            size={20}
            className="cursor-pointer"
            onClick={() => openModalEdit()}
          />
          <FaTrash
            size={20}
            className="cursor-pointer"
            onClick={() => openModalDelete()}
          />
        </div>
      </header>
      <div className="flex items-center gap-2 lg:gap-5 lg:mb-2 justify-evenly">
        <div className="flex items-center justify-center">
          <Image
            alt={`Imagem de perfil de ${contact!?.full_name}`}
            src={contact!?.image}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col text-purple800 lg:pr-4 xl:flex-row xl:gap-3">
          <p className="text-xs md:text-base lg:text-xl flex gap-1 items-center">
            <MdOutlineAlternateEmail size={15} /> {contact.email}
          </p>
          <p className="text-xs md:text-base lg:text-xl flex gap-1 items-center">
            <FaPhoneAlt size={15} />
            {contact.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
