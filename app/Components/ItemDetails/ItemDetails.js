import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, input, Button } from 'react-bootstrap';
import styles from './styles.css';

export default class ProductDetails extends React.Component {

    static propTypes = {
      handleSubmit: PropTypes.func.isRequired,
    };

    state = {
        id: this.props.item.id,
        name: this.props.item.name,
        quantity: this.props.item.quantity || 0,
        price: this.props.item.price || 0,
        description: this.props.item.description || 0,
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleDetailsSubmit = (e) => {
        this.props.handleSubmit(this.state);
        e.preventDefault();
    };

    render() {
        const item = this.props.item;
        const itemName = item.name.toUpperCase() || '';

        return (
            <div className={styles.details_container}>
                <div className="sub_header">
                    <span>{`${itemName} DETAILS`}</span>
                </div>
                <form className={styles.form_style}>
                    <p>
                        <label>{'Quantity'}</label>
                        <input type="text" name="quantity" defaultValue={item.quantity} onChange={this.handleInputChange} />
                    </p>
                    <p>
                        <label>{'Price'}</label>
                        <input type="text" name="price" defaultValue={item.price} onChange={this.handleInputChange} />
                    </p>
                    <p>
                        <label>{'Description'}</label>
                        <textarea rows={2} name="description" defaultValue={item.description} onChange={this.handleInputChange} />
                    </p>
                    <div className={styles.button_div}>
                        <Button type="submit" onClick={this.handleDetailsSubmit} bsStyle="primary" bsSize="small">
                            {'Save'}
                        </Button>
                    </div>
                </form>
            </div>

        );
    }

}