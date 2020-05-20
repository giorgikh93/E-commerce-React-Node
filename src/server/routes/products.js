const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: true }));


const multer = require('multer');

const imageName = Date.now() + '-';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/pictures')

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
        savedProducts = productHandler.getProducts()
        body.size = JSON.parse(body.size)
        body.freeshipping = JSON.parse(body.freeshipping)

        if (file != undefined) {
            body.image = `${imageName}${file.originalname}`
        }
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
        savedProducts = productHandler.getProducts()
        body.size = JSON.parse(body.size)
        body.freeshipping = JSON.parse(body.freeshipping)

        if (file != undefined) {
            body.image = `${imageName}${file.originalname}`
        }
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


module.exports = router;