/**
 * Skills grouped by category, as the assessment requests.
 * Static content: it rarely changes, so it does not need the database.
 */
const skillGroups = [
  {
    category: 'Programming Languages',
    icon: 'code',
    skills: ['C', 'C++', 'Python', 'JavaScript (ES6+)'],
  },
  {
    category: 'Front-End',
    icon: 'layout',
    skills: ['HTML5', 'CSS3', 'React', 'Responsive Design'],
  },
  {
    category: 'Back-End & Databases',
    icon: 'server',
    skills: ['Node.js', 'Express', 'RESTful APIs', 'MongoDB'],
  },
  {
    category: 'Cloud & Deployment',
    icon: 'cloud',
    skills: ['AWS Amplify', 'Amazon EC2', 'MongoDB Atlas'],
  },
  {
    category: 'Tools & Practices',
    icon: 'tool',
    skills: ['Git & GitHub', 'VS Code', 'Agile Teamwork', 'Hardware Repair'],
  },
  {
    category: 'Design',
    icon: 'pen',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'Photography'],
  },
]

export default skillGroups
