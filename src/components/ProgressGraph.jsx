import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDaysInMonth } from 'date-fns';

const ProgressGraph = ({ currentMonth, data, routineItems }) => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const monthData = data;

    // Calculate completion count for each day
    const chartData = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const dayData = monthData?.days?.[day] || {};

        const completedCount = routineItems.filter(item => dayData[item.id]).length;

        return {
            day,
            completed: completedCount,
        };
    });

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Progress</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="day"
                        label={{ value: 'Day of Month', position: 'insideBottom', offset: -5 }}
                        stroke="#6b7280"
                    />
                    <YAxis
                        label={{ value: 'Items Completed', angle: -90, position: 'insideLeft' }}
                        domain={[0, routineItems.length]}
                        stroke="#6b7280"
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        labelFormatter={(value) => `Day ${value}`}
                        formatter={(value) => [`${value} / ${routineItems.length}`, 'Completed']}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: '#10b981', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Items Completed"
                    />
                </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Average</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {(chartData.reduce((sum, d) => sum + d.completed, 0) / chartData.length).toFixed(1)} / {routineItems.length}
                    </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Best Day</p>
                    <p className="text-2xl font-bold text-green-600">
                        {Math.max(...chartData.map(d => d.completed))} / {routineItems.length}
                    </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {routineItems.length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProgressGraph;
