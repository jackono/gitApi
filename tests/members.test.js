const request = require('supertest')
const app = require('../server')
describe('Post Endpoints', () => {
  it('should fetch all members from an org', async () => {
   const orgName = 'xendit'
   const res = await request(app).get(`/orgs/${orgName}/members`);
   expect(res.statusCode).toEqual(200);
   expect(res.body).toHaveProperty('login');
 });
})