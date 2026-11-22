import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from "react"
import "./App.css"
import TechIcon from "./components/TechIcons"
import { initScrollMotion } from "./lib/motion"

const EMAIL = "sridharraman2018@gmail.com"
const currentYear = new Date().getFullYear()

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "play", label: "Play" },
  { id: "contact", label: "Contact" },
]

const techStack = ["HTML5", "CSS3", "JavaScript", "jQuery", "React", "TailwindCSS", "Git", "Node.js", "MongoDB"]

const stackRows = [
  ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "jQuery", "Bootstrap", "Tailwind CSS", "Responsive Design", "SPA Architecture"],
  ["Node.js", "Express.js", "RESTful APIs", "RBAC", "MongoDB", "MERN Stack"],
  ["Git", "GitHub", "Postman", "Vercel", "Performance Optimization", "Lazy Loading"],
]

const services = [
  "Responsive Websites & Web Apps",
  "Reusable Component Systems",
  "REST API & MERN Integration",
  "Dashboards, Calendars & Role-Based Access",
  "Performance & Frontend Architecture",
]

const projects = [
  {
    tag: "01 / Booking System",
    title: "SRI.CR Appointment Booking",
    summary:
      "A responsive single-page booking platform with self-service booking, rescheduling and cancellation, plus a drag-and-drop team calendar in Day, Week and Month views. Real-time slot availability factors in working hours, service durations and buffers, with role-based access for Admins, Staff and Clients.",
    live: "https://sricr.vercel.app/",
  },
  {
    tag: "02 / Workforce Platform",
    title: "SRI.CR User & Team Management",
    summary:
      "A workforce management SPA with four role-tailored workspaces (Admin, Manager, Lead, Employee) and admin-approved registration. It covers task tracking, attendance, leave approvals, EOD reports, an internal team messenger and managerial analytics dashboards.",
    live: "https://sricr-user-management.vercel.app/",
  },
  {
    tag: "03 / Internal Mail",
    title: "SRI.CR In-App Mail",
    summary:
      "A private internal team email app with five smart folders, live unread badges, search and bulk actions. A floating draggable composer supports To/Cc, auto-saved drafts and attachments, with threaded Reply, Reply All and Forward views.",
    live: "https://in-app-mail.vercel.app/",
  },
]

/* ---------- Loader ---------- */
const LOADER_LINES = [
  "Hi, I'm Sridhar R.",
  "MERN Stack Developer.",
  "About me: I build responsive, high-performance web apps with React, Node.js and MongoDB.",
  "Loading portfolio...",
]
const FAST_LINE = 2

function Loader({ done, onFinish }: { done: boolean; onFinish: () => void }) {
  const [typed, setTyped] = useState<string[]>([""])
  const [pct, setPct] = useState(0)
  const finished = useRef(false)

  useEffect(() => {
    const total = LOADER_LINES.join("").length
    let line = 0, col = 0, count = 0
    let timer = 0
    const finish = () => {
      if (finished.current) return
      finished.current = true
      clearTimeout(timer)
      setPct(100)
      window.setTimeout(onFinish, 450)
    }
    const tick = () => {
      if (line >= LOADER_LINES.length) return finish()
      const li = line
      const text = LOADER_LINES[li]
      col += 1
      count += 1
      const shown = text.slice(0, col)
      setTyped((prev) => {
        const next = prev.slice()
        next[li] = shown
        return next
      })
      setPct(Math.round((count / total) * 100))
      let delay = li === FAST_LINE ? 14 + Math.random() * 26 : 45 + Math.random() * 70
      if (col >= text.length) {
        line += 1
        col = 0
        delay = 380
        if (line < LOADER_LINES.length) setTyped((prev) => [...prev, ""])
      } else if (/[,.]/.test(text[col - 1])) delay += li === FAST_LINE ? 60 : 140
      timer = window.setTimeout(tick, delay)
    }
    timer = window.setTimeout(tick, 500)
    const skip = () => finish()
    window.addEventListener("keydown", skip)
    window.addEventListener("pointerdown", skip)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("keydown", skip)
      window.removeEventListener("pointerdown", skip)
    }
  }, [onFinish])

  return (
    <div className={`loader ${done ? "loader-out" : ""}`} aria-hidden="true">
      <div className="loader-glow" />
      <div className="term">
        <div className="term-bar">
          <i /><i /><i />
          <span>sridhar@portfolio ~ </span>
        </div>
        <div className="term-body">
          {typed.map((t, i) => (
            <p key={i} className={i === 0 ? "term-hero" : ""}>
              <span className="term-prompt">&gt;</span> {t}
              {i === typed.length - 1 && <span className="term-caret" />}
            </p>
          ))}
        </div>
        <div className="term-progress"><span style={{ width: `${pct}%` }} /></div>
        <p className="term-pct">{pct}%</p>
      </div>
    </div>
  )
}

/* ---------- Header ---------- */
function Header({ active }: { active: string }) {
  return (
    <header className="header">
      <a className="brand" href="#home">SRIDHAR R</a>
      <nav className="nav">
        {navItems.map((n) => (
          <a key={n.id} href={`#${n.id}`} className={active === n.id ? "active" : ""}>
            {n.label}
          </a>
        ))}
      </nav>
      <div className="progress" />
    </header>
  )
}

/* ---------- Hero with particle dissolve ---------- */
function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let w = 0, h = 0, raf = 0
    const mouse = { x: -999, y: -999 }
    const pts = Array.from({ length: 1400 }, () => ({
      x: Math.random(), y: Math.random(), ox: 0, oy: 0, r: Math.random() * 1.3 + 0.3, a: Math.random() * 0.8 + 0.2,
    }))
    const resize = () => {
      w = canvas.width = canvas.clientWidth
      h = canvas.height = canvas.clientHeight
    }
    resize()
    const move = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        let x = p.x * w + p.ox, y = p.y * h + p.oy
        const dx = x - mouse.x, dy = y - mouse.y, d = Math.hypot(dx, dy)
        if (d < 90) { p.ox += (dx / d) * 3; p.oy += (dy / d) * 3 }
        p.ox *= 0.92; p.oy *= 0.92
        x = p.x * w + p.ox; y = p.y * h + p.oy
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fillRect(x, y, p.r, p.r)
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", move)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", move)
    }
  }, [])
  return <canvas ref={ref} className="hero-particles" aria-hidden="true" />
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  function onMove(e: ReactMouseEvent<HTMLElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5))
    el.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5))
  }
  return (
    <section id="home" className="hero" ref={ref} onMouseMove={onMove}>
      <div className="hero-photo">
        <img src="/about.webp" alt="Sridhar" />
      </div>
      <HeroParticles />
      <h1 className="hero-title" aria-label="Sridhar R">
        <span className="word" aria-hidden="true">
          {"SRIDHAR".split("").map((c, i) => (
            <span className="ch" style={{ "--i": i } as CSSProperties} key={i}>
              <span className="in">{c}</span>
            </span>
          ))}
        </span>
        <span className="word word-r" aria-hidden="true">
          <span className="ch" style={{ "--i": 7 } as CSSProperties}>
            <span className="in">R</span>
          </span>
        </span>
      </h1>
      <p className="hero-sub"><em>MERN Stack</em> Developer</p>
      <a className="scroll-hint" href="#about" aria-label="Scroll to About">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  )
}

/* ---------- Typed text: types itself when scrolled into view ---------- */
function TypedText({ paragraphs }: { paragraphs: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const total = paragraphs.reduce((n, p) => n + p.length, 0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(total)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [total])

  const text = paragraphs.join("")
  useEffect(() => {
    if (!started) return
    let n = 0
    let timer = 0
    const tick = () => {
      n += 1
      setCount(n)
      if (n >= text.length) return
      timer = window.setTimeout(tick, 16 + Math.random() * 30 + (/[,.]/.test(text[n - 1]) ? 90 : 0))
    }
    timer = window.setTimeout(tick, 350)
    return () => clearTimeout(timer)
  }, [started, text])

  let left = count
  return (
    <div ref={ref} className="typed" aria-label={paragraphs.join(" ")}>
      {paragraphs.map((p, i) => {
        const shown = Math.max(0, Math.min(p.length, left))
        left -= p.length
        const typing = shown > 0 && shown < p.length
        const waiting = shown === 0 && count === 0 && i === 0 && !started
        return (
          <p key={i} aria-hidden="true">
            <span>{p.slice(0, shown)}</span>
            {(typing || waiting) && <span className="type-caret" />}
            <span className="type-rest">{p.slice(shown)}</span>
          </p>
        )
      })}
    </div>
  )
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="about">
      <div className="split">
        <div>
          <p className="eyebrow">About me</p>
          <h2 className="big reveal">Intro</h2>
        </div>
        <div className="glass reveal">
          <TypedText
            paragraphs={[
              "I'm a MERN stack developer. I build responsive web apps with a focus on performance, using React, JavaScript (ES6+) and a MERN-stack backend, and I care about reusable components, clean architecture and fast, usable interfaces.",
              "Currently focused on advanced React patterns, TypeScript, frontend system design and performance engineering.",
            ]}
          />
        </div>
      </div>

      <div className="stack">
        <p className="eyebrow">The stack</p>
        {stackRows.map((row, i) => (
          <div className={`stack-row ${i % 2 ? "rev" : ""}`} key={i}>
            <div className="stack-track">
              {[...row, ...row, ...row, ...row].map((t, j) => (
                <span key={j}>{t}</span>
              ))}
            </div>
          </div>
        ))}
        <div className="icon-row">
          {techStack.map((t) => (
            <span key={t} title={t}><TechIcon name={t} /></span>
          ))}
        </div>
      </div>

      <div className="journey">
        <div className="journey-col reveal">
          <h3 className="journey-title"><span className="num">01</span> Experience</h3>
          <div className="tl">
            <article className="tl-card">
              <span className="tl-dot" aria-hidden="true" />
              <span className="tl-badge">Mar 2023 – Present</span>
              <h4>MERN Stack Developer</h4>
              <p className="tl-org">Humworld Solutions Private Limited · Chennai</p>
              <ul>
                <li>Delivered responsive websites and web applications using React.js, JavaScript (ES6+), HTML5, CSS3 and jQuery focused on usability and performance.</li>
                <li>Built reusable frontend components to improve development efficiency, UI responsiveness and maintainability across modules.</li>
                <li>Integrated frontend workflows with Node.js, Express.js and MongoDB-based services via RESTful APIs, collaborating on production features.</li>
              </ul>
              <div className="chips">
                {["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"].map((c) => <span key={c}>{c}</span>)}
              </div>
            </article>
          </div>
        </div>

        <div className="journey-col reveal">
          <h3 className="journey-title"><span className="num">02</span> Education</h3>
          <div className="tl">
            <article className="tl-card">
              <span className="tl-dot" aria-hidden="true" />
              <span className="tl-badge">2018 – 2022</span>
              <h4>B.Tech in Information Technology</h4>
              <p className="tl-org">University College of Engineering · Tindivanam</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Services ---------- */
function Services() {
  return (
    <section id="services">
      <h2 className="big right reveal">Can Do</h2>
      <ol className="service-list">
        {services.map((s, i) => (
          <li key={s} className="reveal">
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span className="svc">{s}</span>
            <span className="arrow" aria-hidden="true">↘</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ---------- Projects ---------- */
function Projects() {
  return (
    <section id="projects">
      <p className="eyebrow red">Production systems</p>
      <h2 className="big reveal">Featured<br />Engineering</h2>
      <div className="project-list">
        {projects.map((p, i) => (
          <article className={`project ${i % 2 ? "flip" : ""} reveal`} key={p.title}>
            <a className="project-shot" href={p.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
              <iframe src={p.live} title={`${p.title} landing page`} loading="lazy" tabIndex={-1} sandbox="allow-scripts allow-same-origin" />
            </a>
            <div className="project-copy">
              <p className="tag">{p.tag}</p>
              <h3>{p.title}</h3>
              <p className="muted">{p.summary}</p>
              <a className="link" href={p.live} target="_blank" rel="noreferrer">Live website →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- Play: breakout where the bricks spell the banner ---------- */
const GLYPHS: Record<string, string[]> = {
  C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
}
const PLAY_LINES = ["CODE THAT", "SHIPS"]
const MAX_LIVES = 3

type Brick = { x: number; y: number; s: number; alive: boolean }

function Play() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resetRef = useRef<() => void>(() => {})
  const [lives, setLives] = useState(MAX_LIVES)
  const [left, setLeft] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0, h = 0, raf = 0, last = 0, visible = true, hover = false
    let bricks: Brick[] = []
    let alive = 0
    let livesNow = MAX_LIVES
    let cell = 10
    const paddle = { x: 0, w: 120, h: 10, y: 0 }
    const ball = { x: 0, y: 0, vx: 0, vy: 0, r: 6, stuck: true, wait: 0 }
    const keys = { left: false, right: false }
    let resetTimer = 0

    const buildBricks = () => {
      bricks = []
      const cols = Math.max(...PLAY_LINES.map((l) => l.length * 6 - 1))
      const rows = PLAY_LINES.length * 7 + (PLAY_LINES.length - 1) * 2
      cell = Math.floor(Math.min((w * 0.9) / cols, (h * 0.52) / rows))
      const s = cell - 3
      const top = Math.max(24, h * 0.07)
      PLAY_LINES.forEach((line, li) => {
        const lineW = (line.length * 6 - 1) * cell
        const ox = (w - lineW) / 2
        const oy = top + li * 9 * cell
        line.split("").forEach((ch, ci) => {
          const g = GLYPHS[ch] || GLYPHS[" "]
          g.forEach((row, ry) =>
            row.split("").forEach((bit, rx) => {
              if (bit === "1") bricks.push({ x: ox + (ci * 6 + rx) * cell, y: oy + ry * cell, s, alive: true })
            })
          )
        })
      })
      alive = bricks.length
      setLeft(alive)
    }

    const serve = () => {
      ball.stuck = false
      ball.x = paddle.x
      ball.y = paddle.y - ball.r - 4
      const ang = -Math.PI / 2 + (Math.random() * 0.8 - 0.4)
      const sp = h * 0.62
      ball.vx = Math.cos(ang) * sp
      ball.vy = Math.sin(ang) * sp
    }

    const fullReset = () => {
      clearTimeout(resetTimer)
      livesNow = MAX_LIVES
      setLives(MAX_LIVES)
      buildBricks()
      ball.stuck = true
      ball.wait = 0.6
    }
    resetRef.current = fullReset

    const resize = () => {
      w = canvas.width = canvas.clientWidth
      h = canvas.height = canvas.clientHeight
      paddle.w = Math.max(90, w * 0.14)
      paddle.y = h - 34
      paddle.x = Math.min(Math.max(paddle.x || w / 2, paddle.w / 2), w - paddle.w / 2)
      ball.r = Math.max(5, h * 0.014)
      buildBricks()
      ball.stuck = true
      ball.wait = 0.6
    }

    const move = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      paddle.x = Math.min(Math.max(e.clientX - r.left, paddle.w / 2), w - paddle.w / 2)
    }
    const touch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect()
      paddle.x = Math.min(Math.max(e.touches[0].clientX - r.left, paddle.w / 2), w - paddle.w / 2)
    }
    const kd = (e: KeyboardEvent) => {
      if (!hover) return
      if (e.key === "ArrowLeft") { keys.left = true; e.preventDefault() }
      if (e.key === "ArrowRight") { keys.right = true; e.preventDefault() }
    }
    const ku = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keys.left = false
      if (e.key === "ArrowRight") keys.right = false
    }
    const enter = () => { hover = true }
    const leave = () => { hover = false; keys.left = keys.right = false }

    const loseBall = () => {
      livesNow -= 1
      setLives(Math.max(livesNow, 0))
      ball.stuck = true
      if (livesNow <= 0) {
        resetTimer = window.setTimeout(fullReset, 1200)
        ball.wait = 99
      } else {
        ball.wait = 0.7
      }
    }

    const step = (dt: number) => {
      if (keys.left) paddle.x -= w * 0.9 * dt
      if (keys.right) paddle.x += w * 0.9 * dt
      paddle.x = Math.min(Math.max(paddle.x, paddle.w / 2), w - paddle.w / 2)

      if (ball.stuck) {
        ball.x = paddle.x
        ball.y = paddle.y - ball.r - 4
        ball.wait -= dt
        if (ball.wait <= 0 && livesNow > 0) serve()
        return
      }
      ball.x += ball.vx * dt
      ball.y += ball.vy * dt
      if (ball.x < ball.r) { ball.x = ball.r; ball.vx = Math.abs(ball.vx) }
      if (ball.x > w - ball.r) { ball.x = w - ball.r; ball.vx = -Math.abs(ball.vx) }
      if (ball.y < ball.r) { ball.y = ball.r; ball.vy = Math.abs(ball.vy) }

      if (
        ball.vy > 0 &&
        ball.y + ball.r >= paddle.y &&
        ball.y - ball.r <= paddle.y + paddle.h &&
        Math.abs(ball.x - paddle.x) <= paddle.w / 2 + ball.r
      ) {
        const off = (ball.x - paddle.x) / (paddle.w / 2)
        const sp = Math.min(Math.hypot(ball.vx, ball.vy) * 1.01, h * 1.1)
        const ang = off * 1.05
        ball.vx = Math.sin(ang) * sp
        ball.vy = -Math.cos(ang) * sp
        ball.y = paddle.y - ball.r
      }

      for (const b of bricks) {
        if (!b.alive) continue
        const nx = Math.max(b.x, Math.min(ball.x, b.x + b.s))
        const ny = Math.max(b.y, Math.min(ball.y, b.y + b.s))
        const dx = ball.x - nx
        const dy = ball.y - ny
        if (dx * dx + dy * dy <= ball.r * ball.r) {
          b.alive = false
          alive -= 1
          setLeft(alive)
          if (Math.abs(dx) > Math.abs(dy)) ball.vx = dx > 0 ? Math.abs(ball.vx) : -Math.abs(ball.vx)
          else ball.vy = dy > 0 ? Math.abs(ball.vy) : -Math.abs(ball.vy)
          break
        }
      }
      if (alive <= 0) {
        ball.stuck = true
        ball.wait = 99
        resetTimer = window.setTimeout(fullReset, 1400)
      }
      if (ball.y - ball.r > h) loseBall()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const b of bricks) {
        if (!b.alive) continue
        const g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.s)
        g.addColorStop(0, "#f4f1ff")
        g.addColorStop(1, "#cfc8f5")
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.roundRect(b.x, b.y, b.s, b.s, 2)
        ctx.fill()
      }
      const pg = ctx.createLinearGradient(0, paddle.y, 0, paddle.y + paddle.h)
      pg.addColorStop(0, "#ff7a55")
      pg.addColorStop(1, "#e5322d")
      ctx.fillStyle = pg
      ctx.shadowColor = "rgba(229,50,45,0.7)"
      ctx.shadowBlur = 16
      ctx.beginPath()
      ctx.roundRect(paddle.x - paddle.w / 2, paddle.y, paddle.w, paddle.h, 5)
      ctx.fill()
      ctx.fillStyle = "#ff6a4a"
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }

    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000 || 0, 0.033)
      last = t
      if (visible && !document.hidden) {
        step(dt)
        draw()
      }
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    resize()
    paddle.x = w / 2
    raf = requestAnimationFrame(loop)
    window.addEventListener("resize", resize)
    window.addEventListener("keydown", kd)
    window.addEventListener("keyup", ku)
    canvas.addEventListener("mousemove", move)
    canvas.addEventListener("touchmove", touch, { passive: true })
    canvas.addEventListener("mouseenter", enter)
    canvas.addEventListener("mouseleave", leave)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resetTimer)
      io.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("keydown", kd)
      window.removeEventListener("keyup", ku)
      canvas.removeEventListener("mousemove", move)
      canvas.removeEventListener("touchmove", touch)
      canvas.removeEventListener("mouseenter", enter)
      canvas.removeEventListener("mouseleave", leave)
    }
  }, [])

  return (
    <section id="play" className="play">
      <p className="arcade-pill reveal"><span aria-hidden="true">◈</span> Interactive arcade showcase</p>
      <h2 className="mid reveal">Break it if you can</h2>
      <p className="muted center play-sub reveal">
        Break the banner. Clean, resilient MERN stack systems. Move your mouse or use the arrow keys to control the paddle.
      </p>
      <div className="arcade">
        <div className="arcade-top">
          <span className="arcade-tab">Destructible 5x7 pixel font matrix</span>
          <span className="arcade-balls">
            Balls
            {Array.from({ length: MAX_LIVES }, (_, i) => (
              <i key={i} className={i < lives ? "on" : ""} />
            ))}
          </span>
        </div>
        <canvas ref={canvasRef} className="play-canvas" />
        <div className="arcade-bar">
          <span className="mono">{left} bricks left</span>
          <button className="reset-btn" onClick={() => resetRef.current()}>Respawn banner ↻</button>
        </div>
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */
function Contact() {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <section id="contact" className="contact">
      <div className="contact-left reveal">
        <p className="avail"><span className="avail-dot" /> Available for MERN stack roles &amp; projects</p>
        <h2 className="contact-title">
          <span className="ct-white">LET'S BUILD</span>
          <em>GREAT</em>
          <span className="ct-white">PRODUCTS.</span>
        </h2>
        <p className="contact-text">Open to MERN stack and React.js work, from responsive web apps to full-stack features with Node.js, Express and MongoDB.</p>
        <div className="actions">
          <a className="btn btn-orange" href={`mailto:${EMAIL}`}>Send an email <span aria-hidden="true">↗</span></a>
          <button className="btn btn-ghost" onClick={copy}><span aria-hidden="true">⧉</span> {copied ? "Copied!" : "Copy email"}</button>
          <a className="btn btn-ghost" href="/Sridhar_Resume.pdf" download>Download CV</a>
        </div>
      </div>
      <div className="reveal">
      <div className="contact-card">
        <div className="cc-row">
          <span className="cc-label">Email</span>
          <span className="cc-value">{EMAIL}</span>
        </div>
        <div className="cc-row">
          <span className="cc-label">Based in</span>
          <span className="cc-value">Chennai, India</span>
        </div>
        <div className="cc-row">
          <span className="cc-label">Focus</span>
          <span className="cc-value">MERN Stack · React · Node.js · MongoDB</span>
        </div>
        <div className="cc-row">
          <span className="cc-label">Elsewhere</span>
          <span className="socials">
            <a href="https://github.com/Sridhar-Raman" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
            <a href="https://www.linkedin.com/in/sridhar-raman" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href={`mailto:${EMAIL}`} aria-label="Email">@</a>
          </span>
        </div>
      </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <span className="mono">© {currentYear} Sridhar R. All rights reserved.</span>
      <a href="#home" className="mono">Back to top ↑</a>
    </footer>
  )
}

export default function App() {
  const siteRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState("home")

  const finishLoader = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    if (!siteRef.current) return
    return initScrollMotion(siteRef.current)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    )
    navItems.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <div className={`site ${loaded ? "ready" : ""}`} ref={siteRef}>
      <Loader done={loaded} onFinish={finishLoader} />
      <Header active={active} />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Play />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
