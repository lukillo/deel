const{sequelize}  = require('../model');

const getBestProfession = async (req, res) =>{
    try {
        
        if (!req.query.start || !req.query.end) return res.status(400).end();
        const {start, end} = req.query
        const query = `select firstname, lastname,profession, max(suma) as totalAmount   from (select SUM(price) as suma, paymentDate , ContractId, p.id, p.firstName as firstName, p.lastName  as lastName, p.profession as profession  from Jobs j 
                inner join Contracts c on j.ContractId = c.id 
                INNER JOIN Profiles p on c.ContractorId = p.id 
                WHERE paid = 1 and p."type"  = "contractor"
                and paymentDate BETWEEN  "${start}" and "${end}"
                group by ContractId ORDER BY suma desc )`
    
                
        const result = await sequelize.query(query)
        if(!result) return res.status(404).end()
        res.json(result[0])  
    } catch (error) {
        console.log(error);
        return res.status(500).end()  
    }

}

const getClientMostPaid = async (req, res) =>{
    try {
        
        if (!req.query.start || !req.query.end) return res.status(400).end();
        const {start, end} = req.query
 
        const query = `select p.id, p.firstName as firstName, p.lastName  as lastName, p.profession as profession, SUM(price) as amountPaid, paymentDate , ContractId  from Jobs j 
        inner join Contracts c on j.ContractId = c.id 
        INNER JOIN Profiles p on c.ClientId  = p.id 
        WHERE paid = 1 and p."type"  = "client"
        and paymentDate BETWEEN  "${start}" and "${end}"
        group by ContractId ORDER BY amountPaid desc limit 2`
    
                
        const result = await sequelize.query(query)

        if(!result) return res.status(404).end()
        res.json(result[0])  
    } catch (error) {
        console.log(error);
        return res.status(500).end()  
    }

}

module.exports = {
    getBestProfession,
    getClientMostPaid
};