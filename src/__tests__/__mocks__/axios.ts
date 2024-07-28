
export default {
    post: jest.fn((url: string) => {
      if (url === '/payments') {
        return Promise.resolve({ status: 201 });
      }
      return Promise.reject(new Error('Unexpected URL'));
    }),
  };
  