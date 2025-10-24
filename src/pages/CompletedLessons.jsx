import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Button, Toast,Image } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { getCompletedLessons ,deleteLessons} from '../services/lessons.service'

export default function CompletedLessons() {
  const [lessons, setLessons] = useState([])
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    fetchAllLessons()
  }, [])

  const fetchAllLessons = async () => {
    try {
      const lessonsData = await getCompletedLessons()
      if (lessonsData && Array.isArray(lessonsData.data)) {
        const data = lessonsData.data
          .filter((l) => l.isCompleted)
          .sort((a, b) => b.id - a.id)
        setLessons(data)
      }
    } catch (error) {
      console.error('Error fetching lessons:', error)
    }
  }
  const handleDelete = async (id) => {
    // Implement delete functionality here
    setShow(true);
    await deleteLessons(id);
    setSuccess(true);
  }
  return (
    <>
    <Container>
      <Row>
        <Toast
        className='position-fixed top-0 end-0 mx-3'
        onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>{success ? 'Lesson deleted successfully!' : 'Error deleting lesson.'}</Toast.Body>
        </Toast>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Time</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id}>
                <td><Image  variant="top" src={l.lessonImage} style={{height :200, objectFit:'cover'}} alt={l.lessonsTitle} rounded /></td>
                <td>{l.lessonsTitle}</td>
                <td>{l.estimatedTime ? l.estimatedTime.toLocaleString() : 'N/A'}</td>
                <td>{l.level}</td>
                <td>EDIT </td>
                <td>DELETE <span onClick={() => {if (confirm("Are you sure you want to edit this lesson?"))  handleDelete(`${l.id}`)}}>✏️</span></td>
              </tr>
            ))}
          </tbody>
        </Table>
    </Row>

      {/* <Row>
        {lessons.map((l) => (
          <Col key={l.id} md={3}>
            <Card className="h-100" style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src={l.image}
                style={{ height: 200, objectFit: 'cover' }}
                onClick={() => navigate(`/lessons/${l.id}`)}
              />
              <Card.Body>
                <Card.Title>{l.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`/lessons/${l.id}`)}>
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row> */}
    </Container>
    </>
  )
}
