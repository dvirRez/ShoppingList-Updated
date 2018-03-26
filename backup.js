<Grid fluid={false}>
    <Row>
        <Col className={header} md={12}>
            {'Shopping List'}
        </Col>
    </Row>
    {this.state.showAlert ? this.renderSavedAlert() : null}
    <Row>
        <Col className={list_title} md={3}>
            {'ADD YOUR ITEMS HERE'}
        </Col>
    </Row>
    <Row>
        <Col md={3}>
            {this.state.listItems.length > 0 ? this.renderHomeBody() : 'Loading'}
        </Col>
        <Col md={9}>
            {this.state.selectedItem ? <ItemDetails handleSubmit={this.saveDetails} item={this.state.selectedItem}/> : null}
        </Col>
    </Row>
</Grid>
========================

<Row>
    <Col md={3}>
        <Alert bsStyle="success" onDismiss={this.handleDismiss}>
            <p>
                {'Item Saved'}
            </p>
        </Alert>
    </Col>
</Row>

=============================

<div>
    <input
        type="checkbox"
        onChange={this.handleChange} />
    <RIEInput className={this.state.checkBoxClassName} value={this.props.title} propName="itemTitle" change={this.handleTitleChange}/>
    <FaEdit onClick={this.props.onItemClick}/>
    <span  className={remove_item} onClick={this.props.removeItem}>X</span>
</div>

===============================

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
================================================

    <div>
        <Row>
            <Col className={details_title}>
                {`${itemName} Details`}
            </Col>
        </Row>
        <Row>
            <Col>
                <span>{'Quantity'}</span>
            </Col>
            <Col>
                <input type="text" name="quantity" defaultValue={item.quantity} onChange={this.handleInputChange} />
            </Col>
        </Row>
        <Row>
            <Col>
                <span>{'Price'}</span>
            </Col>
            <Col>
                <input type="text" name="price" defaultValue={item.price} onChange={this.handleInputChange} />
            </Col>
        </Row>
        <Row>
            <Col>
                <span>{'Description'}</span>
            </Col>
            <Col>
                <input type="text" name="description" defaultValue={item.description} onChange={this.handleInputChange} />
            </Col>
        </Row>
        <Row>
            <Col>
                <Button type="submit" onClick={this.handleDetailsSubmit} bsStyle="primary" bsSize="small">
                    {'Save'}
                </Button>
            </Col>
        </Row>
    </div>



======================================

liatmiaral@gmail.com