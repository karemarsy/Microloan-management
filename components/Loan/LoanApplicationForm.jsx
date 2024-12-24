"use client";

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    loanAmount: "",
    monthlyIncome: "",
    purpose: "",
    duration: "3",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateLoanAmount = () => {
    const maxLoan = Number(formData.monthlyIncome) / 3;
    return Number(formData.loanAmount) <= maxLoan;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateLoanAmount()) {
      setError("Loan amount cannot exceed 1/3 of your monthly income");
      return;
    }

    try {
      // API call would go here
      console.log("Submitting loan application:", formData);
    } catch (err) {
      setError("Failed to submit loan application");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Loan Application</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Monthly Income
          </label>
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loan Amount
          </label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loan Purpose
          </label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select purpose</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="medical">Medical</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loan Duration (months)
          </label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
          </select>
        </div>

        {error && (
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg" role="alert">
            <AlertCircle className="h-5 w-5 mr-2 text-red-800" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
