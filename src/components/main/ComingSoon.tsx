// ComingSoon.tsx
import { useRef, useEffect, useState } from "react"

const ComingSoon = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768)
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
    }[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return 0
      ctx.fillStyle = "#121727"
      ctx.save()
      const fontSize = isMobile ? 48 : 150
      ctx.font = `bold ${fontSize}px Arial, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("COMING SOON", canvas.width / 2, canvas.height / 2)
      ctx.restore()
      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return 1
    }

    function createParticle() {
      if (!ctx || !canvas || !textImageData) return null
      const data = textImageData.data
      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)
        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: "#121727",
            scatteredColor: "#121727",
            life: Math.random() * 100 + 50,
          }
        }
      }
      return null
    }

    function createInitialParticles() {
      const baseParticleCount = 7000
      const particleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvas!.width * canvas!.height) / (1920 * 1080))
      )
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle()
        if (particle) particles.push(particle)
      }
    }

    let animationFrameId: number
    function animate(scale: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#f1eee7"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = isMobile ? 80 : 120

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * 60
          const moveY = Math.sin(angle) * force * 60
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY
          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.1
          p.y += (p.baseY - p.y) * 0.1
          ctx.fillStyle = "#121727"
        }
        ctx.fillRect(p.x, p.y, p.size, p.size)
        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle()
          if (newParticle) particles[i] = newParticle
          else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      const baseParticleCount = isMobile ? 2000 : 8000
      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
      )
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle()
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(() => animate(scale))
    }

    const scale = createTextImage()
    createInitialParticles()
    animate(scale)

    const handleResize = () => {
      updateCanvasSize()
      particles = []
      createInitialParticles()
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      handleMove(e.clientX - rect.left, e.clientY - rect.top)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvasRef.current) return
      if (e.touches.length > 0) {
        e.preventDefault()
        const rect = canvasRef.current.getBoundingClientRect()
        handleMove(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }
    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }
    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) mousePositionRef.current = { x: 0, y: 0 }
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      className="fixed -top-60 md:-top-40 lg:-top-25 left-0 w-full h-full z-0 touch-none"

      aria-label="Interactive particle effect with Coming Soon text"
    />
  )
}

export default ComingSoon
