import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/** Scroll progress, reveals, parallax, magnetic buttons and scroll-velocity marquees. Skipped for reduced motion. */
export function initScrollMotion(root: HTMLElement): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  const cleanups: Array<() => void> = []

  const ctx = gsap.context(() => {
    // Header progress line
    gsap.fromTo(
      ".progress",
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.3 },
      }
    )

    // Generic fade-and-rise reveals
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        }
      )
    })

    // Hero: the photo zooms and the name drifts up and fades as you scroll away
    gsap.fromTo(
      ".hero-photo img",
      { scale: 1.1 },
      {
        scale: 1.4,
        ease: "none",
        transformOrigin: "50% 40%",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      }
    )
    gsap.to(".hero-title", {
      marginTop: -160,
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "20% top", end: "bottom top", scrub: true },
    })
    gsap.to(".hero-sub", {
      marginTop: -90,
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "10% top", end: "70% top", scrub: true },
    })

    // Big headings slide sideways with the scroll
    gsap.utils.toArray<HTMLElement>(".big").forEach((el, i) => {
      gsap.fromTo(
        el,
        { x: i % 2 ? 90 : -90 },
        {
          x: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 45%", scrub: true },
        }
      )
    })

    // Intro card tilts in
    gsap.fromTo(
      ".glass",
      { rotateX: 14, transformPerspective: 900 },
      {
        rotateX: 0,
        ease: "none",
        scrollTrigger: { trigger: ".about .split", start: "top bottom", end: "top 40%", scrub: true },
      }
    )

    // Skill rows slide in one by one from alternating sides, with the number scrubbing in
    gsap.utils.toArray<HTMLElement>(".service-list li").forEach((li, i) => {
      gsap.fromTo(
        li,
        { xPercent: i % 2 ? 12 : -12 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: li, start: "top 100%", end: "top 60%", scrub: true },
        }
      )
    })

    // Projects: screenshots drift (parallax) and the copy slides in from the opposite side
    gsap.utils.toArray<HTMLElement>(".project").forEach((card) => {
      const shot = card.querySelector<HTMLElement>(".project-shot")
      const copy = card.querySelector<HTMLElement>(".project-copy")
      const flip = card.classList.contains("flip")
      if (shot) {
        gsap.fromTo(
          shot,
          { yPercent: 12, rotate: flip ? 2.5 : -2.5 },
          {
            yPercent: -12,
            rotate: 0,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          }
        )
      }
      if (copy) {
        gsap.fromTo(
          copy,
          { x: flip ? -70 : 70, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 75%", end: "top 40%", scrub: true },
          }
        )
      }
    })

    // Experience / education cards pop in
    gsap.utils.toArray<HTMLElement>(".tl-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { scale: 0.92, y: 40 },
        {
          scale: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 92%", end: "top 55%", scrub: true },
          delay: i * 0.1,
        }
      )
    })

    // Contact lines stagger in
    gsap.fromTo(
      ".contact-title > *",
      { yPercent: 80, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.12,
        ease: "power3.out",
        duration: 0.9,
        scrollTrigger: { trigger: ".contact-title", start: "top 85%", toggleActions: "play none none none" },
      }
    )

    // Marquees speed up while you scroll fast, then ease back
    const rate = { v: 1 }
    ScrollTrigger.create({
      onUpdate: (self) => {
        const target = 1 + Math.min(Math.abs(self.getVelocity()) / 500, 5)
        gsap.to(rate, {
          v: target,
          duration: 0.2,
          overwrite: true,
          onUpdate: () => document.querySelectorAll<HTMLElement>(".stack-track").forEach((t) => t.getAnimations().forEach((a) => (a.playbackRate = rate.v))),
          onComplete: () =>
            gsap.to(rate, {
              v: 1,
              duration: 1.2,
              onUpdate: () => document.querySelectorAll<HTMLElement>(".stack-track").forEach((t) => t.getAnimations().forEach((a) => (a.playbackRate = rate.v))),
            }),
        })
      },
    })
  }, root)

  // Magnetic buttons: they lean towards the cursor
  const magnets = Array.from(root.querySelectorAll<HTMLElement>(".btn, .reset-btn, .socials a"))
  magnets.forEach((el) => {
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * 0.3
      const y = (e.clientY - (r.top + r.height / 2)) * 0.45
      gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" })
    }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" })
    el.addEventListener("mousemove", move)
    el.addEventListener("mouseleave", leave)
    cleanups.push(() => {
      el.removeEventListener("mousemove", move)
      el.removeEventListener("mouseleave", leave)
    })
  })

  ScrollTrigger.refresh()
  return () => {
    cleanups.forEach((fn) => fn())
    ctx.revert()
  }
}
