const request = require('supertest');
const app = require('./paymentRoute'); 

describe('POST /payments', () => {
    it('should create a new payment', async () => {
      const paymentData = {
        creditCard: '1234567890123456',
        amountValue: 100,
      };
  
      const response = await request(app)
        .post('/payments')
        .send(paymentData);
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Payment created successfully!');
    });
    
    it('should return an error for invalid credit card format', async () => {
        User.findOne.mockResolvedValue({ _id: '0001' });
      
        const invalidPaymentData = {
          creditCard: '12345', // Invalid credit card number format, too short 
          amountValue: 100,
        };
      
        const response = await request(app)
          .post('/payments')
          .send(invalidPaymentData);
      
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid credit card format');
    });
      
    it('should return an error for missing required fields', async () => {
        const incompletePaymentData = {
          // Missing credit card number and payment amount
        };
      
        const response = await request(app)
          .post('/payments')
          .send(incompletePaymentData);
      
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Please send all required fields: card number and payment amount');
    });
     
    it('should return an error for non-existent user', async () => {
        User.findOne.mockResolvedValue(null); // Simulate non-existent user
      
        const invalidUserPaymentData = {
          creditCard: '1234567890123456',
          amountValue: 100,
        };
      
        const response = await request(app)
          .post('/payments')
          .send(invalidUserPaymentData);
      
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Credit card number is not associated with an existing user');
    });
        

});
  
describe('GET /payments', () => {
    it('should return an array of payments', async () => {
      const response = await request(app).get('/payments');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  
   
  });
  
