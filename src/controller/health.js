/**
 * Health controller.
 * @param {object} req request object.
 * @param {object} res response object.
 */
 const health = (req,res, next)=>{ 
    try {
      res.status(200).json({"health":"OK"});
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = health
  