const express = require('express');
const path = require('path');
const products = require('./routes/products');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));




app.use(products);





app.listen(5000);
