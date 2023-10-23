"use client";
import { api } from "@/service/api";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { ContactRegisterData } from "./validator";
import { RegisterData } from "@/provider/authProvider/validator";
import "react-toastify/dist/ReactToastify.css";
import Toast from "@/components/toast";
import { ToastContentProps, toast } from "react-toastify";
import { AxiosError } from "axios";

interface ClientContextValues {
  client: Client | null;
  contacts: Contact[] | null;
  setClient: Dispatch<SetStateAction<Client | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  getClientData: () => Promise<void>;
  deleteContact: (
    id: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
  registerContact: (
    data: ContactRegisterData,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
  editContact: (
    id: string,
    data: ContactRegisterData,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
  editClient: (
    data: RegisterData,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
}

export const ClientContext = createContext<ClientContextValues>(
  {} as ClientContextValues
);

export const useClient = () => {
  const clientContext = useContext(ClientContext);

  return clientContext;
};

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("your-contactList:token");

    if (!token) {
      setLoading(false);
      router.push("/");
      return;
    }
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setLoading(false);
  }, []);

  async function getClientData() {
    setLoading(true);
    await api
      .get("/client")
      .then((res) => {
        setClient(res.data);
        setContacts(res.data.contacts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.response.data.message);
        Toast({ msg: err.response.data.message, isSuccess: false });
        router.push("/");
      })
      .finally(() => setLoading(false));
  }

  async function editClient(
    data: RegisterData,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) {
    setLoading(true);
    const fd = new FormData();
    fd.append("full_name", data.full_name);
    fd.append("phone", data.phone);
    fd.append("email", data.email);
    fd.append("password", data.password);
    fd.append("image", data.image);

    toast.promise(
      api.patch(`/client`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
      {
        pending: "Editando cliente...",
        success: {
          render() {
            getClientData();
            setIsOpen(false);
            return "Cliente editado com sucesso!";
          },
        },
        error: {
          render({ data }: any) {
            if (data as AxiosError) {
              console.error(data);
              return `${data.response.data.message}`;
            }
          },
        },
      }
    );

    // await api
    // .patch(`/client`, fd, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    // .then((_) => {
    //   Toast({ msg: "Dados Alterado com sucesso!", isSuccess: true });
    //   getClientData();
    //   setLoading(false);
    // })
    // .catch((err) => {
    //   console.error(err.response.data.message);
    //   Toast({ msg: err.response.data.message, isSuccess: false });
    // })
    // .finally(() => setLoading(false));
  }

  async function deleteContact(
    id: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) {
    toast.promise(api.delete(`/contact/${id}`), {
      pending: "Deletando contato...",
      success: {
        render() {
          getClientData();
          setIsOpen(false);
          return "Contato deletado com sucesso!";
        },
      },
      error: {
        render({ data }: any) {
          if (data as AxiosError) {
            console.error(data);
            setIsOpen(false);
            return `${data.response.data.message}`;
          }
        },
      },
    });
  }

  async function registerContact(
    data: ContactRegisterData,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) {
    setLoading(true);
    const fd = new FormData();
    fd.append("full_name", data.full_name);
    fd.append("phone", data.phone);
    fd.append("email", data.email);
    fd.append("image", data.image);

    toast.promise(
      api.post(`/contact/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
      {
        pending: "Criando contato...",
        success: {
          render() {
            getClientData();
            setIsOpen(false);
            return "Contato criado com sucesso!";
          },
        },
        error: {
          render({ data }: any) {
            if (data as AxiosError) {
              console.error(data);
              return `${data.response.data.message}`;
            }
          },
        },
      }
    );
  }

  async function editContact(
    id: string,
    data: ContactRegisterData,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) {
    const fd = new FormData();
    fd.append("full_name", data.full_name);
    fd.append("phone", data.phone);
    fd.append("email", data.email);
    fd.append("image", data.image);

    toast.promise(
      api.patch(`/contact/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
      {
        pending: "Alterando dados",
        success: {
          render() {
            getClientData();
            setIsOpen(false);
            return "Dados alterados com sucesso!";
          },
        },
        error: {
          render({ data }: any) {
            if (data as AxiosError) {
              console.error(data);
              setIsOpen(false);
              return `${data.response.data.message}`;
            }
          },
        },
      }
    );
  }

  return (
    <ClientContext.Provider
      value={{
        client,
        contacts,
        loading,
        setLoading,
        setClient,
        getClientData,
        deleteContact,
        registerContact,
        editContact,
        editClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
