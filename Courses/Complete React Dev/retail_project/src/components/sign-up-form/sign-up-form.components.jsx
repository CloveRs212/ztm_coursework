import { useState } from "react";
import FormInput from "../../components/form-input/form-input.components";
import Button from "../button/button.component";

import { 
  CreateAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth 
} from "../../utils/firebase.utils";

import {SignUpContainer} from './sign-up-form.stlyes';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      Alert('passwords do not match');
      return;
    }

    try {
      const { user } = CreateAuthUserWithEmailAndPassword(
        email, 
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Oh No! Email is already in use! We can not make a new user')
      }
      console.log('user creation encourtered an error', error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Do not Have An Account?!</h2>
      <span>Sign Up With Your Email</span>
      <form onSubmit={handleSubmit}>
          <FormInput
            label='Display Name'
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />
          <FormInput
            label='Email'
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
          <FormInput
            label='Password'
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
          <FormInput
            label='Confirm Password'
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
