

// Payment Scheduling Service
export const scheduleService = {
    getScheduledPayments: async () => {
      try {
        const response = await fetch(`${BASE_URL}/payments/scheduled`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) throw new Error('Failed to fetch scheduled payments');
        
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  
    schedulePayment: async (paymentData) => {
      try {
        const response = await fetch(`${BASE_URL}/payments/schedule`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });
        
        if (!response.ok) throw new Error('Failed to schedule payment');
        
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  
    updateAutoPaySettings: async (settings) => {
      try {
        const response = await fetch(`${BASE_URL}/payments/autopay`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settings),
        });
        
        if (!response.ok) throw new Error('Failed to update auto-pay settings');
        
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  
    cancelScheduledPayment: async (paymentId) => {
      try {
        const response = await fetch(`${BASE_URL}/payments/scheduled/${paymentId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) throw new Error('Failed to cancel scheduled payment');
        
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };
  
  // Analytics Service
  export const analyticsService = {
    getDashboardData: async () => {
      try {
        const response = await fetch(`${BASE_URL}/analytics/dashboard`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) throw new Error('Failed to fetch dashboard data');
        
        return await response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  }