import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ComicCard({ comic }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
            <Link to={`/comic/${comic.id}`} className="flex flex-col h-full active:scale-95 transition-transform">
                <div className="aspect-[2/3] relative overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <img
                        src={comic.cover}
                        alt={comic.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                        <h3 className="text-white font-bold text-xl leading-tight line-clamp-2">{comic.title}</h3>
                    </div>
                </div>
                <div className="p-4 flex gap-2 flex-wrap mt-auto bg-white dark:bg-dark-surface">
                    {comic.moods.map((mood) => (
                        <span
                            key={mood}
                            className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize bg-black text-white dark:bg-primary-900/50 dark:text-primary-200"
                        >
                            {mood}
                        </span>
                    ))}
                </div>
            </Link>
        </motion.div>
    );
}
