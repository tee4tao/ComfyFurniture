"use client";

type Props = {
  error: {
    message: string;
    error: string;
  };
};
const error = (error: Props) => {
  return <div className="mb-8">{error.error.message}</div>;
};

export default error;
