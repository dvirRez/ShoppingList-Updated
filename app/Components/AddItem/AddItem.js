import React from 'react';
import FormControl from 'react-bootstrap';
import input from 'react-bootstrap';

export default function AddItem({ placeHolder, onEnterKey }) {
    return (
        <input
            type="text"
            placeholder={placeHolder}
            onKeyPress={onEnterKey}
        />
    );
}