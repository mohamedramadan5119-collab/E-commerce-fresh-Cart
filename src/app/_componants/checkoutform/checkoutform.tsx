"use client";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { payCashOrder } from "../../../servises/cart/pay-cash";
import { shipping } from "../../types/cart-response";
import { payOnlineOrder } from "../../../servises/cart/pay-online";

export default function CheckoutForm({ cartId }: { cartId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<"cash" | "online">("online");

  const form = useForm<shipping>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function handlePayCash(cartId: string, shippingAddress: shipping) {
    const response = await payCashOrder(cartId, shippingAddress);
    if (response.status === "success") {
      toast.success("Order placed successfully!");
      window.location.href = "/allorders";
    } else {
      toast.error("Failed to place cash order");
    }
  }

  async function handlePayOnline(cartId: string, shippingAddress: shipping) {
    const response = await payOnlineOrder(cartId, shippingAddress);
    if (response.status === "success") {
      toast.success("Redirecting to secure payment...");
      window.location.href = response.session.url;
    } else {
      toast.error("Failed to initialize online payment");
    }
  }

  async function onSubmit(values: shipping) {
    setIsLoading(true);
    try {
      if (paymentType === "online") {
        await handlePayOnline(cartId, values);
      } else {
        await handlePayCash(cartId, values);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl mt-10 bg-white shadow-2xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-primary font-black text-3xl mb-2">Checkout</h2>
        <p className="text-gray-500 text-sm font-medium">
          Complete your shipping information
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-gray-700">
                  Details
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-50 border-none focus:ring-2 focus:ring-primary"
                    placeholder="Street, Building..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-gray-700">City</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-50 border-none focus:ring-2 focus:ring-primary"
                    placeholder="Cairo, Giza..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-gray-700">Phone</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-50 border-none focus:ring-2 focus:ring-primary"
                    placeholder="01xxxxxxxxx"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 space-y-3">
            <Button
              onClick={() => setPaymentType("online")}
              disabled={isLoading}
              type="submit"
              className="w-full bg-primary hover:bg-primary cursor-pointer text-white py-6 rounded-xl font-bold transition-all shadow-lg shadow-green-100"
            >
              {isLoading && paymentType === "online"
                ? "Processing..."
                : "Pay Online (Visa/MasterCard)"}
            </Button>

            <Button
              onClick={() => setPaymentType("cash")}
              disabled={isLoading}
              type="submit"
              variant="outline"
              className="w-full cursor-pointer border-primary text-primary hover:bg-green-50 py-6 rounded-xl font-bold transition-all"
            >
              {isLoading && paymentType === "cash"
                ? "Processing..."
                : "Cash on Delivery"}
            </Button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            By placing an order, you agree to our terms and conditions.
          </p>
        </form>
      </Form>
    </div>
  );
}
