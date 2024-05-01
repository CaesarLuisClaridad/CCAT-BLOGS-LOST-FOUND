import React from "react";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import lostandfound from "../assets/SearchProduct.png";
import firstimage from "../assets/AboutPage.png";
import PostBlog from "../assets/PostBlog.png";
import ReadBlog from "../assets/ReadBlogs.png";

const AboutPage = () => {
  return (
    <>
      <div className="container-fluid py-5 vh-lg-100 shadow-sm">
        <Row className="d-flex align-items-center">
          <Col className="col-12 col-lg-6 ">
            <div className="px-4">
              <div
                className="mb-3 fw-bold fst-italic about-header"
                data-aos="fade-right"
                data-aos-duration="900"
              >
                Welcome <span className="ccat">Ccatians!</span>
              </div>
              <div className="fs-6">
                <div
                  className="content fw-500 mb-3 fst-italic text-justify"
                  data-aos="fade-right"
                  data-aos-duration="800"
                >
                  This is your digital tambayan for all things student life!
                  🎓✨ Dive into a world where CCAT stories come to life—whether
                  it's about crushes, academic triumphs, or the daily hustle,
                  we've got it all here.
                </div>

                <div
                  className="content fw-500 mb-3 fst-italic text-justify"
                  data-aos="fade-right"
                  data-aos-duration="700"
                >
                  Sa aming online space, bawat kwento mo ay may tagpuan.
                  Experience the pulse of CVSU-CCAT's vibrant community, share
                  your thoughts, chika about your campus adventures, and connect
                  with your fellow students. Don't forget to share your own
                  stories and be a part of our growing narrative.
                </div>

                <div
                  className="content fw-500 mb-3 fst-italic text-justify"
                  data-aos="fade-right"
                  data-aos-duration="600"
                >
                  Kaya kung hanap mo'y chika o ka-kwentuhan, this is the place
                  to be! Come join us in creating a collection of CVSU CCAT
                  moments. Chika na, kwento mo'y aming hinihintay! 📚🌐
                </div>
              </div>
            </div>
          </Col>
          <Col className="col-6 d-flex justify-content-center d-none d-lg-block">
            <img
              src={firstimage}
              className="aboutimage"
              data-aos="zoom-in-left"
              data-aos-duration="700"
            />
          </Col>
        </Row>
      </div>

      <div class="container-fluid features px-4 px-md-5 py-5 border-bottom shadow-sm">
        <div class="text-center fs-1 fw-bold mb-5" data-aos="zoom-in">
          <span className="features-header">Features</span>
        </div>
        <div class="row px-2 px-md-1 mb-4 bg-white rounded-5 overflow-hidden shadow">
          <div class="d-flex flex-column flex-md-row flex-lg-row shadow-sm p-4 p-lg-3">
            <div class="col-md-7 d-flex flex-column justify-content-center px-2 px-md-4">
              <div
                class="px-lg-5 my-2"
                data-aos="fade-down"
                data-aos-duration="700"
              >
                <span class="fs-2 fs-lg-2 fw-bold">Post Blogs</span>
              </div>
              <div data-aos="fade-right" data-aos-duration="800">
                <p class="features-text px-lg-5">
                  Share your stories, tips, or school experiences in your own
                  blog posts. It’s a great way to talk about what matters to you
                  and reach out to other students. Your stories can help,
                  inspire, or even make someone’s day better.
                </p>
              </div>
            </div>
            <div
              class="col-md-5 d-flex align-items-center justify-content-center px-2 px-md-4"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <img src={PostBlog} class="features-photo" />
            </div>
          </div>
        </div>

        <div className="row px-2 px-md-1 mb-4 bg-white rounded-5 overflow-hidden shadow">
          <div className="d-flex flex-column-reverse flex-md-row flex-lg-row shadow-sm p-4">
            <div
              className="col-md-5 d-flex align-items-center justify-content-center"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <img src={ReadBlog} className="features-photo" />
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center px-4">
              <div
                className="px-lg-5 my-2"
                data-aos="fade-down"
                data-aos-duration="700"
              >
                <span className="fs-2 fs-lg-2 fw-bold">Read Blogs</span>
              </div>
              <div data-aos="fade-right" data-aos-duration="800">
                <p className="features-text px-lg-5">
                  Dive into stories, advice, and experiences written by students
                  like you. Whether you're looking for guidance, a good read, or
                  a connection to your school community, there’s something here
                  for everyone. It’s a fun way to see what others are going
                  through and learn from them.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row px-2 px-md-1 mb-4 bg-white rounded-5 overflow-hidden shadow">
          <div className="d-flex flex-column flex-md-row flex-lg-row shadow-sm p-4">
            <div className="col-md-7 d-flex flex-column justify-content-center px-4">
              <div
                className="px-lg-5 my-2"
                data-aos="fade-down"
                data-aos-duration="700"
              >
                <span className="fs-2 fs-lg-2 fw-bold">Lost & Found</span>
              </div>
              <div data-aos="fade-right" data-aos-duration="800">
                <p className="features-text px-lg-5">
                  Lost something at school? Use our Lost and Found section to
                  post about it and find help. If you find something that’s not
                  yours, you can post it here too. It’s all about helping each
                  other and getting things back to their rightful owners.
                </p>
              </div>
            </div>
            <div
              className="col-md-5 d-flex align-items-center justify-content-center"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <img src={lostandfound} className="features-photo" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid accordion-about-page py-5">
        <div
          className="text-center mb-4"
          data-aos="zoom-in"
          data-aos-duration="800"
        >
          <h2 className="fs-1 fw-bold ">Reminders</h2>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <div
            className="accordion-container"
            data-aos="zoom-in-up"
            data-aos-duration="900"
          >
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span className="fs-6 p-2">Share Your Stories Kindly</span>
                </Accordion.Header>
                <Accordion.Body className="features-text accordion-text">
                  <p>
                    Post your stories and insights kindly. This platform is a
                    place for encouragement and sharing positive vibes.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span className="fs-6 p-2">Consider Before Sharing</span>
                </Accordion.Header>
                <Accordion.Body className="features-text accordion-text">
                  <p>
                    Before hitting that post button, take a moment to consider
                    the impact of your words. Let's ensure that our
                    contributions reflect the values of this community—empathy,
                    respect, and understanding. By doing so, we can create a
                    space where everyone feels heard and appreciated.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <span className="fs-6 p-2">Speak Freely</span>
                </Accordion.Header>
                <Accordion.Body className="features-text accordion-text">
                  <p>
                    With no comments allowed, you have the freedom to express
                    yourself openly. This ensures everyone can share their
                    stories without fear of criticism.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <span className="fs-6 p-2">Use Lost and Found Wisely</span>
                </Accordion.Header>
                <Accordion.Body className="features-text accordion-text">
                  <p>
                    The Lost and Found is for genuine posts only. Help keep it
                    effective by posting true lost items or items you’ve found,
                    not jokes.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  <span className="fs-6 p-2">Please Delete Resolved Posts</span>
                </Accordion.Header>
                <Accordion.Body className="features-text accordion-text">
                  <p>
                    If your lost item has been found or if you've successfully
                    returned an item you found, kindly delete your post. This
                    action helps us conserve storage space and keeps the Lost
                    and Found section up-to-date, making it a reliable resource
                    for everyone.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  <span className="fs-6 p-2">
                    Creating a Friendly Community
                  </span>
                </Accordion.Header>
                <Accordion.Body className="features-text accordion-text">
                  <p>
                    Together, let’s create a friendly and caring community. Your
                    actions and words can make this a great place for all
                    students.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  <span className="fs-6 p-2">
                    Account Re-Authentication Required
                  </span>
                </Accordion.Header>
                <Accordion.Body className="features-text accordion-text">
                  <p>
                    To maintain security and community integrity, your account
                    will require re-authentication every three days. Even if
                    logged in, you won't be able to post or like after this
                    period until you log out and log back in. This ensures that
                    your interactions remain secure and your identity is
                    verified regularly.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>

      <footer className="bg-info m-0">
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between about-footer px-1 px-lg-4">
          <div>
            <p className="m-0 about-footer-text">
              CAVITE STATE UNIVERSITY - CCAT CAMPUS
            </p>
          </div>
          <div>
            <p className="m-0 about-footer-text">Developed by: CLC</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutPage;
