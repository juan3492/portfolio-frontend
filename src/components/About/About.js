import React, { useState, useEffect, useRef } from "react";
import { useIntersection } from 'react-use'
import "./About.css";
import photo from "../../assets/img/circle-cropped.png";
import { TweenMax } from "gsap";
import { Link } from 'react-scroll';

const About = ({informationAbout}) => {
  const [polygonWasAnimated, setPolygonWasAnimated] = useState(false)
  const [descriptionWasAnimated, setDescriptionWasAnimated] = useState(false);
  const polygon = useRef(null);
  const title = useRef(null);
  const description = useRef(null);
  const pills = useRef(null);
  const buttons = useRef(null)

  const polygonIntersection = useIntersection(polygon,{
    root: null,
    rootMargin: '0px',
    threshold: 0.01
  });

  const descriptionIntersection = useIntersection(title, {
    root: null,
    rootMargin: '0px',
    threshold: 0.01
  });

  const animatePolygon = () => {
    if(!polygonWasAnimated){
      TweenMax.fromTo(polygon.current, 2, { scaleX: 0 }, { scaleX: 1 });
      setPolygonWasAnimated(true)
    }
  };
  const animateDesctiption = () => {
    if(!descriptionWasAnimated){
      TweenMax.fromTo(title.current, 1, { xPercent: 40, opacity: 0 }, {delay: 0 ,xPercent: 0, opacity: 1 });
      TweenMax.fromTo(description.current, 1, { xPercent: 40, opacity: 0 }, {delay: 0.5 ,xPercent: 0, opacity: 1 });
      TweenMax.fromTo(pills.current, 1, { xPercent: 40, opacity: 0 }, {delay: 1 ,xPercent: 0, opacity: 1 });
      TweenMax.fromTo(buttons.current, 1, { xPercent: 40, opacity: 0 }, {delay: 1.5 ,xPercent: 0, opacity: 1 });
      setDescriptionWasAnimated(true);
    }
  }

  if(polygonIntersection && polygonIntersection.isIntersecting ){
    animatePolygon();
  }

  if(descriptionIntersection && descriptionIntersection.isIntersecting){
    animateDesctiption();
  }

  return (
    <div className="about">
      <div ref={polygon} className="about-polygon"></div>
      <div className="about-container">
        <div className="container-photo">
          <img  className="about-profile-photo" alt="profile" src={photo} />
        </div>
        <div className="description">
          <h1 ref={title} className="about-title main-heading">Sobre mí</h1>
          <p ref={description} className="about-content">
            Me llamo {informationAbout.name}. {informationAbout.about_me}
          </p>
          <div ref={pills} className="about-pill-zone">
            <p className="about-content">
              Aqui algunas de las tecnologias que manejo:
            </p>
            <ul>
              {informationAbout.skills &&
                informationAbout.skills.map((skill, index) => (
                  <p className="about-pills">{skill}</p>
                ))}
            </ul>
          </div>
          <div ref={buttons} className="about-buttons">
          <Link to="portfolio" duration={1000} offset={0} spy={true} smooth={true} isDynamic={true}>
            <button className="cta-btn danger">Mis proyectos</button>
          </Link>
            <a href="/CV.pdf">
              <button className="cta-btn danger">Mi CV</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
