import React, { useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const BookCreate = () => {
  const navigate = useNavigate();
  const handleGoBooklist = () => {
    navigate("/book-list");
  };
  const [formData, setFormData] = useState({
    bookname: "",
    author: "",
    price: 0,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/add-book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save book");
      }

      // Optionally navigate back or show a success message
      console.log("Book saved successfully!");
      navigate("/book-list");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1
        className="inline-flex gap-1 px-12 py-10 cursor-pointer"
        onClick={handleGoBooklist}
      >
        <IoIosArrowDropleft className="" size={24} /> Go Back
      </h1>
      <div className=" ">
        <div className="max-w-md  bg-white rounded-lg overflow-hidden md:max-w-xl">
          <div className="md:flex">
            <div className="w-full ">
              <form className="px-12">
                <div className="flex mb-6 gap-10">
                  <div className="w-1/2">
                    <label
                      className="block text-gray-800 font-semibold mb-2"
                      htmlFor="title"
                    >
                      Book Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="bookname"
                      name="bookname"
                      type="text"
                      value={formData.bookname}
                      onChange={handleChange}
                      placeholder="Book Title"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      className="block text-gray-800 font-semibold mb-2"
                      htmlFor="author"
                    >
                      Author Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="author"
                      name="author"
                      type="text"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Author Name"
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="flex mb-6 gap-10">
               
                  <div className="w-1/2">
                    <label
                      className="block text-gray-800 font-semibold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Price"
                    />
                  </div>
                </div>

                {/* Third Row */}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end px-14 gap-5">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-normal py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="button"
        >
          Cancel
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-normal py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
