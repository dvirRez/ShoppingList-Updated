import React from 'react';
import ItemDetails from '../ItemDetails/ItemDetails';
import ShoppingList from '../ShoppingList/ShoppingList';
import getListItems from '../../helpers/api';
import styles from './styles.css';

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

    render() {
        return (
            <div className={styles.app_container}>
                <header className={styles.header}>
                    <span>{'Shopping List'}</span>
                </header>
                <div className={styles.sub_container}>
                    <div className={styles.container1}>
                        <div className={styles.list_outer_container}>
                            {this.state.listItems ? <ShoppingList listItems={this.state.listItems} addListItem={this.addListItem} removeListItem={this.removeListItem} onItemClick={this.toggleDetailsPanel} onTitleChange={this.handleProductTitleChange} /> : null}
                        </div>
                        <div className={styles.details_outer_container}>
                            {this.state.selectedItem ? <ItemDetails handleSubmit={this.saveDetails} item={this.state.selectedItem}/> : null}
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}