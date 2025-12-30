
import React from 'react'
import Api from '@/app/_utils/Api'
import TopCategoryList from '@/app/_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList'

const ProductCategory = async ({ params }) => {
  const { categoryName } = await params;
  console.log("CATEGORY FROM URL:", categoryName);
  
  const productList = await Api.getProductByCategory(decodeURIComponent(categoryName))
  const categoryList = await Api.getCategoryList();



  return (
    <div className='p-4'>
      <h2 className='bg-[#ffcc00] text-black font-bold p-4 text-center text-2xl capitalize'>
        {decodeURIComponent(categoryName)}
      </h2>
      <TopCategoryList categoryList={categoryList} selectedCategory={decodeURIComponent(categoryName)}/>
      <ProductList productList={productList} />


    </div>
  )
}

export default ProductCategory


