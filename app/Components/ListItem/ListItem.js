import React from 'react';
import PropTypes from 'prop-types';
import styles  from './styles.css';
import { RIEInput } from 'riek';
import FaEdit from 'react-icons/lib/fa/edit';

export default class ListItem extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        removeItem: PropTypes.func.isRequired,
        onItemClick: PropTypes.func.isRequired,
        onTitleChange: PropTypes.func.isRequired,
    };

    state = {
        productNameClass: styles.basicItem,
    };

    // Set item name class based on checkbox (mark it with line through if checked)
    handleChange = (e) => {
        this.setState({
            productNameClass: e.target.checked ? styles.deleted_item_text_outer : styles.basicItem,
        });
    };

    // Handle <RIEInput> change event
    handleTitleChange = (obj) => {
        this.props.onTitleChange(this.props.id, obj.itemTitle);
    };

    render() {
        return (
            <div className={styles.items_container}>
                <input
                    type="checkbox"
                    onChange={this.handleChange}
                />
                <span className={this.state.productNameClass}>
                    <RIEInput className={styles.item_name} classEditing={styles.edit_input} value={this.props.title} propName="itemTitle" change={this.handleTitleChange}/>
                </span>
                <span className={styles.clickable_elements}>
                    <FaEdit className={styles.edit_item} onClick={this.props.onItemClick}/>
                    <span  className={styles.remove_item} onClick={this.props.removeItem}>X</span>
                </span>

            </div>
        );
    }

}