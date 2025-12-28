"use client"
import { Button } from '@/components/ui/button'
import { ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ProductDetail = ({ product }) => {
    const [productTotalPrice, setProductTotalPrice] = useState(
        product.sellingPrice ?
            product.sellingPrice :
            product.realPrice
    )

    const [quantity, setQuantity] = useState(1)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <Image src={`http://localhost:1337${product?.image[0]?.url}`} width={400} height={300} unoptimized alt='img' />

            <div className='flex flex-col gap-3 p-3'>
                <h2 className='text-2xl font-bold'>{product.name}</h2>
                <h2 className='text-sm text-gray-500'>{product.description}</h2>
                <div className='flex gap-3'>
                    <h2 className='font-bold text-2xl'>{product.realPrice} $</h2>
                    <del className='text-2xl text-red-600'>{product.sillingPrice} $</del>
                </div>
                <div className='flex flex-col items-baseline'>
                    <div className='gap-1 '>
                        <div className='flex border gap-10 items-center p-5'>
                            <button disabled={quantity==1} onClick={()=>setQuantity(quantity-1)}>-</button>
                            <h1>{quantity}</h1>
                            <button onClick={()=>setQuantity(quantity+1)} >+</button>
                        </div>
                        <h2 className='text-2xl font-bold'> {( productTotalPrice*quantity).toFixed(2)} $</h2>
                    </div>
                    <Button className="flex gap-3 mt-5">
                        <ShoppingBasket /> Add To Cart
                    </Button>
                </div>

                <h2><span className='font-bold text-[#ffcc00]'>Category: </span>{product.categories[0].name}</h2>
            </div>
        </div>
    )
}

export default ProductDetail