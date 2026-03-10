import { Smile, Zap, Coffee, Lightbulb } from 'lucide-react';

const MOODS = [
    { id: 'happy', label: 'Happy', icon: Smile, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
    { id: 'action', label: 'Action', icon: Zap, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
    { id: 'mystery', label: 'Mystery', icon: Coffee, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
    { id: 'thriller', label: 'Thriller', icon: Lightbulb, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' }
];

export default function MoodSelector({ selectedMood, onSelectMood }) {
    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Choose your mood today</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {MOODS.map((mood) => {
                    const Icon = mood.icon;
                    const isSelected = selectedMood === mood.id;
                    return (
                        <button
                            key={mood.id}
                            onClick={() => onSelectMood(isSelected ? null : mood.id)}
                            className={`
                flex items-center gap-2 px-6 py-3 rounded-full text-lg font-medium transition-all duration-300
                hover:scale-105 active:scale-95 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                ${isSelected
                                    ? `${mood.color} ring-2 ring-current ring-opacity-50 scale-105 shadow-md`
                                    : 'bg-white dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }
              `}
                        >
                            <Icon className={`w-6 h-6 ${isSelected ? '' : mood.color.split(' ')[0]}`} />
                            {mood.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
