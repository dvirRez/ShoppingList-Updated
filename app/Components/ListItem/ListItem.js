import React from 'react';

export default function ListItem({ handleChange, removeItem, title, itemId }) {
    return (
        <div>
            <input
                type="checkbox"
                onChange={handleChange} />
            <span>{title}</span>
            <span onClick={removeItem}>X</span>
        </div>
    );
}