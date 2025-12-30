import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function TopCategoryList({ categoryList, selectedCategory }) {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 justify-items-center items-center mt-5'>
            {categoryList?.map((category, index) => (
                <Link
                    href={"/products-category/" + encodeURIComponent(category.name.trim())}
                    key={index}
                    className={`w-30 h-35 mt-3 p-3 flex flex-col items-center text-center group ${selectedCategory?.toLowerCase() === category.name.trim().toLowerCase()
                            ? "bg-[#ffcc00] text-white"
                            : "bg-amber-100"
                        }`}
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
                    <small className={`${selectedCategory?.toLowerCase() === category.name.trim().toLowerCase()
                            ? " text-black"
                            : "text-amber-500"
                        } font-bold capitalize`}>{category.name.trim()}</small>
                </Link>
            ))
            }
        </div >
    )
}

export default TopCategoryList