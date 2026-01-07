"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import Api from "../_utils/Api";
import { toast } from "sonner";
import { CartContext } from "../_context/CartContext";

const ProductDetail = ({ product }) => {
  const router = useRouter();
  const { updateCart, setUpdateCart } = useContext(CartContext); // ✅ هنا في الأعلى

  const [quantity, setQuantity] = useState(1);
  const productPrice = product.sellingPrice ?? product.realPrice;

  const addToCart = async () => {
    const token = localStorage.getItem("jwt");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/sign-in");
      return;
    }

    const user = JSON.parse(userStr);

    const data = {
      data: {
        quantity,
        amount: Number((quantity * productPrice).toFixed(2)),
        products: product.id,
        users_permissions_user: user.id,
      },
    };

    try {
      await Api.addToCart(data, token);
      toast("Added to cart ✅");
      setUpdateCart((prev) => !prev); // Force refresh via toggle
    } catch (error) {
      console.error(error);
      toast("Error adding to cart ❌");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Image
        src={
          (process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
            "http://localhost:1337") + product?.image[0]?.url
        }
        width={400}
        height={300}
        alt="product"
        unoptimized
        style={{ objectFit: "cover" }}
      />

      <div className="flex flex-col gap-3 p-3">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.description}</p>

        <div className="flex gap-3 items-center">
          <span className="font-bold text-2xl">{productPrice} $</span>
          {product.sillingPrice && (
            <del className="text-2xl text-red-600">
              {product.sillingPrice} $
            </del>
          )}
        </div>

        <div className="flex flex-col items-baseline mt-3">
          <div className="flex border gap-10 items-center p-3">
            <button
              disabled={quantity === 1}
              onClick={() => setQuantity((q) => q - 1)}
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          <span className="text-2xl font-bold mt-2">
            {(productPrice * quantity).toFixed(2)} $
          </span>

          <Button onClick={addToCart} className="flex gap-3 mt-5">
            <ShoppingBasket /> Add To Cart
          </Button>
        </div>

        <p className="mt-3">
          <span className="font-bold text-[#ffcc00]">Category: </span>
          {product.categories?.[0]?.name}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
