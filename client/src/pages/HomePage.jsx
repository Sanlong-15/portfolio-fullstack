import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import SkillCard from '../components/SkillCard.jsx'
import Button from '../components/Button.jsx'
import useTypewriter from '../hooks/useTypewriter.js'
import profile from '../data/profile.js'
import skillGroups from '../data/skills.js'
import education from '../data/education.js'
import achievements from '../data/achievements.js'

// Home page: hero, about, skills, education, achievements, contact CTA.
export default function HomePage() {
  const typed = useTypewriter(profile.roles)     // rotating role text in the hero
  const [photoBroken, setPhotoBroken] = useState(false)

  return (
    <div>
      {/* ---- Hero ---- */}
      <section className="hero container">
        <div className="hero-text">
          <p className="hero-hello">Hello, I am</p>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-role" aria-label={profile.title}>
            <span>{typed}</span><span className="cursor" aria-hidden="true" />
          </p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <Button href="/projects">View My Projects</Button>
            <Button variant="outline" href={profile.cv} download>Download My CV</Button>
            <Button variant="ghost" href="/contact">Contact Me</Button>
          </div>
        </div>
        <div className="hero-photo">
          {/* If the photo fails to load, show my initials instead */}
          {!photoBroken ? (
            <img
              className="hero-cutout"
              src="/images/sanlong-hero.png"
              alt={`Portrait of ${profile.name}`}
              onError={() => setPhotoBroken(true)}
            />
          ) : (
            <div className="hero-photo-fallback" aria-hidden="true">SH</div>
          )}
        </div>
      </section>

      {/* ---- About ---- */}
      <section className="section container reveal" id="about">
        <SectionHeading label="About Me" title="Who I am" />
        <div className="about-grid">
          <div className="about-text">
            <p>
              I am a second-year Software Engineering student at <strong>CamTech University</strong> in
              Phnom Penh, Cambodia. I enjoy the full journey of building software: understanding a
              problem, designing the interface in Figma, and writing the code that makes it real.
            </p>
            <p>
              Alongside my studies, I have more than two years of hands-on experience in
              <strong> electronic device repair</strong> at BIS School, fixing laptops, computers, and
              power supplies. That work taught me patience, careful diagnosis, and how to explain
              technical problems in simple words. I bring those same skills to software.
            </p>
            <p>
              My goal is to grow into a <strong>full-stack developer</strong> and later open my own
              computer service business in Cambodia. I value teamwork, honest feedback, and building
              things that are useful for my community. That is why my projects connect technology
              with education and sustainable development.
            </p>
          </div>
          <ul className="about-facts">
            <li><span className="fact-number">3×</span> Top 10 competition finalist</li>
            <li><span className="fact-number">2+</span> years device repair experience</li>
            <li><span className="fact-number">3</span> languages: Khmer, English, Chinese</li>
            <li><span className="fact-number">{new Date().getFullYear() - 2025 + 1}</span> years at CamTech University</li>
          </ul>
        </div>
      </section>

      {/* ---- Skills ---- */}
      <section className="section container reveal" id="skills">
        <SectionHeading
          label="Skills"
          title="Technical Skills"
          subtitle="The languages, tools, and practices I work with."
        />
        <div className="skills-grid">
          {/* List rendering: one SkillCard per category */}
          {skillGroups.map(({ category, icon, skills }) => (
            <SkillCard key={category} category={category} icon={icon} skills={skills} />
          ))}
        </div>
      </section>

      {/* ---- Education & Experience ---- */}
      <section className="section container reveal" id="education">
        <SectionHeading label="Journey" title="Education & Experience" />
        <ol className="timeline">
          {education.map(({ period, title, place, detail }) => (
            <li className="timeline-item" key={title}>
              <span className="timeline-period">{period}</span>
              <h3 className="timeline-title">{title}</h3>
              <p className="timeline-place">{place}</p>
              <p className="timeline-detail">{detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Achievements ---- */}
      <section className="section container reveal" id="achievements">
        <SectionHeading
          label="Recognition"
          title="Achievements & Activities"
          subtitle="Competitions, volunteering, and community initiatives."
        />
        <div className="achievements-grid">
          {achievements.map(({ year, title, description, image }) => (
            <article className="achievement-card" key={title}>
              <img className="achievement-logo" src={image} alt="" aria-hidden="true" />
              <div>
                <span className="achievement-year">{year}</span>
                <h3 className="achievement-title">{title}</h3>
                <p className="achievement-desc">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---- Contact call-to-action ---- */}
      <section className="section container cta-band reveal">
        <h2>Have a project or opportunity in mind?</h2>
        <p>I am open to internships, junior roles, and freelance work.</p>
        <Link to="/contact" className="btn btn-primary">Get in touch</Link>
      </section>
    </div>
  )
}
