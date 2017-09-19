const chai = require('chai');
const { assert, expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();


const {Player} = require('../../models');

describe('Player attributes', () => {

  it('should be invalid if screen_name is empty', (done) => {
    new Player().validate().catch(error => {
      let errorMessages = error.errors.map(err => err.message);
      expect(errorMessages).to.contain('screen_name cannot be null');
      done();
    });
  });

  it('should be invalid if email is empty', (done) => {
    new Player().validate().catch(error => {
      let errorMessages = error.errors.map(err => err.message);
      expect(errorMessages).to.contain('email cannot be null');
      done();
    });
  });

  it('should be invalid if full_name is empty', (done) => {
    new Player().validate().catch(error => {
      let errorMessages = error.errors.map(err => err.message);
      expect(errorMessages).to.contain('full_name cannot be null');
      done();
    });
  });

  it('should be invalid if email is invalid format', (done) => {
    new Player({email: 'invalidEmail'}).validate().catch(error => {
      let errorValues = error.errors.map(err => err.value);
      expect(errorValues).to.contain('invalidEmail');
      done();
    });
  });
});

describe('updateSelf', () => {
  let player = new Player({email: 'jdoe1@gmail.com', full_name: 'John Doe'});
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => sandbox.restore());

  it('should update the player\'s email, if specified', (done) => {
    let newParams = {email: 'jdoe2@gmail.com'};

    sandbox.stub(player, 'update').returns(new Promise((resolve) => resolve(null)));
    player.updateSelf(newParams).then(() => {
      sinon.assert.calledWith(player.update, {email: 'jdoe2@gmail.com', full_name: 'John Doe'});
      done();
    });
  });

  it('should update the player\'s name, if specified', (done) => {
    let newParams = {full_name: 'Jane Doe'};

    sandbox.stub(player, 'update').returns(new Promise((resolve) => resolve(null)));
    player.updateSelf(newParams).then(() => {
      sinon.assert.calledWith(player.update, {email: 'jdoe1@gmail.com', full_name: 'Jane Doe'});
      done();
    });
  });

  it('should update the player\'s email and  name, if specified', (done) => {
    let newParams = {email: 'jdoe2@gmail.com', full_name: 'Jane Doe'};

    sandbox.stub(player, 'update').returns(new Promise((resolve) => resolve(null)));
    player.updateSelf(newParams).then(() => {
      sinon.assert.calledWith(player.update, {email: 'jdoe2@gmail.com', full_name: 'Jane Doe'});
      done();
    });
  });

  it('should resolve an updated player', (done) => {
    let updatedPlayer = {full_name: 'John Doe', email: 'jdoe@gmail.com', screen_name: 'jdoe500'};
    sandbox.stub(player, 'update').resolves(updatedPlayer);
    player.updateSelf({}).then((player) => { 
      expect(player).to.deep.equals(updatedPlayer);
      done();
    });
  });
});