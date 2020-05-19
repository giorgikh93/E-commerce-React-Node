const express = require('express');
const path = require('path');
const products = require('./routes/products');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


/////////////////
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/pictures')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage }).single('image')

app.use( products);

// app.post('/admin', (req, res) => {
//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json(err)
//         } else if (err) {
//             console.log(err)
//             return res.status(500).json(err)
//         }
//         console.log(req.body)
//         const body = req.body;
//         const file = req.file;
//         return res.status(200).send({ body, file })
//     })
// })




app.listen(5000);
