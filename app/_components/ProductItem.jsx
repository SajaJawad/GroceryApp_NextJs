import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductDetail from './ProductDetail'

const ProductItem = ({ product }) => {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg cursor-pointer hover:scale-105 hover:shadow-md transition-all">
      <Image
        className="w-90 h-60"
        src={`http://localhost:1337${product?.image[0]?.url}`}
        width={500}
        height={300}
        alt="icon"
        unoptimized
        style={{ objectFit: "cover" }}
      />

      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-amber-500 font-bold">{product.name}</h2>
        <div className="flex gap-2 items-center">
          <h2 className="font-bold text-xl">{product.realPrice} $</h2>
          {product.sillingPrice && (
            <del className="text-red-600 font-bold text-xl">
              {product.sillingPrice} $
            </del>
          )}
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Add to Cart</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>

          {/* ✅ div عادي بدل DialogDescription */}
          <div className="mt-4">
            <ProductDetail product={product} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductItem





// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import React from 'react'
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import ProductDetail from './ProductDetail'

// const ProductItem = ({ product }) => {
//     return (
//         <div className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg cursor-pointer hover:scale-105 hover:shadow-md transition-all'>
//             <Image className='w-90 h-60' src={`http://localhost:1337${product?.image[0]?.url}`} width={500} height={300} alt='icon' unoptimized style={{ objectFit: 'cover' }} />


//             <div className='flex flex-col gap-1 items-center'>
//                 <h2 className='text-amber-500 font-bold'>{product.name}</h2>
//                 <div className='flex gap-2 items-center'>
//                     <h2 className='font-bold text-xl'>{product.realPrice} $</h2>
//                     {product.sillingPrice && (
//                         <del className='text-red-600 font-bold text-xl'>{product.sillingPrice} $</del>
//                     )}
//                 </div>
//             </div>




//             <Dialog>
//                 <DialogTrigger> <Button>Add to Cart</Button></DialogTrigger>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogDescription>
//                             <ProductDetail product={product}/>
//                         </DialogDescription>
//                     </DialogHeader>
//                 </DialogContent>
//             </Dialog>


//         </div>
//     )
// }

// export default ProductItem