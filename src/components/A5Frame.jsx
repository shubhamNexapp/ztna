import React, { useEffect, useState, useRef } from 'react'

// A5Frame wraps its children inside a container sized to A5 dimensions (in mm).
// It scales down to fit the viewport while keeping aspect ratio.
export default function A5Frame({ children, landscape = true }) {
  const wrapperRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    function mmToPx(mm) {
      // CSS defines 1in = 96px and 1in = 25.4mm
      return (mm * 96) / 25.4
    }

    function update() {
      const widthMm = landscape ? 210 : 148
      const heightMm = landscape ? 148 : 210
      const widthPx = mmToPx(widthMm)
      const heightPx = mmToPx(heightMm)

      const margin = 40 // allow some margin
      const maxW = window.innerWidth - margin
      const maxH = window.innerHeight - margin

      const s = Math.min(1, maxW / widthPx, maxH / heightPx)
      setScale(s)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [landscape])

  // width/height in mm for styling (use CSS mm units too for printing consistency)
  const widthMm = landscape ? 210 : 148
  const heightMm = landscape ? 148 : 210

  return (
    <div className="a5-viewport" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <div
        ref={wrapperRef}
        className="a5-frame"
        style={{
          width: `${widthMm}mm`,
          height: `${heightMm}mm`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="a5-surface">{children}</div>
      </div>
    </div>
  )
}
