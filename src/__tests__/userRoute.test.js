import {User} from "../models/userModel.js";
const request = require('supertest');//for HTTP tests
const app = require('./paymentRoute'); 

describe('POST /users', () => {
    it('should create a new user successfully', async () => {
      
      const validUserData = {
        username: "JohnDoe",
        password: "Password123",
        email: 'johndoe@example.com',
        birthDate: '2000-01-01',
        creditCard: '1234567890123456',
      };
  
      //Make a request to route
      const response = await request(app).post('/users').send(validUserData);
  
      //Check that the response status is 201
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created successfully!');
    });
  
    it('should handle missing invalid data', async () => {
      //Mock request body with missing required fields email and birthDate
      const invalidUserData = {
        username: "JerryDoe",
        password: "Test123",
      
      };
  
      const response = await request(app).post('/users').send(invalidUserData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Please send all required fields: username, password, email, date of birth');
    });
    
    
  it('should validate alphanumeric username format', async () => {
    const invalidUsernameData = {
      username: 'Jane Smith ',//Username contains spaces
      password: 'Test123',
      email: 'jane@example.com',
      birthDate: '2000-01-01',
      creditCard: '1234567890123456',
    };
    const response = await request(app).post('/users').send(invalidUsernameData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid username format');
  });


  it('should return 409 if username is already in use', async () => {
    // Mock an existing user with the same username
    const existingUser = { username: 'existinguser' };
    jest.spyOn(User, 'findOne').mockResolvedValue(existingUser);
  
    const conflictingUsernameData = {
      username: 'existinguser', // Same as the existing user's username
      password: 'Password123',
      email: 'existinguser@example.com',
      birthDate: '2000-01-01',
      creditCard: '1234567890123456',
    };
  
    const response = await request(app).post('/users').send(conflictingUsernameData);
  
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message', 'Username is already in use');
  });

   it('should validate password format', async () => {
    //Password format of min 8 length and 1 uppercase letter and number
    const invalidPasswordData = {
      username: 'JaneSmith',
      password: 'pass', //No uppercase letter or number
      email: 'jane@example.com',
      birthDate: '2000-01-01',
      creditCard: '1234567890123456',
    };
    const response = await request(app).post('/users').send(invalidPasswordData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid password format');
  });
    
  it('should validate email format', async () => {
    //Invalid email format 
    const invalidEmailData = {
      username: 'JohnDoe',
      password: 'Password123',
      email: 'john', //email doesn't contain @ symbol
      birthDate: '2000-01-01',
      creditCard: '1234567890123456',
    };
    const response = await request(app).post('/users').send(invalidEmailData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid email format');
  });

  it('should validate date of birth format', async () => {
    //Invalid DoB format 
    const invalidDateData = {
      username: 'JohnDoe',
      password: 'Password123',
      email: 'johndoe@example.com',
      birthDate: '2000', //Only contains year
      creditCard: '1234567890123456',
    };
    const response = await request(app).post('/users').send(invalidDateData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid date of birth format');
  });

  it('should return 403 if user is under 18 years of age', async () => {
    // Mock request body with a birthDate that makes the user under 18
    const underageUserData = {
      username: 'JohnDoe',
      password: 'Password123',
      email: 'test@example.com',
      birthDate: '2024-01-01', //User is less than 18 years old
    };
  
    const response = await request(app).post('/users').send(underageUserData);
  
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'User is under 18 years of age');
  });

  it('should validate credit card number format', async () => {
   
    const invalidCardData = {
      username: 'JohnDoe',
      password: 'Password123',
      email: 'johndoe@example.com',
      birthDate: '20001',
      creditCard: '123',  //Invalid card number format, expected 16 digits
    };
    const response = await request(app).post('/users').send(invalidCardData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid credit card format');
  });


  });

  describe('GET /users', () => {
    it('should return all users from the database', async () => {
      // Mock some users 
      const mockUsers = [
        { username: 'JohnDoe', email: 'johndoe@example.com', password: 'Password123', birthDate: '2000-01-01'},
        { username: 'JaneDoe', email: 'janedoe@example.com', password: 'Password123', birthDate: '2000-01-01' },
      ];
  
      await User.insertMany(mockUsers);
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      //Expect the database to have mock users 
      expect(response.body).toEqual(mockUsers);
    });
  
    it('should handle server errors', async () => {
      // Mock an error during database query
      jest.spyOn(User, 'find').mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/users');
  
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Database error');
    });
  });


describe('GET /users/filter', () => {
    it('should return users with credit cards when creditCard=Yes', async () => {
      // Mock users with credit cards
      const usersWithCreditCard = [
        { username: 'JohnDoe', email: 'johndoe@example.com', password: 'Password123', birthDate: '2000-01-01', creditCard: '1234567890123456' },
        { username: 'JaneDoe', email: 'janedoe@example.com', password: 'Password123', birthDate: '2000-01-01', creditCard: '9876543210987654' },
      ];
  
      await User.insertMany(usersWithCreditCard);
      // Make a request with creditCard=Yes
      const response = await request(app).get('/users/filter').query({ creditCard: 'Yes' });
 
      expect(response.status).toBe(200);
      expect(response.body).toEqual(usersWithCreditCard);
    });
  
    it('should return users without credit cards when creditCard=No', async () => {
      // Mock users without credit cards
      const usersWithoutCreditCard = [
        { username: 'JohnDoe', email: 'johndoe@example.com', password: 'Password123', birthDate: '2000-01-01'},
        { username: 'JaneDoe', email: 'janedoe@example.com', password: 'Password123', birthDate: '2000-01-01' },
      ];
      await User.insertMany(usersWithoutCreditCard);
      // Make a request with creditCard=No
      const response = await request(app).get('/users/filter').query({ creditCard: 'No' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(usersWithoutCreditCard);
    });

  });