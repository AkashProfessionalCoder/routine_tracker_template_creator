import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const STORAGE_KEY = 'daily_routine_tracker_data';

// Default routine items (17 items)
const DEFAULT_ROUTINE_ITEMS = [
    { id: 'wakeUp', label: 'Wake up before 6:00 AM', order: 0 },
    { id: 'brush', label: 'Brush', order: 1 },
    { id: 'exercise', label: 'Exercise 1 Hour', order: 2 },
    { id: 'meditation', label: 'Meditation 10 mins', order: 3 },
    { id: 'news', label: 'Checks today international news', order: 4 },
    { id: 'learning', label: 'a Tech learning', order: 5 },
    { id: 'reading', label: 'Read 10 pages', order: 6 },
    { id: 'family', label: 'Call parents/family', order: 7 },
    { id: 'goodThing', label: 'Did one good thing', order: 8 },
    { id: 'noDrugs', label: 'No drugs', order: 9 },
    { id: 'noPorn', label: 'No porn', order: 10 },
    { id: 'noProcessedFood', label: 'No processed food', order: 11 },
    { id: 'noSpending', label: 'No unnecessary spending', order: 12 },
    { id: 'noNetflix', label: 'No Netflix', order: 13 },
    { id: 'screenTime', label: 'Mobile screen time < 3 hrs', order: 14 },
    { id: 'brushBed', label: 'Brush before bed', order: 15 },
    { id: 'sleep', label: 'Sleep before 11:00 PM', order: 16 },
];

export const useRoutineData = () => {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsedData = saved ? JSON.parse(saved) : {};

        // Initialize routine items if they don't exist
        if (!parsedData.routineItems) {
            parsedData.routineItems = DEFAULT_ROUTINE_ITEMS;
        }

        return parsedData;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const updateProfile = (monthKey, profileData) => {
        setData(prev => ({
            ...prev,
            [monthKey]: {
                ...prev[monthKey],
                profile: { ...prev[monthKey]?.profile, ...profileData }
            }
        }));
    };

    const updateDay = (monthKey, day, field, value) => {
        setData(prev => ({
            ...prev,
            [monthKey]: {
                ...prev[monthKey],
                days: {
                    ...prev[monthKey]?.days,
                    [day]: {
                        ...prev[monthKey]?.days?.[day],
                        [field]: value
                    }
                }
            }
        }));
    };

    const getMonthData = (monthKey) => {
        return data[monthKey] || { profile: {}, days: {} };
    };

    const getRoutineItems = () => {
        return data.routineItems || DEFAULT_ROUTINE_ITEMS;
    };

    const updateRoutineItems = (items) => {
        setData(prev => ({
            ...prev,
            routineItems: items
        }));
    };

    const addRoutineItem = (label) => {
        const items = getRoutineItems();
        const newId = `custom_${Date.now()}`;
        const newItem = {
            id: newId,
            label,
            order: items.length
        };
        updateRoutineItems([...items, newItem]);
    };

    const deleteRoutineItem = (id) => {
        const items = getRoutineItems().filter(item => item.id !== id);
        // Reorder after deletion
        const reorderedItems = items.map((item, index) => ({ ...item, order: index }));
        updateRoutineItems(reorderedItems);
    };

    const editRoutineItem = (id, newLabel) => {
        const items = getRoutineItems().map(item =>
            item.id === id ? { ...item, label: newLabel } : item
        );
        updateRoutineItems(items);
    };

    const reorderRoutineItems = (startIndex, endIndex) => {
        const items = [...getRoutineItems()];
        const [removed] = items.splice(startIndex, 1);
        items.splice(endIndex, 0, removed);
        // Update order property
        const reorderedItems = items.map((item, index) => ({ ...item, order: index }));
        updateRoutineItems(reorderedItems);
    };

    return {
        data,
        updateProfile,
        updateDay,
        getMonthData,
        getRoutineItems,
        updateRoutineItems,
        addRoutineItem,
        deleteRoutineItem,
        editRoutineItem,
        reorderRoutineItems
    };
};
