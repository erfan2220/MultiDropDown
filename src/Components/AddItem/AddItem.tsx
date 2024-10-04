import React, {useRef, useState} from 'react';
import "./AddItem.scss"
type AddItemProps = {
    onAddItem: (newItem: { name: string, url: string }) => void;
};

const AddItem: React.FC<AddItemProps> = ({ onAddItem }) => {
    const [name, setName] = useState('');
    const [selectedUrl, setSelectedUrl] = useState('');
    const dropDownRef=useRef()

    // List of available character URLs
    const characterOptions = [
        { name: 'Character 1', url: './images/1.svg' },
        { name: 'Character 2', url: './images/2.svg' },
        { name: 'Character 3', url: './images/3.svg' },
        { name: 'Character 3', url: './images/4.svg' },
        { name: 'Character 3', url: './images/5.svg' },
        { name: 'Character 3', url: './images/6.svg' },
        { name: 'Character 3', url: './images/7.svg' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && selectedUrl) {
            const newItem = { name, url: selectedUrl };
            onAddItem(newItem);
            setName(''); // Reset after submission
            setSelectedUrl(''); // Reset after submission
        }
    };

    return (
        <div className="add-item-container">
            <h3>Add New Item</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div className="character-selection">
                    {characterOptions.map((option, index) => (
                        <div key={index} className="character-option">
                            <input
                                type="radio"
                                id={option.url}
                                value={option.url}
                                checked={selectedUrl === option.url}
                                onChange={() => setSelectedUrl(option.url)}
                            />
                            <label htmlFor={option.url}>
                                <img src={option.url} alt={option.name} />
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;
