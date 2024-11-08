declare interface product {
  name: string;
  _id: string;
  slug: string;
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
