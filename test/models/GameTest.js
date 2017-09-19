const chai = require('chai');
const { assert, expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();


const {Game} = require('../../models');

describe('Game attributes', () => {

  it('should be invalid if name is null', (done) => {
    new Game().validate().catch(error => {
      let errorMessages = error.errors.map(err => err.message);
      expect(errorMessages).to.contain('name cannot be null');
      done();
    });
  });

  it('should not return validation error on name', (done) => {
    new Game({name: "7 shooter"}).validate().then((validationResult) => {
      expect(validationResult).to.not.be.an('error');
      done();
    });
  });
});