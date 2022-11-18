import React from 'react'
import {Formik, Form} from 'formik'
import * as yup from 'yup'
import FormikControl from './FormikControl'

function LoginForm() {
  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required(),
    password: yup.string().required(),
  })

  const onSubmit = values => {
    console.log('Form data', values)
  }

  return (
    <Formik 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {
        formik => {
          return <Form>
            <FormikControl 
              control='chakrainput'
              type='email'
              label='Email'
              name='email'
            />
            <FormikControl 
              control='chakrainput'
              type='password'
              label='Password'
              name='password'
            />
            <button type='submit' disabled={!formik.isValid}>Submit</button>

          </Form>
        }
      }
    </Formik>
  )
}

export default LoginForm