import React from 'react';

const ProfileSection = ({ profile, onUpdate }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onUpdate({ [name]: value });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profile?.name || ''}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Height</label>
                    <input
                        type="text"
                        name="height"
                        value={profile?.height || ''}
                        onChange={handleChange}
                        placeholder="e.g. 180 cm"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Weight</label>
                    <input
                        type="text"
                        name="weight"
                        value={profile?.weight || ''}
                        onChange={handleChange}
                        placeholder="e.g. 75 kg"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
