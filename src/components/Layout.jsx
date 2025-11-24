import React from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

const Layout = ({ currentMonth, onMonthChange, onExport, children }) => {
    const handlePrevMonth = () => onMonthChange(subMonths(currentMonth, 1));
    const handleNextMonth = () => onMonthChange(addMonths(currentMonth, 1));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Routine Tracker</h1>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={handlePrevMonth}
                                className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-gray-900"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="px-4 font-medium text-gray-700 min-w-[140px] text-center">
                                {format(currentMonth, 'MMMM yyyy')}
                            </span>
                            <button
                                onClick={handleNextMonth}
                                className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-gray-900"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <button
                            onClick={onExport}
                            className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow"
                        >
                            <Download size={18} />
                            <span className="font-medium">Export PDF</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
