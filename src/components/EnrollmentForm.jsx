import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import FormikControl from './FormikControl'

function EnrollmentForm() {
  const dropdownOptions = [
    { key: 'Select your course', value: '' },
    { key: 'React', value: 'react' },
    { key: 'Angular', value: 'angular' },
    { key: 'Vue', value: 'vue' },
  ]

  const checkboxOptions = [
    { key: 'HTML', value: 'html' },
    { key: 'CSS', value: 'css' },
    { key: 'Javascript', value: 'javascript' },
  ]

  const initialValues = {
    email: '',
    bio: '',
    course: '',
    skills: [],
    courseDate: null,
  }

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required(),
    bio: yup.string().required(),
    course: yup.string().required(),
    courseDate: yup.date().required().nullable(),
  })

  const onSubmit = (values) => {
    console.log('Form data', values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control='input'
              type='email'
              label='Email'
              name='email'
            />
            <FormikControl control='textarea' label='Bio' name='bio' />
            <FormikControl
              control='select'
              label='Course'
              name='course'
              options={dropdownOptions}
            />
            <FormikControl
              control='checkbox'
              label='Your skillset'
              name='skills'
              options={checkboxOptions}
            />
            <FormikControl
              control='date'
              label='Course date'
              name='courseDate'
            />
            <button type='submit' disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default EnrollmentForm
