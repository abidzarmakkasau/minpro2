const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();

exports.inputProduct = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `name` FROM `product` WHERE `name`=?",
            [req.body.name]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The name already in use",
            });
        }

        const [rows] = await conn.execute('INSERT INTO `product`(`id_account`,`name`,`quantity`,`price`) VALUES(?,?,?,?)',[
            req.params.id_account,
            req.body.name,
            req.body.quantity,
            req.body.price,
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The product has been successfully inserted.",
            });
        }
        
    }catch(err){
        next(err);
    }
}