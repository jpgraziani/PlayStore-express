const supertest = require('supertest');
const app = require('../app');
const data = require('../playlist-data');
const { expect } = require('chai');
const { request } = require('../app');


describe('GET /apps', () => {
  it('returns json', () => {
    return supertest(app)
      .get('/apps')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('returns the whole dataset with NO query params', () => {
    return supertest(app)
      .get('/apps')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body).to.deep.equal(data)
      })
  });

  it('throws an error if the given genre is not supported', () => {
    return supertest(app)
      .get('/apps')
      .query({genres: 'invalid'})
      .expect(400)
      .then(res => {
        const errorMsg = 'You must supply a valid genre';
        expect(res.text).to.equal(errorMsg)
      })
  });

  it('returns an error if sort is not of Rating or App', () => {
    return supertest(app)
      .get('/apps')
      .query({sort: 'invalid'})
      .expect(400)
      .then(res => {
        expect(res.text).to.equal('Sorry must be one of rating or app')
      })
  });
})