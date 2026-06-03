import { motion, useAnimation } from "motion/react"
import { useEffect } from "react"

interface LockIconProps {
  isLocked: boolean
  size?: number
  color?: string
}

export function LockIcon({ isLocked, size = 80, color = "currentColor" }: LockIconProps) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      rotate: isLocked ? 0 : -35,
      transition: { duration: 0.5, ease: "easeInOut" },
    })
  }, [isLocked, controls])

  return (
    <div
      style={{ background: "none", border: "none", padding: 0 }}
      aria-label={isLocked ? "Desbloquear" : "Bloquear"}
    >
      <svg viewBox="0 0 100 120" width={size} height={size * 1.2} color={color}>

        <rect
          x={15} y={50} width={70} height={55} rx={8}
          fill="currentColor" opacity={0.08}
          stroke="currentColor" strokeWidth={2}
        />

        <motion.g
          animate={controls}
          style={{ originX: "0px", originY: "52px" }}
        >
          <path
            d="M 32,52 L 32,32 A 18,18 0 1 1 68,32 L 68,52"
            fill="none"
            stroke="currentColor"
            strokeWidth={6}
            strokeLinecap="round"
          />
        </motion.g>

        <circle
          cx={50} cy={72} r={8}
          fill="currentColor" opacity={0.12}
          stroke="currentColor" strokeWidth={2}
        />
        <rect x={47} y={72} width={6} height={12} rx={3} fill="currentColor" />

      </svg>
    </div>
  )
}