import { ProductItem } from "./types/productinterface";
import ProductCard from "./_componants/productCard/productCard";
import Mainslider from "./_componants/Mainslider/Mainslider";
import CategorySlider from "./_componants/CategorySlider/CategorySlider";

export const revalidate = 0;

export default async function Home() {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
      method: 'GET',
      cache: 'no-store' 
    });

    if (!response.ok) {
       return <div className="p-10 text-center text-red-500 font-bold">السيرفر واقع حالياً، جرب كمان شوية</div>;
    }

    const resData = await response.json();
    const allProducts = resData.data;

    if (!allProducts || allProducts.length === 0) {
      return <div className="p-10 text-center text-gray-500">مفيش منتجات نعرضها حالياً</div>;
    }

    return (
      <main className="min-h-screen pb-10">

        <Mainslider/>
        
        <div className="container mx-auto px-4 mt-8">
          <CategorySlider/>

          <h2 className="text-green-600 font-bold text-3xl my-8 border-l-4 border-green-600 pl-4">
            Our Products
          </h2>


          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {allProducts?.map((prod: any) => (
              <ProductCard key={prod._id} prod={prod} />
            ))}
          </div>
        </div>
      </main>
    );

  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700">تأكد من اتصالك بالإنترنت.</p>
          <button onClick={() => window.location.reload()} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }
}