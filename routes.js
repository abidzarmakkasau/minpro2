const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const {getList} = require('./controllers/getListController');
const {deleteUser} = require('./controllers/deleteUserController');
const {inputProduct} = require('./controllers/inputProductController');
const {listProduct} = require('./controllers/getListProductController');
const {deleteProduct} = require('./controllers/deleteProductController');
const {updateProduct} = require('./controllers/updateProductController');

router.post('/register', [
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('password',"The Password must be of minimum 4 characters length")
    .notEmpty()
    .trim()
    .isLength({ min: 4 }),
    body('address',"Insert your addresss")
    .notEmpty()
    .escape()
    .trim(),
    body('phone_number',"Insert your phone number")
    .notEmpty()
    .escape()
    .trim(),
], register);

router.post('/login',[
    body('name',"Invalid name")
    .notEmpty()
    .escape()
    .trim(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], login);

router.get('/getuser',getUser);

router.get('/getlist',getList);

router.delete('/deleteuser',[ 
    body('name', "Invalid name")
    .notEmpty()
    .escape()
    .trim(),
], deleteUser);

router.post('/inputproduct/:id_account',[
    body('name',"Insert name")
    .notEmpty()
    .trim()
    .isLength({ min: 4 }),
    body('quantity',"Insert quantity")
    .notEmpty()
    .escape()
    .trim(),
    body('price',"Insert price")
    .notEmpty()
    .escape()
    .trim(),
],inputProduct);

router.get('/listproduct',listProduct);

router.delete('/deleteproduct',[ 
    body('name', "Invalid name")
    .notEmpty()
    .escape()
    .trim(),
], deleteProduct);

router.put('/updateproduct/:id_account/:id',[
    body('name',"Insert name")
    .notEmpty()
    .trim()
    .isLength({ min: 4 }),
    body('quantity',"Insert quantity")
    .notEmpty()
    .escape()
    .trim(),
    body('price',"Insert price")
    .notEmpty()
    .escape()
    .trim(),
],updateProduct);

module.exports = router;