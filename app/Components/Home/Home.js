import React from 'react';
import getListItems from '../../helpers/api';
import ListItem from '../ListItem/ListItem';
import AddItem from '../AddItem/AddItem';
import ItemDetails from '../ItemDetails/ItemDetails';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Home extends React.Component {
    state = {
        listItems: [],
        selectedItem: null,
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
            console.log(this.state.listItems);
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



    renderHomeBody = () => (
        <div>
            {
                this.state.listItems.map( item => (
                    <ListItem
                        key={item.id}
                        id={item.id}
                        removeItem={this.removeListItem(item.id)}
                        title={item.name}
                        onItemClick={this.toggleDetailsPanel(item.id)}
                    >
                    </ListItem>
                ))
            }
            <AddItem
                placeHolder={'Add item'}
                onEnterKey={this.addListItem}
            />
        </div>
    );

    render() {

        return (
            <Grid>
                <Row>
                    <Col md={6}>
                        {this.state.listItems.length > 0 ? this.renderHomeBody() : 'Loading'}
                    </Col>
                    <Col md={6}>
                        {this.state.selectedItem ? <ItemDetails item={this.state.selectedItem}/> : null}
                    </Col>
                </Row>
            </Grid>
        );
    }
}