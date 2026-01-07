import React from "react";
import Image from "next/image";
function MyOrderList({ orderItem }) {
  console.log("OrderItem Data:", orderItem);
  return (
    <div className="grid grid-cols-5 w-[60%] border-b pb-2 mb-2">
      <div className="flex flex-col">
        {orderItem?.productImage ? (
          <Image
            src={
              orderItem.productImage.startsWith("http")
                ? orderItem.productImage
                : (process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
                    "http://localhost:1337") +
                  (orderItem.productImage.startsWith("/") ? "" : "/") +
                  orderItem.productImage
            }
            width={70}
            height={70}
            unoptimized
            alt="product"
            className="mt-3 mb-3 object-contain border p-2 rounded-lg bg-white"
          />
        ) : (
          <Image
            src="/placeholder.png"
            width={70}
            height={70}
            alt="placeholder"
            className="mt-3 mb-3 object-contain border p-2 rounded-lg"
            unoptimized
          />
        )}
        <span className="text-[14px] text-gray-600 break-all max-w-[100px]">
          {orderItem?.productName}
        </span>
      </div>

      <div className="col-span-2 m-2">
        <h2 className="font-bold mb-4 mt-3">
          name:
          <span className="text-slate-500 m-2">{orderItem?.productName}</span>
        </h2>
        <h2 className="font-bold mb-4 mt-3">
          Selling Price:
          <span className="text-slate-500 m-2">{orderItem?.productPrice}</span>
        </h2>
      </div>

      <div className="col-span-2">
        <h2 className="font-bold mb-4 mt-3">
          quantity:
          <span className="text-slate-400 m-2">{orderItem?.quantity}</span>
        </h2>
        <h2 className="font-bold mb-4 mt-3">
          Amount:{" "}
          <span className="text-slate-400 m-2">{orderItem?.amount}</span>
        </h2>
      </div>
    </div>
  );
}

export default MyOrderList;
