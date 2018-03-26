import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, input, Button } from 'react-bootstrap';
import styles from './styles.css';

export default class ProductDetails extends React.Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        item: PropTypes.any.isRequired,
    };

    state = {
        id: this.props.item.id,
        name: this.props.item.name,
        quantity: this.props.item.quantity,
        price: this.props.item.price,
        description: this.props.item.description,
    };

    // We need to set the state when item is changed in <App>
    componentWillReceiveProps( newProps ) {
        if ( this.props.item !== newProps.item ) {
            this.setState( {
                id: newProps.item.id,
                name: newProps.item.name,
                quantity: newProps.item.quantity,
                price: newProps.item.price,
                description: newProps.item.description,
            } );
        }
    }

    // Set appropriate property in state by input name
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    // Submit changed item to parent component
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
                        <input min="0" type="number" name="quantity" value={this.state.quantity}  onChange={this.handleInputChange} />
                    </p>
                    <p>
                        <label>{'Price'}</label>
                        <input min="0" type="number" name="price" value={this.state.price} onChange={this.handleInputChange}/>
                    </p>
                    <p>
                        <label>{'Description'}</label>
                        <textarea rows={2} name="description" value={this.state.description} onChange={this.handleInputChange}/>
                    </p>
                    <div className={styles.button_div}>
                        <Button onClick={this.handleDetailsSubmit} bsStyle="primary" bsSize="small">
                            {'Save'}
                        </Button>
                    </div>
                </form>
            </div>

        );
    }

}