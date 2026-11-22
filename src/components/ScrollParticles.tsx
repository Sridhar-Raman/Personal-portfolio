import * as React from "react"
import { RenderTarget } from "../lib/framer"
interface Props {
    style?: React.CSSProperties
}
const particles = Array.from({ length: 76 }, (_, i) => ({
    x: ((i * 73 + 19) % 997) / 997,
    y: ((i * 137 + 31) % 991) / 991,
    r: 1.2 + (i % 5) * 0.45,
    speed: 0.04 + (i % 7) * 0.014,
    phase: i * 1.73,
    motif: i % 5 === 0,
    kind: Math.floor(i / 5) % 4,
}))
function Motif({ kind }: { kind: number }) {
    if (kind === 0)
        return (
            <>
                <path d="M-7-10H3L8-5V10H-7Z" />
                <path d="M2-10V-4H8M-3 0H4M-3 4H4M-3 7H1" />
            </>
        )
    if (kind === 1)
        return (
            <>
                <rect x="-10" y="-5" width="20" height="14" rx="2" />
                <path d="M-4-5V-9H4V-5M-10 0Q0 5 10 0M0 1V5" />
            </>
        )
    if (kind === 2)
        return (
            <>
                <path d="M-5-7-11 0-5 7M5-7 11 0 5 7M2-10-2 10" />
            </>
        )
    return (
        <>
            <rect x="-11" y="-8" width="22" height="17" rx="2" />
            <path d="M-11-2H11M-7-5H-6M-3-5H-2M-6 2H-1M-6 5H5" />
        </>
    )
}
/** @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed */
export default function ScrollParticles({ style }: Props) {
    const root = React.useRef<SVGSVGElement>(null)
    React.useEffect(() => {
        const svg = root.current
        if (!svg || RenderTarget.current() === RenderTarget.canvas) return
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        const groups = Array.from(svg.querySelectorAll("[data-particle]"))
        let frame = 0,
            width = window.innerWidth,
            height = window.innerHeight,
            last = 0
        const resize = () => {
            width = svg.clientWidth || window.innerWidth
            height = svg.clientHeight || window.innerHeight
            svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
        }
        resize()
        const draw = (now: number) => {
            if (now - last > 30) {
                const t = reduced.matches ? 0 : now / 1000,
                    scroll = reduced.matches ? 0 : window.scrollY
                groups.forEach((group, i) => {
                    const p = particles[i]
                    // Larger résumé motifs stay near the edges, clear of the main content.
                    const base = p.motif
                        ? i % 2 === 0
                            ? 0.035 + p.x * 0.07
                            : 0.895 + p.x * 0.07
                        : p.x
                    const x =
                        base * width +
                        Math.sin(t * 0.16 + p.phase) * (p.motif ? 6 : 14)
                    const y =
                        ((((p.y * height -
                            scroll * p.speed +
                            Math.cos(t * 0.13 + p.phase) * 20) %
                            (height + 60)) +
                            (height + 60)) %
                            (height + 60)) -
                        30
                    const angle = p.motif ? Math.sin(t * 0.1 + p.phase) * 12 : 0
                    group.setAttribute(
                        "transform",
                        `translate(${x} ${y}) rotate(${angle})`
                    )
                })
                last = now
            }
            if (!reduced.matches) frame = requestAnimationFrame(draw)
        }
        frame = requestAnimationFrame(draw)
        window.addEventListener("resize", resize)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener("resize", resize)
        }
    }, [])
    return (
        <svg
            ref={root}
            aria-hidden="true"
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            style={{
                ...style,
                display: "block",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                overflow: "hidden",
                color: "var(--token-30a1dc7f-21c9-4f57-88cb-ed350becd727, #fff)",
            }}
        >
            {particles.map((p, i) => {
                const x =
                    (p.motif
                        ? i % 2 === 0
                            ? 0.035 + p.x * 0.07
                            : 0.895 + p.x * 0.07
                        : p.x) * 1440
                return (
                    <g
                        data-particle=""
                        key={i}
                        transform={`translate(${x} ${p.y * 900})`}
                        opacity={p.motif ? 0.24 : 0.18 + (i % 4) * 0.055}
                    >
                        {p.motif ? (
                            <g
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <Motif kind={p.kind} />
                            </g>
                        ) : (
                            <circle r={p.r} fill="currentColor" />
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
