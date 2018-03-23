import React from 'react';
import ListItem from '../ListItem/ListItem';
import ItemDetails from '../ItemDetails/ItemDetails';
import AddItem from '../AddItem/AddItem';
import getListItems from '../../helpers/api';
import {container1, header, details_container, sub_container, app_container, list_container, sub_header, add_item_div} from './styles.css';

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

    findItemById = (itemId) => {
        return this.state.listItems.find((item) => item.id === itemId)
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

    removeListItem = (itemId) => (e) => {
        this.setState((prevState, props) => ({
            listItems: prevState.listItems.filter( item => item.id !== itemId),
        }));
        console.log(this.state.listItems);
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

    renderSavedAlert = () => (
        <Alert bsStyle="success" onDismiss={this.handleDismiss}>
            <p>
                {'Item Saved'}
            </p>
        </Alert>
    );

    handleDismiss = () => {
        this.setState({
            showAlert: false,
        });
    };

    renderList() {
        return (
            this.state.listItems.map(item => (
                <ListItem
                    id={item.id}
                    key={item.id}
                    title={item.name}
                    removeItem={this.removeListItem(item.id)}
                    onItemClick={this.toggleDetailsPanel(item.id)}
                    onTitleChange={this.handleProductTitleChange}/>
            ))
        );
    }

    render() {
        return (
            <div className={app_container}>
                <header className={header}>
                    <h1>{'Shopping List'}</h1>
                </header>
                <div className={sub_container}>
                    <div className={container1}>
                        <div className={list_container}>
                            <div className={sub_header}>
                                <h3>{'ADD YOUR ITEMS HERE'}</h3>
                            </div>
                            {this.state.listItems ? this.renderList() : 'Loading' }
                            <div className={add_item_div}>
                                <AddItem placeHolder={'Add Item'}
                                         onEnterKey={this.addListItem}
                                />
                            </div>
                        </div>
                        <div className={details_container}>
                            <div className={sub_header}>
                                <h3>{'Item Details'}</h3>
                            </div>
                            {this.state.selectedItem ? <ItemDetails handleSubmit={this.saveDetails} item={this.state.selectedItem}/> : null}
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}