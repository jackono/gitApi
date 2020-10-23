const request = require('supertest')
const app = require('../server')

describe('Post Endpoints', () => {
  it('should save a comment to db', async () => {
    const orgName = 'xendit'
    const res = await request(app)
      .post(`/orgs/${orgName}/comments`)
      .send({
        comment: 'test is cool',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id');
  });
  it('should fetch all comments from a github org', async () => {
   const orgName = 'xendit'
   const res = await request(app).get(`/orgs/${orgName}/comments`);
   expect(res.statusCode).toEqual(200).
   expect(res.body).toHaveProperty('_id');
 });
   it('should soft delete all comments from db', async () => {
   const orgName = 'xendit'
   const res = await request(app).delete(`/orgs/${orgName}/comments`);
   expect(res.statusCode).toEqual(200);
 });
   it('should fetch all members from a github org', async () => {
   const orgName = 'xendit'
   const res = await request(app).get(`/orgs/${orgName}/members`);
   expect(res.statusCode).toEqual(200);
 });
})