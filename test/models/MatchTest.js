const chai = require('chai');
const { assert, expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();


const {Match} = require('../../models');

describe('Match attributes', () => {

  it('should be invalid if started field is not a date', (done) => {
    new Match({started: "not-date"}).validate().catch(error => {
      let errorMessages = error.errors.map(err => err.message);
      expect(errorMessages).to.contain('Validation isDate on started failed');
      done();
    });
  });

  it('should not return validation error on started field, if started is a date', (done) => {
    new Match({started: new Date('5/13/91'), ended: 'not-date'}).validate().catch(error => {
      let errorMessages = error.errors.map(err => err.message);
      expect(errorMessages).to.not.contain('Validation isDate on started failed');
      done();
    });
  });

  it('should be invalid if started field is not a date', (done) => {
    new Match({ended: "not-date"}).validate().catch(error => {
      let errorMessages = error.errors.map(err => err.message);
      expect(errorMessages).to.contain('Validation isDate on ended failed');
      done();
    });
  });

  it('should not return validation error on ended field, if started is a date', (done) => {
    new Match({started: 'not-date', ended: new Date('5/13/91')}).validate().catch(error => {
      let errorMessages = error.errors.map(err => err.message);
      expect(errorMessages).to.not.contain('Validation isDate on ended failed');
      done();
    });
  });
});

describe('updateSelf', () => {
  let match = new Match({started: null, ended: null});
  let newDate = new Date('5/13/91');
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => sandbox.restore());

  it('should update the match\'s start time, if specified', (done) => {
    let newParams = {started: new Date('5/13/91')};

    sandbox.stub(match, 'update').returns(new Promise((resolve) => resolve(null)));
    match.updateSelf({started: newDate}).then(() => {
      sinon.assert.calledWith(match.update, {started: newDate, ended: null});
      done();
    });
  });

  it('should update the match\'s end time, if specified', (done) => {

    sandbox.stub(match, 'update').returns(new Promise((resolve) => resolve(null)));
    match.updateSelf({ended: newDate}).then(() => {
      sinon.assert.calledWith(match.update, {started: null, ended: newDate});
      done();
    });
  });

  it('should update the match\'s start and end time, if specified', (done) => {
    sandbox.stub(match, 'update').returns(new Promise((resolve) => resolve(null)));
    match.updateSelf({started: newDate, ended: newDate}).then(() => {
      sinon.assert.calledWith(match.update, {started: newDate, ended: newDate});
      done();
    });
  });
  
  it('should resolve an updated player', (done) => {
    let updatedMatch = {match_id: 1, game_id: 2, started: newDate, ended: newDate};
    sandbox.stub(match, 'update').resolves(updatedMatch);
    match.updateSelf({}).then((match) => { 
      expect(match).to.deep.equals(updatedMatch);
      done();
    });
  });
});