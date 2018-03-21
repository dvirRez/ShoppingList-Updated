import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, input, Button } from 'react-bootstrap';

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

        return (
            <form>
                <Row>
                    <Col sm={12}>
                        <span>{'Quantity'}</span>
                    </Col>
                    <Col sm={12}>
                        <input type="text" name="quantity" defaultValue={item.quantity} onChange={this.handleInputChange} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <span>{'Price'}</span>
                    </Col>
                    <Col sm={12}>
                        <input type="text" name="price" defaultValue={item.price} onChange={this.handleInputChange} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <span>{'Description'}</span>
                    </Col>
                    <Col sm={12}>
                        <input type="text" name="description" defaultValue={item.description} onChange={this.handleInputChange} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Button type="submit" onClick={this.handleDetailsSubmit} bsStyle="primary" bsSize="small">
                            {'Save'}
                        </Button>
                    </Col>
                </Row>
            </form>
        );
    }

}