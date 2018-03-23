import React from 'react';
import PropTypes from 'prop-types';
import { basicItem, deletedItem, remove_item, items_container, edit_item, clickable_elements } from './styles.css';
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
        productNameClass: basicItem,
    };

    handleChange = (e) => {
        this.setState({
            productNameClass: e.target.checked ? deletedItem : basicItem,
        });
    };

    handleTitleChange = (obj) => {
        this.props.onTitleChange(this.props.id, obj.itemTitle);
    };

    render() {
        return (
            <div className={items_container}>
                <input
                    type="checkbox"
                    onChange={this.handleChange}
                />
                <RIEInput className={this.state.productNameClass} classEditing={edit_item} value={this.props.title} propName="itemTitle" change={this.handleTitleChange}/>
                <span className={clickable_elements}>
                    <FaEdit className={edit_item} onClick={this.props.onItemClick}/>
                    <span  className={remove_item} onClick={this.props.removeItem}>X</span>
                </span>

            </div>
        );
    }

}