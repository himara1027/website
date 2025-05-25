import React, { useState, useEffect,useRef } from 'react';

import { ChevronDown, Menu,ChevronUp, X, Heart, Users, FileText, Calendar, Star,   BookOpen, ArrowRight,Phone, Mail, Download, ExternalLink } from 'lucide-react';

import './App.css';



// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'domain', 'VerticalTimeline', 'documents', 'slides', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'domain', label: 'Domain' },
    { id: 'VerticalTimeline', label: 'Milestones' },
    { id: 'documents', label: 'Documents' },
    { id: 'slides', label: 'Slides' },
    { id: 'about', label: 'AboutUs' },
    { id: 'contact', label: 'ContactUs' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <img 
              src="./images/logo.png" 
              alt="EnlightenDS Logo" 
              className="logo-image"
            />
            {/* <div>
              <h1 className="logo-title">EnlightenDS</h1>
              <p className="logo-subtitle">Advanced Technologies for Children</p>
            </div> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-button ${activeSection === item.id ? 'nav-button-active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <nav className="mobile-nav-content">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="mobile-nav-button"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Home Component
// Animated Number Counter Component
// const AnimatedCounter = ({ target, duration = 2000 }) => {
//   const [count, setCount] = useState(0);
  
//   useEffect(() => {
//     let startTime;
//     let animationFrame;
    
//     const step = (timestamp) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1);
//       setCount(Math.floor(progress * target));
      
//       if (progress < 1) {
//         animationFrame = requestAnimationFrame(step);
//       }
//     };
    
//     animationFrame = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(animationFrame);
//   }, [target, duration]);
  
//   return <span>{count}+</span>;
// };

const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);
  
  useEffect(() => {
    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // If element is visible and hasn't animated yet
        if (entries[0].isIntersecting && !hasAnimated) {
          startAnimation();
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of element is visible
    );
    
    // Observe our counter element
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    // Animation function
    const startAnimation = () => {
      let startTime;
      let animationFrame;
      
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };
      
      animationFrame = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animationFrame);
    };
    
    // Cleanup observer when component unmounts
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [target, duration, hasAnimated]);
  
  return (
    <div ref={counterRef} className="text-4xl font-bold">
      {count}+
    </div>
  );
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if(position.top < window.innerHeight * 0.8) {
          element.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // <section id="home" className="home-section">
    //   {/* Decorative elements */}
    //   <div className="decorative-circle circle-1"></div>
    //   <div className="decorative-circle circle-2"></div>
    //   <div className="decorative-circle circle-3"></div>
      
    //   {/* Hero section */}
    //   <div className="container">
    //     <div className={`hero-grid ${isVisible ? 'visible' : ''}`}>
    //       <div className="hero-content">
    //         <div className="badge">
    //           <Star className="badge-icon" size={14} />
    //           Empowering Special Children
    //         </div>
            
    //         <h1 className="hero-title">
    //           What is <span className="gradient-text">EnlightenDS</span>?
    //         </h1>
            
    //         <p className="hero-description">
    //           Discover EnlightenDS, the ultimate platform for children with Down syndrome. 
    //           EnlightenDS combines advanced technologies for skill enhancement and talent 
    //           recognition through innovative assessment tools, personalized learning programs, 
    //           and comprehensive support systems tailored for children with Down syndrome.
    //           Take control of your child's development journey and unlock their full potential 
    //           with EnlightenDS.
    //         </p>
            
    //         <div className="hero-buttons">
    //           <button 
    //             onClick={() => document.getElementById('domain')?.scrollIntoView({ behavior: 'smooth' })}
    //             className="primary-button"
    //           >
    //             Learn More <ChevronDown className="button-icon" size={20} />
    //           </button>
    //           <button 
    //             onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
    //             className="secondary-button"
    //           >
    //             Get Started <ArrowRight className="button-icon" size={20} />
    //           </button>
    //         </div>
    //       </div>
          
    //       <div className="hero-image-wrapper">
    //         <div className="hero-image-container">
    //           <img
    //             src="/images/background.jpg"
    //             alt="Child with Down syndrome using technology"
    //             className="hero-image"
    //           />
    //           <div className="image-decoration"></div>
    //         </div>
    //         <div className="floating-card card-1">
    //           <Heart className="card-icon" size={20} />
    //           <p>Personalized Learning</p>
    //         </div>
    //         <div className="floating-card card-2">
    //           <BookOpen className="card-icon" size={20} />
    //           <p>Skill Development</p>
    //         </div>
    //       </div>
    //     </div>
        
    //     {/* Stats section */}
    //     <div className="stats-container animate-on-scroll">
    //       <div className="stat-item">
    //         <div className="stat-number"><AnimatedCounter target={5000} /></div>
    //         <div className="stat-label">Children Helped</div>
    //       </div>
    //       <div className="stat-item">
    //         <div className="stat-number"><AnimatedCounter target={200} /></div>
    //         <div className="stat-label">Expert Educators</div>
    //       </div>
    //       <div className="stat-item">
    //         <div className="stat-number"><AnimatedCounter target={100} /></div>
    //         <div className="stat-label">Learning Programs</div>
    //       </div>
    //       <div className="stat-item">
    //         <div className="stat-number"><AnimatedCounter target={50} /></div>
    //         <div className="stat-label">Partner Schools</div>
    //       </div>
    //     </div>
        
    //     {/* Features preview */}
    //     <div className="features-preview animate-on-scroll">
    //       <h2 className="section-title">How We Help</h2>
    //       <div className="features-grid">
    //         <div className="feature-card">
    //           <div className="feature-icon-wrapper blue">
    //             <Star size={24} />
    //           </div>
    //           <h3>Talent Recognition</h3>
    //           <p>Identify and nurture your child's unique abilities and talents.</p>
    //         </div>
    //         <div className="feature-card">
    //           <div className="feature-icon-wrapper green">
    //             <Users size={24} />
    //           </div>
    //           <h3>Community Support</h3>
    //           <p>Connect with families and experts in a supportive environment.</p>
    //         </div>
    //         <div className="feature-card">
    //           <div className="feature-icon-wrapper purple">
    //             <BookOpen size={24} />
    //           </div>
    //           <h3>Adaptive Learning</h3>
    //           <p>Customized education pathways that adapt to individual needs.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <>
{/* Home Section with Hero only */}
<section id="home" className="home-section">
  {/* Decorative elements */}
  <div className="decorative-circle circle-1"></div>
  <div className="decorative-circle circle-2"></div>
  <div className="decorative-circle circle-3"></div>
  <div className="decorative-circle circle-4"></div>
  <div className="decorative-circle circle-5"></div>
  
    {/* Hero section */}
    <div className={`hero-grid ${isVisible ? 'visible' : ''}`}>
      <div className="hero-content">
        <div className="badge">
          <Star className="badge-icon" size={14} />
          Empowering Special Children
        </div>
        
        <h1 className="hero-title">
          What is <span className="gradient-text">EnlightenDS</span>?
        </h1>
        
        <p className="hero-description">
          Discover EnlightenDS, the ultimate platform for children with Down syndrome. 
          EnlightenDS combines advanced technologies for skill enhancement and talent 
          recognition through innovative assessment tools, personalized learning programs, 
          and comprehensive support systems tailored for children with Down syndrome.
          Take control of your child's development journey and unlock their full potential 
          with EnlightenDS.
        </p>
        
        <div className="hero-buttons">
          <button 
            onClick={() => document.getElementById('domain')?.scrollIntoView({ behavior: 'smooth' })}
            className="primary-button"
          >
            Learn More <ChevronDown className="button-icon" size={20} />
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="secondary-button"
          >
            Get Started <ArrowRight className="button-icon" size={20} />
          </button>
        </div>
      </div>
      
      <div className="hero-image-wrapper">
        <div className="hero-image-container">
          <img
            src="/images/full.png"
            alt="Child with Down syndrome using technology"
            className="hero-image"
          />
          
        </div>
        <div className="floating-card card-1">
          <Heart className="card-icon" size={20} />
          <p>Personalized Learning</p>
        </div>
        <div className="floating-card card-2">
          <BookOpen className="card-icon" size={20} />
          <p>Skill Development</p>
        </div>
      </div>
    </div>
  
</section>



{/* Stats section - styled like the business image but with original content */}
<section id="stats" className="business-stats-section">
  <div className="container">
    <div className="business-header">
      <h2 className="business-title">Empowering Every Child's Potential Through Excellence</h2>
      <p className="business-subtitle">
        We are a leading educational organization dedicated to nurturing gifted children with a 
        proven track record of delivering exceptional learning experiences and support worldwide.
      </p>
    </div>
    
    <div className="business-stats-container">
      <div className="business-stat-item">
        <div className="business-stat-number"><AnimatedCounter target={300} /></div>
        <div className="business-stat-label">Children Helped</div>
      </div>
      <div className="business-stat-divider"></div>
      <div className="business-stat-item">
        <div className="business-stat-number"><AnimatedCounter target={20} /></div>
        <div className="business-stat-label">Expert Educators</div>
      </div>
      <div className="business-stat-divider"></div>
      <div className="business-stat-item">
        <div className="business-stat-number"><AnimatedCounter target={30} /></div>
        <div className="business-stat-label">Learning Programs</div>
      </div>
      <div className="business-stat-divider"></div>
      <div className="business-stat-item">
        <div className="business-stat-number"><AnimatedCounter target={15} /></div>
        <div className="business-stat-label">Partner Schools</div>
      </div>
    </div>
    
  </div>
</section>

{/* Features section - exactly like the image design */}
<section id="features" className="business-features-section">
  <div className="container">
    <div className="business-features-header">
      <h2 className="business-features-title">Why Choose Us?</h2>
    </div>
    
    <div className="business-features-grid">
      <div className="business-feature-item">
        <div className="business-feature-icon">
          <Star size={40} />
        </div>
        <h3 className="business-feature-title">Talent Recognition</h3>
        <p className="business-feature-description">
          We identify and nurture your child's unique abilities through our comprehensive assessment process. Our experienced team recognizes diverse talents and creates personalized development pathways to help every child reach their full potential in a supportive environment.
        </p>
      </div>
      
      <div className="business-feature-item">
        <div className="business-feature-icon">
          <Users size={40} />
        </div>
        <h3 className="business-feature-title">Community Support</h3>
        <p className="business-feature-description">
          Our comprehensive support network includes parent resources, peer connections, and expert guidance. We create a collaborative environment where families can connect, share experiences, and access professional support to navigate their child's educational journey together.
        </p>
      </div>
      
      <div className="business-feature-item">
        <div className="business-feature-icon">
          <BookOpen size={40} />
        </div>
        <h3 className="business-feature-title">Adaptive Learning</h3>
        <p className="business-feature-description">
          At our center, we leverage personalized learning frameworks and innovative teaching methods to deliver educational experiences that adapt to individual needs. Our experienced educators collaborate closely with students to ensure effective progress and meaningful learning outcomes.
        </p>
      </div>
      
      <div className="business-feature-item">
        <div className="business-feature-icon">
          <BookOpen size={40} />
        </div>
        <h3 className="business-feature-title">Holistic Development</h3>
        <p className="business-feature-description">
          We focus on developing not just academic excellence but also emotional intelligence, creativity, and social skills. Our comprehensive approach ensures well-rounded growth that prepares children for future success while maintaining their natural curiosity and joy for learning.
        </p>
      </div>
    </div>
  </div>
</section>
</>
  );
};


const Domain = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  
  const domains = [
    {
      title: "Literature Survey",
      icon: "📚",
      content: "Recent research on Down syndrome (DS) combines AI, adaptive learning and assistive technologies to support early detection and personalized intervention. Deep learning models like CNNs and BPNNs have shown promise in non-invasive DS screening through ultrasound image analysis using features like nuchal translucency and nasal bone detection.For speech and language development, AAC tools such as PECS, SGDs and Makaton along with machine learning based feedback systems and wearable devices help improve articulation and vocabulary. In numeracy, programs like Kumon, Numicon and The Number Race use visual aids and adaptive quizzes to enhance math skills.However, talent identification in DS children remains limited. Studies explore fine motor skills and adaptive assessments but lack integrated systems. The proposed EnlightenDS platform addresses this by combining AI-based detection, pronunciation feedback and skill tracking to support learning and recognize individual strengths.",
      image: "/images/li.png" // Replace with your actual image path
    },
    {
      title: "Research Gap",
      icon: "🔍",
      content: "Existing research on early Down syndrome (DS) detection using deep learning models like CNNs and BPNNs has shown promise but remains limited in scope and accessibility. Key gaps include basic image segmentation without fine feature extraction, lack of robust classifiers like SVM, absence of web-based deployment and failure to address gender bias in diagnostic outcomes. Additionally, many studies provide only binary outputs without confidence metrics. In contrast, EnlightenDS integrates advanced image analysis, SVMs, gender neutral models, and probability-based results through an accessible web platform. It also bridges educational gaps by introducing adaptive learning, gamified speech therapy and talent identification features addressing both clinical and developmental needs in a unified system.",
      image: "/images/d.png" // Replace with your actual image path
    },
    {
      title: "Research Problem",
      icon: "❓",
      content: "The main objective is developing a comprehensive platform to transform care and skill development for children with Down syndrome. Sub-objectives include predicting developmental milestones through advanced models, implementing adaptive learning systems for personalized education, generating customized therapy plans with innovative algorithms, and implementing monitoring solutions for real-time progress tracking. The goals focus on improving outcomes, enhancing quality of life, and pioneering data-driven child development.",
      image: "/images/do.png" // Replace with your actual image path
    },
    {
      title: "Research Objectives",
      icon: "🎯",
      content: "Core objectives involve enhancing accessibility to specialized Down syndrome intervention tools, developing localized applications capturing unique developmental patterns, improving early skill recognition through advanced assessment techniques, addressing gaps in personalized learning approaches, absence of comprehensive talent discovery protocols and lack of real-time progress monitoring systems - ultimately empowering families and jeopardizing optimal development potential dependent on innovative technological solutions.",
      image: "/images/research-objectives.jpg" // Replace with your actual image path
    },
     {
      title: "Technologies",
      icon: "💻",
      content: "Core objectives involve enhancing accessibility to specialized Down syndrome intervention tools, developing localized applications capturing unique developmental patterns, improving early skill recognition through advanced assessment techniques, addressing gaps in personalized learning approaches, absence of comprehensive talent discovery protocols and lack of real-time progress monitoring systems - ultimately empowering families and jeopardizing optimal development potential dependent on innovative technological solutions.",
      image: "/images/research-objectives.jpg" // Replace with your actual image path
    }
  ];
  
  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="domain" className="domain-section">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Our Domain</h2>
      </div>
      
      <div className="domain-cards-container">
        {domains.map((domain, index) => (
          <div 
            key={index} 
            className={`domain-card ${expandedCard === index ? 'expanded' : ''}`}
          >
            <div className="domain-card-wrapper">
              <div className="domain-card-content-wrapper">
                <div className="domain-card-header">
                  <div className="domain-card-icon">{domain.icon}</div>
                  <h3 className="domain-card-title">{domain.title}</h3>
                  <div className="domain-card-spacer"></div>
                  <button 
                    className="domain-card-btn"
                    onClick={() => toggleCard(index)}
                  >
                    {expandedCard === index ? 'Show Less' : 'Learn More'}
                  </button>
                </div>
                
                {expandedCard === index && (
                  <>
                    <div className="domain-card-divider"></div>
                    
                    <div className="domain-card-body">
                      <div className="domain-card-text">
                        <p className="domain-card-content">{domain.content}</p>
                      </div>
                      
                      <div className="domain-card-image">
                        <img src={domain.image} alt={domain.title} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <style jsx>{`
      /* Domain Section Styles */
      .domain-section {
        padding: 4rem 0;
        background-color: #f8f9fa;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }
      
      .section-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .section-title {
        font-size: 2.5rem;
        color: var(--primary-blue, #0062cc);
        margin-bottom: 1rem;
      }
      
      .section-divider {
        height: 4px;
        width: 60px;
        background: linear-gradient(90deg, var(--primary-blue, #0062cc), var(--secondary-yellow, #ffc107));
        margin: 0 auto;
      }
      
      /* Vertical Domain Cards */
      .domain-cards-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 0 auto;
        max-width: 900px;
      }
      
      .domain-card {
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        position: relative;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-left: 5px solid var(--blue-primary);
      }
      
      .domain-card::after {
        content: '';
        position: absolute;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(180deg, var(--primary-blue, #0062cc), var(--secondary-yellow, #ffc107));
        transform: scaleY(0);
        transform-origin: top;
        transition: transform 0.5s ease;
      }
      
      .domain-card:hover::after,
      .domain-card.expanded::after {
        transform: scaleY(1);
      }
      
      .domain-card-wrapper {
        padding: 1rem 1.5rem;
      }
      
      .domain-card-header {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 1rem;
      }
      
      .domain-card-icon {
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        flex-shrink: 0;
      }
      
      .domain-card-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--primary-blue, #0062cc);
        margin: 0;
        transition: color 0.3s ease;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .domain-card-spacer {
        flex-grow: 1;
      }
      
      .domain-card:hover .domain-card-title,
      .domain-card.expanded .domain-card-title {
        color: var(--secondary-yellow, #ffc107);
      }
      
      .domain-card-divider {
        width: 100%;
        height: 1px;
        background: #e9ecef;
        margin: 1rem 0;
        transition: background 0.3s ease;
      }
      
      .domain-card:hover .domain-card-divider,
      .domain-card.expanded .domain-card-divider {
        background: linear-gradient(90deg, var(--primary-blue, #0062cc), var(--secondary-yellow, #ffc107));
      }
      
      .domain-card-body {
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
        margin: 1rem 0;
      }
      
      .domain-card-text {
        flex: 1;
      }
      
      .domain-card-content {
        color: #6c757d;
        font-size: 1rem;
        line-height: 1.5;
        margin: 0;
      }
      
      .domain-card-image {
        flex: 1;
        max-width: 300px;
        height: auto;
        border-radius: 8px;
        overflow: hidden;
      }
      
      .domain-card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .domain-card:hover .domain-card-image img {
        transform: scale(1.05);
      }
      
      .domain-card-btn{
  padding: 1rem 2rem;
  background: rgb(2, 34, 108);
  color: white;
  border: none;
  border-radius: var(--border-radius);

  cursor: pointer;
  transition: all 0.3s ease;
}
      
      .domain-card-btn:hover {
        background: rgb(0, 57, 190);
        color: white;
        border-color: transparent;
      }
      
      /* Entrance Animation */
      .domain-card {
        animation: slideInFromLeft 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        opacity: 0;
      }
      
      .domain-card:nth-child(1) { animation-delay: 0.1s; }
      .domain-card:nth-child(2) { animation-delay: 0.2s; }
      .domain-card:nth-child(3) { animation-delay: 0.3s; }
      .domain-card:nth-child(4) { animation-delay: 0.4s; }
      
      @keyframes slideInFromLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      /* Responsive Styles */
      @media (max-width: 768px) {
        .domain-card-body {
          flex-direction: column;
          gap: 1rem;
        }
        
        .domain-card-image {
          max-width: 100%;
        }
      }
      
      @media (max-width: 480px) {
        .domain-card-header {
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .domain-card-title {
          flex: 1;
        }
        
        .domain-card-btn {
          margin-top: 0.5rem;
          width: 100%;
          text-align: center;
        }
      }
    `}</style>
  </section>
  );
};




// vertical Timeline Component
// const VerticalTimeline = () => {
//   const [progress, setProgress] = useState(0);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const timelineRef = useRef(null);

//   const milestones = [
//     {
//       id: 1,
//       date: "April 3rd 2023",
//       title: "Project Proposal",
//       description: "Presented to a panel of judges in order to provide an overview of the proposed research.",
//       marks: "5%",
//       icon: "📋",
//       color: "yellow"
//     },
//     {
//       id: 2,
//       date: "May 25th 2023",
//       title: "Progress Presentation - 1",
//       description: "Evaluation of 50% completion of the proposed solution by a panel of judges.",
//       marks: "10%",
//       icon: "📊",
//       color: "dark-blue"
//     },
//     {
//       id: 3,
//       date: "Sept 7th 2023",
//       title: "Research Paper",
//       description: "Evaluation of 90% completion of the proposed solution by a panel of judges.",
//       marks: "18%",
//       icon: "📄",
//       color: "yellow"
//     },
//     {
//       id: 4,
//       date: "Sept 7th 2023",
//       title: "Progress Presentation - 2",
//       description: "Evaluation of 90% completion of the proposed solution by a panel of judges.",
//       marks: "18%",
//       icon: "⚙️",
//       color: "dark-blue"
//     },
//     {
//       id: 5,
//       date: "Oct 30th 2023",
//       title: "Website Assessment",
//       description: "Final evaluation of the website implementation and functionality.",
//       marks: "25%",
//       icon: "💻",
//       color: "yellow"
//     },
//     {
//       id: 6,
//       date: "Oct 30th 2023",
//       title: "Final Assessment & Viva",
//       description: "Final evaluation of the completed product and comprehensive assessment.",
//       marks: "25%",
//       icon: "🎯",
//       color: "dark-blue"
//     },
//     {
//       id: 7,
//       date: "Nov 30th 2023",
//       title: "Final Report Submission",
//       description: "Final project submission and completion of all requirements.",
//       marks: "27%",
//       icon: "📝",
//       color: "yellow"
//     },
//   ];

//   // Calculate current progress based on dates
//   useEffect(() => {
//     const calculateProgress = () => {
//       const now = new Date();
//       const startDate = new Date('2023-04-03');
//       const endDate = new Date('2023-11-30');
      
//       // If current date is before start date, progress is 0
//       if (now < startDate) return 0;
      
//       // If current date is after end date, progress is 100
//       if (now > endDate) return 100;
      
//       // Calculate percentage of timeline completed
//       const totalDuration = endDate - startDate;
//       const elapsedDuration = now - startDate;
//       return Math.min(100, Math.round((elapsedDuration / totalDuration) * 100));
//     };
    
//     setProgress(calculateProgress());
    
//     // Add scroll behavior for vertical timeline and animation
//     const handleScroll = () => {
//       if (timelineRef.current) {
//         const items = timelineRef.current.querySelectorAll('.timeline-item');
        
//         items.forEach((item, index) => {
//           const rect = item.getBoundingClientRect();
//           const isVisible = (
//             rect.top >= 0 &&
//             rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
//           );
          
//           if (isVisible) {
//             item.classList.add('visible');
//             // Update progress line height
//             const progressLine = timelineRef.current.querySelector('.timeline-progress');
//             if (progressLine) {
//               const progressHeight = (index + 1) / items.length * 100;
//               progressLine.style.height = `${Math.min(progressHeight, progress)}%`;
//             }
//           }
//         });
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Initial check on load
    
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [progress]);

//   return (
//     <div className="timeline-container">
//       <div className="timeline-wrapper">
//         <div className="timeline-header">
//           <h2 className="section-title">Project Timeline</h2>
//           {/* <p className="timeline-subtitle">Key milestones and deliverables for our project</p> */}
//         </div>
        
//         <div className="timeline" ref={timelineRef}>
//           {/* Timeline Line */}
//           <div className="timeline-line"></div>
          
//           {/* Timeline Progress Line */}
//           <div className="timeline-progress"></div>
          
//           {/* Milestone Items */}
//           <div className="timeline-items">
//             {milestones.map((milestone, index) => (
//               <div 
//                 key={milestone.id} 
//                 className="timeline-item"
//                 onMouseEnter={() => setActiveIndex(milestone.id)}
//                 onMouseLeave={() => setActiveIndex(null)}
//               >
//                 <div className="timeline-item-content">
//                   {/* Date Bubble with Timeline Node Inside */}
//                   <div className={`
//                     date-bubble 
//                     ${activeIndex === milestone.id ? 'date-bubble-active' : ''}
//                     ${milestone.color === 'yellow' ? 'date-bubble-yellow' : 'date-bubble-blue'}
//                   `}>
//                     {/* Timeline Node */}
//                     <div className="timeline-node">
//                       <div className={`
//                         timeline-node-icon
//                         ${milestone.color === 'yellow' ? 'node-yellow' : 'node-blue'}
//                       `}>
//                         <span className="timeline-node-text">{milestone.icon}</span>
//                       </div>
//                     </div>
                    
//                     {/* Date */}
//                     <div className="date-bubble-inner">
//                       {milestone.date}
//                     </div>
//                   </div>
                  
//                   {/* Content Box */}
//                   <div className={`
//                     content-box
//                     ${milestone.color === 'yellow' ? 'content-box-yellow' : 'content-box-blue'}
//                   `}>
//                     <h3 className={`content-title ${milestone.color === 'yellow' ? 'title-yellow' : 'title-blue'}`}>
//                       {milestone.title}
//                     </h3>
//                     <p className="content-description">{milestone.description}</p>
//                     <div className="content-footer">
//                       <span className={`
//                         marks-tag
//                         ${milestone.color === 'yellow' ? 'marks-yellow' : 'marks-blue'}
//                       `}>
//                         Marks: {milestone.marks}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const VerticalTimeline = () => {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const timelineRef = useRef(null);

  const milestones = [
    {
      id: 1,
      date: "August 16th 2024",
      title: "Project Proposal",
      description: "Presented to a panel of judges in order to provide an overview of the proposed research.",
      marks: "5%",
      icon: "📋",
      color: "yellow"
    },
    {
      id: 2,
      date: "December 06th 2024",
      title: "Progress Presentation - 1",
      description: "Evaluation of 50% completion of the proposed solution by a panel of judges.",
      marks: "10%",
      icon: "📊",
      color: "dark-blue"
    },
    {
      id: 3,
      date: "March 20th 2025",
      title: "Research Paper",
      description: "Evaluation of 90% completion of the proposed solution by a panel of judges.",
      marks: "18%",
      icon: "📄",
      color: "yellow"
    },
    {
      id: 4,
      date: "March 20th 2025",
      title: "Progress Presentation - 2",
      description: "Evaluation of 90% completion of the proposed solution by a panel of judges.",
      marks: "18%",
      icon: "⚙️",
      color: "dark-blue"
    },
    {
      id: 5,
      date: "June 02nd 2025",
      title: "Website Assessment",
      description: "Final evaluation of the website implementation and functionality.",
      marks: "25%",
      icon: "💻",
      color: "yellow"
    },
    {
      id: 6,
      date: "May 28th 2025",
      title: "Final Assessment & Viva",
      description: "Final evaluation of the completed product and comprehensive assessment.",
      marks: "25%",
      icon: "🎯",
      color: "dark-blue"
    },
    {
      id: 7,
      date: "April 11th 2025",
      title: "Final Report Submission",
      description: "Final project submission and completion of all requirements.",
      marks: "27%",
      icon: "📝",
      color: "yellow"
    },
  ];

  // Calculate current progress based on dates
  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const startDate = new Date('2023-04-03');
      const endDate = new Date('2023-11-30');
      
      // If current date is before start date, progress is 0
      if (now < startDate) return 0;
      
      // If current date is after end date, progress is 100
      if (now > endDate) return 100;
      
      // Calculate percentage of timeline completed
      const totalDuration = endDate - startDate;
      const elapsedDuration = now - startDate;
      return Math.min(100, Math.round((elapsedDuration / totalDuration) * 100));
    };
    
    setProgress(calculateProgress());
    
    // Add scroll behavior for vertical timeline and animation
    const handleScroll = () => {
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll('.timeline-item');
        
        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const isVisible = (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 1.2
          );
          
          if (isVisible) {
            item.classList.add('visible');
            // Update progress line height
            const progressLine = timelineRef.current.querySelector('.timeline-progress');
            if (progressLine) {
              const progressHeight = (index + 1) / items.length * 100;
              progressLine.style.height = `${Math.min(progressHeight, progress)}%`;
            }
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progress]);

  return (
    <div id="VerticalTimeline" className="timeline-container">
  <div className="timeline-wrapper">
    <div className="timeline-header">
      <h2 className="timeline-title">Project Journey</h2>
      <p className="timeline-subtitle">Follow our project milestones from inception to completion</p>
      <div className="timeline-progress-bar">
        <div className="timeline-progress-track">
          <div 
            className="timeline-progress-fill" 
            style={{ width: `${progress}%` }}
          >
            <span className="timeline-progress-percent">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="timeline" ref={timelineRef}>
      {/* Timeline Line */}
      <div className="timeline-line">
        <div className="timeline-dots">
          {milestones.map((milestone) => (
            <div 
              key={`dot-${milestone.id}`} 
              className={`timeline-dot ${activeIndex === milestone.id ? 'active' : ''}`}
              style={{ top: `${(milestone.id - 1) * (100 / (milestones.length - 1))}%` }}
            />
          ))}
        </div>
      </div>
      
      {/* Timeline Progress Line */}
      <div className="timeline-progress"></div>
      
      {/* Milestone Items */}
      <div className="timeline-items">
        {milestones.map((milestone) => (
          <div 
            key={milestone.id} 
            className={`timeline-item ${milestone.color === 'yellow' ? 'timeline-item-yellow' : 'timeline-item-blue'}`}
            onMouseEnter={() => setActiveIndex(milestone.id)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="timeline-item-content">
              {/* Date Bubble with Timeline Node Inside */}
              <div className={`
                date-bubble 
                ${activeIndex === milestone.id ? 'date-bubble-active' : ''}
                ${milestone.color === 'yellow' ? 'date-bubble-yellow' : 'date-bubble-blue'}
              `}>
                {/* Timeline Node */}
                <div className="timeline-node">
                  <div className={`
                    timeline-node-icon
                    ${milestone.color === 'yellow' ? 'node-yellow' : 'node-blue'}
                    ${activeIndex === milestone.id ? 'node-active' : ''}
                  `}>
                    <span className="timeline-node-text">{milestone.icon}</span>
                  </div>
                </div>
                
                {/* Date */}
                <div className="date-bubble-inner">
                  {milestone.date}
                </div>
              </div>
              
              {/* Content Box */}
              <div className={`
                content-box
                ${milestone.color === 'yellow' ? 'content-box-yellow' : 'content-box-blue'}
                ${activeIndex === milestone.id ? 'content-box-active' : ''}
              `}>
                <h3 className={`content-title ${milestone.color === 'yellow' ? 'title-yellow' : 'title-blue'}`}>
                  {milestone.title}
                </h3>
                <p className="content-description">{milestone.description}</p>
                <div className="content-footer">
                  <span className={`
                    marks-tag
                    ${milestone.color === 'yellow' ? 'marks-yellow' : 'marks-blue'}
                  `}>
                    Weight: {milestone.marks}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  );
};


const Documents = () => {
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    proposal: false,
    finalReport: false
  });

  // Toggle function for expanding/collapsing sections
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Main documents list
  const documents = [
    { title: "TAF", id: "charter", fileUrl: "/documents/TAF_24_25J_228.pdf" },
    { 
      title: "Proposal Document", 
      id: "proposal", 
      fileUrl: "/documents/proposal-document.pdf",
      isExpandable: true,
      hideDownload: true
    },
    { title: "Status Document - 1", id: "status1", fileUrl: "/documents/status-document-1.pdf" },
    { title: "Status Document - 2", id: "status2", fileUrl: "/documents/status-document-2.pdf" },
    {
      title: "Final Report",
      id: "finalReport",
      fileUrl: "/documents/final-report.pdf",
      isExpandable: true,
      hideDownload: true
    }
  ];

  // Proposal documents that will be shown when expanded
  const proposalDocs = [
    { title: "IT21296314", fileUrl: "/documents/proposal/24-25J-228 - IT21296314.pdf", icon: "FileText" },
    { title: "IT21293030", fileUrl: "/documents/proposal/24-25J-228 -IT21293030.pdf", icon: "FileText" },
    { title: "IT21342394", fileUrl: "/documents/proposal/24-25J-228-IT21342394.pdf", icon: "FileText" },
    { title: "IT21292972", fileUrl: "/documents/proposal/24-25J-228 - IT21292972.pdf", icon: "FileText" }
  ];

  // Final report documents that will be shown when expanded
  const finalReportDocs = [
    { title: "IT21296314", fileUrl: "/documents/final-report/24-25J-228 - IT21296314 - Individual Report.pdf", icon: "FileText" },
    { title: "IT21293030", fileUrl: "/documents/final-report/24-25J-228- IT21293030-Individual Report.pdf", icon: "FileText" },
    { title: "IT21342394", fileUrl: "/documents/final-report/24-25J-228 - IT21342394 - Individual Report.pdf", icon: "FileText" },
    { title: "IT21292972", fileUrl: "/documents/final-report/24-25J-228_IT21292972 - Individual Report final.pdf", icon: "FileText" }
  ];

  // Function to handle file downloads
  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle download all files in a section
  const handleDownloadAll = (files, sectionName) => {
    files.forEach((file) => {
      handleDownload(file.fileUrl, `${sectionName} - ${file.title}.pdf`);
    });
  };

  return (
    <section id="documents" className="documents-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Project Documents</h2>
        </div>
        
        <div className="documents-list">
          {documents.map((doc, index) => (
            <div key={index} className="document-wrapper">
              <div className="document-item">
                <div className="document-info">
                  <div className="document-icon">
                    <FileText size={24} />
                  </div>
                  <span className="document-title">{doc.title}</span>
                </div>
                <div className="document-actions">
                  {doc.isExpandable && (
                    <button
                      className={`expand-button ${expandedSections[doc.id] ? 'active' : ''}`}
                      onClick={() => toggleSection(doc.id)}
                    >
                      {expandedSections[doc.id] ? (
                        <>
                          <ChevronUp size={20} className="button-icon" />
                          <span>Collapse</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown size={20} className="button-icon" />
                          <span>Expand</span>
                        </>
                      )}
                    </button>
                  )}
                  {!doc.hideDownload && (
                    <button
                      className="download-button"
                      onClick={() => handleDownload(doc.fileUrl, `${doc.title}.pdf`)}
                    >
                      <Download size={20} className="button-icon" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Expandable section for Proposal Document */}
              {doc.id === "proposal" && expandedSections.proposal && (
                <div className="expandable-container proposal-container">
                  <div className="expandable-header">
                    <h3 className="expandable-title">Proposal Documents</h3>
                    <div className="expandable-actions">
                      <button 
                        className="download-all-button"
                        onClick={() => handleDownloadAll(proposalDocs, "Proposal")}
                      >
                        <Download size={16} className="button-icon" />
                        <span>Download All</span>
                      </button>
                      <button 
                        className="close-button"
                        onClick={() => toggleSection("proposal")}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="files-grid">
                    {proposalDocs.map((file, idx) => (
                      <div key={idx} className="file-card">
                        <div className="file-icon">
                          <FileText size={36} />
                        </div>
                        <div className="file-title">{file.title}</div>
                        <button
                          className="file-download-button"
                          onClick={() => handleDownload(file.fileUrl, `Proposal - ${file.title}.pdf`)}
                        >
                          <Download size={14} className="button-icon" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Expandable section for Final Report */}
              {doc.id === "finalReport" && expandedSections.finalReport && (
                <div className="expandable-container final-report-container">
                  <div className="expandable-header">
                    <h3 className="expandable-title">Final Report Documents</h3>
                    <div className="expandable-actions">
                      <button 
                        className="download-all-button"
                        onClick={() => handleDownloadAll(finalReportDocs, "Final Report")}
                      >
                        <Download size={16} className="button-icon" />
                        <span>Download All</span>
                      </button>
                      <button 
                        className="close-button"
                        onClick={() => toggleSection("finalReport")}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="files-grid">
                    {finalReportDocs.map((file, idx) => (
                      <div key={idx} className="file-card">
                        <div className="file-icon final-report-icon">
                          <FileText size={36} />
                        </div>
                        <div className="file-title">{file.title}</div>
                        <button
                          className="file-download-button"
                          onClick={() => handleDownload(file.fileUrl, `Final Report - ${file.title}.pdf`)}
                        >
                          <Download size={14} className="button-icon" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Slides = () => {
  const slides = [
    { 
      title: "Proposal Presentation", 
      type: "PowerPoint",
      fileName: "proposal-presentation.pptx",
      filePath: "documents/slides/24-25J-228-PPT.pptx" // Update with your actual file path
    },
    { 
      title: "Progress Presentation -1", 
      type: "PowerPoint",
      fileName: "progress-presentation-1.pptx",
      filePath: "documents/slides/24-25J-228-PPT-PP1.pptx"
    },
    { 
      title: "Progress Presentation -2", 
      type: "PowerPoint",
      fileName: "progress-presentation-2.pptx",
      filePath: "documents/slides/24-25J-228-PPT-PP2 (1).pptx"
    },
    { 
      title: "Final Presentation", 
      type: "PowerPoint",
      fileName: "final-presentation.pptx",
      filePath: "documents/slides/final-presentation.pptx"
    }
  ];

  const handleDownload = (slide) => {
    // Method 1: Direct download using anchor element
    const link = document.createElement('a');
    link.href = slide.filePath;
    link.download = slide.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Add analytics or tracking
    console.log(`Downloaded: ${slide.fileName}`);
  };

  // Alternative method for fetch-based download (if files are served via API)
  const handleDownloadWithFetch = async (slide) => {
    try {
      const response = await fetch(slide.filePath);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = slide.fileName;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <section id="slides" className="slides-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Slides</h2>
        </div>
        <div className="slides-row">
          {slides.map((slide, index) => (
            <div key={index} className="slide-card">
              <div className="slide-content">
                <div className="slide-icon">
                  <FileText size={32} />
                </div>
                <h3 className="slide-title">{slide.title}</h3>
                <p className="slide-type">{slide.type}</p>
              </div>
              <button 
                className="download-button-1"
                onClick={() => handleDownload(slide)}
                title={`Download ${slide.fileName}`}
              >
                <Download size={20} className="button-icon" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const AboutUs = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const teamMembers = [
    {
      name: "Prof. Samantha Thelijjagoda",
      role: "Supervisor",
      image: "images/supervisor.jpg",
      department: "Computer Science",
      email: "samantha.t@sliit.lk",
      linkedin: "http://linkedin.com/in/samantha-thelijjagoda-84342037",
      profile: "http://linkedin.com/in/samantha-thelijjagoda-84342037",
     
    },
    {
      name: "Dr. Junius Anjana",
      role: "Co-supervisor",
      image: "images/co-supervisor.jpg",
      department: "Software Engineering", 
      email: "junius.a@sliit.lk",
      linkedin: "http://linkedin.com/in/vidanaralage",
      profile: "http://linkedin.com/in/vidanaralage",
      
      
    },
    {
      name: "Dr. Kamalani Wanigasinghe",
      role: "External Supervisor",
      image: "/images/external-supervisor.jpg",
      department: "Information Systems",
      email: "kamalani@external.edu",
      linkedin: "http://linkedin.com/in/kamalani-wanigasinghe-0b7a0a131",
      profile: "http://linkedin.com/in/kamalani-wanigasinghe-0b7a0a131",
      
    },
    {
      name: "Kumarasinghe D.P",
      role: "IT21296314",
      image: "/images/dilshi.jpg",
      bio: "Team Leader",
      email: "it21296314@my.sliit.lk",
      github: "https://github.com/it21296314/EnlightenDS",
      linkedin: "https://linkedin.com/in/dilshi-kumarasinghe",
      year: "Final Year",
      
    },
    {
      name: "Jayasuriya S.H",
      role: "IT21293030", 
      image: "/images/senuri.png",
      bio: "Team Member",
      email: "it21293030@my.sliit.lk",
      github: "https://github.com/it21296314/EnlightenDS",
      linkedin: "https://linkedin.com/in/senuri-jayasuriya",
      year: "Final Year",
      
    },
    {
      name: "Semini B.V.S",
      role: "IT21342394",
      image: "/images/save.png", 
      bio: "Team Member",
      email: "it21342394@my.sliit.lk",
      github: "https://github.com/it21296314/EnlightenDS",
      linkedin: "https://linkedin.com/in/semini-bvs",
      year: "Final Year",
      
    },
    {
      name: "Methsahani K.K.S.P",
      role: "IT21292972",
      image: "/images/sadee.jpg",
      bio: "Team Member", 
      email: "it21292972@my.sliit.lk",
      github: "https://github.com/it21296314/EnlightenDS",
      linkedin: "https://linkedin.com/in/methsahani-kksp",
      year: "Final Year",
      
    }
  ];

  // Separate supervisors and team members
  const supervisors = teamMembers.slice(0, 3);
  const students = teamMembers.slice(3);

  const handleEmailClick = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section id="about" style={{
      minHeight: '100vh',
      background: 'rgb(0, 2, 62)',
      padding: '80px 0'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{
            fontSize: '44px',
            fontWeight: '700',
            color:'white',
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            Innovation Through
            <span style={{ display: 'block', marginTop: '8px' }}>Collaboration</span>
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: ' rgb(223, 215, 215)',
            maxWidth: '768px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Meet the brilliant minds behind our project - hover over each card to discover their expertise and contributions.
          </p>
        </div>

        {/* Supervisors Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '48px'
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to right, transparent, #cbd5e1)'
          }}></div>
          <h2 style={{
            color: 'white',
            fontSize: '1.875rem',
            fontWeight: '700',
            margin: '0 32px',
            display: 'flex',
            alignItems: 'center'
          }}>
            🏆 Supervisors
          </h2>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to left, transparent, #cbd5e1)'
          }}></div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {supervisors.map((member, index) => (
            <div 
              key={index}
              style={{
                position: 'relative',
                height: '450px',
                width:'400px',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                transform: hoveredCard === `supervisor-${index}` ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #2563eb, #9333ea)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box'
              }}
              onMouseEnter={() => setHoveredCard(`supervisor-${index}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Image */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${member.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease',
                transform: hoveredCard === `supervisor-${index}` ? 'scale(1.1)' : 'scale(1)'
              }}></div>

              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: hoveredCard === `supervisor-${index}` 
                  ? 'linear-gradient(135deg, rgba(25, 0, 49, 0.9), rgba(43, 75, 144, 0.9))': 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 50%)',
                transition: 'all 0.5s ease'
              }}></div>

              {/* Content Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '30px',
                color: 'white',
                transform: hoveredCard === `supervisor-${index}` ? 'translateY(0)' : 'translateY(20px)',
                opacity: hoveredCard === `supervisor-${index}` ? 1 : 0.9,
                transition: 'all 0.3s ease'
              }}>
                {/* Role Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '20px',
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                  🏆 {member.role}
                </div>

                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: '0 0 8px 0',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>{member.name}</h3>
                
                <p style={{
                  fontSize: '1rem',
                  margin: '0 0 12px 0',
                  opacity: '0.9',
                  fontWeight: '500'
                }}>{member.department}</p>

                {/* Expanded Details on Hover */}
                <div style={{
                  maxHeight: hoveredCard === `supervisor-${index}` ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.5s ease',
                  opacity: hoveredCard === `supervisor-${index}` ? 1 : 0
                }}>
                  <div style={{
                    padding: '16px 0',
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    marginTop: '16px'
                  }}>
                    {/* <p style={{
                      fontSize: '0.9rem',
                      margin: '0 0 12px 0',
                      lineHeight: '1.5'
                    }}>
                      <strong>Expertise:</strong> {member.expertise}
                    </p> */}
                    
                    <p style={{
                      fontSize: '0.85rem',
                      margin: '0 0 20px 0',
                      lineHeight: '1.4',
                      opacity: '0.9'
                    }}>{member.bio}</p>

                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}>
                      <button 
                        onClick={() => handleEmailClick(member.email)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '10px',
                          padding: '8px 16px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        ✉️ Contact
                      </button>
                      <button 
                        onClick={() => handleLinkClick(member.profile)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '10px',
                          padding: '8px 16px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        🔗 Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Students Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '48px'
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to right, transparent, #cbd5e1)'
          }}></div>
          <h2 style={{
            color: 'white',
            fontSize: '1.875rem',
            fontWeight: '700',
            margin: '0 32px',
            display: 'flex',
            alignItems: 'center'
          }}>
            👥 Team Members
          </h2>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to left, transparent, #cbd5e1)'
          }}></div>
        </div>
        
        {/* Single Row Grid for Team Members */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '80px',
          // overflowX: 'auto'
        }}>
          {students.map((member, index) => (
            <div 
              key={index}
              style={{
                position: 'relative',
                height: '380px',
                minWidth: '260px',
                borderRadius: '18px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                transform: hoveredCard === `student-${index}` ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #9333ea, #ec4899)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box'
              }}
              onMouseEnter={() => setHoveredCard(`student-${index}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Image */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${member.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease',
                transform: hoveredCard === `student-${index}` ? 'scale(1.1)' : 'scale(1)'
              }}></div>

              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: hoveredCard === `student-${index}` 
                  ? 'linear-gradient(135deg, rgba(25, 0, 49, 0.9), rgba(43, 75, 144, 0.9))' 
                  : 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%)',
                transition: 'all 0.5s ease'
              }}></div>

              {/* Content Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                color: 'white',
                transform: hoveredCard === `student-${index}` ? 'translateY(0)' : 'translateY(15px)',
                opacity: hoveredCard === `student-${index}` ? 1 : 0.9,
                transition: 'all 0.3s ease'
              }}>
                {/* Year Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-35px',
                  right: '12px',
                  padding: '5px 10px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                  {member.year || 'Final Year'}
                </div>

                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  margin: '0 0 4px 0',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  lineHeight: '1.2'
                }}>{member.name}</h3>
                
                <p style={{
                  fontSize: '0.8rem',
                  margin: '0 0 8px 0',
                  opacity: '0.9',
                  fontWeight: '500'
                }}>{member.role}</p>

                {/* Expanded Details on Hover */}
                <div style={{
                  maxHeight: hoveredCard === `student-${index}` ? '220px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.5s ease',
                  opacity: hoveredCard === `student-${index}` ? 1 : 0
                }}>
                  <div style={{
                    padding: '10px 0',
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    marginTop: '10px'
                  }}>
                    <p style={{
                      fontSize: '0.8rem',
                      margin: '0 0 8px 0',
                      lineHeight: '1.3',
                      fontWeight: '600'
                    }}>{member.bio}</p>
                    
                    <p style={{
                      fontSize: '0.75rem',
                      margin: '0 0 12px 0',
                      lineHeight: '1.2',
                      opacity: '0.9'
                    }}>{member.specialty}</p>

                    {member.skills && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px',
                        marginBottom: '12px'
                      }}>
                        {member.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span key={skillIndex} style={{
                            padding: '3px 6px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            fontSize: '0.65rem',
                            borderRadius: '8px',
                            fontWeight: '500',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      gap: '6px',
                      alignItems: 'center'
                    }}>
                      <button 
                        onClick={() => handleEmailClick(member.email)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '6px',
                          padding: '5px 8px',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        ✉️ Email
                      </button>
                      <button 
                        onClick={() => handleLinkClick(member.github)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '6px',
                          padding: '5px 8px',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        🔗 GitHub
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const ModernTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRef = useRef(null);

  const milestones = [
    {
      id: 1,
      title: "Project Initiation",
      description: "Defining project scope, objectives, and assembling the core team for the development phase.",
      date: "Jan 2024",
      icon: "🚀",
      color: "blue",
      marks: "25%"
    },
    {
      id: 2,
      title: "Research & Planning",
      description: "Conducting market research, user analysis, and creating detailed project roadmaps.",
      date: "Feb 2024",
      icon: "🔍",
      color: "yellow",
      marks: "20%"
    },
    {
      id: 3,
      title: "Design Phase",
      description: "Creating wireframes, prototypes, and finalizing the user interface design system.",
      date: "Mar 2024",
      icon: "🎨",
      color: "blue",
      marks: "30%"
    },
    {
      id: 4,
      title: "Development Sprint",
      description: "Building core functionality, implementing features, and conducting code reviews.",
      date: "Apr 2024",
      icon: "⚡",
      color: "yellow",
      marks: "35%"
    },
    {
      id: 5,
      title: "Testing & QA",
      description: "Comprehensive testing, bug fixes, performance optimization, and quality assurance.",
      date: "May 2024",
      icon: "🧪",
      color: "blue",
      marks: "25%"
    },
    {
      id: 6,
      title: "Launch & Delivery",
      description: "Final deployment, user training, documentation, and project handover to stakeholders.",
      date: "Jun 2024",
      icon: "🎯",
      color: "yellow",
      marks: "30%"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = timelineRef.current?.querySelectorAll('.timeline-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Modern Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white/80 text-sm font-medium">Live Project Status</span>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4 tracking-tight">
            Project Journey
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Follow our project milestones from inception to completion with real-time progress tracking
          </p>

          {/* Modern Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60 text-sm">Progress</span>
              <span className="text-white font-semibold">{progress}%</span>
            </div>
            <div className="h-3 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/20">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-60"></div>
          
          {/* Timeline Items */}
          <div className="space-y-24">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const isVisible = visibleItems.has(index);
              const isActive = activeIndex === milestone.id;

              return (
                <div
                  key={milestone.id}
                  data-index={index}
                  className={`timeline-item relative transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  onMouseEnter={() => setActiveIndex(milestone.id)}
                  onMouseLeave={() => setActiveIndex(null)}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Central Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20">
                    <div className={`
                      w-16 h-16 rounded-full border-4 transition-all duration-500 backdrop-blur-xl
                      ${milestone.color === 'yellow' 
                        ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/50' 
                        : 'bg-gradient-to-br from-blue-400/20 to-purple-500/20 border-blue-400/50'
                      }
                      ${isActive ? 'scale-125 shadow-2xl' : 'scale-100'}
                    `}>
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        {milestone.icon}
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`
                    ${isEven ? 'pr-1/2 text-right' : 'pl-1/2 text-left'}
                    ${isEven ? 'mr-20' : 'ml-20'}
                  `}>
                    <div className={`
                      group inline-block max-w-md backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden
                      transition-all duration-500 hover:scale-105
                      ${milestone.color === 'yellow'
                        ? 'bg-gradient-to-br from-yellow-500/10 to-orange-600/10 hover:from-yellow-500/20 hover:to-orange-600/20'
                        : 'bg-gradient-to-br from-blue-500/10 to-purple-600/10 hover:from-blue-500/20 hover:to-purple-600/20'
                      }
                      ${isActive ? 'shadow-2xl border-white/40' : 'shadow-lg'}
                    `}>
                      {/* Date Badge */}
                      <div className={`
                        px-4 py-2 text-sm font-semibold
                        ${milestone.color === 'yellow'
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300'
                          : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300'
                        }
                      `}>
                        {milestone.date}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                          {milestone.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed mb-4 text-sm">
                          {milestone.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex gap-2 flex-wrap">
                          <span className={`
                            px-3 py-1 text-xs font-medium rounded-full border
                            ${milestone.color === 'yellow'
                              ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                              : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            }
                          `}>
                            Weight: {milestone.marks}
                          </span>
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/60 border border-white/20">
                            Milestone {milestone.id}
                          </span>
                        </div>
                      </div>

                      {/* Hover Effect Line */}
                      <div className={`
                        h-1 w-0 group-hover:w-full transition-all duration-500
                        ${milestone.color === 'yellow'
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }
                      `}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group">
            <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// const AboutUs = () => {
//   const teamMembers = [
//     {
//       name: "Prof. Samantha Thelijjagoda",
//       role: "Supervisor",
//       image: "images/supervisor.jpg",
//     },
//     {
//       name: "Dr. Junius Anjana",
//       role: "Co-supervisor",
//       image: "images/co-supervisor.jpg",
     
//     },
//     {
//       name: "Dr. Kamalani Wanigasinghe",
//       role: "External Supervisor",
//       image: "/images/external-supervisor.jpg",
      
//     },
//     {
//       name: "Kumarasinghe D.P",
//       role: "IT21296314",
//       image: "/images/dilshi.jpg",
//       bio: "Team leader"
//     },
//     {
//       name: "Jayasuriya S.H",
//       role: "IT21293030",
//       image: "/images/senuri.png",
//       bio: "Team Member"
//     },
//     {
//       name: "Semini B.V.S",
//       role: "IT21342394",
//       image: "/images/save.png",
//       bio: "Team Member"
//     },
//     {
//       name: "Methsahani K.K.S.P",
//       role: "IT21292972",
//       image: "/images/sadee.jpg",
//       bio:"Team Member"
//     }
//   ];

//   // Separate supervisors and team members
//   const supervisors = teamMembers.slice(0, 3);
//   const students = teamMembers.slice(3);

//   return (
//     <section id="about" className="about-section">
//       <div className="container">
//         <div className="section-header">
//           <h2 className="section-title">Meet the Team</h2>
//           <div className="section-divider"></div>
//         </div>
        
//         {/* Supervisors Section */}
//         <h3 className="team-category">Supervisors</h3>
//         <div className="team-grid supervisors-grid">
//           {supervisors.map((member, index) => (
//             <div key={index} className="team-member supervisor-card">
//               <div className="team-member-image">
//                 <img
//                   src={member.image}
//                   alt={member.name}
//                   className="member-photo"
//                 />
//                 <div className="image-overlay"></div>
//               </div>
//               <h3 className="member-name">{member.name}</h3>
//               <p className="member-role">{member.role}</p>
//               <p className="member-bio">{member.bio}</p>
//               <div className="member-links">
//                 <button className="member-link-button">
//                   <ExternalLink size={20} />
//                 </button>
//                 <button className="member-link-button">
//                   <Mail size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Students Section */}
//         <h3 className="team-category">Team Members</h3>
//         <div className="team-grid students-grid">
//           {students.map((member, index) => (
//             <div key={index} className="team-member student-card">
//               <div className="team-member-image">
//                 <img
//                   src={member.image}
//                   alt={member.name}
//                   className="member-photo"
//                 />
//                 <div className="image-overlay"></div>
//               </div>
//               <h3 className="member-name">{member.name}</h3>
//               <p className="member-role">{member.role}</p>
//               <p className="member-bio">{member.bio}</p>
//               <div className="member-links">
//                 <button className="member-link-button">
//                   <ExternalLink size={20} />
//                 </button>
//                 <button className="member-link-button">
//                   <Mail size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };





const Mission = () => {
  

  return (
    <section id="mission" className="mission-section">
      <div className="container">
        <div className="mission-section2">
          <div className="mission-content">
            <h3 className="mission-title">Our Mission</h3>
            <p className="mission-text">
              At EnlightenDS, we are dedicated to empowering children with Down syndrome through innovative 
              technology solutions. Our team combines expertise in psychology, machine learning, and 
              assistive technology to create tools that enhance cognitive development, improve learning 
              outcomes, and support families on their journey. We believe every child deserves the 
              opportunity to reach their full potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};












// Contact Us Component
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contact Us</h2>
        
        </div>
        <div className="contact-container">
          <div className="contact-grid">
            <div>
              <h3 className="contact-subtitle">Get in Touch</h3>
              <p className="contact-description">
                Have questions about EnlightenDS or want to learn more about our research? 
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="contact-info">
                {/* <div className="contact-item">
                  <Phone className="contact-icon" size={24} />
                  <span>+1 (555) 123-4567</span>
                </div> */}
                <div className="contact-item">
                  <Mail className="contact-icon" size={24} />
                  <span>info@enlightends.com</span>
                </div>
              </div>
            </div>
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-textarea"
                  />
                </div>
                <button
                  type="submit"
                  className="form-submit-button"
                >
                  <Mail className="button-icon" size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">EnlightenDS</h3>
            <p className="footer-description">
              Advanced Technologies for Skill Enhancement and Talent Recognition 
              in Children with Down Syndrome
            </p>
          </div>
          <div>
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#domain" className="footer-link">Our Domain</a></li>
              <li><a href="#VerticalTimeline" className="footer-link">Milestones</a></li>
              <li><a href="#documents" className="footer-link">Documents</a></li>
              <li><a href="#about" className="footer-link">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="footer-contact">
              <p>Email: info@enlightends.com</p>
            
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 EnlightenDS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="app">
      <Header />
      <Home />
      <Mission/>
      <Domain />
   
      <VerticalTimeline />
      <Documents />
      <Slides />
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default App;