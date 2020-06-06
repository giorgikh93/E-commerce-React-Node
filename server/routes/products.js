const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: false }));


const cookie = require('cookies')
const cookieParser = require('cookie-parser')
const session = require('express-session')
router.use(cookieParser())
router.use(session({
    secret: 'finalProject',
    resave: true,
    saveUninitialized: true,
    cookie: ({ maxAge: 1000000 })
}))


const multer = require('multer');

const imageName = Date.now() + '-';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/pictures')
    },

    filename: function (req, file, cb) {
        cb(null, imageName + file.originalname)
    }
});


const upload = multer({ storage: storage }).single('image')


const ProductHandler = require('../models/ProductHandler')
const productHandler = new ProductHandler()

const CartItemsHandler = require('../models/CartItemsHandler')
const cartItemsHandler = new CartItemsHandler()

const ContactHandler = require('../models/ContactHandler')
const contactHandler = new ContactHandler()


router.route('/admin').get((req, res) => {
    let data = productHandler.getProducts()

    res.json(data)
})

router.route('/admin').post((req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        const body = req.body
        const file = req.file
        body.size = JSON.parse(body.size)
        body.image = (file != undefined ? `${imageName}${file.originalname}` : '')
        body.freeshipping = JSON.parse(body.freeshipping)
        productHandler.addProduct(body)

        return res.status(200).send(productHandler.getProducts())
    })
})

router.route('/admin/:id').get((req, res) => {
    if (!req.params.id) {
        res.sendStatus(400)
    }
    const product = productHandler.getProductById(req.params.id)
    res.json(product)
})

router.route('/admin/:id').put((req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            console.log(err)
            return res.status(500).json(err)
        }

        const body = req.body
        const file = req.file

        body.size = JSON.parse(body.size)
        body.image = (file != undefined ? `${imageName}${file.originalname}` : '')
        body.freeshipping = JSON.parse(body.freeshipping)

        productHandler.updateProduct(body.id, body)

        return res.status(200).send(productHandler.getProducts())
    })

})

router.route('/admin/:id').delete((req, res) => {
    if (!req.params.id) {
        return res.sendStatus(400)
    }

    productHandler.deleteProduct(req.params.id)

    res.send(productHandler.getProducts())


})

//Contact
router.route('/contact').post((req, res) => {
    const text = req.body.data
    contactHandler.addContactText(text)
    res.send('Your message has been sent').status(200)
})

//Cart
router.route('/cart').post((req, res) => {
    let productId = req.body.item.id
    let operator = req.body.operator
    const item = cartItemsHandler.getCartItemById(productId)
    if (item) {
        cartItemsHandler.updateCartItems(productId, operator)

    } else {
        req.body.item['quantity'] = 1
        req.body.item['total'] = req.body.item.price
        cartItemsHandler.addCartItems(req.body.item)
    }
    const products = cartItemsHandler.getCartItems()
    req.session.cart = products
    res.send(products)
})

router.route('/cart').get((req, res) => {
    const products = cartItemsHandler.getCartItems()
    res.send(req.session.cart !== undefined ? products : cartItemsHandler.removeAllCartItem())
})

router.route('/cart').delete((req, res, err) => {
    if (!req.body.source) {
        throw err
    }
    const productId = req.body.source
    cartItemsHandler.deleteCartItem(productId)
    const products = cartItemsHandler.getCartItems()
    req.session.cart = products
    res.send(req.session.cart)
})

router.route('/checkout').delete((req, res) => {
    res.send(cartItemsHandler.removeAllCartItem())
})

module.exports = router;