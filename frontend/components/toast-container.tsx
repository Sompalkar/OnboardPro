"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toast, ToastTitle, ToastDescription } from "@/components/ui/toast"

export function ToastContainer() {
  const { toasts } = useToast()
  const [visibleToasts, setVisibleToasts] = useState<typeof toasts>([])

  useEffect(() => {
    setVisibleToasts(toasts)
  }, [toasts])

  const removeToast = (index: number) => {
    setVisibleToasts((prev) => prev.filter((_, i) => i !== index))
  }

  if (visibleToasts.length === 0) return null

  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md w-full">
      {visibleToasts.map((toast, index) => (
        <Toast key={index} variant={toast.variant} onClose={() => removeToast(index)}>
          <ToastTitle>{toast.title}</ToastTitle>
          {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
        </Toast>
      ))}
    </div>
  )
}
