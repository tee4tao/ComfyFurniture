import { footer } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full flex flex-col items-center  border-t border-t-gray-300 mt-8 p-2 pt-8 md:p-6 ">
      <div className="m-auto block md:flex w-full justify-between  border-b border-b-gray-300 pb-10 text-center lg:px-12">
        <div className="flex flex-col md:gap-2 md:justify-between justify-around  lg:mt-0 w-[90%] md:w-[10%] m-auto">
          {footer.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4">
                {data?.img && (
                  <Link href="/">
                    <div className="flex items-center">
                      <Image
                        src={data.img}
                        alt="ComfyFurniture Logo"
                        className=""
                        width={30}
                        height={30}
                      />
                      <h2 className="text-xl font-bold">{data.title}</h2>
                    </div>
                  </Link>
                )}
              </div>
              {data.img && <p className="text-gray-600">{data.address}</p>}
            </div>
          ))}
        </div>

        <div className="m-auto mt-[2%] md:mt-[0%] block  w-[90%] md:w-[70%] md:grid md:grid-cols-4 justify-between  lg:gap-x-[17%] text-left md:text-left text-[12px]">
          {footer.map((data) => (
            <div key={data.id} className="flex flex-col mt-8 md:mt-0 ">
              {data.title !== "ComfyFurniture" && (
                <>
                  <h1 className="mb-2 text-gray-600">{data.title}</h1>
                  {data.text?.map((value) => (
                    <Link
                      key={value.id}
                      type="button"
                      className="md:mt-4"
                      href={value.to}
                    >
                      <p className="mb-2 font-bold">{value.name}</p>
                    </Link>
                  ))}
                </>
              )}
            </div>
          ))}
          <div className="flex flex-col mt-8 md:mt-0 ">
            <h1 className="mb-2 text-gray-600">Newsletter</h1>

            <form action="" className="align-baseline space-y-2 space-x-2">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="outline-0 border-b  font-semibold"
              />
              <button className="border-b-2 text-sm font-bold">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="relative py-10 w-full text-[12px] bg-white">
        <h1 className="  m-auto  w-[50%]  text-center">
          © All Rights Reserved. {year}, ComfyFurniture.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
