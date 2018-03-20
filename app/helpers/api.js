export default function getListItems() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve([
            {
                id: 0,
                name: 'Bread',
                quantity: 3,
                price: 5,
                description: 'Bread is bread',
            },
            {
                id: 1,
                name: 'Milk',
                quantity: 3,
                price: 5,
                description: 'Milk is Milk',
            },
            {
                id: 2,
                name: 'Fish',
                quantity: 3,
                price: 5,
                description: 'Fish is Fish',
            }
        ]), 2000);
    });
}