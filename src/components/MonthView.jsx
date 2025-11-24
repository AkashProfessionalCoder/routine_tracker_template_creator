import React from 'react';
import { getDaysInMonth, format } from 'date-fns';
import { Check } from 'lucide-react';
import ProfileSection from './ProfileSection';

const MonthView = ({ currentMonth, data, routineItems, onUpdateProfile, onUpdateDay }) => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const monthKey = format(currentMonth, 'yyyy-MM');
    const monthData = data;

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleToggle = (day, itemId) => {
        const currentVal = monthData?.days?.[day]?.[itemId];
        onUpdateDay(monthKey, day, itemId, !currentVal);
    };

    return (
        <div className="max-w-[95%] mx-auto px-2 py-8">
            <ProfileSection
                profile={monthData?.profile}
                onUpdate={(updates) => onUpdateProfile(monthKey, updates)}
            />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-3 px-4 font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10 min-w-[200px] border-r border-gray-200">
                                    Routine Item
                                </th>
                                {days.map((day) => (
                                    <th key={day} className="py-3 px-2 font-medium text-gray-600 text-center min-w-[40px] border-r border-gray-100 last:border-r-0">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {routineItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-gray-800 sticky left-0 bg-white z-10 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                        {item.label}
                                    </td>
                                    {days.map((day) => {
                                        const isChecked = monthData?.days?.[day]?.[item.id];
                                        return (
                                            <td
                                                key={`${day}-${item.id}`}
                                                className="p-0 text-center border-r border-gray-50 last:border-r-0 cursor-pointer hover:bg-blue-50 transition-colors"
                                                onClick={() => handleToggle(day, item.id)}
                                            >
                                                <div className="h-full w-full py-3 flex items-center justify-center">
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${isChecked
                                                        ? 'bg-green-500 border-green-500 text-white shadow-sm scale-110'
                                                        : 'border-gray-200 bg-white'
                                                        }`}>
                                                        {isChecked && <Check size={14} strokeWidth={3} />}
                                                    </div>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MonthView;
