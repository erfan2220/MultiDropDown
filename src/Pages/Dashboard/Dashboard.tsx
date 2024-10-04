import React, { useEffect, useRef, useState } from 'react';
import './Dashboard.scss';
import AddItem from '../../Components/AddItem/AddItem';

interface Item {
    name: string;
    url: string;
}

const Dashboard: React.FC = () => {
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const [mouseEnter, setMouseEnter] = useState<number>(-1);

    // Initial items from localStorage (user-added items)
    const initialItems: Item[] = JSON.parse(localStorage.getItem('userItems') || '[]');

    // Ref for dropdown to detect outside clicks
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Default items that should not be stored in localStorage
    const defaultItems: Item[] = [
        { name: 'Science', url: './images/2.svg' },
        { name: 'Yeeeah, science!', url: './images/science.svg' },
        { name: 'Art', url: './images/6.svg' },
        { name: 'Sport', url: './images/sport.svg' },
        { name: 'Games', url: './images/1.svg' },
        { name: 'Health', url: './images/health.svg' },
    ];

    // State for both default and user-added items
    const [items, setItems] = useState<Item[]>([...defaultItems, ...initialItems]);

    // Store the last selected item
    const [selectedItem, setSelectedItem] = useState<Item>(items[0]);

    // Store only user-added items in localStorage when 'items' state changes
    useEffect(() => {
        const userAddedItems = items.filter((item) => !defaultItems.some((defaultItem) => defaultItem.name === item.name));
        localStorage.setItem('userItems', JSON.stringify(userAddedItems));
    }, [items]);

    const handleOpen = () => {
        setOpenDropDown(!openDropDown);
    };

    // Handle item click and store the last selected item
    const handleClick = (item: Item) => {
        setSelectedItem(item);
        setOpenDropDown(false); // Close dropdown after selecting an item
    };

    const handleMouseEnter = (index: number) => {
        setMouseEnter(index);
    };

    const handleAddItem = (newItem: Item) => {
        setItems([...items, newItem]);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropDown(false);
            }
        };

        const handleMouseLeave = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget as Node)) {
                setOpenDropDown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        dropdownRef.current?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            dropdownRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [dropdownRef]);

    return (
        <div className="Container">
            <div className="AddNewItem">
                <AddItem onAddItem={handleAddItem} />
            </div>
            <div className="dashboard-container" ref={dropdownRef}>
                <div className="selected-item" onClick={handleOpen}>
                    <h2>{selectedItem.name}</h2>
                    <img
                        src="./images/arrowDown.svg"
                        alt=""
                        style={openDropDown ? { rotate: '180deg' } : {}}
                    />
                </div>

                {openDropDown && (
                    <div className="dropdown-items">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="item-Container"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onClick={() => handleClick(item)}
                            >
                                <div className="item">
                                    <h2>{item.name}</h2>
                                    <img src={item.url} alt={item.name} />
                                </div>
                                {mouseEnter === index && <img src="./images/checkmark.svg" alt={item.name} />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
