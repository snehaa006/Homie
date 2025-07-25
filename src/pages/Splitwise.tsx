import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Users, Calculator, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Splitwise: React.FC = () => {
  const navigate = useNavigate();
  
  const mockExpenses = [
    {
      id: 1,
      description: 'Grocery Shopping',
      amount: 800,
      paidBy: 'You',
      splitBetween: ['You', 'Priya', 'Ananya'],
      date: '2024-02-10',
      settled: false
    },
    {
      id: 2,
      description: 'Room Decoration',
      amount: 1200,
      paidBy: 'Priya',
      splitBetween: ['You', 'Priya', 'Ananya'],
      date: '2024-02-08',
      settled: true
    }
  ];

  const addExpense = () => {
    toast.success('Adding new expense...');
  };

  const settleExpense = (description: string) => {
    toast.success(`Marked "${description}" as settled! ✅`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Splitwise 💰
          </h1>
        </div>

        <Card className="glass-card animate-fade-in-up mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Expense Manager
            </CardTitle>
            <CardDescription>
              Track shared expenses with your roommates
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Button onClick={addExpense} className="w-full gradient-button mb-6">
              <Plus className="w-4 h-4 mr-2" />
              Add New Expense
            </Button>

            <div className="space-y-4">
              {mockExpenses.map((expense) => (
                <Card key={expense.id} className="feature-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{expense.description}</h3>
                        <p className="text-sm text-muted-foreground">
                          ₹{expense.amount} • Paid by {expense.paidBy}
                        </p>
                        <Badge variant={expense.settled ? 'default' : 'destructive'} className="mt-2">
                          {expense.settled ? (
                            <><CheckCircle className="w-3 h-3 mr-1" /> Settled</>
                          ) : (
                            <><AlertCircle className="w-3 h-3 mr-1" /> Pending</>
                          )}
                        </Badge>
                      </div>
                      {!expense.settled && (
                        <Button 
                          onClick={() => settleExpense(expense.description)}
                          size="sm" 
                          className="gradient-button"
                        >
                          Mark Settled
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={() => navigate('/')} variant="outline" className="glass-card">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Splitwise;