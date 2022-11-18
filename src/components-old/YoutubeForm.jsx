import { useFormik } from 'formik'
import * as Yup from 'yup'

const YoutubeForm = () => {
  const initialValues = {
    name: '',
    email: '',
    channel: '',
  }

  const onSubmit = (values) => {
    console.log('Form data', values)
  }

  const validate = (values) => {
    let errors = {}
    if (!values.name) {
      errors.name = 'Required'
    }

    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email format'
    }

    if (!values.channel) {
      errors.channel = 'Required'
    }

    return errors
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    channel: Yup.string().required()
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
    // validate,
  })

  console.log(formik.values)

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className='error'>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='error'>{formik.errors.email}</div>
          ) : null}
        </div>

        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input
            type='text'
            name='channel'
            id='channel'
            onChange={formik.handleChange}
            value={formik.values.channel}
            onBlur={formik.handleBlur}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className='error'>{formik.errors.channel}</div>
          ) : null}
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default YoutubeForm
