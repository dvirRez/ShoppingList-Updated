import React from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './styles.css';

export default function ShoppingList({listItems, addListItem, removeListItem, onItemClick, onTitleChange}) {

    function renderList() {
        return (
            listItems.map(item => (
                <ListItem
                    id={item.id}
                    key={item.id}
                    title={item.name}
                    removeItem={removeListItem(item.id)}
                    onItemClick={onItemClick(item.id)}
                    onTitleChange={onTitleChange}/>
            ))
        );
    }

    return (
        <div className={styles.list_container}>
            <div className="sub_header">
                <span>{'ADD YOUR ITEMS HERE'}</span>
            </div>
            { renderList() }
            <div className={styles.add_item_div}>
                <input
                    type="text"
                    placeholder={'Add Item'}
                    onKeyPress={addListItem}
                    className={styles.add_item}
                />
            </div>
        </div>
    );
}