
import React from 'react'

import {
  ShieldCheck,
  Users,
  GraduationCap,
  Lightbulb,
  MapPin,
  BookOpen,
} from "lucide-react";

import './about.css';
function About() {
  const features = [
    {
      icon: ShieldCheck,
      title: "One connected academic selection platform",
      description:"The Department Selection and Placement System supports the complete Pre-Engineering placement process at Wallaga University. It brings department information, ranked student preferences, eligibility checks, approved capacity, placement decisions, and official results into one secure system."
    },
        
   {
      icon: Users,
      title: "Better decisions with fairness and accountability",
      description:
        "The system helps students make informed choices while giving university offices a consistent and traceable process. It reduces manual work, protects academic records, supports approved criteria, and ensures that only authorized final placements are published."  
  }
  ];

  const steps = [
    {
      number: "01",
      title: "Prepare",
      description:
        "Admin configures the academic year, selection period, users, and official deadlines.",
    },
    {
      number: "02",
      title: "Approve capacity",
      description:
        "Department Heads propose capacity and the Institute Dean reviews and approves it.",
    },
    {
      number: "03",
      title: "Submit preferences",
      description:
        "Students explore departments and submit their ranked choices before the deadline.",
    },
    {
      number: "04",
      title: "Process placement",
      description:
        "The Coordinator verifies eligibility and prepares proposed student placements.",
       },
    {
      number: "05",
      title: "Review and publish",
      description:
        "The Dean approves the proposal before official results become available to students.",
      },
    {
      number: "06",
      title: "Request reconsideration",
      description:
        "Eligible students can submit reconsideration requests when the university permits.",
    },
  ];
  return (
  <main className='about-page'>
    <div className="about-hero-bg">
    {/* introduction */}
    <section className="about-hero">

        <p className="about-eyebrow">
          ABOUT WIT · WOLLEGA UNIVERSITY
        </p>

        <h1>Wollega University</h1>

        <h2>Institute of Technology</h2>

        <p className="about-intro">
          Established in 2008 G.C. at Wollega University's
          Main Campus in Nekemte, the Wollega University
          Institute of Technology (WIT) is a leading hub
          for engineering, computing, and design education
          in Western Oromia.
          Dedicated to producing skilled, industry-ready
          professionals through practical learning and
          applied innovation, WIT offers undergraduate
          and postgraduate programs across civil,
          mechanical, electrical, computing, architecture,
          and related technology disciplines.
        </p>
  <hr className="my-line" />
        <div className="about-mission">
          <Lightbulb size={22} />
          <p>
            Empowering students to drive sustainable
            technological and community development.
          </p>
        </div>

      </section>


      {/* UNIVERSITY INFORMATION  */}

      <section className="university-info">

        <p className="info-label">
          ROOTED IN NEKEMTE. BUILDING TOMORROW.
        </p>

        <div className="established">
          <h2>2008</h2>
          <span>G.C. · Established</span>
        </div>
 <hr className="my-line" />


        <div className="info-details">

          <div className="info-item">
            <div className="info-icon">
              <MapPin size={22} />
            </div>

            <div>
              <h4>Our home</h4>
              <p>Main Campus, Nekemte · Western Oromia</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <BookOpen size={22} />
            </div>

            <div>
              <h4>Our programs</h4>
              <p>Undergraduate & postgraduate education</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <GraduationCap size={22} />
            </div>

            <div>
              <h4>Our approach</h4>
              <p>Practical learning, Applied innovation</p>
            </div>
          </div>

        </div>
      
      </section>
      </div>

      {/* SYSTEM FEATURES */}

      <section className="about-features">

        <div className="features-grid">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article className="feature-card" key={index}>

                <div className="feature-icon">
                  <Icon size={27} />
                </div>

                <p className="card-label">
                  {index === 0
                    ? "ABOUT THE SYSTEM"
                    : "WHY IT MATTERS"}
                </p>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

              </article>
            );
          })}

        </div>

      </section>


      {/*  HOW THE SYSTEM WORKS */}

      <section className="about-workflow">

        <div className="section-heading">
          <p className="about-eyebrow">
            HOW THE SYSTEM WORKS
          </p>

          <h2>From department exploration to final placement</h2>

          <p>
            Every step follows the university's authorized
            selection and approval workflow.
          </p>
        </div>

        <div className="steps-grid">

          {steps.map((step) => (
            <article className="step-card" key={step.number}>

              <div className="step-number">
                {step.number}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </article>
          ))}

        </div>

      </section>

      </main>
  );
}



 export default About;