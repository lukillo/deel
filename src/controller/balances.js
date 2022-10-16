
const { Op } = require("sequelize");

const isAboveLimit = (contracts, amount)=>{
    let total = 0;

    contracts.map(contract => contract.Jobs.map(job => (total = total + job.price)))
    
    const perc = ((amount/total) * 100).toFixed(2);
    //Alowed percentage to deposit
    return (perc >= 25 ) 
}

const maakeDeposit = async (req, res) =>{
    try {
        
        if (!req.params.userId) return res.status(400).end();
        if (req.profile.type != 'client') return res.status(400).end();
        if (!req.body.amount || isNaN(req.body.amount)) return res.status(400).end();

        const {amount } = req.body;
        const {Job, Contract} = req.app.get('models');

        const contracts = await Contract.findAll({
            where: {
                ClientId: req.params.userId,
                status: {
                    [Op.or]: ['new', 'in_progress']
                }
            },
            include: [{
                model: Job,
                where: {
                    paymentDate: null,
                }
            }]
        });
        
    
        if (isAboveLimit(contracts, amount)) return res.json({message: 'Not enough limit'}).status(400).end()

        req.profile.balance = req.profile.balance + amount;
        await req.profile.save();

        res.status(200).json()
    } catch (error) {
        console.log(error);
        return res.status(500).end()     
    }
}

module.exports = {
    maakeDeposit
}