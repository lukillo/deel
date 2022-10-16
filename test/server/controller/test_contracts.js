const chai  = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe('Test contract controller', ()=>{

    it('contract - getContractById ok', async ()=>{
        const {getContractById} = require('../../../src/controller/contracts');
      
        let responseStatus = sinon.stub();
        let responseJson = sinon.stub().returns(true);
        let mockResponse = {
            json:responseJson
        };
        responseStatus.withArgs(200).returns(mockResponse);
        const res = {
            json: responseJson
        }; 
    
        const req = {
        profile: {
            id : 1111
        },
        app: {
            get: sinon.stub().returns({
                Contract: {
                    findOne: sinon.stub().resolves(true)
                }
            })
        }, 
        params:{
            id:1111
        }
        };
        await getContractById(req, res);
        chai.expect(res.json.calledOnce).to.be.eql(true);
        chai.expect(responseJson.firstCall.args[0]).to.be.eql(true);
      
    })
    it('contract - getContractById ok with contractor profile', async ()=>{
        const {getContractById} = require('../../../src/controller/contracts');
      
        let responseStatus = sinon.stub();
        let responseJson = sinon.stub().returns(true);
        let mockResponse = {
            json:responseJson
        };
        responseStatus.withArgs(200).returns(mockResponse);
        const res = {
            json: responseJson
        }; 
    
        const req = {
        profile: {
            id : 1111,
            type: 'client'
        },
        app: {
            get: sinon.stub().returns({
                Contract: {
                    findOne: sinon.stub().resolves(true)
                }
            })
        }, 
        params:{
            id:1111
        }
        };
        await getContractById(req, res);
        chai.expect(res.json.calledOnce).to.be.eql(true);
        chai.expect(responseJson.firstCall.args[0]).to.be.eql(true);
      
    })
    it('contract - getContractById throws error', async ()=>{
        const {getContractById} = require('../../../src/controller/contracts');
      
        let responseStatus = sinon.stub();
        let responseJson = sinon.stub().returns(true);
        let mockResponse = {
            end: sinon.stub()
        };
        responseStatus.withArgs(404).returns(mockResponse);
        const res = {
            json: responseJson,
            status:responseStatus
        }; 
    
        const req = {
        profile: {
            id : 1111
        },
        app: {
            get: sinon.stub().returns({
                Contract: {
                    findOne: sinon.stub().throws()
                }
            })
        }, 
        params:{
            id:11
        }
        };
        chai.expect(()=>getContractById(req, res)).throws
    })
    it('contract - getContractById throws error catched', async ()=>{
        const {getContractById} = require('../../../src/controller/contracts');
      
        let responseStatus = sinon.stub();
        let responseJson = sinon.stub().returns(true);
        let mockResponse = {
            end: sinon.stub()
        };
        responseStatus.withArgs(500).returns(mockResponse);
        const res = {
            json: responseJson,
            status:responseStatus
        }; 
    
        const req = {
            profile: {
                id : 1111
            },
            app: {
                get: sinon.stub().returns({
                    Contract: {
                        findOne: sinon.stub().throws()
                    }
                })
            }, 
            params:{
                id:11
            }
        };
        await getContractById(req, res);
        chai.expect(responseStatus.callCount).to.be.eql(1);
        chai.expect(responseStatus.firstCall.args[0]).to.be.eql(500);
    })
    it('contract - getContractById returns 404', async ()=>{
        const {getContractById} = require('../../../src/controller/contracts');
      
        let responseStatus = sinon.stub();
        let responseJson = sinon.stub().returns(true);
        let mockResponse = {
            end: sinon.stub()
        };
        responseStatus.withArgs(404).returns(mockResponse);
        const res = {
            json: responseJson,
            status:responseStatus
        }; 
    
        const req = {
        profile: {
            id : 1111
        },
        app: {
            get: sinon.stub().returns({
                Contract: {
                    findOne: sinon.stub().resolves(null)
                }
            })
        }, 
        params:{
            id:11
        }
        };
        await getContractById(req, res);
        chai.expect(responseStatus.calledOnce).to.be.eql(true);
        chai.expect(responseStatus.firstCall.args[0]).to.be.eql(404);
      
    })
    it('contract - getContractById ok with contractor profile', async ()=>{
        const {getContractById} = require('../../../src/controller/contracts');
      
        let responseStatus = sinon.stub();
        let responseJson = sinon.stub().returns(true);
        let mockResponse = {
            json:responseJson
        };
        responseStatus.withArgs(200).returns(mockResponse);
        const res = {
            json: responseJson
        }; 
    
        const req = {
        profile: {
            id : 1111,
            type: 'client'
        },
        app: {
            get: sinon.stub().returns({
                Contract: {
                    findOne: sinon.stub().resolves(true)
                }
            })
        }, 
        params:{
            id:1111
        }
        };
        await getContractById(req, res);
        chai.expect(res.json.calledOnce).to.be.eql(true);
        chai.expect(responseJson.firstCall.args[0]).to.be.eql(true);
      
    })
    it('contract - getContractById ok with client profile', async ()=>{
        const {getContractById} = require('../../../src/controller/contracts');
      
        let responseStatus = sinon.stub();
        let responseJson = sinon.stub().returns(true);
        let mockResponse = {
            json:responseJson
        };
        responseStatus.withArgs(200).returns(mockResponse);
        const res = {
            json: responseJson
        }; 
    
        const req = {
        profile: {
            id : 1111,
            type: 'client'
        },
        app: {
            get: sinon.stub().returns({
                Contract: {
                    findOne: sinon.stub().resolves(true)
                }
            })
        }, 
        params:{
            id:1111
        }
        };
        await getContractById(req, res);
        chai.expect(res.json.calledOnce).to.be.eql(true);
        chai.expect(responseJson.firstCall.args[0]).to.be.eql(true);
      
    })
    it('contract - getContractById returns 400', async ()=>{
        const {getContractById} = require('../../../src/controller/contracts');
      
        let responseStatus = sinon.stub();
        let responseJson = sinon.stub().returns(true);
        let mockResponse = {
            end: sinon.stub()
        };
        responseStatus.withArgs(400).returns(mockResponse);
        const res = {
            json: responseJson,
            status:responseStatus
        }; 
    
        const req = {
        profile: {
            id : 1111
        },
        app: {
            get: sinon.stub().returns({
                Contract: {
                    findOne: sinon.stub().resolves(true)
                }
            })
        }, 
        params:{
        }
        };
        await getContractById(req, res);
        chai.expect(responseStatus.calledOnce).to.be.eql(true);
        chai.expect(responseStatus.firstCall.args[0]).to.be.eql(400);
      
    })
})