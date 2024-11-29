"use client";

type Props = {
  error: {
    message: string;
    error: string;
  };
};
const error = (error: Props) => {
  return <div>{error.error.message}</div>;
};

export default error;
