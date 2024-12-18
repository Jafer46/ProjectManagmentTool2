import { Form } from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField from "../components/CustomFormField";
import { z } from "zod";
import { FormFieldType } from "../../constants";
import SubmitButton from "../components/SubmitButton";
import useAuth from "@/store";
import { useState } from "react";
import { loginUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const fromSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string(),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: z.infer<typeof fromSchema>) => {
    setLoading(true);
    try {
      const { user, accessToken } = await loginUser({ email, password });
      setLoading(false);
      login(user, accessToken);
      navigate("/");
    } catch (err: any) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: err.message ?? "unexpected error",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="w-[96vw] h-[96vh] rounded-xl blur blur-low p-4 lg:w-1/3 lg:h-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex-1 mb-3"
          >
            <section className="mb-12 space-y-1">
              <h1 className="text-xl font-bold">Hi there 👋</h1>
              <p className="text-dark-700">
                Add your data to the following form for login
              </p>
            </section>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeHolder="ex. Jafer Hussein"
              iconSrc=""
            />
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password"
              label="Password"
              placeHolder="ex ...."
              iconSrc=""
            />
            <SubmitButton isLoading={loading}>Login</SubmitButton>
          </form>
        </Form>
        <div className="flex items-center justify-center">
          <Button variant="link" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
