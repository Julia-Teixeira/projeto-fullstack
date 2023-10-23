import { InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type: string;
  register: UseFormRegisterReturn;
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

export default function Input({
  id,
  label,
  type,
  register,
  error,
  ...rest
}: InputProps) {
  return (
    <fieldset className="flex flex-col w-full max-w-[379px]">
      <label htmlFor={id} className="font-semibold text-base md:text-lg">
        {label}:
      </label>
      <input
        type={type}
        id={id}
        className={`w-full h-10 md:h-11 rounded-md text-purple800 pl-4`}
        {...rest}
        {...register}
      />
      {error && typeof error === "string" ? (
        <span className="text-red-700">{error}</span>
      ) : null}
    </fieldset>
  );
}
