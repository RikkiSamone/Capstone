import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";  // Include Bootstrap styles

const MeetOurCoaches = () => {
  const [coaches, setCoaches] = useState([]);

  // Data for coaches
  const coachesData = [
    {
      name: "Jordan Rivera",
      title: "Success Coach",
      url: "../../../public/assets/coachImages/jordan.jpg",
      bio: "Jordan is passionate about helping students discover their unique talents and abilities. With a background in creative arts, they love seeing students light up when they solve a problem in a new way. Jordan believes that learning should be fun, inclusive, and accessible to everyone.",
      location: "Texas, USA",
    },
    {
      name: "Priya Malhotra",
      title: "Success Coach",
      url: ".../../../public/assets/coachImages/priya.jpg",
      bio: "Priya enjoys mentoring students because she sees education as a bridge to a brighter future. With a love for math and science, she aims to make complex concepts simple and relatable. Her patience and positivity make her a favorite among her students.",
      location: "Mumbai, India",
    },
    {
      name: "Marcus Johnson",
      title: "Success Coach",
      url: ".../../../public/assets/coachImages/marcus.jpg",
      bio: "Marcus has dedicated his life to supporting students from underrepresented communities. He believes that every student deserves to feel seen and valued. His approach is all about building confidence and encouraging curiosity.",
      location: "Illinois, USA",
    },
    {
      name: "Mei Wong",
      title: "Success Coach",
      url: ".../../../public/assets/coachImages/mei.jpg",
      bio: "Mei finds joy in helping students achieve “aha” moments during their learning journey. Her experience as a language tutor has taught her that patience and persistence can unlock any challenge. She is especially passionate about helping students become confident communicators.",
      location: "Vancouver, Canada",
    },
    {
      name: "Elias Fernandez",
      title: "Success Coach",
      url: ".../../../public/assets/coachImages/elias.jpg",
      bio: "Elias is a former engineer who now focuses on guiding students through STEM subjects. His passion for problem-solving is contagious, and he takes pride in helping students develop a love for science and technology. He believes that critical thinking is a superpower everyone should have.",
      location: "Seville, Spain",
    },
    {
      name: "Fatima Ahmed",
      title: "Success Coach",
      url: ".../../../public/assets/coachImages/fatima.jpg",
      bio: "Fatima is driven by a love for community and education. She believes every student has potential waiting to be unlocked. Her gentle approach to teaching encourages students to ask questions, make mistakes, and keep going.",
      location: "Nairobi, Kenya",
    },
  ];

  useEffect(() => {
    setCoaches(coachesData);  // Set the initial data
  }, []);

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
        <div className="row g-3">
          {coaches.map((coach, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card border border-primary shadow-lg">
                <div className="card-art">
                  <img src={coach.url} alt={coach.name} className="img-fluid" style={{ height: '400px', objectFit: 'cover' }} />
                </div>
                <div className="card-body">
                  <h3 className="coach-name">{coach.name}</h3>
                  <div className="card-title h5">{coach.title}</div>
                  <h6 className="location">{coach.location}</h6>
                  <p className="coach-bio">{coach.bio}</p>
                  <a className="card-link btn btn-info" target="_blank" rel="noopener noreferrer">Book An Appointment</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default MeetOurCoaches;