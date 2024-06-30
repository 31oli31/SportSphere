import React, { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';

interface MultiSelectProps {
    options: { id: string, name: string }[];
    selectedOptions: string[];
    onSelectionChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, onSelectionChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
        setFilteredOptions(
            options.filter(option =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, options]);

    const handleCheckboxChange = (id: string) => {
        if (selectedOptions.includes(id)) {
            onSelectionChange(selectedOptions.filter(optionId => optionId !== id));
        } else {
            onSelectionChange([...selectedOptions, id]);
        }
    };

    return (
        <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-md mb-2 p-2">
                <HiSearch className="text-gray-400" />
                <input
                    type="text"
                    className="ml-2 w-full border-none outline-none  focus:ring-0 rounded border-black"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2 bg-white">
                {filteredOptions.map(option => (
                    <label key={option.id} className="flex items-center space-x-2 p-1 cursor-pointer hover:bg-gray-100">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-0  dark:bg-gray-700 dark:border-gray-600"
                            checked={selectedOptions.includes(option.id)}
                            onChange={() => handleCheckboxChange(option.id)}
                        />
                        <span>{option.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default MultiSelect;
