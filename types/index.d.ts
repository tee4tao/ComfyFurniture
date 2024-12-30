declare interface product {
  name: string;
  _id: string;
  slug: { current: string; _type: string };
  price: number;
  details: string;
  imageUrl: string;
}
declare interface SignUpParams {
  email: string;
  password: string;
  confirmPassword?: string;
}
declare interface signInProps {
  email: string;
  password: string;
}
declare interface createCartProps {
  id: string;
  name: string;
  details: string;
  quantity: number;
  imageUrl: string;
  price: number;
  itemId?: string;
}
