const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

const Product = mongoose.model('Product', {
    id: String,
    name: String,
    price: String,
    description: String,
    stock: Number,
    image_url: String,
    colors: String
});

app.delete('/:id', async(req,res) =>{
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
});

app.put('/:id', async(req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        image_url: req.body.image_url,
        colors: req.body.colors
    },{
        new:true
    }
    );
    return res.send(product);
} )

app.get('/', async (req, res) => {
    const products = await Product.find()
    res.send(products);
});

app.post('/', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        image_url: req.body.image_url,
        colors: req.body.colors
    });

   await product.save();
   res.send(product);
})

app.listen(PORT, () => {
    mongoose.connect('mongodb+srv://Jhay:lo4i58VX4HCtaUHX@techgamer-api.byryjva.mongodb.net/?retryWrites=true&w=majority');
    console.log('App running ');
});