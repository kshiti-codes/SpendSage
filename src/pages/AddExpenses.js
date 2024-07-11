// src/pages/AddExpense.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormContainer, Heading, Label, Input, Button, ErrorMsg, TransitionWrapper, Select } from '../components/StyledComponents';
import { useSearchParams } from 'react-router-dom';

const AddExpense = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [searchParams] = useSearchParams();
  const expenseId = searchParams.get('id');

  // Define the list of categories
  const CATEGORIES = [
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Clothing',
    'Medical/Healthcare',
    'Personal',
    'Entertainment'
  ];

  useEffect(() => {
    const fetchExpense = async () => {
      if (expenseId) {
        const docRef = doc(db, 'expenses', expenseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentExpense(docSnap.data());
          setIsEditing(true);
        }
      }
    };

    fetchExpense();
  }, [expenseId]);

  // Add expense to Firestore
  const handleAddExpense = async (values) => {
    try {
      await addDoc(collection(db, 'expenses'), {
        ...values,
        userId: currentUser.uid
      });
      navigate('/expenses');
    } catch (error) {
      alert(`Error adding expense: ${error.message}`);
    }
  };

  // Edit expense in Firestore
  const handleEditExpense = async (values) => {
    try {
      await updateDoc(doc(db, 'expenses', expenseId), values);
      setIsEditing(false);
      setCurrentExpense(null);
      navigate('/expenses');
    } catch (error) {
      alert(`Error editing expense: ${error.message}`);
    }
  };

  // Delete expense from Firestore
  const handleDeleteExpense = async () => {
    if (expenseId) {
      try {
        await deleteDoc(doc(db, 'expenses', expenseId));
        setIsEditing(false);
        setCurrentExpense(null);
        navigate('/expenses');
      } catch (error) {
        alert(`Error deleting expense: ${error.message}`);
      }
    }
  };

  const initialValues = {
    description: currentExpense?.description || '',
    amount: currentExpense?.amount || '',
    category: currentExpense?.category || '',
    date: currentExpense?.date || '',
  };

  const validationSchema = Yup.object({
    description: Yup.string().required('Required'),
    amount: Yup.number().required('Required').positive('Must be positive'),
    category: Yup.string().required('Required'),
    date: Yup.date().required('Required')
  });

  return (
    <TransitionWrapper>
      <FormContainer>
        <Heading>{isEditing ? 'Edit Expense' : 'Add Expense'}</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={isEditing ? handleEditExpense : handleAddExpense}
          enableReinitialize
        >
          {() => (
            <Form>
              <div>
                <Label htmlFor="description">Description</Label>
                <Field as={Input} type="text" id="description" name="description" />
                <ErrorMessage name="description" component={ErrorMsg} />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Field as={Input} type="number" id="amount" name="amount" />
                <ErrorMessage name="amount" component={ErrorMsg} />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Field as={Select} id="category" name="category">
                  <option value="">Select a category</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Field>
                <ErrorMessage name="category" component={ErrorMsg} />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Field as={Input} type="date" id="date" name="date" />
                <ErrorMessage name="date" component={ErrorMsg} />
              </div>
              <Button type="submit">{isEditing ? 'Update' : 'Add'}</Button>
              {isEditing && (
                <Button type="button" onClick={handleDeleteExpense}>Delete</Button>
              )}
              {isEditing && (
                <Button type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
              )}
            </Form>
          )}
        </Formik>
      </FormContainer>
    </TransitionWrapper>
  );
};

export default AddExpense;
