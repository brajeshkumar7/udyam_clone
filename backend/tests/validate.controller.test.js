// backend/__tests__/validate.controller.test.js
import request from 'supertest';
import app from '../app'; // your express app entry

describe('POST /validate', () => {
    it('returns 400 for invalid Aadhaar', async () => {
        const res = await request(app)
            .post('/validate')
            .send({ aadhaarNumber: '123', panNumber: 'ABCDE1234F' });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Invalid Aadhaar Number');
    });

    it('returns 400 for invalid PAN', async () => {
        const res = await request(app)
            .post('/validate')
            .send({ aadhaarNumber: '123456789012', panNumber: '123456' });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Invalid PAN Number');
    });

    it('returns 200 success for valid inputs', async () => {
        const res = await request(app)
            .post('/validate')
            .send({ aadhaarNumber: '123456789012', panNumber: 'ABCDE1234F' });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
