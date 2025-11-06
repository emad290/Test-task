"use client";

import AllProducts from "@/CallApi/AllProducts";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import { Edit, Trash2, Star, PlusCircle } from "lucide-react";
import Image from "next/image";
import DeleteProduct from "@/CallApi/DeleteProduct";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ShowAll() {
  const [AllData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function GetData() {
    try {
      const data = await AllProducts();
      console.log(data);
      setAllData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading products:", err);
      setLoading(false);
    }
  }

  async function Delete(product_id) {
    try {
      const data = await DeleteProduct(product_id);
      if (data.status === "success") {
        toast.success("✅ Product deleted successfully", {
          duration: 2500,
          position: "top-center",
        });
        GetData();
      } else {
        toast.error("❌ Failed to delete product", {
          duration: 2500,
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("⚠️ Something went wrong", {
        duration: 2500,
        position: "top-center",
      });
    }
  }

  useEffect(() => {
    GetData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <div className="min-h-screen w-full  bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-pulse bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_40%)]"></div>

      <div className="w-[90%] mx-auto py-10">
        <div className="flex justify-end mb-8">
          <Link href="/addproduct">
            <Button className="flex items-center cursor-pointer gap-2 bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
              <PlusCircle className="w-4 h-4" /> Add New Product
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {AllData?.data?.map((item, index) => (
            <motion.div
              key={item.product_id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group relative"
            >



           




<Dialog>









  <DialogTrigger  className="cursor-pointer w-full">

   <Card className="hover:shadow-2xl hover:shadow-orange-400/30 shadow-md shadow-slate-800 transition-all duration-500 border rounded-2xl overflow-hidden bg-slate-200">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg font-bold text-slate-900">
                    {item.product_name}
                  </CardTitle>

                  <CardDescription>
                    <div className="relative w-[200px] z-10 h-[200px] mx-auto overflow-hidden rounded-lg">
                      <Image
                        src={
                          item.product_image?.[0]?.image_url ||
                          "/tangy-ranch-beef-burger-beef-burger_960396-205482.jpg"
                        }
                        fill
                        className="object-cover  transition-transform duration-700 group-hover:scale-110"
                        alt={item.product_name}
                      />
                    </div>
                  </CardDescription>

                  <CardAction className="mt-3">
                    <div className="flex justify-center gap-3">
                      <Link href={`/updateproduct/${item.product_id}`}>
                        <button className="p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200">
                          <Edit className="w-5 h-5 text-green-600" />
                        </button>
                      </Link>

                      <Dialog
                        open={
                          open && selectedProduct === item.product_id
                        }
                        onOpenChange={setOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                          className={"cursor-pointer"}
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedProduct(item.product_id);
                              setOpen(true);
                            }}
                          >
                            <Trash2 className="text-red-600" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>هل أنت متأكد؟</DialogTitle>
                            <DialogDescription>
                              سيتم حذف هذا المنتج نهائيًا ولا يمكن التراجع عن ذلك.
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setOpen(false)}>
                              إلغاء
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                Delete(selectedProduct);
                                setOpen(false);
                              }}
                            >
                              تأكيد الحذف
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardAction>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {item.product_description}
                  </p>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-gray-300" />
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <p className="text-emerald-600 font-bold ">
                    {item.product_price} EGP
                  </p>
                </CardFooter>



              </Card>



  </DialogTrigger>






{open? "":  <DialogContent>
    <DialogHeader>
      <DialogTitle className={"text-center"}>
<h1 className="text-2xl font-bold text-orange-700">{item.product_name}</h1>
<h2 className="my-3 text-slate-600">{item.product_description}</h2>
<h3 className="my-3 text-orange-500 font-bold"> discount: {item.discount}</h3>
<p className="my-3 text-emerald-900 font-bold"> price :{item.product_price} : EGP</p>
 <div className="flex items-center gap-1 justify-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-gray-300" />
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
      </DialogTitle>
      <DialogDescription>
          <Carousel className="w-full mx-auto max-w-[300px]">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                 <div className=" relative w-full h-full">
<Image src={"/tangy-ranch-beef-burger-beef-burger_960396-205482.jpg"} alt="text" fill></Image>
                 </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>}




</Dialog>








            </motion.div>



          ))}
        </div>

        {AllData?.data?.length === 0 && (
          <div className="text-center text-gray-500 mt-10 text-lg">
            😔 No products found
          </div>
        )}
      </div>
    </div>
  );
}
