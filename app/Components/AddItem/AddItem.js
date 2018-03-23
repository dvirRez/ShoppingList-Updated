import React from 'react';
import FormControl from 'react-bootstrap';
import input from 'react-bootstrap';
import { add_item } from './styles.css';

export default function AddItem({ placeHolder, onEnterKey }) {
    return (
        <input
            type="text"
            placeholder={placeHolder}
            onKeyPress={onEnterKey}
            className={add_item}
        />
    );
}