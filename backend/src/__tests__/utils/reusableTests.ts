import supertest from 'supertest';
import { Express } from 'express';

export function testInvalidIdParam(app: Express, route: string, id: string) {
  it('should return a 400 with a message', async () => {
    const response = await supertest(app).get(`${route}/${id}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'ID is invalid' });
  });
}
