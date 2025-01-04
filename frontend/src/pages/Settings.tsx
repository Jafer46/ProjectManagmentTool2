import SubmitButton from "@/components/SubmitButton";
import { useToast } from "@/components/ui/use-toast";
import { userSchema } from "@/types/formSchma";
import useAuth from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldType } from "../../constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import CustomFormField from "@/components/CustomFormField";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: user?.username ?? "",
      avatar: user?.avatar ?? "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
    } catch (err) {
      toast({
        variant: "destructive",
        title: "error",
        description: "unexpected error occured",
      });
    }
  };

  return (
    <div className=" w-full flex justify-center items-center p-4 blur blur-high rounded-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex-1 mb-3"
        >
          <section className="mb-12 space-y-4">
            <h1 className="mb-12 space-y-1">Hi there 👋</h1>
            <p className="text-dark-700">
              Add data to the following form to login
            </p>
          </section>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="username"
            label="Username"
            placeHolder="ex ...."
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
          <SubmitButton isLoading={loading}>Update</SubmitButton>
        </form>
      </Form>
    </div>
  );
}
