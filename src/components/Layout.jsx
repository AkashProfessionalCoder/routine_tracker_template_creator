import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, Settings, ArrowLeft } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

const Layout = ({ currentMonth, onMonthChange, onExport, showNavigation = true, children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isSettingsPage = location.pathname === '/settings';

    const handlePrevMonth = () => onMonthChange && onMonthChange(subMonths(currentMonth, 1));
    const handleNextMonth = () => onMonthChange && onMonthChange(addMonths(currentMonth, 1));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {isSettingsPage && (
                            <button
                                onClick={() => navigate('/tracker')}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Go back"
                            >
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <h1
                            onClick={() => navigate('/tracker')}
                            className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight cursor-pointer hover:text-blue-600 transition-colors"
                        >
                            Routine Tracker
                        </h1>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
                        {showNavigation && !isSettingsPage && (
                            <>
                                {/* Month Navigation */}
                                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={handlePrevMonth}
                                        className="p-1 sm:p-2 rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-gray-900"
                                    >
                                        <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                                    </button>
                                    <span className="px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm min-w-[100px] sm:min-w-[140px] text-center">
                                        {format(currentMonth, 'MMM yyyy')}
                                    </span>
                                    <button
                                        onClick={handleNextMonth}
                                        className="p-1 sm:p-2 rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-gray-900"
                                    >
                                        <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                                    </button>
                                </div>

                                {/* Export PDF Button */}
                                <button
                                    onClick={onExport}
                                    className="flex items-center space-x-1 sm:space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-2 sm:px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow"
                                >
                                    <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    <span className="font-medium text-xs sm:text-sm">PDF</span>
                                </button>

                                {/* Settings Button */}
                                <button
                                    onClick={() => navigate('/settings')}
                                    className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow"
                                >
                                    <Settings size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    <span className="font-medium text-sm hidden sm:inline">Settings</span>
                                </button>
                            </>
                        )}
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
