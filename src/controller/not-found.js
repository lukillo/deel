/**
 * Not found controller.
 * @param {object} req request object.
 * @param {object} res response object.
 */
const notFound = (req,res)=>{

   res.status(404).json({"error":"Route not found."});

}

module.exports = notFound;
