import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-white dark:bg-dark-surface shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex w-full justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 text-primary-600 dark:text-primary-500 hover:text-primary-500 transition-colors">
                        <BookOpen className="w-8 h-8" />
                        <span className="font-bold text-xl tracking-tight"> MoodTales</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
