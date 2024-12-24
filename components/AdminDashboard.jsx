import React, { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  // Simulated loan applications data
  const [loanApplications, setLoanApplications] = useState([
    {
      id: 1,
      applicant: "John Doe",
      phone: "+1234567890",
      amount: 5000,
      monthlyIncome: 15000,
      purpose: "Business",
      status: "pending",
      submittedAt: "2024-12-20"
    },
    // More applications would be fetched from API
  ]);

  const handleLoanAction = async (id, action) => {
    try {
      // API call would go here
      // await updateLoanStatus(id, action);
      
      setLoanApplications(prev =>
        prev.map(loan =>
          loan.id === id ? { ...loan, status: action } : loan
        )
      );
    } catch (error) {
      console.error('Failed to update loan status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };

    return (
      <Badge className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Loan Applications</h1>
        <div className="flex gap-4">
          <Badge className="bg-blue-100 text-blue-800">
            Total: {loanApplications.length}
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800">
            Pending: {loanApplications.filter(loan => loan.status === 'pending').length}
          </Badge>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left">Applicant</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 text-right">Monthly Income</th>
              <th className="p-4 text-left">Purpose</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loanApplications.map((loan) => (
              <tr key={loan.id} className="border-t">
                <td className="p-4">{loan.applicant}</td>
                <td className="p-4">{loan.phone}</td>
                <td className="p-4 text-right">
                  ${loan.amount.toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  ${loan.monthlyIncome.toLocaleString()}
                </td>
                <td className="p-4">{loan.purpose}</td>
                <td className="p-4">{getStatusBadge(loan.status)}</td>
                <td className="p-4">{loan.submittedAt}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    {loan.status === 'pending' && (
                      <>
                        <Button
                          onClick={() => handleLoanAction(loan.id, 'approved')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleLoanAction(loan.id, 'rejected')}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {loan.status !== 'pending' && (
                      <Button disabled className="bg-gray-300">
                        <Clock className="h-4 w-4 mr-1" />
                        Processed
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;