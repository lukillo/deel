const chai  = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe('Test Health controller', ()=>{

  it('Health - Call ok',  ()=>{

    const health = require('../../../src/controller/health');

    const response = {
      status:"OK"
    };

    let responseJson = sinon.stub();
    responseJson.withArgs(response).returns('{"status":"OK"}');

    let mockResponse = {
      json:responseJson
    };

    let responseStatus = sinon.stub();
    responseStatus.withArgs(200).returns(mockResponse);

    const res = {
      status:responseStatus
    }; 

    const req = {
      params:{
        clientId:1111
      }
    };

     health(req,res);
    chai.expect(res.status.firstCall.args[0]).to.be.equal(200);
    chai.expect(mockResponse.json.firstCall.args[0]).to.be.eql({ health: 'OK' });
    
  });

});