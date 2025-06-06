import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Include Bootstrap styles
import { Carousel } from 'react-bootstrap'; // Import Bootstrap Carousel

const MeetOurCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const navigate = useNavigate();

  // Data for coaches
  const coachesData = [
    {
      name: "Jordan Rivera",
      title: "Success Coach",
      url: "../../../public/assets/coachImages/jordan.jpg",
      bio: "Jordan is passionate about helping students discover their unique talents and abilities. With a background in creative arts, they love seeing students light up when they solve a problem in a new way.",
      location: "Texas, USA",
    },
    {
      name: "Priya Malhotra",
      title: "Success Coach",
      url: "../../../public/assets/coachImages/priya.jpg",
      bio: "Priya enjoys mentoring students because she sees education as a bridge to a brighter future. With a love for math and science, she aims to make complex concepts simple and relatable.",
      location: "Mumbai, India",
    },
    {
      name: "Marcus Johnson",
      title: "Success Coach",
      url: "../../../public/assets/coachImages/marcus.jpg",
      bio: "Marcus has dedicated his life to supporting students from underrepresented communities. He believes that every student deserves to feel seen and valued.",
      location: "Illinois, USA",
    },
    {
      name: "Mei Wong",
      title: "Success Coach",
      url: "../../../public/assets/coachImages/mei.jpg",
      bio: "Mei finds joy in helping students achieve 'aha' moments during their learning journey. Her experience as a language tutor has taught her that patience can unlock any challenge.",
      location: "Vancouver, Canada",
    },
    {
      name: "Elias Fernandez",
      title: "Success Coach",
      url: "../../../public/assets/coachImages/elias.jpg",
      bio: "Elias is a former engineer who now focuses on guiding students through STEM subjects. His passion for problem-solving is contagious.",
      location: "Seville, Spain",
    },
    {
      name: "Fatima Ahmed",
      title: "Success Coach",
      url: "../../../public/assets/coachImages/fatima.jpg",
      bio: "Fatima is driven by a love for community and education. She believes every student has potential waiting to be unlocked.",
      location: "Nairobi, Kenya",
    },
  ];

  useEffect(() => {
    setCoaches(coachesData);
  }, []);

  // Handle navigation to the booking form
  const handleBookAppointment = (coachName) => {
    navigate(`/book-appointment/${encodeURIComponent(coachName)}`); // Encode coachName for safe URL handling
  };

  return (
    <div>
      <header>
        <div className="px-3 py-2 border-bottom">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                  <use xlinkHref="#bootstrap"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container my-4 mt-8 mb-8">
        <h1 className="text-center mb-4">Meet Our Success Coaches</h1>
        

        {/* Bootstrap Carousel */}
        <Carousel fade>
          {coaches.map((coach, index) => (
            <Carousel.Item key={index}>
              <img
                src={coach.url}
                alt={coach.name}
                className="d-block w-100"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3>{coach.name}</h3>
                <p>{coach.title} - {coach.location}</p>
                <p>{coach.bio}</p>
                <button
                  className="btn btn-info"
                  onClick={() => handleBookAppointment(coach.name)}
                >
                  Book An Appointment
                </button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MeetOurCoaches;