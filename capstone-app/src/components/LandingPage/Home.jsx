import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>

            <div>
                <div>
                    <div>
                        <h1>Academic Allies</h1>
                        <p className="lead">
                            At Academic Allies, we’re more than just coaches — we’re your partners in progress and your allies in achievement.
                            Our mission is to empower students from 9th grade through college with the tools, strategies, and confidence to conquer academic challenges and achieve lasting success.
                        </p>
                        <p className="lead">
                            At Academic Allies, we believe that every student deserves a champion in their corner — and we’re here to be just that.
                            Our approach goes beyond grades, fostering a love of learning, resilience, and a growth mindset that lasts a lifetime.
                        </p>
                        <h4>Let Academic Allies be Yours!</h4>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/login" className="btn btn-primary btn-lg px-4 gap-3">Login</Link>
              <Link to="/create-account" className="btn btn-outline-secondary btn-lg px-4">Create An Account</Link>
            </div>
                    </div>
                </div>
            </div>

            <div className="about-container">
                <div>
                    <h1>What is Academic Success Coaching?</h1>
                    <div>
                        <p>
                            Academic Success Coaching is a personalized, student-centered service designed to help learners develop the skills, strategies, and mindset needed to achieve their academic goals.
                        </p>
                        <ul className="homepagelist">
                            <li>Time Management</li>
                            <li>Goal Setting</li>
                            <li>Study Techniques</li>
                            <li>Motivation & Accountability</li>
                            <li>Stress Management</li>
                            <li>& More</li>
                        </ul>
                        <p>
                            Success coaches act as mentors and partners in a student’s educational journey. They work with students to identify obstacles, build confidence, and create personalized action plans for improvement.
                        </p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/coaches" className="btn btn-primary btn-lg px-4 gap-3">Meet Our Coaches</Link>
              <Link to="/book-appointment" className="btn btn-primary btn-lg px-4">Book An Appointment</Link>
            </div>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div>
                        <h1 >Our Services</h1>
                        <h3>Supporting YOU from Freshman to University Senior</h3>
                        <p className="lead">We serve students from 9th grade to University. Students can book 1:1 or group appointments with our Success Coaches. We also provide tutoring for select subjects. All appointments are held online.</p>
                    </div>
                </div>
            </div>

            <footer className="py-5">
                <div className="row">
                    <div>
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Monthly digest of what's new and exciting from us.</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                <button className="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>© 2024 Company, Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;