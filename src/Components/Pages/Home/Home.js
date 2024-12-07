import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate()
    const handleGoBooklist =()=>{
        navigate('/book-list')
    }
  return (
    <div>
      <div class="flex h-screen justify-center items-center dark:bg-slate-800">
        <div class="mx-auto mt-10 flex justify-center px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
          <div class="text-center ">
            <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200 sm:text-5xl md:text-6xl">
              <span class="block xl:inline">
                <span class="mb-1 block">Welcome</span>
                <span class="bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent">
                  Book Management System
                </span>
              </span>
            </h1>
            <p class="mx-auto mt-3 max-w-xl text-lg text-gray-500 dark:text-slate-400 sm:mt-5 md:mt-5">
              "Streamline your library with our Book Management System—easily
              Create, Read, Update, and Delete books, all from one convenient
              dashboard."
            </p>
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
              <div class="rounded-md shadow cursor-pointer" onClick={handleGoBooklist}>
                <a
                  class="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg"
                  
                >
                  Get started 🚀
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
