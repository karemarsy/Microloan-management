import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  AlertCircle, 
  CheckCircle, 
  DollarSign,
  Calendar,
  ArrowDownCircle,
  ArrowUpCircle
} from 'lucide-react';

const PaymentSystem = ({ loanId }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [transactions] = useState([
    {
      id: 1,
      type: 'payment',
      amount: 1050,
      status: 'completed',
      date: '2024-12-20',
      description: 'Monthly payment'
    },
    {
      id: 2,
      type: 'disbursement',
      amount: 3000,
      status: 'completed',
      date: '2024-11-15',
      description: 'Loan disbursement'
    }
  ]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    try {
      // API call would go here
      // await processPayment({ loanId, amount: paymentAmount });
      console.log('Processing payment:', { loanId, amount: paymentAmount });
      setPaymentAmount('');
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Make Payment Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Make Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Submit Payment'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {transaction.type === 'payment' ? (
                    <ArrowUpCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-8 w-8 text-blue-500" />
                  )}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSystem;