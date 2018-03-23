import React from 'react';
import getListItems from '../../helpers/api';
import ListItem from '../ListItem/ListItem';
import AddItem from '../AddItem/AddItem';
import ItemDetails from '../ItemDetails/ItemDetails';
import { Grid, Row, Col, Alert, Button } from 'react-bootstrap';
import { header, list_title, items_div, add_item_container, details_div } from './styles.css';

export default class Home extends React.Component {
    state = {
        listItems: [],
        selectedItem: null,
        showAlert: false,
    };

    componentDidMount() {
        getListItems()
            .then(listItems => {
                this.setState({
                    listItems,
                    nextId: listItems.length,
                });
            });
    }

    removeListItem = (itemId) => (e) => {
        this.setState((prevState, props) => ({
            listItems: prevState.listItems.filter( item => item.id !== itemId),
        }));
        console.log(this.state.listItems);
    };

    addListItem = (e) => {
        if(e.charCode==13) {
            const newItemName = e.target.value || '';
            this.setState((prevState, props) => ({
                listItems: [
                    ...prevState.listItems,
                    {
                        id: prevState.nextId,
                        name: newItemName,
                        quantity: 0,
                        price: 0,
                        description: '',
                    }
                ],
                nextId: prevState.nextId + 1,
            }));
            e.target.value = '';
        }

    };

    findItemById = (itemId) => {
        return this.state.listItems.find((item) => item.id === itemId)
    };

    toggleDetailsPanel = (itemId) => (e) => {
        this.setState((prevState, props) => ({
            selectedItem: prevState.selectedItem ? null : this.findItemById(itemId),
        }));
    };

    handleProductTitleChange = (itemId, newName) => {
        const indexToUpdate = this.state.listItems.findIndex((item) => item.id === itemId);
        let newListItems = [...this.state.listItems];
        newListItems[indexToUpdate].name = newName;

        this.setState({
            listItems: newListItems,
        });
    };

    saveDetails = (updatedItem) => {
        const indexToUpdate = this.state.listItems.findIndex((item) => item.id === updatedItem.id);
        let newListItems = [...this.state.listItems];
        newListItems[indexToUpdate] = updatedItem;

        this.setState({
            listItems: newListItems,
            showAlert: true,
            selectedItem: null,
        });
    };


    renderHomeBody = () => (
        <div>
            {
                this.state.listItems.map( item => (
                    <ListItem
                        key={item.id}
                        id={item.id}
                        removeItem={this.removeListItem(item.id)}
                        title={item.name}
                        onTitleChange={this.handleProductTitleChange}
                        onItemClick={this.toggleDetailsPanel(item.id)}
                    >
                    </ListItem>
                ))
            }
            <div className={add_item_container}>
                <AddItem
                    placeHolder={'Add item'}
                    onEnterKey={this.addListItem}
                />
            </div>

        </div>
    );

    handleDismiss = () => {
        this.setState({
            showAlert: false,
        });
    };

    renderSavedAlert = () => (
        <Row>
            <Col md={6}>
                <Alert bsStyle="success" onDismiss={this.handleDismiss}>
                    <p>
                        {'Item Saved'}
                    </p>
                </Alert>
            </Col>
        </Row>
    );

    render() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col className={header} md={12}>
                        {'Shopping List'}
                    </Col>
                </Row>
                {this.state.showAlert ? this.renderSavedAlert() : null}
                <Row>
                    <Col className={items_div} md={6}>
                        <Row>
                            <Col md={12}>
                                <div className={list_title}>
                                    {'ADD YOUR ITEMS HERE'}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                {this.state.listItems.length > 0 ? this.renderHomeBody() : 'Loading'}
                            </Col>
                        </Row>
                    </Col>
                    <Col className={details_div} md={6}>
                        {this.state.selectedItem ? <ItemDetails handleSubmit={this.saveDetails} item={this.state.selectedItem}/> : null}
                    </Col>
                </Row>
            </Grid>
        );
    }
}