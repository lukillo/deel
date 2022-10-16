const { Op } = require("sequelize");

const getUnpaidJobs = async (req, res) =>{
    const {Job, Contract} = req.app.get('models')

    const where ={
        status: {
            [Op.or]: ['new', 'in_progress']
        }
    };
    if (req.profile.type == 'client') {
        where['ClientId'] = req.profile.id;
    } else {
        where['ContractorId']= req.profile.id;
    }

    const jobs = await Job.findAll({
        where: {
            paymentDate: null,
        },
        include: [{
            model: Contract,
            where
        }]
    })
    if(!jobs) return res.status(404).end()
    res.json(jobs)  
}


const payJob = async (req, res) =>{

    if (!req.params.job_id) return res.status(400).end();
    if (req.profile.type != 'client') return res.status(400).end();

    const {Job, Contract, Profile} = req.app.get('models');

    const singleJob = await Job.findOne({
        where: {
            id: req.params.job_id,
            paymentDate: null,
        },
        include: [{
            model: Contract,
            where: {
                'ClientId': req.profile.id,
                status: {
                    [Op.or]: ['new', 'in_progress']
                }
            }
        }]
    })

    const [client, contractor] = await Promise.all([
        Profile.findOne({where: { id: singleJob.Contract.ClientId}}),
        Profile.findOne({where: { id: singleJob.Contract.ContractorId}})
    ])

    if (!client || !contractor) return res.status(404).end();

    if (client.balance < singleJob.price) return res.status(400).end();

    client.balance = client.balance - singleJob.price;
    contractor.balance = contractor.balance + singleJob.price;


    await client.save();
    await contractor.save();

    return res.status(200).end() 

}

module.exports = {
    getUnpaidJobs,
    payJob
}