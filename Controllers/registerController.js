const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();

exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `name` FROM `account` WHERE `name`=?",
            [req.body.name]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The name already in use",
            });
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await conn.execute('INSERT INTO `account`(`name`,`password`,`address`,`phone_number`) VALUES(?,?,?,?)',[
            req.body.name,
            hashPass,
            req.body.address,
            req.body.phone_number,
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
        
    }catch(err){
        next(err);
    }
}