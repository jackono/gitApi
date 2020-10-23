const request = require('supertest')
const app = require('../server')

describe('Post Endpoints', () => {
  it('should save a comment to db', async () => {
    const orgName = 'xendit'
    const res = await request(app)
      .post(`/orgs/${orgName}/comments`)
      .send({
        comment: 'Looking to hire SE Asia top dev talent!',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });
  it('should fetch all comments from a github org', async () => {
   const orgName = 'xendit'
   const res = await request(app).get(`/orgs/${orgName}/comments`);
   expect(res.statusCode).toEqual(200);
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
  it('should return an error when posting to non-existing github org', async () => {
   const orgName = 'abc'
   const res = await request(app).post(`/orgs/${orgName}/comments`);
   expect(res.statusCode).toEqual(404);
 });
  it('should return an error when fetching from non-existing github org', async () => {
   const orgName = 'abc'
   const res = await request(app).get(`/orgs/${orgName}/comments`);
   expect(res.statusCode).toEqual(404);
 });
  it('should return an error when deleting a non-existing collection', async () => {
   const orgName = 'abc'
   const res = await request(app).delete(`/orgs/${orgName}/comments`);
   expect(res.statusCode).toEqual(404);
   expect(res.body.reason).toContain("Not Found");
 });
  it('should return an error when deleting soft deleted collection', async () => {
   const orgName = 'xendit'
   const res = await request(app).delete(`/orgs/${orgName}/comments`);
   expect(res.statusCode).toEqual(404);
   expect(res.body.reason).toContain("Soft Deleted");
 });
  it('should return an error when fetching the members from non-existing github org', async () => {
   const orgName = 'abc'
   const res = await request(app).get(`/orgs/${orgName}/members`);
   expect(res.statusCode).toEqual(404);
 });
})