import React from 'react';
import ItemDetails from '../ItemDetails/ItemDetails';
import ShoppingList from '../ShoppingList/ShoppingList';
import { Alert } from 'react-bootstrap';
import Loading from '../Loading/Loading';
import getListItems from '../../helpers/api';
import styles from './styles.css';

export default class App extends React.Component {

    state = {
        listItems: null,
        selectedItem: null,
    };

    componentDidMount() {
        getListItems()
            .then(listItems => {
                this.setState({
                    listItems,
                    nextId: listItems.length, // since ids start from 0
                });
            });
    }

    findItemById = (itemId) => {
        return this.state.listItems.find((item) => item.id === itemId)
    };

    // If enter key was pressed add new item to array
    // Consider refactoring to using component state instead
    addListItem = (e) => {
        if(e.charCode==13) {
            const newName = e.target.value;
            if(newName !== '') {
                this.setState((prevState, props) => ({
                    listItems: [
                        ...prevState.listItems,
                        {
                            id: prevState.nextId,
                            name: newName,
                            quantity: 0,
                            price: 0,
                            description: '',
                        }
                    ],
                    nextId: prevState.nextId + 1,
                }));
                e.target.value = '';
            }
        }

    };

    removeListItem = (itemId) => (e) => {
        this.setState((prevState, props) => ({
            listItems: prevState.listItems.filter( item => item.id !== itemId),
            selectedItem: prevState.selectedItem && prevState.selectedItem.id === itemId ? null : prevState.selectedItem, // If removed item is selected close details panel
        }));
    };

    // Updating selected item for the details component
    toggleDetailsPanel = (itemId) => (e) => {
        this.setState((prevState, props) => {
            return {
                selectedItem: (prevState.selectedItem && prevState.selectedItem.id === itemId) ? null : this.findItemById(itemId),
            };
        });
    };

    // Function to set new title of items (editing inline text)
    handleProductTitleChange = (itemId, newName) => {
        const indexToUpdate = this.state.listItems.findIndex((item) => item.id === itemId);
        let newListItems = [...this.state.listItems];
        newListItems[indexToUpdate].name = newName !== '' ? newName : newListItems[indexToUpdate].name; // Make sure user can't input empty string

        this.setState({
            listItems: newListItems,
        });
    };

    // Save details after clicking details save button
    saveDetails = (updatedItem) => {
        const indexToUpdate = this.state.listItems.findIndex((item) => item.id === updatedItem.id);
        let newListItems = [...this.state.listItems];
        newListItems[indexToUpdate] = updatedItem;

        this.setState({
            listItems: newListItems,
            selectedItem: null,
            showAlert: true,
        });
    };

    handleDismiss = () => {
        this.setState({
            showAlert: false,
        });
    };

    renderSavedAlert = () => (
        <div className={styles.alert_div}>
            <Alert bsStyle="success" onDismiss={this.handleDismiss}>
                <p>
                    {'Item Saved'}
                </p>
            </Alert>
        </div>
    );

    renderBody = () => (
        <div className={styles.app_container}>
            <header className={styles.header}>
                <span>{'Shopping List'}</span>
            </header>
            {this.state.showAlert ? this.renderSavedAlert() : null}
            <div className={styles.sub_container}>
                <div className={styles.container1}>
                    <div className={styles.list_outer_container}>
                        <ShoppingList
                            listItems={this.state.listItems}
                            addListItem={this.addListItem}
                            removeListItem={this.removeListItem}
                            onItemClick={this.toggleDetailsPanel}
                            onTitleChange={this.handleProductTitleChange}
                        />
                    </div>
                    <div className={styles.details_outer_container}>
                        {this.state.selectedItem ? <ItemDetails handleSubmit={this.saveDetails} item={this.state.selectedItem}/> : null}
                    </div>
                </div>
            </div>
        </div>
    );

    renderLoading = () => (
        <div className={styles.loading_div}>
            <Loading />
        </div>
    );

    render() {
        return (
            this.state.listItems ?  this.renderBody() : this.renderLoading()
        );
    }

}