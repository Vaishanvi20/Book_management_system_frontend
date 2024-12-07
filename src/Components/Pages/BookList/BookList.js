import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import DeleteModal from "../Modal/DeleteModal";
import axios from "axios";

export const BookList = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState(null); // Store the book ID to delete
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.ceil(totalValue / pageSize) - 1;
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;

  const totalItems = totalValue;
  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    setPageSize(size);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const navigate = useNavigate();
  const handleGoBookUpdate = (id) => {
    navigate(`/book-update/${id}`);
  };

  const handleGoBookCreate = () => {
    navigate("/book-create");
  };
  const handleDelete = (id) => {
    setBookIdToDelete(id);
    setOpen(true);
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-booklist");
      const data = await response.json();
      setBooks(data || []); // Assuming the response is an array of books
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-book/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Book deleted successfully");
        setOpen(false);
        fetchBooks()
      } else {
        throw new Error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
      alert("Failed to delete the book");
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="font-normal text-lg sm:text-xl inline-flex gap-2 py-4 px-5">
        <FaListUl className="mt-1" color="blue" size={20} /> Book List
      </h1>

      <div className="flex  justify-end items-center">
        <button
          className="px-2 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white inline-flex gap-2 mb-4 sm:mb-0 sm:ml-10"
          onClick={handleGoBookCreate}
        >
          Add Book <FiPlusCircle className="mt-1" size={20} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book ID
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book Name
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price of the book
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id}>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  {book.id}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  {book.bookname}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  {book.author}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  {book.price}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleGoBookUpdate(book.id)}
                    className="px-2 sm:px-4 py-2 font-medium text-blue-600 rounded-md transition duration-150 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 px-2 sm:px-4 py-2 font-medium text-red-600 rounded-md transition duration-150 ease-in-out"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <label htmlFor="pageSize">Rows per page:</label>
          <select
            id="pageSize"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="text-sm text-gray-400 flex items-center gap-4">
          {`${startIndex}-${endIndex} of ${totalItems} items`}
          <IoIosArrowBack
            className={`cursor-pointer ${
              currentPage === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={goToPreviousPage}
          />
          <IoIosArrowForward
            className={`cursor-pointer ${
              currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={goToNextPage}
          />
        </div>
      </div> */}
      <DeleteModal
        open={open}
        setOpen={setOpen}
        bookId={bookIdToDelete}
        onDelete={handleDeleteBook}
      />
    </div>
  );
};
