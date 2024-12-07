//Home Page
function login() {
    window.location.href = '../frontend/login.html';
};

function createAccount() {
    window.location.href = '../frontend/createAccount.html';
};

function toteam() {
    window.location.href = '../frontend/meetOurCoaches.html';
};

//Log In Page
function tohome() {
    window.location.href = '../frontend/home.html';
};

//Create Account Page
function toLogin() {
    window.location.href = '../frontend/login.html';
};


//Meet the Coaches Bio Cards

 function addCard(name, title, imageURL, bio, location, url) {

                const template =
                    document.getElementById("card-template")
                        .content.cloneNode(true);

                template.querySelector(".card-title").innerText = title;
                template.querySelector(".coach-name").innerText = name;
                template.querySelector(".coach-bio").innerText = bio;
                template.querySelector(".location").innerText = location;
            

                const node = document.createElement("img");
                node.src = imageURL;
                template.querySelector('.card-art').appendChild(node);


                /*const linkElement = template.querySelector('.card-link');
                linkElement.href = linkURL; // Make sure this matches the parameter
                linkElement.innerText = "Book An Appointment";*/

                document.querySelector('#card-list').appendChild(template);


            };

            const coaches = {

                portfolio: [

                    {
                        name: "Jordan Rivera", title: "Success Coach", url: "../assets/jordan.png",
                        bio: "Jordan is passionate about helping students discover their unique talents and abilities. With a background in creative arts, they love seeing students light up when they solve a problem in a new way. Jordan believes that learning should be fun, inclusive, and accessible to everyone.", 
                        location: "Texas, USA"
                    },

                    {
                        name: "Priya Malhotra", title: "Success Coach", url:
                            "../assets/priya.png",
                        bio: "Priya enjoys mentoring students because she sees education as a bridge to a brighter future. With a love for math and science, she aims to make complex concepts simple and relatable. Her patience and positivity make her a favorite among her students.", 
                        location: "Mumbai, India"
                    },

                    {
                        name: "Marcus Johnson", title: "Success Coach", url: "../assets/marcus.jpg",
                        bio: "Marcus has dedicated his life to supporting students from underrepresented communities. He believes that every student deserves to feel seen and valued. His approach is all about building confidence and encouraging curiosity.",
                        location: "Illinois, USA"
                    },

                    {
                        name: "Mei Wong", title: "Success Coach", url: "../assets/mei.jpg",
                        bio: "Mei finds joy in helping students achieve “aha” moments during their learning journey. Her experience as a language tutor has taught her that patience and persistence can unlock any challenge. She is especially passionate about helping students become confident communicators.",
                        location: "Vancouver, Canada"
                    },

                    {
                        name: "Elias Fernandez", title: "Success Coach", url: '../assets/elias.jpg',
                        bio: "Elias is a former engineer who now focuses on guiding students through STEM subjects. His passion for problem-solving is contagious, and he takes pride in helping students develop a love for science and technology. He believes that critical thinking is a superpower everyone should have.",
                        location:" Seville, Spain"
                    },

                    {
                        name: "Fatima Ahmed", title: "Success Coach", url: "../assets/fatima.jpg",
                        bio: "Fatima is driven by a love for community and education. She believes every student has potential waiting to be unlocked. Her gentle approach to teaching encourages students to ask questions, make mistakes, and keep going.",
                        location: "Nairobi, Kenya"

                    },

                
                ]
            };

            coaches.portfolio.forEach(card => {
                addCard( card.name, card.title, card.url, card.bio, card.location);
            });