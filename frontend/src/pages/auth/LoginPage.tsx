import { Button } from '@/components/ui/button';
import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/services/auth.service';
import useAuthStore from '@/stores/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
   email: z.email('Please enter a valid email address.'),
   password: z.string().trim().min(1, 'Password is required.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Login page component for user authentication.
 *
 * @returns The login page UI
 */
const LoginPage = () => {
   const [submitError, setSubmitError] = useState<string>('');
   const setAccessToken = useAuthStore((state) => state.setAccessToken);

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

   const onSubmit = async (values: LoginFormValues) => {
      setSubmitError('');

      try {
         const response = await login(values);
         setAccessToken(response.token);
      } catch {
         setSubmitError('Invalid email or password.');
      }
   };

   return (
      <Card className="w-full max-w-sm">
         <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
               Enter your email below to login to your account
            </CardDescription>
            <CardAction>
               <Button variant="link">Sign Up</Button>
            </CardAction>
         </CardHeader>
         <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        autoComplete="email"
                        {...register('email')}
                     />
                     {errors.email && (
                        <p className="text-destructive text-sm">
                           {errors.email.message}
                        </p>
                     )}
                  </div>
                  <div className="grid gap-2">
                     <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                           href="#"
                           className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                           Forgot your password?
                        </a>
                     </div>
                     <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        {...register('password')}
                     />
                     {errors.password && (
                        <p className="text-destructive text-sm">
                           {errors.password.message}
                        </p>
                     )}
                  </div>

                  {submitError && (
                     <p className="text-destructive text-sm">{submitError}</p>
                  )}

                  <CardFooter className="flex-col gap-2 px-0 pb-0">
                     <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                     >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                     </Button>
                  </CardFooter>
               </div>
            </form>
         </CardContent>
      </Card>
   );
};

export default LoginPage;