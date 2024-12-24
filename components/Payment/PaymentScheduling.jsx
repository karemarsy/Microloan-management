import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar,
  CreditCard,
  AlertCircle,
  Clock,
  CalendarCheck,
  Repeat
} from 'lucide-react';

const PaymentScheduling = ({ loan }) => {
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      amount: 1050,
      scheduledDate: '2025-01-15',
      status: 'scheduled',
      isAutoPayment: true
    },
    {
      id: 2,
      amount: 1050,
      scheduledDate: '2025-02-15',
      status: 'scheduled',
      isAutoPayment: true
    }
  ]);

  const toggleAutoPay = async () => {
    try {
      // API call would go here
      setAutoPayEnabled(!autoPayEnabled);
    } catch (error) {
      console.error('Failed to toggle auto-pay:', error);
    }
  };

  const schedulePayment = async () => {
    try {
      // API call would go here
      const newSchedule = {
        id: schedules.length + 1,
        amount: loan.monthlyPayment,
        scheduledDate: selectedDate,
        status: 'scheduled',
        isAutoPayment: false
      };
      setSchedules([...schedules, newSchedule]);
      setSelectedDate('');
    } catch (error) {
      console.error('Failed to schedule payment:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Auto-Pay Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Repeat className="h-5 w-5" />
            Auto-Pay Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Automatic Monthly Payments</h3>
              <p className="text-sm text-gray-500">
                Payments will be automatically processed on the due date
              </p>
            </div>
            <Switch
              checked={autoPayEnabled}
              onCheckedChange={toggleAutoPay}
            />
          </div>
          
          {autoPayEnabled && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Auto-pay is set for the 15th of each month
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5" />
            Schedule Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <Button
              onClick={schedulePayment}
              disabled={!selectedDate}
              className="w-full"
            >
              Schedule Payment
            </Button>
          </div>
        </CardContent>
      </Card>

      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Scheduled Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {schedule.isAutoPayment ? (
                    <Repeat className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Calendar className="h-5 w-5 text-green-500" />
                  )}
                  <div>
                    <p className="font-medium">
                      ${schedule.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {schedule.scheduledDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {schedule.status}
                  </Badge>
                  {!schedule.isAutoPayment && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSchedules(schedules.filter(s => s.id !== schedule.id));
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentScheduling;