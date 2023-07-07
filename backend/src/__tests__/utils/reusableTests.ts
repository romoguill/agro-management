import supertest from 'supertest';
import { Express } from 'express';

// Investigate if this approach is ok (utility function for reused tests)
export function testInvalidIdParam(
  app: Express,
  route: string,
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  id: string
) {
  it('should return a 400 with a message', async () => {
    const response = await supertest(app)[method](`${route}/${id}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'ID is invalid' });
  });
}
