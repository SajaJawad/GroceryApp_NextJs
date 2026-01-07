import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartItemList = ({ cartItemList, onDeleteItem }) => {
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total += item.amount;
    });
    setSubTotal(total);
  }, [cartItemList]);
  return (
    <div>
      <div className="flex flex-col gap-3">
        {cartItemList && cartItemList.length > 0 ? (
          <div className="flex flex-col gap-3">
            {cartItemList.map((cart, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 border-b"
              >
                <div className="flex items-center gap-4 mt-5">
                  <Image
                    src={
                      cart?.image
                        ? `http://localhost:1337${cart.image}`
                        : "/placeholder.png"
                    }
                    width={70}
                    height={70}
                    alt={cart?.name || "product"}
                    className="border p-2 object-contain bg-white rounded-lg h-[70px] w-[70px]"
                    unoptimized
                  />
                  <div className="flex flex-col">
                    <h2 className="font-bold text-sm line-clamp-1">
                      {cart?.name}
                    </h2>
                    <h2 className="text-xs text-gray-500">
                      Quantity: {cart?.quantity}
                    </h2>
                    <h2 className="font-bold text-green-700 text-sm">
                      {cart?.amount} $
                    </h2>
                  </div>
                </div>
                <TrashIcon
                  className="h-5 w-5 text-red-500 cursor-pointer hover:scale-110 transition-all"
                  onClick={() => onDeleteItem(cart.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-10 gap-3">
            <h2 className="text-lg font-bold text-gray-400">
              Your cart is empty
            </h2>
          </div>
        )}
      </div>

      <div className="mt-8 absolute w-[90%] bottom-5 flex flex-col">
        <h2 className="flex justify-between font-bold">
          subTotal: <span>{subTotal.toFixed(2)} $ </span>
        </h2>
        <Link href="/checkout">
          <Button className="mt-5 w-full">View Cart</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartItemList;
