// Real project data from Sanlong Huy's CV and previous portfolio.
const projectsData = [
  {
    title: 'Booxie',
    description:
      'A mobile and web platform where students can buy and sell secondhand books in one place. I designed the full UI/UX in Figma, from wireframes to high-fidelity prototypes, and built the web frontend.',
    problem:
      'Students in Cambodia often cannot find affordable textbooks, and used books are hard to sell or discover. Booxie connects buyers and sellers of secondhand books on a single platform.',
    features: [
      'Browse and search secondhand books',
      'Post books for sale with photos and prices',
      'Buyer-seller messaging flow',
      'Clean mobile-first interface designed in Figma',
    ],
    technologies: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    imageUrl: '/images/Booxie.png',
    githubUrl: 'https://github.com/Sanlong-15/Booxie_version_1.0.1',
    liveUrl: 'https://www.figma.com/design/HK3jUm6G3JwkemiWaOc2sr/BooxieApp?node-id=6-2282',
    contribution:
      'UX/UI Designer and frontend developer on the technical team. I created all wireframes and high-fidelity prototypes in Figma and built the first web version.',
    challenges:
      'Balancing a simple interface for first-time users while supporting both buying and selling flows. Iterating on designs after team and mentor feedback under competition deadlines.',
    lessonsLearned:
      'How to move from a design idea to a working product, how to present a product to judges, and how to work in a real team. Booxie reached the Top 10 of the Khmer Enterprise Competition and was presented at SIW Cambodia 2026.',
    featured: true,
  },
  {
    title: 'Profix',
    description:
      'A frontend e-commerce website for buying computers online, built solo. Inspired by my own freelance computer repair work, it lets customers browse products without visiting a store.',
    problem:
      'Small computer shops in Phnom Penh rely on walk-in customers. Profix shows how a simple online catalog helps customers compare computers and parts from home.',
    features: [
      'Product catalog with categories',
      'Product detail views with specifications',
      'Responsive layout for phone and desktop',
      'Contact and inquiry section',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: '/images/profix.png',
    githubUrl: 'https://github.com/Sanlong-15/Profix',
    liveUrl: '',
    contribution:
      'Solo project — I did everything: planning, design, HTML/CSS layout, and JavaScript interactivity.',
    challenges:
      'Structuring CSS for many product cards without a framework, and keeping the layout responsive across screen sizes.',
    lessonsLearned:
      'Practical DOM manipulation, responsive design patterns, and how much planning matters before writing code.',
    featured: true,
  },
  {
    title: 'KimiBox',
    description:
      'An interactive educational game that helps middle and high school students learn chemistry through visual, engaging gameplay instead of memorizing textbooks.',
    problem:
      'Chemistry feels abstract and difficult for many students. KimiBox turns core concepts into interactive gameplay so students learn by doing.',
    features: [
      'Interactive chemistry learning levels',
      'Visual element and reaction gameplay',
      'Progress-based learning path',
      'Interface designed for young students',
    ],
    technologies: ['Figma', 'UI/UX Design', 'Prototyping'],
    imageUrl: '/images/kimibox.png',
    githubUrl: '',
    liveUrl: 'https://www.figma.com/design/rciWctCSdxhzkc3GiMttnA/KimiBox?node-id=0-1',
    contribution:
      'UI/UX design team member. I designed wireframes and high-fidelity prototypes for the full game interface in Figma.',
    challenges:
      'Designing for a younger audience: the interface had to be playful but still clear, and every screen had to teach without overwhelming.',
    lessonsLearned:
      'Design systems in Figma, prototyping user flows, and adapting visual language to a specific audience.',
    featured: false,
  },
]

export default projectsData
