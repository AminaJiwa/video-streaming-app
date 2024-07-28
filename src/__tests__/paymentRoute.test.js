const request = require('supertest'); //for HTTP tests
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
    it('should return all payments from the database', async () => {

      const mockPayments = [
        { creditCard: '1234567890123456', amountValue: '100' },
        { creditCard: '9876543210987654', amountValue: '200' },
      ];
  
      // Insert mock payments into the database 
      await Payment.insertMany(mockPayments);
  
      const response = await request(app).get('/payments');
  
      // Check that the response status is 200 and contains payments
      expect(response.status).toBe(200);
  
      expect(response.body).toEqual(mockPayments);
    });
  
    it('should handle server errors', async () => {
      // Mock an error during database query
      jest.spyOn(Payment, 'find').mockRejectedValue(new Error('Database error'));
  
      const response = await request(app).get('/payments');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Database error');
    });
  });
  
