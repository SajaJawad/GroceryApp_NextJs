"use client";

import { Button } from "@/components/ui/button";
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Api from "../_utils/Api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "../_context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";

import { toast } from "sonner";

const Header = () => {
  const [category, setCategory] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [userId, setUserId] = useState(null);
  const [jwt, setJwt] = useState(null);
  const { updateCart, setUpdateCart } = useContext(CartContext);
  const [cartItemList, setCartItemList] = useState([]);

  const router = useRouter();

  // تحميل بيانات المستخدم فقط على المتصفح
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");

    if (token && user) {
      const parsedUser = JSON.parse(user);
      setJwt(token);
      setUserId(parsedUser);
      setIsLogin(true);
      getCartItems(parsedUser.id, token);
    }

    getCategoryList();
  }, []);

  // جلب التصنيفات
  const getCategoryList = () => {
    Api.getCategory().then((resp) => setCategory(resp.data.data));
  };

  // تسجيل الخروج
  const onSignOut = () => {
    localStorage.clear();
    setIsLogin(false);
    setUserId(null);
    setJwt(null);
    setTotalCartItem(0);
    router.push("/sign-in");
  };

  // جلب عدد منتجات السلة
  const getCartItems = async (id, token) => {
    if (!id || !token) return;
    const cartItems = await Api.getCartItems(id, token);
    setTotalCartItem(cartItems?.length || 0);
    setCartItemList(cartItems);
  };

  // تحديث عدد منتجات السلة عند تحميل الكومبوننت أو تغير المستخدم
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");
    if (token && user) {
      const parsedUser = JSON.parse(user);
      setJwt(token);
      setUserId(parsedUser);
      setIsLogin(true);

      getCartItems(parsedUser.id, token);
    }
  }, [updateCart]);

  const onDeleteItem = (id) => {
    Api.deleteCartItem(id, jwt)
      .then((resp) => {
        toast("Item removed from cart!");
        getCartItems(userId.id, jwt);
        setUpdateCart(!updateCart);
      })
      .catch((err) => {
        toast.error("Failed to remove item");
      });
  };

  return (
    <div className="shadow-md flex justify-between p-2">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt=""
            loading="eager"
            className="cursor-pointer"
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className="flex gap-2 items-center rounded-full p-2 bg-slate-200 cursor-pointer">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((cat) => (
              <Link key={cat.id} href={"/products-category/" + cat.name}>
                <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                  <Image
                    alt=""
                    src={
                      (process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
                        "http://localhost:1337") + cat?.icon?.[0]?.url
                    }
                    width={23}
                    height={23}
                    unoptimized
                  />
                  <p className="cursor-pointer text-lg">{cat.name}</p>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex gap-3 items-center border rounded-full p-2">
          <Search />
          <input type="text" placeholder="search..." className="outline-none" />
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <h2 className="flex gap-2 items-center cursor-pointer">
              <ShoppingBag /> <span>{totalCartItem}</span>
            </h2>
          </SheetTrigger>
          <SheetContent className="overflow-auto flex flex-col">
            <SheetHeader>
              <SheetTitle className="bg-[#ffcc00] font-bold text-black p-2 mt-5">
                My Cart
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-auto">
              <CartItemList
                cartItemList={cartItemList}
                onDeleteItem={onDeleteItem}
              />
            </div>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserIcon className="h-7 w-7 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href="/myOrders">
                <DropdownMenuItem className="cursor-pointer">
                  My Order
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
