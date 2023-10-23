"use client";
import Button from "@/components/button";
import Card from "@/components/cardContacts";
import { ModalCreateContacts } from "@/components/modal/modalCreateContact";
import { ModalDeleteContact } from "@/components/modal/modalDeleteContact";
import { ModalEditClients } from "@/components/modal/modalEditClient";
import { ModalEditContact } from "@/components/modal/modalEditContact";
import img from "@/image/agenda.svg";
import { useClient } from "@/provider/clientProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { FaUserEdit, FaFilePdf, FaUserPlus } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Toast from "@/components/toast";
import { setLazyProp } from "next/dist/server/api-utils";

export default function Dashboard() {
  const { client, contacts, setClient, getClientData } = useClient();
  const router = useRouter();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEditClient, setIsOpenEditClient] = useState(false);
  const [isOpenDeleteContact, setIsOpenDeleteContact] = useState(false);
  const [isOpenEditContact, setIsOpenEditContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await getClientData();
    })();
  }, []);

  function logOut() {
    localStorage.clear();
    setClient(null);
    Toast({ msg: "Saindo ...", info: true });
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  function newPdf() {
    setLoading(true);
    const doc = new jsPDF({ orientation: "p" });

    doc.setFontSize(32);
    doc.setTextColor("#200726");
    doc.text(`Relatório de ${client?.full_name}`, 10, 10);

    doc.setFontSize(12);
    doc.text("Nome Completo - Telefone - E-mail", 10, 20);
    doc.text(`Total de contatos: ${contacts?.length}`, 10, 30);
    let line = 30;
    contacts!.map((contact) =>
      doc.text(
        `${contact.full_name} - ${contact.phone} - ${contact.email}`,
        10,
        (line += 10)
      )
    );
    doc.save(`contactList${client?.id}.pdf`);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      {isOpenCreate ? (
        <ModalCreateContacts
          isOpen={isOpenCreate}
          setIsOpen={setIsOpenCreate}
        />
      ) : null}
      {isOpenEditClient ? (
        <ModalEditClients
          isOpen={isOpenEditClient}
          setIsOpen={setIsOpenEditClient}
        />
      ) : null}
      {isOpenEditContact ? (
        <ModalEditContact
          isOpen={isOpenEditContact}
          setIsOpen={setIsOpenEditContact}
          contact={selectedContact!}
        />
      ) : null}
      {isOpenDeleteContact ? (
        <ModalDeleteContact
          isOpen={isOpenDeleteContact}
          setIsOpen={setIsOpenDeleteContact}
          contact={selectedContact!}
        />
      ) : null}
      <header className="flex justify-between h-[133px] w-[80%]  pt-[30px]">
        <div className="flex items-center">
          <Image alt="Agenda" src={img} className="w-[68px] h-[68px]" />
          <h1 className="text-purple800 text-2xl md:text-4xl font-semibold ">
            Contatos
          </h1>
        </div>

        <div className="flex gap-2.5 items-center  ">
          <p
            className="text-right cursor-pointer font-semibold bg-purple-100/30 text-purple800 p-2 rounded"
            onClick={() => logOut()}
          >
            Sair
          </p>
        </div>
      </header>
      <div className="flex flex-col md:flex-row gap-6 w-[80%]">
        <article className="md:max-w-[30vw] w-full h-max flex flex-col gap-4 md:gap-6 bg-purple-100/30 rounded-r-3xl items-center p-4">
          <div className="flex gap-4 md:flex-col items-center justify-center">
            <div className="flex w-24 md:w-44 lg:w-56 justify-center">
              <Image
                alt={`Imagem de perfil de ${client!?.full_name}`}
                src={client!?.image}
                width={300}
                height={300}
                className="w-[auto] h-[auto] rounded-full"
              />
            </div>

            <div>
              <p className="text-purple800 text-lg md:text-xl lg:text-2xl">
                {client?.full_name}
              </p>
              <p className="text-purple800 text-sm md:text-base lg:text-xl">
                {client?.email}
              </p>
              <p className="text-purple800 text-sm md:text-base lg:text-xl">
                {client?.phone}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] w-full items-center">
            <Button
              text="Editar Conta"
              type="button"
              color="bg-[--color-purple-500]"
              onClick={() => setIsOpenEditClient(true)}
            >
              <FaUserEdit />
            </Button>
            <Button
              text="Criar novo contato"
              type="button"
              color="bg-[--color-purple-500]"
              onClick={() => setIsOpenCreate(true)}
            >
              <FaUserPlus />
            </Button>
            <Button
              text="Gerar um relatório"
              type="button"
              color="bg-[--color-purple-500]"
              onClick={() => newPdf()}
            >
              <FaFilePdf />
            </Button>
          </div>
        </article>

        <article className="flex flex-col gap-2.5 w-[80vw]">
          {contacts ? (
            contacts?.map((contact) => (
              <Card
                contact={contact}
                key={contact.id}
                setIsOpenDelete={setIsOpenDeleteContact}
                setIsOpenEdit={setIsOpenEditContact}
                setSelectedContact={setSelectedContact}
              />
            ))
          ) : (
            <div>
              <p>Você ainda não possui contato</p>
              <Button
                text="Criar novo contato"
                type="button"
                color="bg-[--color-purple-500]"
                onClick={() => setIsOpenCreate(true)}
              >
                <FaUserPlus />
              </Button>
            </div>
          )}
        </article>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}
