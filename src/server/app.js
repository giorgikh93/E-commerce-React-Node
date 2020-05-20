const express = require('express');
const path = require('path');
const products = require('./routes/products');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


/////////////////
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './src/pictures')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });
// const upload = multer({ storage: storage }).single('image')

app.use( products);





app.listen(5000);
