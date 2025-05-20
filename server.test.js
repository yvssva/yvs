const request = require('supertest');
const app = require('./server'); // Assuming server.js exports the app

describe('Login Endpoint', () => {
    // Test Case 1: Successful login
    it('should login successfully with correct credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: 'admin', password: 'password' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ success: true, message: 'Login successful' });
    });

    // Test Case 2: Invalid username
    it('should fail with invalid username', async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: 'wronguser', password: 'password' });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ success: false, message: 'Invalid credentials' });
    });

    // Test Case 3: Invalid password
    it('should fail with invalid password', async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: 'admin', password: 'wrongpassword' });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ success: false, message: 'Invalid credentials' });
    });

    // Test Case 4: Empty credentials (both empty)
    it('should fail with empty credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: '', password: '' });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ success: false, message: 'Invalid credentials' });
    });

    // Test Case 5: Missing username
    it('should fail with missing username', async () => {
        const res = await request(app)
            .post('/login')
            .send({ password: 'password' });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ success: false, message: 'Invalid credentials' });
    });

    // Test Case 6: Missing password
    it('should fail with missing password', async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: 'admin' });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ success: false, message: 'Invalid credentials' });
    });
});
