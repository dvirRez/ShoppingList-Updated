import React from 'react';
import getListItems from '../../helpers/api';
import ListItem from '../ListItem/ListItem';
import AddItem from '../AddItem/AddItem';

export default class Home extends React.Component {
    state = {
        listItems: [],
    };

    componentDidMount() {
        getListItems()
            .then(listItems => {
                this.setState({
                    listItems,
                });
            });
    }

    removeListItem = (itemId) => (e) => {
        this.setState({
            listItems: this.state.listItems.filter( item => item.id !== itemId),
        });
    };

    addListItem = (e) => {
        if(e.charCode==13) {
            const newItemName = e.target.value || '';
            this.setState({
                listItems: [
                    ...this.state.listItems,
                    {
                        id: this.state.listItems.length + 1,
                        name: newItemName,
                        quantity: 0,
                        price: 0,
                        description: 'Add description',
                    }
                ]
            });
        }
    };

    renderHomeBody = () => (
        <div>
            {
                this.state.listItems.map( item => (
                    <ListItem
                        key={item.id}
                        id={item.id}
                        removeItem={this.removeListItem(item.id)}
                        title={item.name} >
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
            this.state.listItems.length > 0 ? this.renderHomeBody() : 'Loading'
        );
    }
}