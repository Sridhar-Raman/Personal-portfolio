// Minimal stand-in for Framer's RenderTarget so the Framer code components run outside Framer.
// Outside the Framer canvas, `current()` never equals `canvas`, so effects run normally.
export const RenderTarget = {
  canvas: "canvas",
  preview: "preview",
  current: (): string => "preview",
}
