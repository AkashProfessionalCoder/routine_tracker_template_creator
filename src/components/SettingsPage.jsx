import React, { useState } from 'react';
import { Trash2, Edit2, Plus, X, Check, GripVertical } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ item, isEditing, editLabel, onStartEdit, onSaveEdit, onCancelEdit, onEditLabelChange, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors bg-white cursor-grab active:cursor-grabbing"
        >
            {/* Drag Handle Icon */}
            <div className="text-gray-400">
                <GripVertical size={20} />
            </div>

            {/* Item Label */}
            <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                {isEditing ? (
                    <input
                        type="text"
                        value={editLabel}
                        onChange={(e) => onEditLabelChange(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && onSaveEdit()}
                        className="w-full px-3 py-1 rounded border border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <span className="text-gray-800 font-medium">{item.label}</span>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                {isEditing ? (
                    <>
                        <button
                            onClick={onSaveEdit}
                            className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                        >
                            <Check size={18} />
                        </button>
                        <button
                            onClick={onCancelEdit}
                            className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={onStartEdit}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button
                            onClick={() => {
                                if (confirm(`Delete "${item.label}"?`)) {
                                    onDelete();
                                }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const SettingsPage = ({ routineItems, onAdd, onEdit, onDelete, onReorder }) => {
    const [newItemLabel, setNewItemLabel] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editLabel, setEditLabel] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddItem = () => {
        if (newItemLabel.trim()) {
            onAdd(newItemLabel.trim());
            setNewItemLabel('');
        }
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditLabel(item.label);
    };

    const saveEdit = () => {
        if (editLabel.trim()) {
            onEdit(editingId, editLabel.trim());
            setEditingId(null);
            setEditLabel('');
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditLabel('');
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = routineItems.findIndex((item) => item.id === active.id);
            const newIndex = routineItems.findIndex((item) => item.id === over.id);
            onReorder(oldIndex, newIndex);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Settings</h1>

            {/* Add New Item Section */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Add New Routine Item</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={newItemLabel}
                        onChange={(e) => setNewItemLabel(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                        placeholder="Enter routine item name..."
                        className="flex-1 px-3 sm:px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm sm:text-base"
                    />
                    <button
                        onClick={handleAddItem}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base"
                    >
                        <Plus size={18} />
                        Add
                    </button>
                </div>
            </div>

            {/* Routine Items List */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    Routine Items ({routineItems.length})
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    💡 Drag and drop items to reorder them
                </p>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={routineItems.map(item => item.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-2">
                            {routineItems.map((item) => (
                                <SortableItem
                                    key={item.id}
                                    item={item}
                                    isEditing={editingId === item.id}
                                    editLabel={editLabel}
                                    onStartEdit={() => startEdit(item)}
                                    onSaveEdit={saveEdit}
                                    onCancelEdit={cancelEdit}
                                    onEditLabelChange={setEditLabel}
                                    onDelete={() => onDelete(item.id)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};

export default SettingsPage;
