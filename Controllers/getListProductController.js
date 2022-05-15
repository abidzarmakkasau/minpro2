const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.listProduct = async (req,res,next) => {
  
    try {
  
        const [rows] = await conn.execute("SELECT * FROM `product`");
    
        if (rows.length === 0) {
          return res.status(404).json({
            message:
              "There are no users in the database, please insert some users.",
          });
        }
    
        res.status(200).json(rows);
    
      } catch (err) {
        next(err);
      }
}