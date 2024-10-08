import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

const formSchema = authFormSchema("sign-up");

interface CustomInput {
  name: FieldPath<z.infer<typeof formSchema>>;
  placeholder: string;
  label: string;
  control: Control<z.infer<typeof formSchema>>;
}

const CustomInput = ({ name, label, placeholder, control }: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-600 text-lg tracking-wide">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={
                name === "password" || name === `confirmPassword`
                  ? "password"
                  : "text"
              }
            />
          </FormControl>
          {name === `password` && (
            <FormDescription className="text-primary">
              Password must contain a min. of 8 characters, at least one upper
              case, one lower case, one special character and one number.
            </FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
