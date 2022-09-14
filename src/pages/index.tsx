import { Transition } from "@headlessui/react";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useState } from "react";
import {
  Fa500Px,
  FaArrowAltCircleDown,
  FaDiscord,
  FaOctopusDeploy,
  FaSignOutAlt,
} from "react-icons/fa";

import LoadingSVG from "../assets/puff.svg";

const Home: NextPage = () => {
  const { data: session, status: loadingStatus } = useSession();
  const [showButtonBlock, setShowButtonBlock] = useState(true);
  const [showForm, setShowForm] = useState(false);

  if (loadingStatus === "loading") {
    return (
      <div className="min-h-screen flex animate-fade-in-delay justify-center p-8">
        <Image src={LoadingSVG} alt="loading..." width={200} height={200} />
      </div>
    );
  }

  if (!session?.user)
    return (
      <div className="min-h-screen flex grow flex-col items-center justify-center">
        <div className="text-2xl font-bold">Please log in below</div>
        <div className="p-4 flex flex-col gap-4">
          <button
            onClick={() => signIn("discord")}
            className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 text-2xl text-black"
          >
            <span>Sign in with Discord</span>
            <FaDiscord />
          </button>
        </div>
      </div>
    );

  return (
    <>
      <Head>
        <title>Hi</title>
      </Head>

      <nav className="w-full absolute flex border p-4">
        <div className="ml-auto flex gap-4">
          {session.user.image ? (
            <div className="rounded-3xl">
              <Image
                src={session.user.image}
                className="rounded-full"
                width={50}
                height={50}
                alt="User image"
              />
            </div>
          ) : (
            <div className="bg-gray-600 w-[50px] h-[50px] flex items-center text-blue-200 justify-center rounded-full">
              <FaOctopusDeploy className="w-[30px] h-[30px]" />
            </div>
          )}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 rounded bg-gray-600 px-4 py-2 text-2xl text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <FaSignOutAlt />
          </button>
          <button
            onClick={() => {
              setShowForm((prev) => !prev);
              setShowButtonBlock((prev) => !prev);
            }}
            className="flex items-center gap-2 rounded bg-gray-600 px-4 py-2 text-2xl text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <Fa500Px />
          </button>
        </div>
      </nav>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="h-full">
          <Transition
            as={Fragment}
            show={showButtonBlock}
            appear={true}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
            afterLeave={() => setShowForm(!showForm)}
          >
            <div className="flex flex-col text-center gap-4">
              <span className="text-2xl font-bold">
                Привет, {session.user.name}
              </span>
              <span className="text-2xl font-bold">Пройди опрос:)</span>
              <button
                onClick={() => setShowButtonBlock(!showButtonBlock)}
                className="flex gap-4 items-center justify-center px-4 py-2 bg-gray-400 rounded-xl text-slate-600 hover:text-xl hover:scale-110 hover:text-white hover:bg-gray-600 transition-all"
              >
                <span className="text-lg">Вот тут</span>
                <FaArrowAltCircleDown />
              </button>
            </div>
          </Transition>
          <Transition
            as={Fragment}
            show={showForm}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 scale-50 translate-y-50% duration-[1000ms]"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-gray-700">Full name</span>
                  <input
                    type="text"
                    className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    placeholder=""
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email address</span>
                  <input
                    type="email"
                    className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    placeholder="john@example.com"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">When is your event?</span>
                  <input
                    type="date"
                    className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">
                    What type of event is it?
                  </span>
                  <select
                    className="
                    block
                    w-full
                    mt-1
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                  >
                    <option>Corporate event</option>
                    <option>Wedding</option>
                    <option>Birthday</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-gray-700">Additional details</span>
                  <textarea
                    className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    rows={3}
                  ></textarea>
                </label>
                <div className="block">
                  <div className="mt-2">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="
                          rounded
                          bg-gray-200
                          border-transparent
                          focus:border-transparent focus:bg-gray-200
                          text-gray-700
                          focus:ring-1 focus:ring-offset-2 focus:ring-gray-500
                        "
                        />
                        <span className="ml-2">
                          Email me news and special offers
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </main>
    </>
  );
};

export default Home;
