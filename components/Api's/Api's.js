// services/api.js

const BASE_URL = 'api/v1';  

// Authentication Service
export const authService = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) throw new Error('Registration failed');
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

// Loan Service
export const loanService = {
  // Get user's loans and applications
  getUserLoans: async () => {
    try {
      const response = await fetch(`${BASE_URL}/loans/user`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch loans');
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Submit new loan application
  applyForLoan: async (loanData) => {
    try {
      const response = await fetch(`${BASE_URL}/loans/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanData),
      });
      
      if (!response.ok) throw new Error('Loan application failed');
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Admin: Get all loan applications
  getAllApplications: async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/loans`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch applications');
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Admin: Update loan status
  updateLoanStatus: async (loanId, status) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/loans/${loanId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error('Failed to update loan status');
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get user eligibility
  checkEligibility: async () => {
    try {
      const response = await fetch(`${BASE_URL}/loans/eligibility`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to check eligibility');
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};