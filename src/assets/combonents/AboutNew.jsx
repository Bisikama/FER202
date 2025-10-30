import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import '../SCSS/About.scss';

export default function AboutMe() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`about-page ${theme}-theme`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

      <div className="container">
        <div className="about-card">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="avatar">
              👨‍💻
            </div>
            <h1>Your Name</h1>
            <p className="title">Full Stack Developer | React Enthusiast</p>
        
          </div>

          {/* About Me Section */}
          <div className="section">
            <h2>👋 About Me</h2>
            <p>
              Hello! I'm a passionate web developer with a keen interest in creating beautiful and functional 
              user interfaces. I specialize in React development and enjoy building interactive web applications 
              that provide excellent user experiences.
            </p>
            <p>
              This Orchid Gallery project showcases my skills in React, including the use of React Hooks, 
              React Router, and SCSS for styling. I'm constantly learning and exploring new technologies 
              to improve my craft.
            </p>
          </div>

          {/* Personal Info Section */}
          <div className="section">
            <h2>📋 Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="icon">🎓</span>
                <div className="text">
                  <div className="label">Education</div>
                  <div className="value">FPT University</div>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">📍</span>
                <div className="text">
                  <div className="label">Location</div>
                  <div className="value">Ho Chi Minh City, Vietnam</div>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">💼</span>
                <div className="text">
                  <div className="label">Major</div>
                  <div className="value">Software Engineering</div>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">🌟</span>
                <div className="text">
                  <div className="label">Interests</div>
                  <div className="value">Web Development, UI/UX</div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="section">
            <h2>🚀 Technical Skills</h2>
            <div className="skills-container">
              <span className="skill-tag react">React</span>
              <span className="skill-tag javascript">JavaScript</span>
              <span className="skill-tag html">HTML5</span>
              <span className="skill-tag css">CSS3</span>
              <span className="skill-tag">SCSS/SASS</span>
              <span className="skill-tag node">Node.js</span>
              <span className="skill-tag git">Git</span>
              <span className="skill-tag">React Router</span>
              <span className="skill-tag">React Hooks</span>
              <span className="skill-tag">Responsive Design</span>
            </div>
          </div>

          {/* Education Section */}
          <div className="section">
            <h2>🎓 Education</h2>
            <div className="education-item">
              <h3>Second-year student of Software Engineering</h3>
              <div className="subtitle">FPT University</div>
              <div className="date">2021 - Present</div>
              <p>
                Focusing on software development, web technologies, and computer science fundamentals. 
                Currently learning React and modern web development practices.
              </p>
            </div>
          </div>

          {/* Experience/Projects Section */}
          <div className="section">
            <h2>💼 Hobby</h2>
            <div className="experience-item">
              <h3>Sport</h3>
              <div className="subtitle">Football</div>
              
              <p>
                I enjoy playing football during my free time. It helps me stay active and improves my teamwork skills.
              </p>
            </div>
            <div className="experience-item">
              <h3>Music</h3>
              <div className="subtitle">Guitar</div>
              <p>
                I love playing the guitar and often spend my weekends jamming with friends or working on new songs.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="section">
            <h2>📬 Get In Touch</h2>
            
            <div className="info-grid">
              <div className="info-item">
                <span className="icon">📧</span>
                <div className="text">
                  <div className="label">Email</div>
                  <div className="value">nguyenminhbao28032000@gmail.com</div>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">📱</span>
                <div className="text">
                  <div className="label">Phone</div>
                  <div className="value">+84 0792805337</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
