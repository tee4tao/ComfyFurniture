import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const emailErrorMessage = `The email address you entered is not valid. Please enter a valid email address`;
const minLengthErrorMessage = `Password must contain a min. of 8 characters`;
// const maxLengthErrorMessage = `Password can only have a max. of 20 characters`;
const uppercaseErrorMessage = `Password must contain at least one uppercase`;
const lowercaseErrorMessage = `Password must contain at least one lowercase`;
const numberErrorMessage = `Password must contain at least one number`;
const specialCharacterErrorMessage = `Password must contain at least one special character`;
const passwordMismatchErrorMessage = `The passwords you entered do not match. Please make sure both passwords are the same`;

export const authFormSchema = (type: string) =>
  z
    .object({
      email: z.string().email(emailErrorMessage),
      password: z
        .string()
        .min(8, { message: minLengthErrorMessage })
        .refine((password) => /[A-Z]/.test(password), {
          message: uppercaseErrorMessage,
        })
        .refine((password) => /[a-z]/.test(password), {
          message: lowercaseErrorMessage,
        })
        .refine((password) => /[0-9]/.test(password), {
          message: numberErrorMessage,
        })
        .refine((password) => /[!@#$%^&*]/.test(password), {
          message: specialCharacterErrorMessage,
        }),
      confirmPassword: type === "sign-in" ? z.string().optional() : z.string(),
    })
    .refine(
      (data) => {
        if (type === "sign-up") {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: passwordMismatchErrorMessage,
        path: ["confirmPassword"],
      }
    );

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const convertToSubcurrency = (amount: number, factor = 100) =>
  Math.round(amount * factor);

export const count = (s: string) => s.trim().split(/\s+/).length;
