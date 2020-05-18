const express = require('express');
const router = express.Router();
const path = require('path')


const session = require('express-session')
const cookie = require('cookies')
const cookieParser = require('cookie-parser')
router.use(express.urlencoded({ extended: true }));
router.use(session({
        secret: 'secret', resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 100000 }
}))


const multer = require('multer');
const upload = multer({ dest: './src/pictures' });

const ProductHandler = require('../models/ProductHandler')
const productHandler = new ProductHandler()


router.route('/admin').get((req, res) => {
        // const products = productHandler.getProducts()
        // res.json(products)
        let productInCart = []
        let shoppingCart = req.session.cart;
        if(!shoppingCart){
                return res.send('')
        }else{
                res.send(shoppingCart)
        }

})


router.route('/admin', upload.single('image')).post((req, res) => {
        let pictureUrl = path.join('./src/pictures', req.body.file)
        console.log(req.body)
        if (!req.body) {
                res.sendStatus(400)
        } else {
                productHandler.addProduct(req.body)
        }
        // const productId = req.body.id
        // let cart = req.session.cart
        // if (cart) {
        //         ///quantity add//
        // } else {
        //         req.session.cart = {}
        //         req.session.cart[productId] = req.body
        //         console.log(req.session.cart)
        // }
})



module.exports = router;