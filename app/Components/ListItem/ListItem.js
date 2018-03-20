import React from 'react';
import PropTypes from 'prop-types';
import { basicItem, deletedItem } from './styles.css';

export default class ListItem extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        removeItem: PropTypes.func.isRequired,
        onItemClick: PropTypes.func.isRequired,
    };

    state = {
        checkBoxClassName: basicItem,
    };

    handleChange = (e) => {
        this.setState({
            checkBoxClassName: e.target.checked ? deletedItem : basicItem,
        });
    };

    render() {
        return (
            <div>
                <input
                    type="checkbox"
                    onChange={this.handleChange} />
                <span className={this.state.checkBoxClassName} onClick={this.props.onItemClick}>{this.props.title}</span>
                <span onClick={this.props.removeItem}>X</span>
            </div>
        );
    }

}