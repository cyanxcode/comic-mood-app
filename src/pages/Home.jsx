import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MoodSelector from '../components/MoodSelector';
import ComicCard from '../components/ComicCard';
import comicsData from '../data/comics.json';

export default function Home() {
    const [selectedMood, setSelectedMood] = useState(null);
    const navigate = useNavigate();

    // Load mood from localStorage on mount
    useEffect(() => {
        const savedMood = localStorage.getItem('comic-mood');
        if (savedMood) setSelectedMood(savedMood);
    }, []);

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        if (mood) {
            localStorage.setItem('comic-mood', mood);
        } else {
            localStorage.removeItem('comic-mood');
        }
    };

    const handleSurpriseMe = () => {
        const randomComic = comicsData[Math.floor(Math.random() * comicsData.length)];
        navigate(`/comic/${randomComic.id}`);
    };

    const filteredComics = selectedMood
        ? comicsData.filter(c => c.moods.includes(selectedMood))
        : comicsData;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
                <MoodSelector selectedMood={selectedMood} onSelectMood={handleMoodSelect} />

                <div className="mt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <h2 className="text-2xl font-bold flex items-baseline gap-2">
                            {selectedMood ? (
                                <>
                                    Comics for your <span className="text-primary-600 dark:text-primary-400 capitalize">{selectedMood}</span> mood
                                </>
                            ) : (
                                'All Comics'
                            )}
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                                ({filteredComics.length})
                            </span>
                        </h2>

                        <button
                            onClick={handleSurpriseMe}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all active:scale-95"
                        >
                            <Shuffle className="w-5 h-5" />
                            Surprise Me
                        </button>
                    </div>

                    {filteredComics.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            <AnimatePresence>
                                {filteredComics.map(comic => (
                                    <ComicCard key={comic.id} comic={comic} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-dark-surface rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <p className="text-xl text-gray-500 dark:text-gray-400">No comics found for this mood! Try another one.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
