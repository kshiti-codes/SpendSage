import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase-config';
import * as Yup from 'yup';
import {
  FormContainer,
  Heading,
  Label,
  Input,
  Button,
  GoogleButton,
  ErrorMsg,
  TransitionWrapper
} from '../components/StyledComponents';
import logo from '../assets/logo-opt-1.jpeg'; // Ensure you have a logo in the assets folder

const Login = () => {
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
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate('/expenses');
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/add-expense'); // Redirect to expenses page
    } catch (error) {
      alert(`Google sign-in failed: ${error.message}`);
    }
  };

  return (
    <TransitionWrapper>
      <FormContainer>
        <img src={logo} alt="Logo" style={{ display: 'block', margin: '0 auto 20px', width: '10%', height: '10%', borderRadius:'50%', }} />
        <Heading>Login</Heading>
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
              <Button type="submit">Login</Button>
              <GoogleButton type="button" onClick={handleGoogleSignIn}>
                Sign in with Google
              </GoogleButton>
              <Button type="button" onClick={() => navigate('/register')}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </TransitionWrapper>
  );
};

export default Login;
