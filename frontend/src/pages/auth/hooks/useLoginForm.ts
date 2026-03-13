import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
   email: z.email('Please enter a valid email address.'),
   password: z.string().trim().min(1, 'Password is required.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const useLoginForm = () => {
       const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
       } = useForm<LoginFormValues>({
          resolver: zodResolver(loginSchema),
          defaultValues: {
             email: '',
             password: '',
          },
          mode: 'onBlur',
       });
    
    return {
       register,
       handleSubmit,
       formState: { errors, isSubmitting }
    };
};

export default useLoginForm;