
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CategoryList({ categoryList }) {
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl text-amber-500'>Shop By Category</h2>
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 justify-items-center items-center mt-5'>
        {categoryList?.map((category, index) => (
          <Link
            href={"/products-category/" + encodeURIComponent(category.name.trim())}
            key={index}
            className='w-30 h-35 mt-3 bg-amber-100 p-3 flex flex-col items-center text-center group '
          >
            {category?.icon?.length > 0 && (
              <Image
                src={`http://localhost:1337${category.icon[0].url}`}
                width={80}
                height={80}
                alt={category.name}
                unoptimized
                className='group-hover:scale-125 transition-all pb-5 cursor-pointer'
              />
            )}
            <p className='text-amber-500 font-bold capitalize'>{category.name.trim()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
