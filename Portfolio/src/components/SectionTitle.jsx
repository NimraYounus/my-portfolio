export default function SectionTitle({ children, className = '' }) {
  return (
    <div className={`text-start text-lg font-semibold text-white/80 ${className}`}>{children}</div>
  )
}
