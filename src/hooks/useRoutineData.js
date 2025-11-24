import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const STORAGE_KEY = 'daily_routine_tracker_data';

export const useRoutineData = () => {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
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

    return { data, updateProfile, updateDay, getMonthData };
};
