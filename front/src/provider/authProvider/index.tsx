"use client";
import { api } from "@/service/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Toast from "@/components/toast";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("your-contactList:token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setLoading(false);
  }, []);

  async function signIn(data: LoginData) {
    await api
      .post("/login", data)
      .then((res) => {
        api.defaults.headers.common.authorization = `Bearer ${res.data.token}`;
        localStorage.setItem("your-contactList:token", res.data.token);
        Toast({ msg: "Login feito com sucesso!", isSuccess: true });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      })
      .catch((err) => {
        console.error(err.response.data.message);
        Toast({ msg: err.response.data.message });
      })
      .finally(() => setLoading(false));
  }

  async function registerClient(data: RegisterData) {
    const fd = new FormData();
    fd.append("full_name", data.full_name);
    fd.append("phone", data.phone);
    fd.append("email", data.email);
    fd.append("password", data.password);
    fd.append("image", data.image![0]);
    toast.promise(
      api.post(`/client`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
      {
        pending: "Cadastrando cliente",
        success: {
          render() {
            return "Cliente cadastrado com sucesso!";
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

  return (
    <AuthContext.Provider value={{ signIn, loading, registerClient }}>
      {children}
    </AuthContext.Provider>
  );
};
