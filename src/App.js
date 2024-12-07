import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Components/Pages/Home/Home";
import { BookList } from "./Components/Pages/BookList/BookList";
import { Layout } from "./Components/app/Layout";
import { BookUpdate } from "./Components/Pages/BookUpdate/BookUpdate";
import { BookCreate } from "./Components/Pages/BookUpdate/BookCreate";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/book-list"
          element={
            <Layout>
              <BookList />
            </Layout>
          }
        />
        <Route
          path="/book-update/:id"
          element={
            <Layout>
              <BookUpdate />
            </Layout>
          }
        />
        <Route
          path="/book-create"
          element={
            <Layout>
              <BookCreate />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
