const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.updateProduct = async (req, res, next) => {
    try {
  
      const [row] = await conn.execute(
          "SELECT * FROM `product` WHERE `id_account`=? AND `id`=?" ,
          [req.params.id_account, req.params.id]
      );
  
      if (row.length === 0) {
        return res.status(404).json({
          message: "Invalid ID",
        });
      }
  
      if (req.body.name) row[0].name = req.body.name;
  
      if (req.body.quantity) row[0].quantity = req.body.quantity;

      if (req.body.price) row[0].price = req.body.price;

      const [update] = await conn.execute(
        "UPDATE `product` SET `name`=?, `quantity`=?, `price`=? WHERE `id_account`=? AND `id`=?",
        [row[0].name, row[0].quantity, row[0].price, req.params.id_account, req.params.id]
      );
  
      if (update.affectedRows === 1) {
        return res.json({
          message: "The Product has been successfully updated.",
        });
      }
  
    } catch (err) {
      next(err);
    }
  
  };