import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { getLessons } from '../services/lessons.service'

export default function Home() {
  const [lessons, setLessons] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllLessons()
  }, [])

  const fetchAllLessons = async () => {
    try {
      const lessonsData = await getLessons()
      if (lessonsData && Array.isArray(lessonsData.data)) {
        const filter = lessonsData.data.filter((l) => !l.isCompleted)
        setLessons(filter)
      }
    } catch (error) {
      console.error('Error fetching lessons:', error)
    }
  }

  return (
    <Container>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Lesson Name</th>
              <th>Instructor</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l, index) => (
              <tr key={l.id ?? index}>
                <td>{index + 1}</td>
                <td>{l.name}</td>
                <td>{l.instructor}</td>
                <td>{l.duration} mins</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>

      <Row>
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
      </Row>
    </Container>
  )
}
