import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/lib/store";
import useApi from "@/lib/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

// List of common passwords (this is a small example list; you can expand it as needed)
const commonPasswords = [
  "password",
  "123456",
  "123456789",
  "qwerty",
  "12345678",
  "111111",
  "123123",
  "abc123",
  "password1",
];

const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter.",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter.",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number.",
  })
  .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
    message: "Password must contain at least one special character.",
  })
  .refine((password) => !commonPasswords.includes(password), {
    message: "Password is too common.",
  });

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(50, { message: "Username must be at most 50 characters long." }),
  password: passwordValidation,
});

const defaultValues = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

export default function Signup() {
  const { toast } = useToast();
  const navigate = useNavigate()
  const { add } = useUserStore()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = form;

  const { signup } = useApi();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await signup(values);
      if (response.status === 201) {
        toast({
          description: "Account created successfully",
          variant: "black"
        });
        // adding data to the store
        add({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          username: response.data.username,
          email: response.data.email,
        })
        // navigating to the dashboard
        navigate("/dashboard")
      }
    } catch (error) {
      toast({
        description: "Account can't created",
        variant: "destructive",
      });
      if (axios.isAxiosError(error)) {
        const responseErrors = error.response?.data;

        if (responseErrors) {
          for (const [key, value] of Object.entries(responseErrors)) {
            const errorMessage = Array.isArray(value)
              ? value.join(", ")
              : value;
            setError(key as keyof typeof defaultValues, {
              type: "manual",
              message: String(errorMessage),
            });
          }
        }
      }
    }
  }

  return (
    <div className="w-screen h-screen grid place-items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="johndoe"
                            {...field}
                            aria-invalid="false"
                            autoComplete="username"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            aria-invalid="false"
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="****"
                            aria-invalid="false"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create an account
                </Button>
                <Button variant="outline" className="w-full">
                  Sign up with GitHub
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
