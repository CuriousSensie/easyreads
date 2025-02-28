import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const apiurl = import.meta.env.VITE_BACKEND_URL;

function AddBook() {
  const [status, setStatus] = useState(0); // 0 => message, 1 => details, 2 => image, 3 => epub, 4 => pdf
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: null,
    epub: null,
    pdf: null,
    genre: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("description", formData.description);
    formData.genre.forEach((g) => data.append("genre", g));

    if (formData.image) data.append("image", formData.image);
    if (formData.epub) data.append("epub", formData.epub);
    if (formData.pdf) data.append("pdf", formData.pdf);

    try {
      const response = await fetch(`${apiurl}/api/books/create`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Book added successfully!");
        setFormData({
          title: "",
          author: "",
          description: "",
          image: null,
          epub: null,
          pdf: null,
          genre: [],
        });
        setStatus(0); // Reset form after successful submission
      } else {
        throw new Error(result.message || "Something went wrong!");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mt-3 h-5/6 m-auto rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Book</h2>

      {message && (
        <p className={`text-center text-sm mb-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}

      <div className="h-5/6 w-3/4 md:w-2/4 mx-auto flex flex-col justify-center">
        {status === 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-lg">
              Thank you for helping us build a free and accessible online library! If you have a <strong>PDF</strong> or <strong>EPUB (PREFERRED)</strong> version of a
              book, you can upload it here to share with fellow readers.
              Your contribution makes knowledge more accessible worldwide. Together, we can create a vast, open-source
              collection of books for everyone to enjoy.
              <br />
              Simply fill in the details, upload the file, and let’s grow this library together!
              <br />
              <span className="text-sm text-gray-600">(Please ensure you have the right to share the file before uploading.)</span>
            </p>
            <Button type="button" onClick={() => setStatus(status + 1)} className="mx-auto">
              Start
            </Button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {status === 1 && (
            <div className="flex flex-col gap-4">
              <Label>
                Title
                <Input type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Label>
              <Label>
                Author
                <Input type="text" name="author" value={formData.author} onChange={handleChange} required />
              </Label>
              <Label>
                Description
                <Textarea name="description" value={formData.description} onChange={handleChange} required />
              </Label>

              <div className="flex justify-between">
                <Button type="button" onClick={() => setStatus(status - 1)}>Back</Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (formData.title && formData.author && formData.description) {
                      setStatus(status + 1);
                      setMessage("");
                    } else {
                      setMessage("Error: Please fill in all fields.");
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {
            status === 2 && (
              <div className="flex flex-col gap-4">
                <Label>
                  Genre
                  <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {[
                      { label: "Classic", value: "Classic" },
                      { label: "Trending", value: "Trending" },
                      { label: "Romance", value: "Romance" },
                      { label: "Science Fiction", value: "Science Fiction" },
                      { label: "Fantasy", value: "Fantasy" },
                      { label: "Mystery", value: "Mystery" },
                      { label: "Thriller", value: "Thriller" },
                      { label: "Horror", value: "Horror" },
                      { label: "Historical Fiction", value: "istorical Fiction" },
                      { label: "Non-Fiction", value: "Non Fiction" },
                      { label: "Biography", value: "Biography" },
                      { label: "Self-Help", value: "Self Help" },
                      { label: "Poetry", value: "Poetry" },
                      { label: "Young Adult", value: "Young Adult" },
                      { label: "Children's", value: "Childrens" },
                      { label: "Graphic Novel", value: "Graphic Novel" },
                      { label: "Dystopian", value: "Dystopian" },
                      { label: "Adventure", value: "Adventure" },
                      { label: "Philosophy", value: "Philosophy" }
                    ].map((genre) => (
                      <div key={genre.value} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={genre.value}
                          value={genre.value}
                          checked={formData.genre.includes(genre.value)}
                          onChange={(e) => {
                            console.log(formData.genre);

                            const selectedGenres = [...formData.genre];
                            if (e.target.checked) {
                              selectedGenres.push(genre.value);
                            } else {
                              selectedGenres.splice(selectedGenres.indexOf(genre.value), 1);
                            }
                            setFormData({ ...formData, genre: selectedGenres });
                          }}
                          className="w-4 h-4"
                        />
                        <label htmlFor={genre.value}>{genre.label}</label>
                      </div>
                    ))}
                  </div>
                </Label>


                <div className="flex justify-between">
                  <Button type="button" onClick={() => setStatus(status - 1)}>
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      if (formData.title && formData.author && formData.description) {
                        setStatus(status + 1);
                        setMessage("");
                      } else {
                        setMessage("Error: Please fill in all fields.");
                      }
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )
          }


          {status === 3 && (
            <div className="flex flex-col gap-4">
              <Label>
                Image
                <Input accept="" type="file" name="image" onChange={handleFileChange} required />
              </Label>

              <div className="flex justify-between">
                <Button type="button" accept="image/png, image/jpeg" onClick={() => setStatus(status - 1)}>Back</Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (formData.image) {
                      setStatus(status + 1);
                      setMessage("");
                    } else {
                      setMessage("Error: Please upload an image.");
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {status === 4 && (
            <div className="flex flex-col gap-4">
              <Label>
                EPUB <span className="text-sm text-gray-600">(Preferred)</span>
                <Input type="file" name="epub" onChange={handleFileChange} required />
              </Label>

              <div className="flex justify-between">
                <Button type="button" accept="application/pdf" onClick={() => setStatus(status - 1)}>Back</Button>
                <Button
                  type="button"
                  onClick={() => {
                    setStatus(status + 1);
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {status === 5 && (
            <div className="flex flex-col gap-4">
              <Label>
                PDF
                <Input type="file" name="pdf" onChange={handleFileChange} />
              </Label>
              <div className="flex justify-between">
                <Button type="button" accept=".epub" onClick={() => setStatus(status - 1)}>Back</Button>
                <Button onClick={() => {
                  if (formData.pdf || formData.epub) {
                    setMessage("");
                    ing(true);
                    handleSubmit();
                  } else {
                    setMessage("Error: Please upload at least one file.");
                  }
                }} type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Book"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddBook;
