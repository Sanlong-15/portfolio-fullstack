// Loading indicator shown while API requests are in progress.
export default function Loading({ text = 'Loading…' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>{text}</p>
    </div>
  )
}
