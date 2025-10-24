import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Button, Badge,ListGroup } from 'react-bootstrap'
import {  useParams } from 'react-router'
import { useNavigate } from 'react-router'
import { getDetailLessons } from '../services/lessons.service'
export default function Detail() {
    const [lessons, setLessons] = useState([]);
    //  const navigate = useNavigate();
     const { id } = useParams();
    useEffect(() => {
        fetchAllLessons();
    }, []);
    const fetchAllLessons = async () => {
        try {
            const lessonsData = await getDetailLessons(id);
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
            <Col md={3}>
            <Image src={lessons.lessonImages} fluid />
             <ListGroup variant="flush">
      <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
      <ListGroup.Item><h3> {lessons.lessonTitle}</h3></ListGroup.Item>
      <ListGroup.Item>Estimated Time: {lessons.estimatedTime ? lessons.estimatedTime.toLocaleString() : 'N/A'}</ListGroup.Item>
      <ListGroup.Item>Level: {lessons.level}</ListGroup.Item>
       <ListGroup.Item>Completed
        {lessons.isCompleted ? <Badge bg="success">Completed</Badge> : <Badge bg="warning">Not yet</Badge>}
       </ListGroup.Item>
    </ListGroup>
            </Col>
        </Row>
    </Container>
  )
}
