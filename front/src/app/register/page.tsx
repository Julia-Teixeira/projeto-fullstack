"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";
import img from "@/image/agenda.svg";
import Link from "next/link";
import { useAuth } from "@/provider/authProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterData,
  schemaRegister,
} from "@/provider/authProvider/validator";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Register() {
  const { registerClient } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(schemaRegister),
  });
  return (
    <main className="flex min-h-screen items-center justify-evenly p-4">
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

      <div className="min-w-[300px] w-full max-w-[30rem] bg-purple-300/50 h-max rounded-2xl flex flex-col items-center p-5 md:p-3">
        <h2 className="text-purple800 text-2xl md:text-4xl font-semibold pt-4">
          Crie sua conta
        </h2>
        <form
          onSubmit={handleSubmit(registerClient)}
          className="flex max-w-[380px] w-full flex-col gap-y-3 mt-[31px] px-4"
        >
          <Input
            type="text"
            id="fullname"
            label="Nome Completo"
            placeholder="Nome completo"
            register={register("full_name", { required: true })}
            error={errors?.full_name?.message}
          />

          <Input
            type="text"
            id="email"
            label="Email"
            placeholder="email@email.com"
            register={register("email", { required: true })}
            error={errors?.email?.message}
          />

          <Input
            type="text"
            id="phone"
            label="Telefone"
            placeholder="(00) 0 0000-0000"
            register={register("phone", { required: true })}
            error={errors?.phone?.message}
          />

          <Input
            type="file"
            id="image"
            label="Imagem"
            placeholder="Url da imagem"
            register={register("image", { required: true })}
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

          <Button
            text="Registrar"
            type="submit"
            color="bg-[--color-purple-600]"
          />
        </form>

        <div className="w-[300px] h-[1px] bg-white mt-6" />
        <div className="max-w-[380px] w-full flex flex-col items-center px-4">
          <p className="text-purple800 text-xl md:text-2xl text-center my-6">
            Já possui conta?
          </p>
          <Link href="/" className="w-full">
            <Button
              text="Ir para o Login"
              type="button"
              color="bg-[--color-purple-600]"
            />
          </Link>
        </div>
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
