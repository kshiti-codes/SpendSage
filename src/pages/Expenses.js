// src/pages/Expense.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Heading, Button, TransitionWrapper, Select, Table, Th, Td, Tr } from '../components/StyledComponents';
import { FaFilter } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/CustomDatePicker.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

// Register necessary components
ChartJS.register(Tooltip, Legend, ArcElement);

const Expense = () => {
const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'expenses'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expensesData = [];
      snapshot.forEach((doc) => {
        expensesData.push({ ...doc.data(), id: doc.id });
      });
      setExpenses(expensesData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Define the list of categories
  const categories = [
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Clothing',
    'Medical/Healthcare',
    'Personal',
    'Entertainment'
  ];

  // Filter expenses by selected category and date range
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const matchesCategory = filterCategory ? expense.category === filterCategory : true;
    const matchesStartDate = startDate ? expenseDate >= startDate : true;
    const matchesEndDate = endDate ? expenseDate <= endDate : true;
    return matchesCategory && matchesStartDate && matchesEndDate;
  });

  // Calculate summary for each category
  const categorySummary = filteredExpenses.reduce((summary, expense) => {
    if (!summary[expense.category]) {
      summary[expense.category] = 0;
    }
    summary[expense.category] += expense.amount;
    return summary;
  }, {});

  const handleDeleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
    } catch (error) {
      alert(`Error deleting expense: ${error.message}`);
    }
  };

  // Prepare data for the pie chart
  const chartData = {
    labels: Object.keys(categorySummary),
    datasets: [{
      data: Object.values(categorySummary),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#FFCC99',
        '#66FF66'
      ],
    }]};

  return (
    <TransitionWrapper>
    <FormContainer>
        <Heading>Expenses</Heading>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button onClick={() => navigate('/add-expense')}>Add New</Button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaFilter style={{ marginRight: '8px' }} />
            <Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              dateFormat="yyyy/MM/dd"
              className="custom-datepicker"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
              dateFormat="yyyy/MM/dd"
              className="custom-datepicker"
            />
          </div>
        </div>
        <Table>
          <thead>
            <Tr>
              <Th>Description</Th>
              <Th>Amount</Th>
              <Th>Category</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </thead>
          <tbody>
            {filteredExpenses.map(expense => (
              <Tr key={expense.id}>
                <Td>{expense.description}</Td>
                <Td>{expense.amount}</Td>
                <Td>{expense.category}</Td>
                <Td>{expense.date}</Td>
                <Td>
                  <Button onClick={() => navigate(`/add-expense?id=${expense.id}`)}>Edit</Button>
                  <Button onClick={() => handleDeleteExpense(expense.id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Heading>Category-wise Summary</Heading>
          <div style={{ position: 'relative', height: '400px' }}>
            <Pie data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                          boxWidth: 10,
                          padding: 20,
                        },
                      },
                    tooltip: {
                    callbacks: {
                        label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: €${value.toFixed(2)}`;
                        }
                    }
                    }
                }
            }} />
          </div>
        </div>
      </FormContainer>
    </TransitionWrapper>
  );
};

export default Expense;
