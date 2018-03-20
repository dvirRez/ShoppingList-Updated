import React from 'react';

export default function ListItem({ handleChange, title, id}) {
    return (
        <div>
            <input
                type="checkbox"
                onChange={handleChange} />
            <span>{title}</span>
            <span>X</span>
        </div>
    );
}