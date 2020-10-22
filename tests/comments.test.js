const request = require('supertest')
const app = require('../server')
describe('Post Endpoints', () => {
  it('should post a comment to db', async () => {
    const orgName = 'xendit'
    const res = await request(app)
      .post(`/orgs/${orgName}/comments`)
      .send({
        comment: 'test is cool',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id')
  });
  it('should fetch a single post', async () => {
   const orgName = 'xendit'
   const res = await request(app).get(`/orgs/${orgName}/comments`);
   expect(res.statusCode).toEqual(200);
   expect(res.body).toHaveProperty('_id');
 });
})