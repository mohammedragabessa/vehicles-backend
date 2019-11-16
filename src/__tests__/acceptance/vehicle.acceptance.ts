import { Client } from '@loopback/testlab';
import { LoopbackApplication } from '../..';
import { setupApplication } from './test-helper';

describe('Vehicle Api', () => {
  let app: LoopbackApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('get all vehicles', async () => {
    await client
      .get('/vehicles')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('get all customers', async () => {
    await client
      .get('/customers')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});
