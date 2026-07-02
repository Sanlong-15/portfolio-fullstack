/**
 * Reusable button. Renders an <a> when href is given, otherwise <button>.
 * variant: "primary" | "outline" | "ghost" | "danger"
 */
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
