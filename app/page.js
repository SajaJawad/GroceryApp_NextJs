import Slider from "./_components/Slider";
import Api from "./_utils/Api";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Image from "next/image";
import Footer from "./_components/Footer";
export default async function Home() {
  const sliderList = await Api.getSlider()
  const categoryList = await Api.getCategoryList();
  const productList = await Api.getProductList();
  

  return (
    <div className="p-10 px-16">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList}/>
      <Image src={"/footerImg.png"} width={1000} height={300} alt="banner" unoptimized className="mt-8 w-full h-auto" />
      <Footer/>
    </div>
  );
}
