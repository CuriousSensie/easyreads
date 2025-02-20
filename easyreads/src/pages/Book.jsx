import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Fallback from "../../public/fallback-image.jpg";

const apiurl = "https://easyreads-server.vercel.app";

const Book = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Set to true initially

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${apiurl}/api/books/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const bookData = await response.json();
        setData(bookData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    getData();
  }, [id]); // Add id as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error: Book not found</div>;
  }

  return (
    <div className="flex flex-row w-full h-full">
      {/* Left */}
      <div className="w-1/3 mt-10">
        <img
          className="w-3/4 flex mx-auto"
          src={data.image ? `${apiurl}/${data.image}` : Fallback} // Check if image exists
          alt={data?.title}
        />
        <div className="flex flex-row justify-center mt-4">
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
        </div>
      </div>

      {/* Right */}
      <div className="w-2/3 h-full flex flex-col mt-10">
        <h1 className="font-bold text-2xl mb-2">{data?.title}</h1>
        <h2 className="font-semibold text-xl mb-2">By {data?.author}</h2>
        <p className="font-medium mb-2">{data?.description}</p>

        <div className="flex flex-row justify-between gap-4 px-4">
          <Link className="mx-auto w-full" to={`/read/${data._id}`}>
            <Button className="w-full">Read</Button>
          </Link>
          <Link className="mx-auto w-full" to={`/library/${data._id}`}>
            <Button className="w-full">Add to Library</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
