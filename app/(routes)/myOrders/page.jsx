"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Api from "@/app/_utils/Api";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderList from "./MyOrderList";

function myOrders() {
  const [userId, setUserId] = useState(null);
  const [jwt, setJwt] = useState(null);
  const router = useRouter();
  const [orderLists, setOrderLists] = useState([]);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("jwt");

    if (!token || !userStr) {
      router.push("/sign-in");
    } else {
      const user = JSON.parse(userStr);
      setUserId(user);
      setJwt(token);
      getMyOrder(user.id, token);
    }
  }, []);

  const getMyOrder = async (id, token) => {
    const orderList = await Api.myOrders(id, token);
    console.log("Orders Data:", orderList);
    setOrderLists(orderList);
  };

  return (
    <div>
      <h2 className="bg-[#ffcc00] text-xl font-bold text-center p-3">
        my Orders
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className=" p-3 text-3xl font-bold text-primary">Order History</h2>

        <div>
          {orderLists.map((order, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="w-full">
                <div className="w-full  border p-2 bg-slate-100 flex justify-between gap-20">
                  <h2>
                    <span className="font-bold mt-3"> Order Date:</span>
                    {moment(order?.createdAt).format("DD/MM/YY")}
                  </h2>
                  <h2>
                    <span className="font-bold mt-3">Total Amount :</span>
                    {order?.totalOrderAmount}
                  </h2>

                  <h2>
                    <span className="font-bold mt-3">Status :</span> PENDING
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {order.orderItemList && order.orderItemList.length > 0 ? (
                  order.orderItemList.map((item, index) => (
                    <MyOrderList key={index} orderItem={item} />
                  ))
                ) : (
                  <div className="p-5 text-center text-gray-400">
                    No items found for this order. This might be an older order
                    format.
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

export default myOrders;
