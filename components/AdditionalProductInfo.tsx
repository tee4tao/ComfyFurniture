import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const AdditionalProductInfo = ({
  stars,
  color,
}: {
  stars: unknown[];
  color: { orange: string; grey: string };
}) => {
  const [description, setDescription] = useState(true);
  const [additionalInfo, setAdditionalInfo] = useState(false);
  const [reviews, setReviews] = useState(false);
  const usersReviews = [
    {
      ratings: 4,
      title: "Looks cool",
      description: "Blended with my room set-up and colour.",
      author: "John Doe",
    },
    {
      ratings: 2,
      title: "Not Satisfied",
      description: "The quality is not good enough!!!",
      author: "Smilga Doe",
    },
    {
      ratings: 5,
      title: "Aesthetic",
      description: "What a beautiful piece of work",
      author: "William Bananas",
    },
    {
      ratings: 4,
      title: "A Masterpiece",
      description: "I love it!",
      author: "Mr Martini",
    },
    {
      ratings: 5,
      title: "Satisfied",
      description: "Same as described on the website.",
      author: "Lexus Porche",
    },
  ];
  return (
    <article className="w-full flex flex-col items-center  border-t border-t-gray-300 mt-8 p-2 pt-8 md:p-6 ">
      <div className="container flex flex-col flex-center">
        <div className="flex space-x-20 text-gray-300 mb-4 max-sm:space-x-10">
          <button
            onClick={() => {
              setDescription(true);
              setAdditionalInfo(false);
              setReviews(false);
            }}
            className={`${description === true && "text-black font-bold"}`}
          >
            Description
          </button>
          <button
            onClick={() => {
              setAdditionalInfo(true);
              setDescription(false);
              setReviews(false);
            }}
            className={`${additionalInfo === true && "text-black font-bold"}`}
          >
            Additional Information
          </button>
          <button
            onClick={() => {
              setReviews(true);
              setAdditionalInfo(false);
              setDescription(false);
            }}
            className={`${reviews === true && "text-black font-bold"}`}
          >
            Review[{usersReviews.length}]
          </button>
        </div>
        {description && (
          <div className="text-gray-300 flex flex-col flex-center">
            <div className="mb-4">
              <p className="mb-2">
                Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
                portable active stereo speaker takes the unmistakable look and
                sound of Marshall, unplugs the chords, and takes the show on the
                road.
              </p>
              <p>
                Weighing in under 7 pounds, the Kilburn is a lightweight piece
                of vintage styled engineering. Setting the bar as one of the
                loudest speakers in its class, the Kilburn is a compact,
                stout-hearted hero with a well-balanced audio which boasts a
                clear midrange and extended highs for a sound that is both
                articulate and pronounced. The analogue knobs allow you to fine
                tune the controls to your personal preferences while the
                guitar-influenced leather strap enables easy and stylish travel.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src={"/images/Group 107.png"}
                alt="Product description image"
                width={300}
                height={250}
                className="w-40 md:w-60 lg:w-96"
              />
              <Image
                src={"/images/Group 107.png"}
                alt="Product description image"
                width={300}
                height={250}
                className="w-40 md:w-60 lg:w-96"
              />
            </div>
          </div>
        )}
        {additionalInfo && (
          <div className="text-gray-300">
            <p className="mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              facilis magni alias, laborum corporis molestias aut eum dolor
              aliquid maxime dolore ratione natus quidem a totam repellat
              aspernatur molestiae eos et obcaecati esse. Unde odit delectus
              obcaecati vitae et laudantium blanditiis tenetur quos quis
              explicabo at, dolorem maiores enim sit!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
              maxime delectus, expedita rem odio quo veniam? Eaque consectetur,
              cupiditate sunt nisi voluptate ad quae a atque ut facere dolor
              neque. Rem nostrum cum magni nobis sint eum natus error nemo,
              autem labore quas minus illum quaerat earum quae maxime amet enim
              delectus libero quam in nam distinctio fuga a. Adipisci inventore
              harum laboriosam praesentium itaque voluptate, ipsum minus, enim
              eveniet, nesciunt iste excepturi expedita incidunt assumenda cum
              animi nisi recusandae. Laudantium vitae fugit iste quibusdam
              earum! Fugiat accusantium cum alias eius natus, repudiandae
              libero? Hic cupiditate eum omnis rem, impedit fugit modi tenetur
              voluptate quam officia autem quibusdam quos totam magnam libero
              aliquam, inventore dolorem dolores, eligendi enim nesciunt
              veritatis atque aperiam deleniti? Voluptas adipisci a tempora.
              Distinctio cum, culpa consequuntur hic odit veniam laudantium
              reprehenderit? Est accusantium eveniet, nihil dolorem voluptates
              quam? Sapiente culpa minima repudiandae autem, perspiciatis
              blanditiis.
            </p>
          </div>
        )}
        {reviews &&
          usersReviews.map((review, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start mb-8 shadow-md w-full p-2 space-y-4"
              >
                <div className="flex gap-2">
                  {stars.map((_, index) => {
                    return (
                      <div key={index}>
                        <FaStar
                          size={18}
                          color={
                            review.ratings > index ? color.orange : color.grey
                          }
                        />
                      </div>
                    );
                  })}
                </div>
                <h3 className="font-semibold text-lg">{review.title}</h3>
                <p>{review.description}</p>
                <p className="text-gray-300 flex gap-8">
                  by {review.author}
                  <span className="text-green-500 flex items-center gap-1 text-sm">
                    <IoMdCheckmarkCircleOutline /> Verified Buyer
                  </span>
                </p>
              </div>
            );
          })}
      </div>
    </article>
  );
};

export default AdditionalProductInfo;
