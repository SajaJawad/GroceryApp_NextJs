import Slider from "./_components/Slider";
import Api from "./_utils/Api";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
export default async function Home() {
  const sliderList = await Api.getSlider()
  const categoryList = await Api.getCategoryList();
  const productList = await Api.getProductList();
  

  return (
    <div className="p-10 px-16">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList}/>
    </div>
  );
}
