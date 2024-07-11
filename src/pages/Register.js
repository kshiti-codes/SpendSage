// src/pages/Register.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase-config';
import * as Yup from 'yup';
import { FormContainer, Heading, Label, Input, Button, GoogleButton, ErrorMsg, TransitionWrapper } from '../components/StyledComponents';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('User registered with Google');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TransitionWrapper>
      <FormContainer>
        <Heading>Register</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div>
                <Label htmlFor="email">Email</Label>
                <Field as={Input} type="email" id="email" name="email" />
                <ErrorMessage name="email" component={ErrorMsg} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Field as={Input} type="password" id="password" name="password" />
                <ErrorMessage name="password" component={ErrorMsg} />
              </div>
              <Button type="submit">Register</Button>
              <GoogleButton type="button" onClick={handleGoogleSignIn}>
                Sign up with Google
              </GoogleButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </TransitionWrapper>
  );
};

export default Register;
