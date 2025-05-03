"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Download, Check } from 'lucide-react'
import { motion } from "framer-motion"

interface SignaturePadProps {
  onSave: (signatureData: string) => void
  initialSignature?: string
  readOnly?: boolean
}

export function SignaturePad({ onSave, initialSignature, readOnly = false }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  // Initialize canvas and load initial signature if provided
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set line style
    context.lineWidth = 2
    context.lineCap = "round"
    context.lineJoin = "round"
    context.strokeStyle = "#0f172a"

    setCtx(context)

    // Load initial signature if provided
    if (initialSignature) {
      const img = new Image()
      img.onload = () => {
        context.drawImage(img, 0, 0)
        setHasSignature(true)
      }
      img.src = initialSignature
      img.crossOrigin = "anonymous"
    }

    // Handle window resize
    const handleResize = () => {
      if (!canvas || !context) return
      
      // Save current drawing
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tempCtx = tempCanvas.getContext("2d")
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0)
      }
      
      // Resize canvas
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      // Restore drawing
      context.lineWidth = 2
      context.lineCap = "round"
      context.lineJoin = "round"
      context.strokeStyle = "#0f172a"
      context.drawImage(tempCanvas, 0, 0)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [initialSignature])

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (readOnly) return
    
    setIsDrawing(true)
    if (!ctx) return
    
    ctx.beginPath()
    
    // Get coordinates
    const canvas = canvasRef.current
    if (!canvas) return
    
    let clientX, clientY
    
    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }
    
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || readOnly || !ctx) return
    
    // Get coordinates
    const canvas = canvasRef.current
    if (!canvas) return
    
    let clientX, clientY
    
    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }
    
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    
    ctx.lineTo(x, y)
    ctx.stroke()
    setHasSignature(true)
  }

  const endDrawing = () => {
    if (readOnly) return
    setIsDrawing(false)
    if (!ctx) return
    ctx.closePath()
  }

  // Clear signature
  const clearSignature = () => {
    if (readOnly || !ctx) return
    const canvas = canvasRef.current
    if (!canvas) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  // Save signature
  const saveSignature = () => {
    if (!canvasRef.current) return
    const signatureData = canvasRef.current.toDataURL("image/png")
    onSave(signatureData)
  }

  // Download signature
  const downloadSignature = () => {
    if (!canvasRef.current) return
    const signatureData = canvasRef.current.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "signature.png"
    link.href = signatureData
    link.click()
  }

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700">
        <CardContent className="p-0">
          <canvas
            ref={canvasRef}
            className="w-full h-40 bg-white dark:bg-gray-900 cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
          />
        </CardContent>
      </Card>
      
      {!readOnly && (
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearSignature}
            disabled={!hasSignature}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
          
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadSignature}
              disabled={!hasSignature}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            
            <Button 
              size="sm" 
              onClick={saveSignature}
              disabled={!hasSignature}
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
            >
              <Check className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
