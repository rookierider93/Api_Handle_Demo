import express from 'express';

const app = express();


app.get('/api/products', (req, res) => {
    const products = [
        {
            id: 1,
            name: 'table wooden',
            price: 200,
        },
        {
            id: 2,
            name: 'table glass',
            price: 250,
        }
        ,
        {
            id: 3,
            name: 'table metal',
            price: 300,
        },
        {
            id: 4,
            name: 'table polyster',
            price: 400,
        }
    ];

    if (req.query.search) {
        const filterProducts = products.filter(product => product.name.includes(req.query.search));
        setTimeout(() => {
            res.send(filterProducts);
        }, 5000);

        return;
    }

    setTimeout(() => {
        res.send(products);
    }, (5000));

});


const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});