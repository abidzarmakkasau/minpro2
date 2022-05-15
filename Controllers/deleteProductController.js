const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.deleteProduct = async (req,res,next) => {

    try {

        const [row] = await conn.execute(
            "DELETE FROM `product` WHERE `name`=?",
            [req.body.name]
        );
    
        if (row.affectedRows === 0) {
          return res.status(404).json({
            message: "Invalid product name (No User Found!)",
          });
        }
    
        res.status(200).json({
          message: "The product has been deleted successfully.",
        });
        
      } catch (err) {
        next(err);
      }
}