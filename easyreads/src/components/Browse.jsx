import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FaSearch } from 'react-icons/fa';
import BookItem from './BookItem'; // Assuming you have a BookItem component

function Browse({ allBooks }) {
    // State for search query and filtered books
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Effect to set books when `allBooks` is available
    useEffect(() => {
        if (allBooks && allBooks.length > 0) {
            setFilteredBooks(allBooks);
            setLoading(false);
        }
    }, [allBooks]);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter books based on updated search query
        const filtered = allBooks.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) || book.genre.some((g) => g.toLowerCase().includes(query.toLowerCase())) 

        );
        setFilteredBooks(filtered);
    };

    return (
        <div className="flex flex-col items-center w-full p-4" style={{height : 'calc(100vh - 3rem)'}}>
            {/* Search Input */}
            <div className="flex flex-row rounded-lg gap-2 p-2 w-1/2 sticky">
                <Input
                    className="flex-grow h-10 border-none outline-none text-lg"
                    type="text"
                    value={searchQuery}
                    placeholder="Search Books"
                    onChange={handleInputChange}
                />
                <Button className="h-10 w-10 border-none" variant="outline" size="icon">
                    <FaSearch />
                </Button>
            </div>

            <div className="w-full max-w-4xl mt-4 overflow-y-auto max-h-[70vh] p-2">
                {loading ? (
                    <p className="text-gray-600 text-center">Loading books...</p>
                ) : filteredBooks.length > 0 ? (
                    <div className="flex flex-row flex-wrap gap-4 justify-center">
                        {filteredBooks.map((book) => (
                            <BookItem key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">No books found.</p>
                )}
            </div>
        </div>
    );
}

export default Browse;
