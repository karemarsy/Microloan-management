// services/api.js
// ... (previous auth and loan services remain the same)

// Payment Service
export const paymentService = {
    processPayment: async (paymentData) => {
      try {
        const response = await fetch(`${BASE_URL}/payments/process`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });
        
        if (!response.ok) throw new Error('Payment processing failed');
        
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  
    getTransactionHistory: async (loanId) => {
      try {
        const response = await fetch(`${BASE_URL}/payments/transactions${loanId ? `/${loanId}` : ''}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) throw new Error('Failed to fetch transactions');
        
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };
  
  // Notification Service
  export const notificationService = {
    getNotifications: async () => {
      try {
        const response = await fetch(`${BASE_URL}/notifications`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) throw new Error('Failed to fetch notifications');
        
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  
    markAsRead: async (notificationId) => {
      try {
        const response = await fetch(`${BASE_URL}/notifications/${notificationId}/read`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) throw new Error('Failed to mark notification as read');
        
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  
    deleteNotification: async (notificationId) => {
      try {
        const response = await fetch(`${BASE_URL}/notifications/${notificationId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) throw new Error('Failed to delete notification');
        
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };