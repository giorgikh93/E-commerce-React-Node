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
    cookie: ({ maxAge: 6000000 })
}))


const multer = require('multer');

const imageName = Date.now() + '-';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/pictures')

    },

    filename: function (req, file, cb) {
        console.log(file)
        cb(null, imageName + file.originalname)
    }
});


const upload = multer({ storage: storage }).single('image')


const ProductHandler = require('../models/ProductHandler')
const productHandler = new ProductHandler()


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

router.route('/contact').post((req, res) => {
    const text = req.body.data
    productHandler.addContactText(text)
    res.send('Your message has been sent').status(200)
})

router.route('/cart').post((req, res) => {
    let productId = req.body.id
    let quantity = req.body.quantity
    console.log(req.session.cart)
    if (req.session.cart) {
        console.log('session cart existed')
        if (req.session.cart.hasOwnProperty(productId)) {
            console.log(productId)
        }
        req.session.cart[productId] = quantity
    } else {
        req.session.cart = {}
        req.session.cart[productId] = quantity
    }

    // if (req.session.cart) {
    //     if (req.session.cart.hasOwnProperty(productId)) {
    //         quantity += req.session.cart[productId]
    //     }
    //     req.session.cart[productId] = quantity
    // } else {
    //     req.session.cart = {}
    //     req.session.cart[productId] = quantity
    // }

    res.sendStatus(200)
})


router.route('/cart').get((req, res) => {
    let cartItems = []
    let total = 0;
    let shoppingCart = req.session.cart
    let products = productHandler.getProducts()
    if (!shoppingCart) {
        return res.send('Cart is Empty')
    } else {
        for (let productId in shoppingCart) {
            let cartProduct = products.find((product) => product.id === productId)
            let newProduct = {
                id: cartProduct.id,
                name: cartProduct.name,
                description: cartProduct.description,
                quantity: shoppingCart[productId],
                price: cartProduct.price,
                image: cartProduct.image,
                freeshipping: cartProduct.freeshipping
            }
            cartItems.push(newProduct)
        }
    }
    console.log(cartItems)
})

module.exports = router;