import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useTheme } from '../../hooks/useTheme';

export default function About() {
  const { theme, toggleTheme } = useTheme();

  const orchidFacts = [
    {
      icon: '🌍',
      title: 'Global Distribution',
      content: 'Orchids are found on every continent except Antarctica, with over 28,000 species worldwide.',
      color: '#667eea'
    },
    {
      icon: '🌸',
      title: 'Unique Beauty',
      content: 'Each orchid flower is bilaterally symmetrical, creating their distinctive and elegant appearance.',
      color: '#f093fb'
    },
    {
      icon: '🦋',
      title: 'Pollination Masters',
      content: 'Many orchids have co-evolved with specific pollinators, creating fascinating relationships.',
      color: '#20c997'
    },
    {
      icon: '⏰',
      title: 'Ancient Heritage',
      content: 'Orchids have existed for over 100 million years, making them one of the oldest flower families.',
      color: '#fd7e14'
    }
  ];

  const orchidTypes = [
    {
      name: 'Epiphytes',
      description: 'Air plants that grow on other plants without harming them',
      examples: 'Phalaenopsis, Cattleya, Dendrobium',
      percentage: '70%',
      color: '#28a745'
    },
    {
      name: 'Terrestrial',
      description: 'Ground-dwelling orchids that grow in soil',
      examples: 'Paphiopedilum, Cypripedium',
      percentage: '25%',
      color: '#6f42c1'
    },
    {
      name: 'Lithophytes',
      description: 'Rock-dwelling orchids that grow on stones',
      examples: 'Some Dendrobium species',
      percentage: '5%',
      color: '#dc3545'
    }
  ];

  return (
    <Container fluid className="py-5" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      {/* Theme Toggle Button */}
      <button 
        className="position-fixed top-0 end-0 m-4 btn shadow-lg"
        onClick={toggleTheme}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          padding: '12px 24px',
          fontWeight: '600',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

      {/* Hero Section */}
      <Container className="mb-5">
        <div 
          className="text-center py-5 px-4 rounded-4 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            marginBottom: '3rem'
          }}
        >
          <h1 
            className="display-2 fw-bold text-white mb-4"
            style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '2px'
            }}
          >
            🌺 About Orchids 🌺
          </h1>
          <p className="lead text-white fs-3 mb-4">
            Discover the fascinating world of nature's most sophisticated flowers
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Badge 
              className="px-4 py-3 fs-5"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}
            >
              🏆 Largest Plant Family
            </Badge>
            <Badge 
              className="px-4 py-3 fs-5"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}
            >
              🎨 Infinite Varieties
            </Badge>
            <Badge 
              className="px-4 py-3 fs-5"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}
            >
              💎 Symbol of Luxury
            </Badge>
          </div>
        </div>
      </Container>

      {/* Introduction Section */}
      <Container className="mb-5">
        <Row className="align-items-center">
          <Col lg={6}>
            <Card 
              className="h-100 border-0 shadow-lg"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: '25px'
              }}
            >
              <Card.Body className="p-5">
                <h2 
                  className="display-5 fw-bold mb-4"
                  style={{ color: 'var(--text-color)' }}
                >
                  The Orchid Family
                </h2>
                <p 
                  className="lead mb-4"
                  style={{ color: 'var(--text-color)', lineHeight: '1.8' }}
                >
                  Orchids belong to the family <strong>Orchidaceae</strong>, one of the largest families 
                  of flowering plants. With their intricate blooms and diverse forms, orchids have 
                  captivated humans for centuries.
                </p>
                <p 
                  className="mb-4"
                  style={{ color: 'var(--text-color)', lineHeight: '1.8' }}
                >
                  From the tiniest species with flowers smaller than a coin to giants with 
                  blooms spanning several feet, orchids showcase nature's incredible creativity 
                  and adaptation.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Badge 
                    className="px-3 py-2 fs-6"
                    style={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      borderRadius: '15px'
                    }}
                  >
                    28,000+ Species
                  </Badge>
                  <Badge 
                    className="px-3 py-2 fs-6"
                    style={{
                      background: 'linear-gradient(135deg, #20c997 0%, #28a745 100%)',
                      borderRadius: '15px'
                    }}
                  >
                    800+ Genera
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <div 
              className="position-relative rounded-4 overflow-hidden shadow-lg"
              style={{
                height: '400px',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div className="text-center">
                <div style={{ fontSize: '8rem' }}>🌸</div>
                <h3 
                  className="mt-3"
                  style={{ color: 'var(--text-color)' }}
                >
                  Nature's Masterpiece
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Fascinating Facts Section */}
      <Container className="mb-5">
        <h2 
          className="text-center display-5 fw-bold mb-5"
          style={{ color: 'var(--text-color)' }}
        >
          Fascinating Orchid Facts
        </h2>
        <Row className="g-4">
          {orchidFacts.map((fact, index) => (
            <Col key={index} lg={3} md={6}>
              <Card 
                className="h-100 border-0 shadow-lg text-center"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '25px',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${fact.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <Card.Body className="p-4">
                  <div 
                    className="mb-3 mx-auto"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${fact.color} 0%, ${fact.color}aa 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem'
                    }}
                  >
                    {fact.icon}
                  </div>
                  <h4 
                    className="fw-bold mb-3"
                    style={{ color: 'var(--text-color)' }}
                  >
                    {fact.title}
                  </h4>
                  <p 
                    style={{ 
                      color: 'var(--text-color)', 
                      opacity: 0.8,
                      lineHeight: '1.6'
                    }}
                  >
                    {fact.content}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Orchid Types Section */}
      <Container className="mb-5">
        <h2 
          className="text-center display-5 fw-bold mb-5"
          style={{ color: 'var(--text-color)' }}
        >
          Types of Orchids
        </h2>
        <Row className="g-4">
          {orchidTypes.map((type, index) => (
            <Col key={index} lg={4} md={6}>
              <Card 
                className="h-100 border-0 shadow-lg"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '25px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div 
                  className="text-center py-4"
                  style={{
                    background: `linear-gradient(135deg, ${type.color} 0%, ${type.color}cc 100%)`,
                    color: 'white'
                  }}
                >
                  <h3 className="fw-bold mb-2">{type.name}</h3>
                  <Badge 
                    className="px-4 py-2 fs-6"
                    style={{
                      background: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '20px'
                    }}
                  >
                    {type.percentage} of all orchids
                  </Badge>
                </div>
                <Card.Body className="p-4">
                  <p 
                    className="mb-3"
                    style={{ 
                      color: 'var(--text-color)',
                      lineHeight: '1.6'
                    }}
                  >
                    {type.description}
                  </p>
                  <div 
                    className="p-3 rounded-3"
                    style={{
                      backgroundColor: 'var(--bg-color)',
                      border: `2px solid ${type.color}40`
                    }}
                  >
                    <small 
                      className="fw-bold d-block mb-1"
                      style={{ color: type.color }}
                    >
                      Examples:
                    </small>
                    <small style={{ color: 'var(--text-color)' }}>
                      {type.examples}
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Quote Section */}
      <Container className="mb-5">
        <Card 
          className="border-0 shadow-lg text-center"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '30px'
          }}
        >
          <Card.Body className="p-5">
            <div style={{ fontSize: '4rem' }} className="mb-3">💫</div>
            <blockquote 
              className="blockquote mb-4"
              style={{ color: 'var(--text-color)' }}
            >
              <p className="display-6 fw-light fst-italic">
                "Orchids are not just flowers; they are nature's poetry written in petals and perfume."
              </p>
            </blockquote>
            <footer 
              className="blockquote-footer fs-5"
              style={{ color: 'var(--text-color)', opacity: 0.7 }}
            >
              Orchid Enthusiast
            </footer>
          </Card.Body>
        </Card>
      </Container>

      {/* Call to Action */}
      <Container>
        <div 
          className="text-center py-5 px-4 rounded-4 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #20c997 0%, #28a745 100%)'
          }}
        >
          <h2 className="display-5 fw-bold text-white mb-3">
            Ready to Explore?
          </h2>
          <p className="lead text-white fs-4 mb-4">
            Discover our beautiful collection of orchids and find your perfect bloom
          </p>
          <div style={{ fontSize: '3rem' }}>🌺🌸🌼</div>
        </div>
      </Container>

      {/* Footer Spacing */}
      <div style={{ height: '50px' }}></div>
    </Container>
  );
}