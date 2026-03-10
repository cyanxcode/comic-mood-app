import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react';
import comicsData from '../data/comics.json';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker using Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

export default function ComicReader() {
    const { id } = useParams();
    const navigate = useNavigate();
    const comic = comicsData.find(c => c.id === parseInt(id));

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [containerWidth, setContainerWidth] = useState(null);

    const containerRef = useRef(null);

    // Track container width for responsive PDF scaling
    useEffect(() => {
        const resize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        resize();
        window.addEventListener('resize', resize);

        return () => window.removeEventListener('resize', resize);
    }, []);

    // Restore reading progress
    useEffect(() => {
        if (!comic) {
            navigate('/');
            return;
        }

        setIsLoading(true);

        const savedProgress = localStorage.getItem(`comic-progress-${comic.id}`);
        if (savedProgress) {
            setTimeout(() => setPageNumber(parseInt(savedProgress)), 50);
        } else {
            setPageNumber(1);
        }
    }, [comic, navigate]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setIsLoading(false);
    };

    const changePage = offset => {
        setPageNumber(prev => {
            const newPage = prev + offset;

            if (newPage >= 1 && newPage <= (numPages || 1)) {
                localStorage.setItem(`comic-progress-${comic.id}`, newPage.toString());
                return newPage;
            }

            return prev;
        });
    };

    if (!comic) return null;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">

            {/* Top Navigation */}
            <div className="w-full bg-black/50 p-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 hover:text-primary-400 transition-colors py-1 px-3 rounded-lg hover:bg-white/10"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Library</span>
                </button>

                <h1 className="font-bold text-lg truncate max-w-[50%]">
                    {comic.title}
                </h1>

                <div className="w-[124px]" />
            </div>

            {/* Reader */}
            <div className="flex-1 w-full flex items-center justify-center p-4 relative overflow-hidden">

                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-400 z-10">
                        <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
                        <p className="font-medium animate-pulse">
                            Loading comic book...
                        </p>
                    </div>
                )}

                <div
                    ref={containerRef}
                    className="relative w-full max-w-6xl flex justify-center bg-white rounded-lg overflow-hidden shadow-2xl transition-opacity duration-700"
                    style={{ opacity: isLoading ? 0 : 1 }}
                >
                    <Document
                        file={comic.pdf}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={null}
                    >
                        <Page
                            pageNumber={pageNumber}
                            width={containerWidth || 800}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                </div>
            </div>

            {/* Controls */}
            <div className="w-full bg-black/80 p-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 sticky bottom-0 z-50 backdrop-blur-md border-t border-gray-800">

                <div className="flex items-center gap-4">

                    <button
                        disabled={pageNumber <= 1 || isLoading}
                        onClick={() => changePage(-1)}
                        className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="text-center min-w-[150px]">
                        {isLoading ? (
                            <span className="text-gray-400 text-sm font-medium">
                                Preparing views...
                            </span>
                        ) : (
                            <div className="flex flex-col gap-1 items-center">
                                <p className="text-sm font-medium">
                                    Page
                                    <span className="text-xl font-bold text-primary-400 mx-1">
                                        {pageNumber}
                                    </span>
                                    of {numPages}
                                </p>

                                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary-500 transition-all duration-300"
                                        style={{
                                            width: `${(pageNumber / numPages) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        disabled={pageNumber >= numPages || isLoading}
                        onClick={() => changePage(1)}
                        className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                </div>
            </div>
        </div>
    );
}
