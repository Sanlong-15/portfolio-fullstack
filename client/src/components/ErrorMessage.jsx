import Button from './Button.jsx'

// Error state with an optional retry action.
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p className="error-title">Something went wrong</p>
      <p className="error-detail">{message}</p>
      {onRetry && (
        <Button variant="outline" small onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
