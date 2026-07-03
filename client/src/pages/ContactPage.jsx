import SectionHeading from '../components/SectionHeading.jsx'
import ContactForm from '../components/ContactForm.jsx'
import profile from '../data/profile.js'

export default function ContactPage() {
  return (
    <div className="section container">
      <SectionHeading
        label="Contact"
        title="Let's Connect"
        subtitle="Send me a message. It is stored safely and I read every one."
        center
      />
      <div className="contact-layout">
        <aside className="contact-aside">
          <h3>Contact channels</h3>
          <ul className="contact-list">
            <li>
              <span className="contact-label">Email</span>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=huysanlong1@gmail.com" target="_blank" rel="noopener noreferrer">{profile.email}</a>
            </li>
            <li>
              <span className="contact-label">GitHub</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">Sanlong-15</a>
            </li>
            <li>
              <span className="contact-label">LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">Sanlong Huy</a>
            </li>
            <li>
              <span className="contact-label">Phone</span>
              <span>{profile.phone}</span>
            </li>
            <li>
              <span className="contact-label">Location</span>
              <span>{profile.location}</span>
            </li>
          </ul>
        </aside>
        <div className="contact-form-wrap">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
