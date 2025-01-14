"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import AssuranceBanner from "./AssuranceBanner";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const initValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
const initState = { isSubmit: false, values: initValues };
const ContactInfo = () => {
  const [state, setState] = useState(initState);

  const { values, isSubmit } = state;

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      isSubmit: true,
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isSubmit: false,
      })); //to set isSubmit state back to false after submission
      setState(initState); // to reset the form after submission
      toast.success("Message sent successfully");
    }, 2000);
  };
  return (
    <div className="w-full flex-col flex-center">
      <div className="container mt-6 flex flex-col flex-center">
        <header className="text-center mb-6">
          <h2 className="capitalize text-2xl font-bold">
            get in touch with us
          </h2>
          <p className="text-gray-300 text-sm">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </header>
        <div className="flex justify-around w-full max-sm:flex-col max-sm:flex-center max-sm:gap-6 mb-8">
          <section className="space-y-4">
            <div className="flex items-start gap-6">
              <Image
                src={"/icons/Address.svg"}
                alt="address"
                width={10}
                height={10}
              />
              <div>
                <h3 className="text-xl font-semibold">Address</h3>
                <address>
                  University of Ibadan, Ibadan <br />
                  Oyo State, <br />
                  Nigeria.
                </address>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <Image
                src={"/icons/Phone.svg"}
                alt="telephone"
                width={10}
                height={10}
              />
              <div>
                <h3 className="text-xl font-semibold">Phone</h3>
                <div>
                  Mobile: +(84) 564-6789 <br />
                  Hotline: +(84) 456-6789 <br />
                </div>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <Image
                src={"/icons/clock.svg"}
                alt="time"
                width={10}
                height={10}
              />
              <div>
                <h3 className="text-xl font-semibold">Working Time</h3>
                <div>
                  Monday-Friday: 9:00 - 22:00 <br />
                  Saturday-Sunday: 9:00 - 21:00 <br />
                </div>
              </div>
            </div>
          </section>
          <section>
            <form
              action=""
              className="max-sm:w-72 w-96 space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold">
                  Your name
                </label>
                <input
                  type="text"
                  required
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md h-10"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md h-10"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-semibold">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  id="subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md h-10"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-semibold">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder=""
                  required
                  value={values.message}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full h-20"
                ></textarea>
              </div>
              {!isSubmit ? (
                <Button className="text-white" disabled={isSubmit}>
                  Submit
                </Button>
              ) : (
                <Button className="text-white" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              )}
            </form>
          </section>
        </div>
      </div>
      <AssuranceBanner />
    </div>
  );
};

export default ContactInfo;
