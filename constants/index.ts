import { delay } from "framer-motion";

export const pageLinks = [
  {
    page: "Home",
    url: "/",
    delay: 1.0,
  },
  {
    page: "Shop",
    url: "/shop",
    delay: 1.1,
  },
  {
    page: "About",
    url: "/about",
    delay: 1.2,
  },
  {
    page: "Contact",
    url: "/contact",
    delay: 1.3,
  },
];

export const iconLinks = [
  {
    icon: "../icons/mdi_account-alert-outline.svg",
    url: "/user",
    delay: 1.4,
  },
  {
    icon: "../icons/akar-icons_heart.svg",
    url: "/saved-items",
    delay: 1.5,
  },
  {
    icon: "../icons/ant-design_shopping-cart-outlined.svg",
    url: "/cart",
    delay: 1.6,
  },
];

export const rangeInfo = [
  {
    title: "Dining",
    image: "/images/Dining.png",
  },
  {
    title: "Living",
    image: "/images/Living.png",
  },
  {
    title: "Bedroom",
    image: "/images/Bedroom.png",
  },
];

export const setupImages = [
  "/images/Rectangle 36.png",
  "/images/Rectangle 37.png",
  "/images/Rectangle 38.png",
  "/images/Rectangle 39.png",
  "/images/Rectangle 40.png",
  "/images/Rectangle 41.png",
  "/images/Rectangle 43.png",
  "/images/Rectangle 44.png",
  "/images/Rectangle 45.png",
];

export const help = [
  {
    page: "Payment Options",
    url: "/",
  },
  {
    page: "Returns",
    url: "/",
  },
  {
    page: "Privacy Policies",
    url: "/",
  },
];

export const footer = [
  {
    id: 1,
    title: "ComfyFurniture",
    img: "../icons/logo.svg",
    address: "University of Ibadan, Ibadan, Oyo State, Nigeria.",
  },
  {
    id: 2,
    title: "Links",
    text: [
      { id: 1, name: "Home", to: "/" },
      { id: 2, name: "Shop", to: "/shop" },
      { id: 3, name: "About", to: "/about" },
      { id: 4, name: "Contact", to: "/contact" },
    ],
  },
  {
    id: 3,
    title: "Help",
    text: [
      { id: 1, name: "Payment Options", to: "/" },
      { id: 2, name: "Return", to: "/" },
      { id: 3, name: "Privacy Policies", to: "/" },
    ],
  },
];

export const cartBanner = [
  {
    icon: "../icons/Vector-cart.svg",
    title: "High Quality",
    details: "Crafted from top materials",
  },
  {
    icon: "../icons/Vector (1).svg",
    title: "Warrantly Protection",
    details: "Over 2 years",
  },
  {
    icon: "../icons/Vector (2).svg",
    title: "Free Shipping",
    details: "Order over 150 $",
  },
  {
    icon: "../icons/Vector (3).svg",
    title: "24/7 Support",
    details: "Dedicated support",
  },
];
