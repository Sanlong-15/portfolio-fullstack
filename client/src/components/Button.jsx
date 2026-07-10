// Reusable button.
export default function Button({ children, href, variant = 'primary', small, ...rest }) {
  const className = `btn btn-${variant}${small ? ' btn-small' : ''}`
  if (href) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  )
}
