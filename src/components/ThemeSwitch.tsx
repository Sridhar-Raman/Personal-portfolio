import * as React from "react"
import { RenderTarget } from "../lib/framer"
interface Props {
    style?: React.CSSProperties
}
const themes = {
    light: {
        "--token-2585ae86-e120-4353-80b8-1e0378448460": "#fafafa",
        "--token-26bc4f1b-0df8-4268-935d-083567ac6888": "#fafafa",
        "--token-30a1dc7f-21c9-4f57-88cb-ed350becd727": "#141414",
        "--token-214832d9-ac84-4509-9949-47c2926e5da0": "#808080",
        "--token-b4d223ed-03f5-4a9b-89ad-72802d44a023": "#141414",
        "--token-73e2668e-ad43-49fd-bc30-9906fc740a6b": "#fafafa",
        "--token-946e90e4-2067-4589-ada2-c429962b0f4a": "#808080",
        "--token-eaa444f4-7e99-47ba-8c71-b1ca35a8422f": "rgba(128,128,128,0.3)",
        "--token-267c60e3-1525-4ea3-92b5-269f7c247caf": "rgba(20,20,20,0.8)",
        "--token-6065e7bc-5ed0-4365-8788-d8ae4278d28c": "#808080",
        "--token-ef6c4576-46fd-4f95-9d66-991b170b3593": "#808080",
    },
    dark: {
        "--token-2585ae86-e120-4353-80b8-1e0378448460": "#141414",
        "--token-26bc4f1b-0df8-4268-935d-083567ac6888": "#141414",
        "--token-30a1dc7f-21c9-4f57-88cb-ed350becd727": "#fafafa",
        "--token-214832d9-ac84-4509-9949-47c2926e5da0": "#808080",
        "--token-b4d223ed-03f5-4a9b-89ad-72802d44a023": "#fafafa",
        "--token-73e2668e-ad43-49fd-bc30-9906fc740a6b": "#141414",
        "--token-946e90e4-2067-4589-ada2-c429962b0f4a": "#808080",
        "--token-eaa444f4-7e99-47ba-8c71-b1ca35a8422f": "rgba(128,128,128,0.3)",
        "--token-267c60e3-1525-4ea3-92b5-269f7c247caf": "rgba(20,20,20,0.8)",
        "--token-6065e7bc-5ed0-4365-8788-d8ae4278d28c": "#808080",
        "--token-ef6c4576-46fd-4f95-9d66-991b170b3593": "#808080",
    },
}
function applyTheme(theme: "light" | "dark") {
    document.documentElement.dataset.siteTheme = theme
    let sheet = document.getElementById("site-theme-colors")
    if (!sheet) {
        sheet = document.createElement("style")
        sheet.id = "site-theme-colors"
        document.head.appendChild(sheet)
    }
    sheet.textContent =
        "html body, html body * {" +
        Object.entries(themes[theme])
            .map(([k, v]) => k + ":" + v + " !important;")
            .join("") +
        "} html {color-scheme:" +
        theme +
        ";}"
    try {
        localStorage.setItem("site-theme", theme)
    } catch {}
    window.dispatchEvent(
        new CustomEvent("site-theme-change", { detail: theme })
    )
}
/** @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed */
export default function ThemeSwitch({ style }: Props) {
    const [theme, setTheme] = React.useState<"light" | "dark">(() => {
        if (RenderTarget.current() === RenderTarget.canvas) return "light"
        let stored: string | null = null
        try {
            stored = localStorage.getItem("site-theme")
        } catch {}
        return stored === "dark" ? "dark" : "light"
    })
    React.useEffect(() => {
        if (RenderTarget.current() === RenderTarget.canvas) return
        applyTheme(theme)
        const handler = (e: Event) => setTheme((e as CustomEvent).detail)
        window.addEventListener("site-theme-change", handler)
        return () => window.removeEventListener("site-theme-change", handler)
    }, [theme])
    const dark = theme === "dark"
    return (
        <button
            type="button"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => {
                const next = dark ? "light" : "dark"
                setTheme(next)
                applyTheme(next)
            }}
            style={{
                ...style,
                width: 74,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 4,
                border: "1px solid " + "#808080",
                borderRadius: 30,
                background: dark ? "#141414" : "#fafafa",
                color: dark ? "#fafafa" : "#141414",
                cursor: "pointer",
            }}
        >
            <span
                style={{
                    display: "grid",
                    placeItems: "center",
                    width: 28,
                    height: 26,
                    borderRadius: 20,
                    background: !dark ? "rgba(128,128,128,0.2)" : "transparent",
                }}
            >
                <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
                </svg>
            </span>
            <span
                style={{
                    display: "grid",
                    placeItems: "center",
                    width: 28,
                    height: 26,
                    borderRadius: 20,
                    background: dark ? "rgba(128,128,128,0.35)" : "transparent",
                }}
            >
                <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />
                </svg>
            </span>
        </button>
    )
}
