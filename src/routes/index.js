/**
 * Required modules.
 */
 const health = require('../controller/health');
 const notFound = require('../controller/not-found');
 const {getProfile} = require('../middleware/getProfile')
 const {maakeDeposit} = require('../controller/balances');
 const {getUnpaidJobs, payJob} = require('../controller/jobs');
 const {getContractById, getAllContracts} = require('../controller/contracts');
 const {getBestProfession, getClientMostPaid} = require('../controller/admin')

 //Bind path with route.
 const bind = app => {
   
   app.get('/contracts/:id',getProfile, getContractById);
   app.get('/contracts',getProfile, getAllContracts);
   app.get('/jobs/unpaid',getProfile, getUnpaidJobs);
   app.post('/jobs/:job_id/pay',getProfile, payJob);
   app.post('/balances/deposit/:userId',getProfile, maakeDeposit);
   app.get('/admin/best-profession',getProfile, getBestProfession);
   app.get('/admin/best-clients',getProfile, getClientMostPaid);
   app.get('/health', health);
   app.get('*', notFound);
 
 }
 
 module.exports = {
   bind
 };
 