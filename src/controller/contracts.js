const { Op } = require("sequelize");

const getContractById = async (req, res) =>{
    try {
        const {Contract} = req.app.get('models')

        if (!req.params.id) return res.status(400).end();
    
        const where ={
            id: req.params.id
        } 
        if (req.profile.type == 'client') {
            where['ClientId'] = req.profile.id;
        } else {
            where['ContractorId']= req.profile.id;
        }
    
        const contract = await Contract.findOne({where})
        if(!contract) return res.status(404).end()
        res.json(contract)  
    } catch (error) {
        console.log(error);
        return res.status(500).end()  
    }

}

const getAllContracts = async (req, res) =>{
    try {
        const {Contract} = req.app.get('models')

        const where ={
            status: {
                [Op.or]: ['new', 'in_progress']
            }
        } 
        if (req.profile.type == 'client') {
            where['ClientId'] = req.profile.id;
        } else {
            where['ContractorId']= req.profile.id;
        }

        const contract = await Contract.findAll({where})
        if(!contract) return res.status(404).end()
        res.json(contract)
    } catch (error) {
        console.log(error);
        return res.status(500).end()     
    }  
}

module.exports = {
    getContractById,
    getAllContracts
};
