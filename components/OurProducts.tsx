import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

const OurProducts = ({ data }: { data: product[] }) => {
  return (
    <section className="container flex flex-col items-center px-2">
      <h2 className="text-2xl font-bold text-center mb-4">Our Products</h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {data.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>

      <Button className="mt-4 bg-transparent text-primary rounded-none border-2 hover:text-white font-bold text-base">
        Show More
      </Button>
    </section>
  );
};

export default OurProducts;
