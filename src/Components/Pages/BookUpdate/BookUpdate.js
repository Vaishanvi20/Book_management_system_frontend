import React, { useState, useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

export const BookUpdate = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState({
    bookname: "",
    year: "",
    price: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-book/${id}`);
        const data = await response.json();
        setBook(data); // Set fetched data to state
      } catch (error) {
        console.error("Failed to fetch book", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleGoBooklist = () => {
    navigate("/book-list");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/update-book/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        navigate("/book-list"); // Redirect after successful update
      }
    } catch (error) {
      console.error("Failed to update book", error);
    }
  };

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container ">
      <h1
        className="inline-flex gap-1 px-12 py-10 cursor-pointer"
        onClick={handleGoBooklist}
      >
        <IoIosArrowDropleft className="" size={24} /> Go Back
      </h1>
      <div className="max-w-md bg-white rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full">
            <form onSubmit={handleSubmit} className="px-12">
              {/* First Row */}
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
                    type="text"
                    name="bookname"
                    value={book.bookname}
                    onChange={handleChange}
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
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
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
                    type="text"
                    name="price"
                    value={book.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
