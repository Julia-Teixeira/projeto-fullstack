"use client";
import Image from "next/image";
import img from "@/image/agenda.svg";
import Button from "@/components/button";
import Input from "@/components/input";
import Link from "next/link";
import { useAuth } from "@/provider/authProvider";
import { schema } from "@/provider/authProvider/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Login() {
  const { signIn, loading } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  return (
    <main className="flex min-h-screen items-center justify-evenly p-4">
      <div className="min-w-[300px] w-full max-w-[30rem] bg-purple-300/50 h-max rounded-2xl flex flex-col items-center p-5 md:p-3">
        <h2 className="text-purple800 text-2xl md:text-4xl font-semibold pt-4">
          Bem vindo de volta!
        </h2>
        <form
          onSubmit={handleSubmit(signIn)}
          className="flex max-w-[380px] w-full flex-col gap-y-3 mt-[31px] px-4"
        >
          <Input
            type="text"
            id="email"
            label="Email"
            placeholder="email@email.com"
            register={register("email", { required: true })}
            error={errors?.email?.message}
          />
          <Input
            type="password"
            id="password"
            label="Senha"
            placeholder="***********"
            register={register("password", { required: true })}
            error={errors?.password?.message}
          />

          <Button
            text="Entrar"
            type="submit"
            disabled={!isValid}
            color="bg-[--color-purple-600]"
            loading={loading}
          />
        </form>

        <div className="w-[300px] h-[1px] bg-white mt-6" />
        <div className="max-w-[380px] w-full flex flex-col items-center px-4">
          <p className="text-purple800 text-xl md:text-2xl text-center my-6">
            Ainda não possui uma <br />
            conta?
          </p>
          <Link href="/register" className="w-full">
            <Button
              text="Criar sua conta"
              type="button"
              color="bg-[--color-purple-600]"
            />
          </Link>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-5 items-center">
        <h2 className="text-purple800 text-4xl font-semibold">
          Lista de Contatos
        </h2>
        <Image alt="Imagem de uma agenda" src={img} width={370} />
        <p className="text-white text-3.5xl">
          Simplifique a forma de <br />
          gerenciar seus contatos
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
