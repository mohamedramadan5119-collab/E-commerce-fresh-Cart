"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { schema } from "@/schema/registerschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

export default function Register() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  async function SubmitForm(values: z.infer<typeof schema>) {
    console.log(values);

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      const payload = await response.json();
      console.log(payload);

      if ((payload.message = "success")) {
        router.push("/login");
        toast.success("Registration successful! Redirecting...");
      } else {
        toast.error(payload.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  }
  return (
    <>
      <div className=" w-4/5  md:w-3/4 mx-auto p-10 rounded-2xl mt-10 ">
        <h2 className="text-green-500 font-bold text-2xl">Register Now</h2>
        <form onSubmit={form.handleSubmit(SubmitForm)}>
          <div className=" mt-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name :</FieldLabel>
                  <Input
                    className=" bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className=" mt-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                  <Input
                    className=" bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Email"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className=" mt-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
                  <Input
                    className=" bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Password"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className=" mt-4">
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>RePassword :</FieldLabel>
                  <Input
                    className=" bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="RePassword"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className=" mt-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone :</FieldLabel>
                  <Input
                    className=" bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Phone"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Button type="submit" className="my-5 w-full ">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
