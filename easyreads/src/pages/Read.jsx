import React, { useEffect, useState, useRef } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import useLocalStorageState from 'use-local-storage-state';
import { useTheme } from '@/components/theme-provider';
import { useParams } from 'react-router-dom';

const apiurl = import.meta.env.VITE_BACKEND_URL;

function updateTheme(rendition, theme) {
    if (!rendition) return;
    switch (theme) {
        case 'dark':
            rendition.themes.override('color', '#fff');
            rendition.themes.override('background', '#000');
            break;
        case 'light':
            rendition.themes.override('color', '#000');
            rendition.themes.override('background', '#fff');
            break;
        default:
            break;
    }
}

const Read = () => {
    const { theme } = useTheme();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [location, setLocation] = useLocalStorageState('reader-location', { defaultValue: 0 });
    const rendition = useRef(null);
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState("Loading book data...");
    const [epubError, setEpubError] = useState(null);
    const [readerKey, setReaderKey] = useState(Date.now());
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const pdfViewerRef = useRef(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoadingMessage("Fetching book information...");
                const response = await fetch(`${apiurl}/api/books/${id}`);
                if (!response.ok) throw new Error("Network response was not ok");

                const bookData = await response.json();
                setData(bookData);

                if (bookData.epub) {
                    setFileType("epub");
                    setFileUrl(bookData.epub);
                } else if (bookData.pdf) {
                    setFileType("pdf");
                    setFileUrl(bookData.pdf);
                } else {
                    setFileType(null);
                    setFileUrl(null);
                }
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setEpubError("Failed to load book data: " + error.message);
                setLoading(false);
            }
        };

        getData();
    }, [id]);

    useEffect(() => {
        if (rendition.current) {
            updateTheme(rendition.current, theme);
        }
    }, [theme]);

    const handlePrevPage = () => {
        if (fileType === "epub" && rendition.current) {
            rendition.current.prev();
        } else if (fileType === "pdf" && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (fileType === "epub" && rendition.current) {
            rendition.current.next();
        } else if (fileType === "pdf" && totalPages && currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <div className="mb-4">{loadingMessage}</div>
                <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            {fileType === 'epub' && fileUrl && (
                <div style={{ position: 'relative', height: '92vh', width: '100%' }} key={readerKey}>
                    <ReactReader
                        url={fileUrl}
                        location={location}
                        title={data?.title || "Untitled Book"}
                        locationChanged={(loc) => setLocation(loc)}
                        readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
                        getRendition={(renditionInstance) => {
                            rendition.current = renditionInstance;
                            updateTheme(renditionInstance, theme);
                        }}
                        epubOptions={{
                            flow: "paginated", // Disable scrolling
                            manager: "default"
                        }}
                        loadingView={<div className="flex justify-center items-center h-full">
                            <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                            <div className="ml-4">Loading EPUB...</div>
                        </div>}
                        errorView={<div className="text-red-500 p-4">Error loading EPUB</div>}
                    />
                </div>
            )}

            {fileType === 'pdf' && fileUrl && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
                    <div style={{ height: '92vh', width: '100%'}}>
                        <Viewer 
                            fileUrl={fileUrl} 
                            plugins={[defaultLayoutPluginInstance]} 
                            initialPage={currentPage - 1} 
                            onDocumentLoad={(e) => setTotalPages(e.numPages)} 
                            onPageChange={(e) => setCurrentPage(e.currentPageNumber)}
                        />
                    </div>
                </Worker>
            )}

            {/* <div className="mt-4 flex space-x-4">
                <button 
                    className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
                    onClick={handlePrevPage}
                    disabled={fileType === "pdf" ? currentPage <= 1 : false}
                >
                    Previous Page
                </button>
                <button 
                    className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
                    onClick={handleNextPage}
                    disabled={fileType === "pdf" ? currentPage >= totalPages : false}
                >
                    Next Page
                </button>
            </div> */}
        </div>
    );
};

export default Read;

const lightReaderTheme = {
    ...ReactReaderStyle,
    container: { ...ReactReaderStyle.container, height: '100%', width: '100%' },
    readerArea: { ...ReactReaderStyle.readerArea, backgroundColor: '#fff', color: '#000', height: "100%" },
};

const darkReaderTheme = {
    ...ReactReaderStyle,
    container: { ...ReactReaderStyle.container, height: '100%', width: '100%' },
    readerArea: { ...ReactReaderStyle.readerArea, backgroundColor: '#000', color: '#fff', height: "100%" },
};
