import type { ReactElement } from "react"

const size = 22

/** Simplified brand icons drawn inline so no image files are needed. */
const icons: Record<string, ReactElement> = {
  HTML5: (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 2h18l-1.6 18.2L12 22l-7.4-1.8z" fill="#E44D26" />
      <path d="M12 3.8v16.6l5.9-1.6 1.4-15z" fill="#F16529" />
      <path d="M12 9.5H7.8l.3 3.2H12v-3.2zm0 6.4-2.4-.6-.15-1.7H7.5l.3 3.5 4.2 1.2z" fill="#EBEBEB" />
      <path d="M12 9.5h4.1l-.4 4.5-3.7 1.1v-2.9h2.1l.1-1.2H12zm0-5.7h4.9l.2-2.1H12z" fill="#FFF" />
    </svg>
  ),
  CSS3: (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 2h18l-1.6 18.2L12 22l-7.4-1.8z" fill="#1572B6" />
      <path d="M12 3.8v16.6l5.9-1.6 1.4-15z" fill="#33A9DC" />
      <path d="M12 9.5H7.8l.3 3.2H12v-3.2zm0 6.4-2.4-.6-.15-1.7H7.5l.3 3.5 4.2 1.2z" fill="#EBEBEB" />
      <path d="M12 9.5h4.1l-.4 4.5-3.7 1.1v-2.9h2.1l.1-1.2H12zm0-5.7h4.9l.2-2.1H12z" fill="#FFF" />
    </svg>
  ),
  JavaScript: (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="1" fill="#F7DF1E" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif" fill="#000">JS</text>
    </svg>
  ),
  jQuery: (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 5.5C16.5 2.5 8 1.5 4.5 7c-2.3 3.6-.2 8.5 4.5 9.5-3.6-1.5-4.2-5.8-1.6-8.2 3.3-3 8.8-.6 11.6-2.8z" fill="#0769AD" />
      <path d="M21 9.5c-1.8 3.2-6.4 3.8-9.4 2.1C8.6 9.9 7.3 7.4 8.2 5.6 6.2 7.2 5.8 10.5 7.8 13c2.4 2.9 7.6 2.8 10.6.6 1.6-1.2 2.6-2.4 2.6-4.1z" fill="#0769AD" opacity="0.85" />
    </svg>
  ),
  React: (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#61DAFB" strokeWidth="1.3">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" stroke="none" />
    </svg>
  ),
  Redux: (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#fff" strokeWidth="1.4">
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#764ABC" stroke="none" />
      <path d="M12 5.5c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5S5.5 15.6 5.5 12c0-1.3.4-2.5 1-3.5" />
      <path d="M12 9.2c1.6 0 2.8 1.2 2.8 2.8S13.6 14.8 12 14.8 9.2 13.6 9.2 12" />
      <path d="M8.7 15.2 6.2 16.6M15.3 8.8l2.5-1.4" />
    </svg>
  ),
  TailwindCSS: (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 6.5c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 2 1.6 1 1.2 2.2 2.6 4.8 2.6 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-2-1.6-1-1.2-2.2-2.6-4.8-2.6zm-5 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 2 1.6 1 1.2 2.2 2.6 4.8 2.6 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-2-1.6-1-1.2-2.2-2.6-4.8-2.6z" fill="#38BDF8" />
    </svg>
  ),
  "Next.js": (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#000" />
      <path d="M8 7.5v9M8 7.5l8 10.2M16 7.5v5.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  ),
  "Node.js": (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5 21.2 6.8v10.4L12 22.5l-9.2-5.3V6.8z" fill="#5FA04E" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="Arial, sans-serif" fill="#fff">node</text>
    </svg>
  ),
  MySQL: (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="5" width="22" height="14" rx="3" fill="#00758F" />
      <text x="12" y="15.2" textAnchor="middle" fontSize="7.5" fontWeight="700" fontFamily="Arial, sans-serif" fill="#fff">SQL</text>
    </svg>
  ),
  MongoDB: (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5c2.4 3.6 4.6 7.2 4.6 11.4 0 4.2-2.3 7.2-4.6 9.6-2.3-2.4-4.6-5.4-4.6-9.6 0-4.2 2.2-7.8 4.6-11.4z" fill="#47A248" />
      <path d="M12 6v14.5" stroke="#2F6B30" strokeWidth="0.8" />
    </svg>
  ),
  Git: (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" transform="rotate(45 12 12)" fill="#F05032" />
      <circle cx="9.5" cy="8.5" r="1.4" fill="#fff" />
      <circle cx="9.5" cy="15.5" r="1.4" fill="#fff" />
      <circle cx="15" cy="11" r="1.4" fill="#fff" />
      <path d="M9.5 9.9v4.2M9.5 10.5c0 1.6 1.6.5 4.1.5" stroke="#fff" strokeWidth="1.1" fill="none" />
    </svg>
  ),
}

export default function TechIcon({ name }: { name: string }) {
  return icons[name] ?? null
}
