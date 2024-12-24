import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, DollarSign, Calendar, BadgePercent } from 'lucide-react';

const UserDashboard = () => {
  // This would come from API/context in a real app
  const [userLoans] = useState({
    activeLoans: [
      {
        id: 1,
        amount: 3000,
        monthlyPayment: 1050,
        duration: 3,
        purpose: 'Business',
        status: 'active',
        paymentsMade: 1,
        nextPaymentDate: '2025-01-15',
        interestRate: 5
      }
    ],
    loanApplications: [
      {
        id: 2,
        amount: 2000,
        purpose: 'Education',
        status: 'pending',
        submittedAt: '2024-12-20'
      }
    ]
  });

  // Calculate eligibility based on user's monthly income (would come from API)
  const eligibility = {
    monthlyIncome: 9000,
    maxLoanAmount: 3000,
    creditScore: 720
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800"
    };

    return (
      <Badge className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Credit
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${eligibility.maxLoanAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Based on your monthly income
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Loans
            </CardTitle>
            <BadgePercent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userLoans.activeLoans.length}</div>
            <p className="text-xs text-muted-foreground">
              Current active loans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Applications
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userLoans.loanApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Loans */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Active Loans</h2>
        {userLoans.activeLoans.map(loan => (
          <Card key={loan.id} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Loan Details</h3>
                  {getStatusBadge(loan.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-semibold">${loan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monthly Payment</p>
                    <p className="font-semibold">${loan.monthlyPayment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interest Rate</p>
                    <p className="font-semibold">{loan.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Purpose</p>
                    <p className="font-semibold">{loan.purpose}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Repayment Progress</p>
                  <Progress value={(loan.paymentsMade / loan.duration) * 100} />
                  <p className="text-sm text-gray-500 mt-2">
                    {loan.paymentsMade} of {loan.duration} payments made
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Next Payment</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Due Date</span>
                    <span className="font-semibold">{loan.nextPaymentDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Amount Due</span>
                    <span className="font-semibold">${loan.monthlyPayment.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Loan Applications */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Loan Applications</h2>
        {userLoans.loanApplications.map(application => (
          <Card key={application.id} className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Application #{application.id}</p>
                <p className="font-semibold">${application.amount.toLocaleString()} - {application.purpose}</p>
              </div>
              {getStatusBadge(application.status)}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              Submitted on {application.submittedAt}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;