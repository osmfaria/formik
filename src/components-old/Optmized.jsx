import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import TextError from './TextError'

const Optmized = () => {
  const [formValues, setFormValues] = useState(null)
  const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
      facebook: '',
      twitter: '',
    },
    phoneNumbers: ['', ''],
    phNumbers: [''],
  }

  const savedValues = {
    name: 'krun',
    email: 'krun@example.com',
    channel: 'krun',
    comments: 'Krun dh',
    address: '221b baker street',
    social: {
      facebook: '',
      twitter: '',
    },
    phoneNumbers: ['', ''],
    phNumbers: [''],
  }

  const onSubmit = (values, onSubmitProps) => {
    // depois que a call da api terminar
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    channel: Yup.string().required(),
  })

  const validateComments = (value) => {
    let error
    if (!value) {
      error = 'Required'
    }
    return error
  }

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <div className='form-control'>
              <label htmlFor='name'>Name</label>
              <Field type='text' name='name' id='name' />
              <ErrorMessage name='name' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='email'>Email</label>
              <Field type='email' name='email' id='email' />
              <ErrorMessage name='email'>
                {(errorMsg) => <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className='form-control'>
              <label htmlFor='channel'>Channel</label>
              <Field type='text' name='channel' id='channel' />
              <ErrorMessage name='channel' />
            </div>

            <div className='form-control'>
              <label htmlFor='comments'>Comments</label>
              <Field
                as='textarea'
                id='comments'
                name='comments'
                validate={validateComments}
              />
              <ErrorMessage name='comments' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='address'>Address</label>
              <Field name='address'>
                {(props) => {
                  const { field, form, meta } = props
                  return (
                    <div>
                      <input type='text' id='address' {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  )
                }}
              </Field>
            </div>

            <div className='form-control'>
              <label htmlFor='facebook'>Facebook profile</label>
              <Field type='text' id='facebook' name='social.facebook' />
            </div>

            <div className='form-control'>
              <label htmlFor='twitter'>Twitter profile</label>
              <Field type='text' id='twitter' name='social.twitter' />
            </div>

            <div className='form-control'>
              <label htmlFor='primaryPh'>Primary phone number</label>
              <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
            </div>

            <div className='form-control'>
              <label htmlFor='secondaryPh'>Secondary phone number</label>
              <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
            </div>

            <div className='form-control'>
              <label htmlFor='secondaryPh'>List of phone numbers</label>
              <FieldArray name='phNumbers'>
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps
                  const { values } = form
                  const { phNumbers } = values

                  return (
                    <div>
                      {phNumbers.map((phNumbers, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type='button' onClick={() => remove(index)}>
                              -
                            </button>
                          )}

                          <button type='button' onClick={() => push('')}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  )
                }}
              </FieldArray>
            </div>

            {/* <button
              type='button'
              onClick={() => formik.validateField('comments')}
            >
              Validate commments
            </button>

            <button
              type='button'
              onClick={() => formik.setFieldTouched('comments')}
            >
              Visit comments
            </button>

            <button
              type='button'
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Visit fields
            </button>

            <button type='button' onClick={() => formik.validateForm()}>
              Validate all
            </button> */}

            <button type='button' onClick={() => setFormValues(savedValues)} >Load saved data</button>

            <button type='reset'>Reset</button>

            <button type='submit' disabled={formik.isSubmitting}>
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Optmized
