import React,{useState} from 'react'
import { Alert, Button, Container,Form,Toast} from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createLessons } from '../services/lessons.service'
export default function AddLessons() {
  
  const [show, setShow] = useState(true)
  const [success, setSuccess] = useState(false)
  const formik = useFormik({
    initialValues: {
      lessonTitle: '',
      estimatedTime: '',
      lessonImage: '',
      level: '1',
      isCompleted: false
    },
    validationSchema: Yup.object({
        lessonTitle: Yup.string().required('Lesson Title is required'),
        estimatedTime: Yup.number().required('Estimated Time is required').positive('Estimated Time must be positive').integer('Estimated Time must be an integer'),
        lessonImage: Yup.string().url('Invalid URL format').required('Lesson Image URL is required')
    }),
       
    
    onSubmit: async (values) => {
      createLessons(values);
      setShow(true);
    }
  })

  

  return (
    <Container>
         <Toast
        className='position-fixed top-0 end-0 mx-3'
        onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>{success ? 'Lesson added successfully!' : 'Error adding lesson.'}</Toast.Body>
        </Toast>
        <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter lesson title" name='lessonTitle'
        value={formik.values.lessonTitle} onChange={formik.handleChange}
        />
        {formik.errors.lessonTitle && <Alert className='text-danger'>{formik.errors.lessonTitle}</Alert>}
      </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label> Time</Form.Label>
        <Form.Control as="textarea" rows={3} name='estimatedTime'
        value={formik.values.estimatedTime} onChange={formik.handleChange}
        />
        {formik.errors.estimatedTime && <Alert className='text-danger'>{formik.errors.estimatedTime}</Alert>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label> ImageUrl</Form.Label>
        <Form.Control as="textarea" rows={3} name='lessonImage'
        value={formik.values.lessonImage} onChange={formik.handleChange}
        />
        {formik.errors.lessonImage && <Alert className='text-danger'>{formik.errors.lessonImage}</Alert>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Select aria-label="Default select example" name ="level"
        value={formik.values.level} onChange={formik.handleChange}
        >
          <option value="1">N1</option>
          <option value="2">N2</option>
          <option value="3">N3</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Completed"
        name="isCompleted"
        checked={formik.values.isCompleted} onChange={formik.handleChange}
      />
     
      </Form.Group>
      <Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form.Group>
    </Form>
    </Container>

  )
}
