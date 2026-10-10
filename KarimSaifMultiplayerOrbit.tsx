/**

 * Made with 💛 by Karim Saif

 * @framerIntrinsicWidth 1100

 * @framerIntrinsicHeight 650

 * @framerSupportedLayoutWidth any

 * @framerSupportedLayoutHeight any

 */



"use client"



import * as React from "react"

import {

    addPropertyControls,

    ControlType,

    useIsStaticRenderer,

    useReducedMotion,

} from "framer"



type Props = {

    background: string

    ringColor: string

    showRing: boolean

    ringSize: number

    sphereSize: number

    labelScale: number

    speed: number

    phrasedMotion: boolean

    blur: number

    attention: boolean

    magnetic: boolean

    showYou: boolean

    youName: string

    youColor: string

    wash: boolean

    names: string

    maxDpr: number

    style?: React.CSSProperties

}



type Node = {

    name: string

    color: string

    bx: number

    by: number

    bz: number

    x: number

    y: number

    z: number

    ox: number

    oy: number

    vx: number

    vy: number

    attention: number

    textWidth: number

}



const CAST: [string, string][] = [

    ["Finn", "#7728DB"],

    ["Taya", "#7728DB"],

    ["Cole", "#7728DB"],

    ["Aria", "#9C45F2"],

    ["Quin", "#9C45F2"],

    ["Yael", "#C864DB"],

    ["Wynn", "#F37C31"],

    ["Dara", "#F37C31"],

    ["Nola", "#F37C31"],

    ["Rex", "#F37C31"],

    ["Xena", "#F34B4B"],

    ["Ulan", "#F34B4B"],

    ["Zane", "#F34B4B"],

    ["Pia", "#F34B4B"],

    ["Milo", "#31C67D"],

    ["Cade", "#31C67D"],

    ["Vera", "#31C67D"],

    ["Hana", "#31C67D"],

    ["Elmo", "#31C67D"],

    ["Sora", "#5677F2"],

    ["Seth", "#5677F2"],

    ["Gage", "#5677F2"],

    ["Abel", "#5677F2"],

    ["Jett", "#1FC4C9"],

    ["Beau", "#1FC4C9"],

    ["Hope", "#1FC4C9"],

]



const DEFAULTS: Props = {

    background: "#FDFDFD",

    ringColor: "#6B3EB5",

    showRing: true,

    ringSize: 1,

    sphereSize: 1,

    labelScale: 1,

    speed: 1,

    phrasedMotion: true,

    blur: 1,

    attention: true,

    magnetic: true,

    showYou: true,

    youName: "You",

    youColor: "#1B1B1B",

    wash: true,

    names: "",

    maxDpr: 2,

}



const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))



const mix = (a: number, b: number, t: number) => a + (b - a) * t



const smooth = (v: number) => {

    const t = clamp(v, 0, 1)

    return t * t * (3 - 2 * t)

}



function getCast(names: string): [string, string][] {

    const entries = names

        .split(",")

        .map((n) => n.trim())

        .filter(Boolean)

        .slice(0, 60)



    return entries.length

        ? entries.map((n, i) => [n, CAST[i % CAST.length][1]])

        : CAST

}



function spinPhrase(t: number) {

    const p = (((t / 27) % 1) + 1) % 1

    if (p < 0.58) return 0.03

    if (p < 0.68) return mix(0.03, 0.45, smooth((p - 0.58) / 0.1))

    if (p < 0.75) return 0.45

    if (p < 0.88) return mix(0.45, 0.012, smooth((p - 0.75) / 0.13))

    return mix(0.012, 0.03, smooth((p - 0.88) / 0.12))

}



function makeNodes(

    cast: [string, string][],

    ctx: CanvasRenderingContext2D

): Node[] {

    const golden = Math.PI * (3 - Math.sqrt(5))

    ctx.font = "600 100px sans-serif"



    return cast.map(([name, color], i) => {

        const y = 1 - (2 * (i + 0.5)) / cast.length

        const r = Math.sqrt(Math.max(0, 1 - y * y))

        const a = golden * i



        return {

            name,

            color,

            bx: Math.cos(a) * r,

            by: y,

            bz: Math.sin(a) * r,

            x: 0,

            y: 0,

            z: 0,

            ox: 0,

            oy: 0,

            vx: 0,

            vy: 0,

            attention: 0,

            textWidth: ctx.measureText(name).width,

        }

    })

}



function StaticOrbit({ p }: { p: Props }) {

    const nodes = React.useMemo(() => {

        const cast = getCast(p.names)

        const golden = Math.PI * (3 - Math.sqrt(5))



        return cast

            .map(([name, color], i) => {

                const y = 1 - (2 * (i + 0.5)) / cast.length

                const r = Math.sqrt(Math.max(0, 1 - y * y))

                const a = golden * i

                const x = Math.cos(a) * r

                const z = Math.sin(a) * r



                return {

                    name,

                    color,

                    x,

                    y: y * Math.cos(0.5) - z * Math.sin(0.5),

                    z: y * Math.sin(0.5) + z * Math.cos(0.5),

                }

            })

            .sort((a, b) => a.z - b.z)

    }, [p.names])



    return (

        <svg

            viewBox="0 0 1100 650"

            preserveAspectRatio="xMidYMid meet"

            role="img"

            aria-label="Multiplayer cursor orbit"

            style={{

                width: "100%",

                height: "100%",

                display: "block",

                background: p.background,

                ...p.style,

            }}

        >

            <rect width="1100" height="650" fill={p.background} />

            {p.showRing && (

                <circle

                    cx="550"

                    cy="325"

                    r={162 * p.ringSize}

                    fill="none"

                    stroke={p.ringColor}

                    strokeWidth="2.4"

                />

            )}

            {nodes.map((node, i) => {

                const opacity = smooth((node.z + 0.85) / 0.75)

                if (opacity < 0.02) return null



                const size = (13 + (node.z + 1) * 12) * p.labelScale

                const x = 514 + node.x * 235 * p.sphereSize

                const y = 302 + node.y * 235 * p.sphereSize

                const w = node.name.length * size * 0.3 + size



                return (

                    <g

                        key={i}

                        opacity={opacity}

                        transform={`translate(${x} ${y})`}

                    >

                        <path

                            d="M0 0 L0 21 L6 15 L12 15 Z"

                            fill={node.color}

                            transform={`scale(${size / 23}) rotate(-18)`}

                        />

                        <rect

                            x={size * 0.55}

                            y={size * 0.55}

                            width={w}

                            height={size}

                            rx={size * 0.32}

                            fill={node.color}

                        />

                        <text

                            x={size * 0.55 + w / 2}

                            y={size * 1.08}

                            fontFamily="sans-serif"

                            fontWeight="600"

                            fontSize={size * 0.47}

                            fill="#FFFFFF"
                            textAnchor="middle"

                            dominantBaseline="middle"

                        >

                            {node.name}

                        </text>

                    </g>

                )

            })}

        </svg>

    )

}



class OrbitEngine {

    canvas: HTMLCanvasElement

    ctx: CanvasRenderingContext2D

    props: Props

    nodes: Node[] = []

    arrow: Path2D



    width = 0

    height = 0

    dpr = 1

    running = false

    disposed = false

    raf = 0

    last = 0

    time = 0

    accumulator = 0



    angle = 0

    spinVelocity = 0

    throwVelocity = 0

    tilt = 0

    dragging = false

    dragX = 0

    dragY = 0

    dragVelocity = 0



    pointerX = 0.5

    pointerY = 0.5

    targetX = 0.5

    targetY = 0.5

    pointerVX = 0

    pointerVY = 0

    pointerAlpha = 0

    pointerTargetAlpha = 0

    pointerSeen = false

    youWidth = 0



    constructor(

        canvas: HTMLCanvasElement,

        ctx: CanvasRenderingContext2D,

        props: Props

    ) {

        this.canvas = canvas

        this.ctx = ctx

        this.props = props

        this.arrow = new Path2D(

            "M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L5.94 2.47a.5.5 0 0 0-.44.74Z"

        )

        this.rebuild()

        this.resize()

    }



    rebuild() {

        this.nodes = makeNodes(getCast(this.props.names), this.ctx)

        this.measureYou()

    }



    measureYou() {

        this.ctx.font = "600 100px sans-serif"

        this.youWidth = this.ctx.measureText(this.props.youName || "You").width

    }



    update(next: Props) {

        const namesChanged = next.names !== this.props.names

        const dprChanged = next.maxDpr !== this.props.maxDpr

        const labelChanged = next.youName !== this.props.youName

        this.props = next



        if (namesChanged) this.rebuild()

        else if (labelChanged) this.measureYou()



        if (dprChanged) this.resize()

        else if (!this.running) this.still()

    }



    scale() {

        return Math.max(1, Math.min(this.height, this.width / 1.65))

    }



    resize() {

        if (this.disposed) return



        const rect = this.canvas.getBoundingClientRect()

        if (rect.width <= 0 || rect.height <= 0) return



        this.width = rect.width

        this.height = rect.height



        const desired = Math.min(

            window.devicePixelRatio || 1,

            clamp(this.props.maxDpr, 1, 2)

        )

        const budget = Math.sqrt(

            2200000 / Math.max(1, this.width * this.height)

        )

        this.dpr = Math.max(

            0.25,

            Math.min(desired, budget, 4096 / this.width, 4096 / this.height)

        )



        const w = Math.max(1, Math.round(this.width * this.dpr))

        const h = Math.max(1, Math.round(this.height * this.dpr))



        if (this.canvas.width !== w || this.canvas.height !== h) {

            this.canvas.width = w

            this.canvas.height = h

        }



        if (!this.running) this.still()

    }



    pointer(x: number, y: number) {

        if (!this.pointerSeen) {

            this.pointerX = x

            this.pointerY = y

            this.pointerSeen = true

        }



        this.targetX = x

        this.targetY = y



        const dx = Math.max(0, -x, x - 1) * this.width

        const dy = Math.max(0, -y, y - 1) * this.height

        this.pointerTargetAlpha =

            1 - smooth(Math.hypot(dx, dy) / (this.scale() * 1.15))

    }



    leave() {

        this.pointerTargetAlpha = 0

        this.pointerSeen = false

    }



    startDrag(x: number, y: number) {

        this.dragging = true

        this.dragX = x

        this.dragY = y

        this.dragVelocity = 0

    }



    moveDrag(x: number, y: number, dt: number) {

        if (!this.dragging) return



        const dx = x - this.dragX

        const dy = y - this.dragY

        this.dragX = x

        this.dragY = y



        const v = clamp(dx / Math.max(dt, 1 / 240), -1.6, 1.6)

        this.dragVelocity = mix(this.dragVelocity, v, 0.35)

        this.tilt = clamp(this.tilt + dy * 0.5, -0.3, 0.3)

    }



    endDrag() {

        if (!this.dragging) return

        this.dragging = false

        this.throwVelocity = this.dragVelocity

        this.dragVelocity = 0

    }



    start() {

        if (this.running || this.disposed) return

        this.running = true

        this.last = performance.now()

        this.accumulator = 0

        this.raf = requestAnimationFrame(this.frame)

    }



    stop() {

        this.running = false

        cancelAnimationFrame(this.raf)

        this.raf = 0

    }



    destroy() {

        this.stop()

        this.disposed = true

        this.nodes = []

    }



    still() {

        if (this.disposed || !this.width || !this.height) return

        this.project(2.6, 0)

        this.draw(2.6)

    }



    frame = (now: number) => {

        if (!this.running || this.disposed) return



        const dt = Math.min(0.25, Math.max(0, (now - this.last) / 1000))

        this.last = now

        this.accumulator = Math.min(0.25, this.accumulator + dt)



        const fixed = 1 / 60

        let steps = 0



        while (this.accumulator >= fixed && steps < 8) {

            this.time += fixed

            this.motion(fixed)

            this.project(this.time, fixed)

            this.accumulator -= fixed

            steps++

        }



        if (steps === 8) this.accumulator = 0



        this.draw(this.time)

        this.raf = requestAnimationFrame(this.frame)

    }



    motion(dt: number) {

        const oldX = this.pointerX

        const oldY = this.pointerY

        const chase = 1 - Math.exp(-13.2 * dt)



        this.pointerX = mix(this.pointerX, this.targetX, chase)

        this.pointerY = mix(this.pointerY, this.targetY, chase)



        this.pointerVX =

            ((this.pointerX - oldX) * this.width) / this.scale() / dt

        this.pointerVY =

            ((this.pointerY - oldY) * this.height) / this.scale() / dt



        this.pointerAlpha = mix(

            this.pointerAlpha,

            this.pointerTargetAlpha,

            1 - Math.exp(-6.6 * dt)

        )



        const target =

            (this.props.phrasedMotion ? spinPhrase(this.time) : 0.1) *

            this.props.speed



        if (this.dragging) {

            this.spinVelocity = this.dragVelocity

        } else {

            this.throwVelocity *= Math.exp(-1.25 * dt)

            this.spinVelocity = mix(

                this.spinVelocity,
                target + this.throwVelocity,

                1 - Math.exp(-7.5 * dt)

            )

            this.tilt *= Math.exp(-0.6 * dt)

        }



        this.angle =

            (this.angle + this.spinVelocity * Math.PI * 2 * dt) % (Math.PI * 2)

    }



    project(t: number, dt: number) {

        const tiltX = 0.5 + 0.45 * Math.sin((t * Math.PI * 2) / 17) + this.tilt

        const tiltZ = 0.6 * Math.sin((t * Math.PI * 2) / 23)



        const sx = Math.sin(tiltX)

        const cx = Math.cos(tiltX)

        const sz = Math.sin(tiltZ)

        const cz = Math.cos(tiltZ)

        const sy = Math.sin(this.angle)

        const cy = Math.cos(this.angle)



        const S = this.scale()

        const radius = S * 0.361 * this.props.sphereSize

        const centerX = this.width / 2 - S * 0.055

        const centerY = this.height / 2 - S * 0.036

        const px = this.pointerX * this.width

        const py = this.pointerY * this.height

        const speed = Math.hypot(this.pointerVX, this.pointerVY)



        for (const n of this.nodes) {

            const x1 = n.bx * cy + n.bz * sy

            const z1 = -n.bx * sy + n.bz * cy

            const y2 = n.by * cx - z1 * sx

            const z2 = n.by * sx + z1 * cx



            n.x = x1 * cz - y2 * sz

            n.y = x1 * sz + y2 * cz

            n.z = z2



            if (dt <= 0) {

                n.ox = n.oy = n.vx = n.vy = n.attention = 0

                continue

            }



            const dx = (centerX + n.x * radius + n.ox * S - px) / S

            const dy = (centerY + n.y * radius + n.oy * S - py) / S

            const dist = Math.hypot(dx, dy)



            const focus = this.props.attention

                ? this.pointerAlpha * (1 - smooth(dist / 0.26))

                : 0



            n.attention = mix(n.attention, focus, 1 - Math.exp(-5 * dt))



            let ax = -46 * n.ox - 7.4 * n.vx

            let ay = -46 * n.oy - 7.4 * n.vy



            if (

                this.props.magnetic &&

                dist < 0.19 &&

                this.pointerAlpha > 0.01

            ) {

                const falloff = Math.pow(1 - smooth(dist / 0.19), 2)

                const gain = 1 + 2.6 * clamp(speed / 0.85, 0, 1)

                const force = 5.2 * falloff * gain * this.pointerAlpha

                const len = Math.max(dist, 0.001)

                const wake = 0.55 * clamp(speed / 0.85, 0, 1)

                const dirX = speed > 0.001 ? this.pointerVX / speed : 0

                const dirY = speed > 0.001 ? this.pointerVY / speed : 0

                const mass = 1 + (0.7 * (n.z + 1)) / 2



                ax += (mix(dx / len, dirX, wake) * force) / mass

                ay += (mix(dy / len, dirY, wake) * force) / mass

            }



            n.vx += ax * dt

            n.vy += ay * dt

            n.ox += n.vx * dt

            n.oy += n.vy * dt



            const offset = Math.hypot(n.ox, n.oy)

            if (offset > 0.075) {

                const k = 0.075 / offset

                n.ox *= k

                n.oy *= k

                n.vx *= 0.65

                n.vy *= 0.65

            }

        }

    }



    drawCursor(

        x: number,

        y: number,

        h: number,

        color: string,

        name: string,

        measured: number,

        turn = 0

    ) {

        const ctx = this.ctx

        const font = h * 0.47

        const w = (measured * font) / 100 + h * 0.84

        const bx = x + h * 0.55

        const by = y + h * 0.55



        ctx.save()

        ctx.shadowColor = "rgba(0,0,0,0.13)"

        ctx.shadowBlur = h * 0.28

        ctx.shadowOffsetY = h * 0.1

        ctx.fillStyle = color



        ctx.save()

        ctx.translate(x, y)

        ctx.rotate(-0.31 + turn)

        const s = (h * 0.68) / 24

        ctx.scale(s, s)

        ctx.translate(-5.5, -3.21)

        ctx.fill(this.arrow)

        ctx.restore()



        ctx.beginPath()

        ctx.roundRect(bx, by, w, h, h * 0.32)

        ctx.fill()

        ctx.restore()



        ctx.save()

        ctx.beginPath()

        ctx.roundRect(bx, by, w, h, h * 0.32)

        ctx.clip()



        const shine = ctx.createLinearGradient(0, by, 0, by + h)

        shine.addColorStop(0, "rgba(255,255,255,0.15)")

        shine.addColorStop(0.45, "rgba(255,255,255,0)")

        shine.addColorStop(1, "rgba(0,0,0,0.09)")



        ctx.fillStyle = shine

        ctx.fillRect(bx, by, w, h)

        ctx.restore()



        ctx.fillStyle = "#FFFFFF"

        ctx.font = `600 ${font}px sans-serif`

        ctx.textAlign = "center"

        ctx.textBaseline = "middle"

        ctx.fillText(name, bx + w / 2, by + h * 0.54)

    }



    draw(t: number) {

        if (!this.width || !this.height) return



        const ctx = this.ctx

        const W = this.width

        const H = this.height

        const S = this.scale()

        const cx = W / 2

        const cy = H / 2



        ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

        ctx.globalAlpha = 1

        ctx.filter = "none"

        ctx.fillStyle = this.props.background

        ctx.fillRect(0, 0, W, H)



        if (this.props.wash) {

            const washes = [

                ["rgba(119,40,219,0.055)", 29, 0],

                ["rgba(31,196,201,0.055)", 41, 2.1],

            ] as const



            for (const [color, period, phase] of washes) {

                const a = (t / period) * Math.PI * 2 + phase

                const x = cx + Math.cos(a) * S * 0.26

                const y = cy + Math.sin(a * 1.37) * S * 0.18

                const g = ctx.createRadialGradient(x, y, 0, x, y, S * 0.62)

                g.addColorStop(0, color)

                g.addColorStop(1, "rgba(255,255,255,0)")

                ctx.fillStyle = g

                ctx.fillRect(0, 0, W, H)

            }

        }



        if (this.props.showRing) {

            const breath = 0.5 - 0.5 * Math.cos((t / 5) * Math.PI * 2)

            const radius = mix(0.2315, 0.2685, breath) * S * this.props.ringSize



            ctx.beginPath()

            ctx.arc(cx, cy, radius, 0, Math.PI * 2)

            ctx.strokeStyle = this.props.ringColor

            ctx.lineWidth = Math.max(1.25, S * 0.0037)

            ctx.stroke()

        }



        const radius = S * 0.361 * this.props.sphereSize

        const centerX = cx - S * 0.055

        const centerY = cy - S * 0.036



        const ordered = [...this.nodes].sort((a, b) => a.z - b.z)



        let lastFilter = "none"



        for (const n of ordered) {

            const depthAlpha = smooth((n.z + 0.85) / 0.75)

            const alpha = depthAlpha + (1 - depthAlpha) * n.attention * 0.8



            if (alpha < 0.02) continue



            const depth = (n.z + 1) * 0.5

            const h =

                mix(0.0204, 0.0574, depth) *

                S *

                this.props.labelScale *

                (1 + n.attention * 0.14)



            const x = centerX + n.x * radius + n.ox * S

            const y = centerY + n.y * radius + n.oy * S



            const defocus = Math.max(0, Math.abs(n.z - 1) - 0.45)

            const blur =

                Math.round(

                    this.props.blur *

                        defocus *

                        0.00387 *

                        S *

                        (1 - n.attention * 0.85) *

                        4

                ) / 4



            const filter = blur >= 0.25 ? `blur(${blur}px)` : "none"



            if (filter !== lastFilter) {

                ctx.filter = filter

                lastFilter = filter

            }



            ctx.globalAlpha = alpha



            let turn = 0

            if (n.attention > 0.01) {

                const a = Math.atan2(

                    this.pointerY * H - y,

                    this.pointerX * W - x

                )

                turn = clamp(a + 0.31, -Math.PI, Math.PI) * 0.15 * n.attention

            }



            this.drawCursor(x, y, h, n.color, n.name, n.textWidth, turn)

        }



        ctx.filter = "none"

        ctx.globalAlpha = 1


        if (

            this.props.showYou &&

            this.pointerAlpha > 0.01 &&

            this.pointerX >= 0 &&

            this.pointerX <= 1 &&

            this.pointerY >= 0 &&

            this.pointerY <= 1

        ) {

            ctx.globalAlpha = this.pointerAlpha

            this.drawCursor(

                this.pointerX * W,

                this.pointerY * H,

                S * 0.064 * this.props.labelScale,

                this.props.youColor,

                this.props.youName || "You",

                this.youWidth

            )

            ctx.globalAlpha = 1

        }

    }

}



export default function KarimSaifMultiplayerOrbit(incoming: Partial<Props>) {

    const p: Props = { ...DEFAULTS, ...incoming }

    const isStatic = useIsStaticRenderer()

    const reduced = useReducedMotion()

    const still = Boolean(isStatic || reduced)



    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    const engineRef = React.useRef<OrbitEngine | null>(null)

    const propsRef = React.useRef(p)

    const [canvasUnavailable, setCanvasUnavailable] = React.useState(false)

    const [cursorReady, setCursorReady] = React.useState(false)



    propsRef.current = p



    React.useEffect(() => {

        if (isStatic) return



        const canvas = canvasRef.current

        if (!canvas) return



        const ctx = canvas.getContext("2d")

        if (!ctx) {

            setCanvasUnavailable(true)

            return

        }



        const engine = new OrbitEngine(canvas, ctx, propsRef.current)

        engineRef.current = engine



        let visible = true

        let hasMouse = false

        let mouseX = 0

        let mouseY = 0

        let activeId: number | null = null

        let claimed = false

        let pending = false

        let startX = 0

        let startY = 0

        let lastDrag = 0



        const sync = () => {

            if (still || document.hidden || !visible) {

                engine.stop()

            } else {

                engine.start()

            }

        }



        const pushMouse = () => {

            if (!hasMouse || !visible || still) return



            const r = canvas.getBoundingClientRect()

            if (!r.width || !r.height) return



            const x = (mouseX - r.left) / r.width

            const y = (mouseY - r.top) / r.height

            engine.pointer(x, y)



            const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1



            setCursorReady((prev) => (prev === inside ? prev : inside))

        }



        const resize = () => {

            engine.resize()

            pushMouse()

        }



        const io =

            typeof IntersectionObserver !== "undefined"

                ? new IntersectionObserver(

                      (entries) => {

                          visible = entries[0]?.isIntersecting ?? false

                          if (!visible) setCursorReady(false)

                          sync()

                      },

                      { threshold: 0.01 }

                  )

                : null



        io?.observe(canvas)



        const ro =

            typeof ResizeObserver !== "undefined"

                ? new ResizeObserver(resize)

                : null



        ro?.observe(canvas)



        const onVisibility = () => {

            if (document.hidden) {

                engine.leave()

                setCursorReady(false)

            }

            sync()

        }



        const onMouse = (e: PointerEvent) => {

            if (e.pointerType !== "mouse") return

            mouseX = e.clientX

            mouseY = e.clientY

            hasMouse = true

            pushMouse()

        }



        const resetDrag = () => {

            engine.endDrag()

            activeId = null

            claimed = false

            pending = false

        }



        const onBlur = () => {

            hasMouse = false

            engine.leave()

            setCursorReady(false)

            resetDrag()

        }



        const point = (e: PointerEvent) => {

            const r = canvas.getBoundingClientRect()

            return {

                x: (e.clientX - r.left) / Math.max(1, r.width),

                y: (e.clientY - r.top) / Math.max(1, r.height),

            }

        }



        const onDown = (e: PointerEvent) => {

            if (still || activeId !== null) return



            const pt = point(e)

            activeId = e.pointerId

            startX = pt.x

            startY = pt.y

            lastDrag = performance.now()

            claimed = e.pointerType === "mouse"

            pending = !claimed



            if (claimed) {

                try {

                    canvas.setPointerCapture(e.pointerId)

                } catch {}

                engine.startDrag(pt.x, pt.y)

            }

        }



        const onMove = (e: PointerEvent) => {

            const pt = point(e)



            if (e.pointerType !== "mouse" && !still) {

                engine.pointer(pt.x, pt.y)

            }



            if (still || activeId !== e.pointerId) return



            if (pending && !claimed) {

                const dx = Math.abs((pt.x - startX) * canvas.clientWidth)

                const dy = Math.abs((pt.y - startY) * canvas.clientHeight)



                if (dx < 9 && dy < 9) return



                if (dx <= dy * 1.15) {

                    resetDrag()

                    return

                }



                claimed = true

                pending = false



                try {

                    canvas.setPointerCapture(e.pointerId)

                } catch {}



                engine.startDrag(startX, startY)

            }



            if (!claimed) return



            const now = performance.now()

            const dt = clamp((now - lastDrag) / 1000, 1 / 240, 0.1)



            engine.moveDrag(pt.x, pt.y, dt)

            lastDrag = now



            if (e.cancelable) e.preventDefault()

        }



        const onUp = (e: PointerEvent) => {

            if (activeId !== e.pointerId) return



            resetDrag()



            try {

                if (canvas.hasPointerCapture(e.pointerId)) {

                    canvas.releasePointerCapture(e.pointerId)

                }

            } catch {}

        }



        const onLostCapture = (e: PointerEvent) => {

            if (activeId === e.pointerId) resetDrag()

        }



        const onLeave = (e: PointerEvent) => {

            if (e.pointerType === "mouse") {

                setCursorReady(false)

            } else {

                engine.leave()

            }

        }



        window.addEventListener("resize", resize)

        window.addEventListener("scroll", pushMouse, {

            passive: true,

        })

        window.addEventListener("pointermove", onMouse, {

            passive: true,

        })

        window.addEventListener("blur", onBlur)



        document.addEventListener("visibilitychange", onVisibility)



        canvas.addEventListener("pointerdown", onDown)

        canvas.addEventListener("pointermove", onMove)

        canvas.addEventListener("pointerup", onUp)

        canvas.addEventListener("pointercancel", onUp)

        canvas.addEventListener("lostpointercapture", onLostCapture)
        canvas.addEventListener("pointerleave", onLeave)



        engine.still()

        sync()



        return () => {

            io?.disconnect()

            ro?.disconnect()



            window.removeEventListener("resize", resize)

            window.removeEventListener("scroll", pushMouse)

            window.removeEventListener("pointermove", onMouse)

            window.removeEventListener("blur", onBlur)



            document.removeEventListener("visibilitychange", onVisibility)



            canvas.removeEventListener("pointerdown", onDown)

            canvas.removeEventListener("pointermove", onMove)

            canvas.removeEventListener("pointerup", onUp)

            canvas.removeEventListener("pointercancel", onUp)

            canvas.removeEventListener("lostpointercapture", onLostCapture)

            canvas.removeEventListener("pointerleave", onLeave)



            engine.destroy()

            engineRef.current = null

        }

    }, [still, isStatic])



    React.useEffect(() => {

        engineRef.current?.update(p)

    }, [

        p.background,

        p.ringColor,

        p.showRing,

        p.ringSize,

        p.sphereSize,

        p.labelScale,

        p.speed,

        p.phrasedMotion,

        p.blur,

        p.attention,

        p.magnetic,

        p.showYou,

        p.youName,

        p.youColor,

        p.wash,

        p.names,

        p.maxDpr,

    ])



    if (isStatic || canvasUnavailable) {

        return <StaticOrbit p={p} />

    }



    return (

        <canvas

            ref={canvasRef}

            role="img"

            aria-label="Interactive multiplayer cursor orbit"

            style={{

                width: "100%",

                height: "100%",

                display: "block",

                background: p.background,

                cursor:

                    still || !p.showYou || !cursorReady ? "default" : "none",

                touchAction: "pan-y",

                ...p.style,

            }}

        />

    )

}



KarimSaifMultiplayerOrbit.defaultProps = DEFAULTS



addPropertyControls(KarimSaifMultiplayerOrbit, {

    background: {

        type: ControlType.Color,

        title: "Background",

        defaultValue: "#FDFDFD",

        description: "Sets the background color behind the orbiting cursors.",

    },

    ringColor: {

        type: ControlType.Color,

        title: "Ring Color",

        defaultValue: "#6B3EB5",

        description: "Changes the color of the breathing circular ring.",

    },

    showRing: {

        type: ControlType.Boolean,

        title: "Show Ring",

        defaultValue: true,

        description: "Shows or hides the animated breathing ring.",

    },

    ringSize: {

        type: ControlType.Number,

        title: "Ring Size",

        min: 0.4,

        max: 2,

        step: 0.05,

        defaultValue: 1,

        description:

            "Controls the radius of the breathing ring independently of the sphere.",

    },

    sphereSize: {

        type: ControlType.Number,

        title: "Sphere Size",

        min: 0.4,

        max: 1.5,

        step: 0.05,

        defaultValue: 1,

        description:

            "Adjusts the radius of the invisible 3D sphere and cursor spacing.",

    },

    labelScale: {

        type: ControlType.Number,

        title: "Cursor Size",

        min: 0.5,

        max: 1.8,

        step: 0.05,

        defaultValue: 1,

        description:

            "Scales orbiting cursor arrows and labels, including the visitor cursor.",

    },

    speed: {

        type: ControlType.Number,

        title: "Spin Speed",

        min: 0,

        max: 3,

        step: 0.05,

        defaultValue: 1,

        description:

            "Controls automatic rotation speed while preserving manual drag interactions.",

    },

    phrasedMotion: {

        type: ControlType.Boolean,

        title: "Phrased Spin",

        defaultValue: true,

        description:

            "Alternates between gentle drifting, faster spinning, and settling.",

    },

    blur: {

        type: ControlType.Number,

        title: "Depth Blur",

        min: 0,

        max: 2,

        step: 0.1,

        defaultValue: 1,

        description:

            "Adjusts depth-of-field blur for cursors farther from the viewer.",

    },

    attention: {

        type: ControlType.Boolean,

        title: "Attention",

        defaultValue: true,

        description:

            "Makes nearby cursors more visible and responsive to the visitor pointer.",

    },

    magnetic: {

        type: ControlType.Boolean,

        title: "Bow Wave",

        defaultValue: true,

        description:

            "Enables spring-based displacement as the visitor moves through the sphere.",

    },

    showYou: {

        type: ControlType.Boolean,

        title: "Show You",

        defaultValue: true,

        description:

            "Shows or hides the visitor's custom cursor and name label.",

    },

    youName: {

        type: ControlType.String,

        title: "Your Label",

        defaultValue: "You",

        description: "Sets the text displayed beside the visitor cursor.",

    },

    youColor: {

        type: ControlType.Color,

        title: "Your Color",

        defaultValue: "#1B1B1B",

        description:

            "Changes the visitor cursor arrow and label background color.",

    },

    wash: {

        type: ControlType.Boolean,

        title: "Color Wash",

        defaultValue: true,

        description:

            "Adds subtle animated violet and cyan lighting behind the orbit.",

    },

    names: {

        type: ControlType.String,

        title: "Names",

        defaultValue: "",

        displayTextArea: true,

        description:

            "Enter up to 60 comma-separated cursor names. Leave empty for the default 26.",

    },

    maxDpr: {

        type: ControlType.Number,

        title: "Pixel Ratio",

        min: 1,

        max: 2,

        step: 0.25,

        defaultValue: 2,

        description: "Made with 💛 by [@karimsaif](https://x.com/karimsaif0)",

    },

})