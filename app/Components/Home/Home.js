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

    render() {
        return (
            <div>
                {
                    this.state.listItems.map( item => (
                        <ListItem
                            key={item.id}
                            id={item.id}
                            title={item.name} >
                        </ListItem>
                    ))
                }
            </div>
        );
    }
}