import { getFeaturedProducts, getProducts } from "@/lib/firestore/products/read_server";
import Header from "./components/Header";
import FeaturedProductSlider from "./components/Sliders";
import { getCollections } from "@/lib/firestore/collections/read_server";
import { getCategories } from "@/lib/firestore/categories/read_server";
import { getBrands } from "@/lib/firestore/brands/read_server";

export default async function Home() {
  const [featuredProducts, collections, categories, products, brands] =
    await Promise.all([
      getFeaturedProducts(),
      getCollections(),
      getCategories(),
      getProducts(),
      getBrands(),
    ]);

  return (
    <main className="w-screen h-screen overflow-x-hidden overflow-y-auto">
      <Header />
      <FeaturedProductSlider featuredProducts={featuredProducts} />
    </main>
  );
}
