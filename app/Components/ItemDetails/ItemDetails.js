import React from 'react';
import { Grid, Row, Col, input } from 'react-bootstrap';

export default function ProductDetails({item}) {
    return (
        <Grid>
            <Row>
                <Col sm={12}>
                    <span>{'Quantity'}</span>
                </Col>
                <Col sm={12}>
                    <input type="text" defaultValue={item.quantity} />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <span>{'Price'}</span>
                </Col>
                <Col sm={12}>
                    <input type="text" defaultValue={item.price} />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <span>{'Description'}</span>
                </Col>
                <Col sm={12}>
                    <input type="text" defaultValue={item.description} />
                </Col>
            </Row>
        </Grid>
    );
}