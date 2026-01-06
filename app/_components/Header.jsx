"use client"

import { Button } from '@/components/ui/button'
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../_utils/Api'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CartContext } from '../_context/CartContext'

const Header = () => {
    const [category, setCategory] = useState([])
    const [isLogin, setIsLogin] = useState(false)
    const [totalCartItem, setTotalCartItem] = useState(0)
    const [userId, setUserId] = useState(null)
    const [jwt, setJwt] = useState(null)
        const { updateCart, setUpdateCart } = useContext(CartContext)

    const router = useRouter()

    // تحميل بيانات المستخدم فقط على المتصفح
    useEffect(() => {
        const token = localStorage.getItem("jwt")
        const user = localStorage.getItem("user")


        if (token && user) {
            const parsedUser = JSON.parse(user)
            setJwt(token)
            setUserId(parsedUser)
            setIsLogin(true)
            getCartItems(parsedUser.id, token)
        }

        getCategoryList()
    }, [])

    // جلب التصنيفات
    const getCategoryList = () => {
        Api.getCategory().then(resp => setCategory(resp.data.data))
    }

    // تسجيل الخروج
    const onSignOut = () => {
        localStorage.clear()
        setIsLogin(false)
        setUserId(null)
        setJwt(null)
        setTotalCartItem(0)
        router.push("/sign-in")
    }

    // جلب عدد منتجات السلة
    const getCartItems = async (id, token) => {
        if (!id || !token) return
        const cartItem = await Api.getCartItems(id, token)
        setTotalCartItem(cartItem?.length || 0)
    }

    // تحديث عدد منتجات السلة عند تحميل الكومبوننت أو تغير المستخدم
    useEffect(() => {
        const token = localStorage.getItem("jwt")
        const user = localStorage.getItem("user")
        if (token && user) {
            const parsedUser = JSON.parse(user)
            setJwt(token)
            setUserId(parsedUser)
            setIsLogin(true)
            
            getCartItems(parsedUser.id, token)
        }
    }, [updateCart])

    return (
        <div className='shadow-md flex justify-between p-2'>
            <div className='flex items-center gap-8'>
                <Image src="/logo.png" width={100} height={100} alt='' loading="eager" />

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <h2 className='flex gap-2 items-center rounded-full p-2 bg-slate-200 cursor-pointer'>
                            <LayoutGrid className='h-5 w-5' /> Category
                        </h2>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {category.map((cat) => (
                            <DropdownMenuItem key={cat.id}>
                                <Image
                                    alt=''
                                    src={`http://localhost:1337${cat?.icon?.[0]?.url}`}
                                    width={23} height={23} unoptimized
                                />
                                <p className='cursor-pointer text-lg'>{cat.name}</p>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='hidden md:flex gap-3 items-center border rounded-full p-2'>
                    <Search />
                    <input type='text' placeholder='search...' className='outline-none' />
                </div>
            </div>

            <div className='flex gap-5 items-center'>
                <h2 className='flex gap-2 items-center'>
                    <ShoppingBag /> <span>{totalCartItem}</span>
                </h2>

                {!isLogin ? (
                    <Link href="/sign-in">
                        <Button>Login</Button>
                    </Link>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <CircleUserIcon className='h-7 w-7 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Orders</DropdownMenuItem>
                            <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    )
}

export default Header












