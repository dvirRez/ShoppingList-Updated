import React from 'react';
import PropTypes from 'prop-types';
import { basicItem, deletedItem } from './styles.css';
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
        checkBoxClassName: basicItem,
    };

    handleChange = (e) => {
        this.setState({
            checkBoxClassName: e.target.checked ? deletedItem : basicItem,
        });
    };

    handleTitleChange = (obj) => {
        this.props.onTitleChange(this.props.id, obj.itemTitle);
    };

    render() {
        return (
            <div>
                <input
                    type="checkbox"
                    onChange={this.handleChange} />
                <RIEInput className={this.state.checkBoxClassName} value={this.props.title} propName="itemTitle" change={this.handleTitleChange}/>
                <FaEdit onClick={this.props.onItemClick}/>
                <span  className={remove_item} onClick={this.props.removeItem}>X</span>
            </div>
        );
    }

}