import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { getLessons } from '../services/lessons.service'
export default function AllLessons() {
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchAllLessons();
    }, []);
    const fetchAllLessons = async () => {
        try {
            const lessonsData = await getLessons();
            const sortLessons = await lessonsData.data.sort((a,b) => b.id - a.id);
            // const filter = await lessonsData.data.filter(l=> !l.isCompleted);
            setLessons(sortLessons);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        }
    };
  return (
    <Container>
        
        <Row>
            {lessons.map((l) => (
              <Col key={l.id} md={3}>
     <Card className='h-100' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={l.image} style={{height :200, objectFit:'cover'}} 
        onClick={()=> navigate(`lessons/${l.id}`)}
      />
      <Card.Body>
        <Card.Title>{l.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
          <Button variant="primary" onClick={() => navigate(`lessons/${l.id}`)}>Go somewhere</Button>
      </Card.Body>
    </Card>
    </Col>
            ))}
        </Row>
        
     

    </Container>
  )
}
