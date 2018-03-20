import React from 'react';
import getListItems from '../../helpers/api';
import ListItem from '../ListItem/ListItem';

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

    render() {
        return (
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
            </div>
        );
    }
}