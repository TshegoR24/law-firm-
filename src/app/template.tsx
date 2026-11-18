/** Re-mounts on every navigation, giving a soft page entrance (CSS-only). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
