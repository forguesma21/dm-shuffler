import { useState, useRef, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';


interface EditableIdeaRowProps {
    index: number;
    value: string;
    onChange: (newValue: string) => void;
    onDelete: () => void;
}

export function EditableField({ index, value, onChange, onDelete }: EditableIdeaRowProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleEditClick = () => {
        setIsEditing(true);
        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    };

    const handleBlur = () => {
        setIsEditing(false);
        onChange(localValue.trim());
    };

    return (
        <li className="flex items-center gap-2 p-3 bg-gray-50 rounded border-l-4 border-blue-500">
      <span className="font-semibold text-gray-600 w-6 text-right">
        {index + 1}.
      </span>

            <input
                ref={inputRef}
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleBlur}
                className={
                    'flex-1 px-3 py-2 rounded transition-all outline-none ' +
                    (isEditing
                        ? 'border-2 border-blue-500 shadow-sm bg-white'
                        : 'border border-transparent bg-gray-50')
                }
            />

            <button
                type="button"
                onClick={handleEditClick}
                className="px-2 py-1 text-sm bg-gray-300 text-white rounded hover:bg-green-400"
                title="Éditer"
            >
                <Pencil size={18} />
            </button>

            <button
                type="button"
                onClick={onDelete}
                className="px-2 py-1 text-sm bg-gray-300 text-white rounded hover:bg-red-400"
                title="Supprimer"
            >
                <Trash2 size={18} />
            </button>
        </li>
    );
}
