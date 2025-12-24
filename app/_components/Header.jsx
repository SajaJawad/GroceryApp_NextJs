"use client"
import { Button } from '@/components/ui/button'
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Api from '../_utils/Api'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Header = () => {
    const [category, srtCategory] = useState([])

    useEffect(() => {
        getCategoryList()
    }, [])

    const getCategoryList = () => {
        Api.getCategory().then(resp => {
            srtCategory(resp.data.data)
        })
    }


    return (
        <div className='shadow-md flex justify-between p-2'>
            <div className='flex items-center gap-8'>
                <Image src="/logo.png" width={100} height={100} alt='' />




                <DropdownMenu>
                    <DropdownMenuTrigger><h2 className='flex gap-2 items-center  rounded-full p-2 bg-slate-200 cursor-pointer'> <LayoutGrid className='h-5 w-5' /> Category</h2></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Browse  Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {category.map((cat) => (
                            <DropdownMenuItem>{cat.name}</DropdownMenuItem>

                        ))}

                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='hidden md:flex gap-3 items-center border rounded-full p-2'>
                    <Search />
                    <input type='text' placeholder='search...' className='outline-none' />
                </div>

            </div>

            <div className='flex gap-5 items-center'>
                <h2 className='flex gap-2 items-center'><ShoppingBag /> 0</h2>
                <Button>Login</Button>
            </div>

        </div>



    )
}

export default Header