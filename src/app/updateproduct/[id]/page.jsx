"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { number, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import UpdateProduct from "@/CallApi/UpdateProduct";
import { toast } from "sonner";







const updateProductSchema = z.object({
  product_id: z.coerce.number(), 
  product_name: z.string().min(1, "اسم المنتج مطلوب"),
  product_description: z.string().min(1, "الوصف مطلوب"),
  number_of_pieces: z.coerce.number().min(1, "يجب أن يكون رقم موجب"),
  product_price: z.coerce.number().min(0, "سعر غير صالح"),
  price_after_discount: z.coerce.number().min(0, "سعر الخصم غير صالح"),
  discount: z.coerce.number().min(0).max(100, "الخصم بين 0 و 100"),
  product_name_en: z.string().min(1, "Required"),
  product_description_en: z.string().min(1, "Required"),
  product_hidden: z.enum(["yes", "no"]),
});







export default function UpdateProductForm() {
 const params = useParams();
const id = params?.id ? Number(params.id) : 0; 
const router= useRouter();

  const [serverError, setServerError] = useState("");
  const [load, setLoad] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      product_id: id,
      product_name: "",
      product_description:
        "",
      number_of_pieces: 120,
      product_price: 89.9,
      price_after_discount: 74.5,
      discount: 17.1,
      product_name_en: "",
      product_description_en:
        "",
      product_hidden: "yes",
    },
  });

  const onSubmit = async (values) => {
    setLoad(true);
    setServerError("");
try{
const data = await UpdateProduct(values);
console.log(data);

if(data.status=="success"){
  toast.success("you updated product successfully",{duration:3000,position:"top-center"});
  router.push("/")
}
}
catch(error){
  console.log(error);
  setServerError(error.message);
  toast.error(error.message,{duration:3000,position:"top-center"});
}
    setLoad(false);
  
  };

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  return (


<div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
 <div
      className="max-w-2xl mx-auto my-10 p-6  rounded-lg shadow-2xl"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        تحديث بيانات المنتج
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit,(errors) => console.log(errors))} className="space-y-5">
          {/* Product Name AR */}
          <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المنتج</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="اسم المنتج بالعربية" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description AR */}
          <FormField
            control={form.control}
            name="product_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>وصف المنتج</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="الوصف بالعربية" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* English Fields */}
          <FormField
            control={form.control}
            name="product_name_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name (EN)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="English name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_description_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description (EN)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="English description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Numeric Fields */}
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="number_of_pieces"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد القطع</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>السعر</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price_after_discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>السعر بعد الخصم</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Discount */}
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الخصم (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hidden Switch */}
          <FormField
            control={form.control}
            name="product_hidden"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                <FormLabel>إخفاء المنتج؟</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value === "yes"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "yes" : "no")
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {serverError && (
            <div className="text-sm text-red-600">{serverError}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer"
          >
            {load ? "جاري التحديث..." : "تحديث المنتج"}
          </Button>
        </form>
      </Form>
    </div>

</div>
   
  );
}
