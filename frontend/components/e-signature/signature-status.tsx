import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SignatureStatusProps {
  status: 'pending' | 'signed' | 'expired' | 'declined'
  date?: string
}

export function SignatureStatus({ status, date }: SignatureStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'signed':
        return {
          label: "Signed",
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
          icon: <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
        }
      case 'pending':
        return {
          label: "Pending",
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
          icon: <Clock className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
        }
      case 'expired':
        return {
          label: "Expired",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
          icon: <AlertCircle className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
        }
      case 'declined':
        return {
          label: "Declined",
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
          icon: <XCircle className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
        }
      default:
        return {
          label: "Unknown",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
          icon: <AlertCircle className="h-3.5 w-3.5" />
        }
    }
  }

  const { label, color, icon } = getStatusConfig()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`${color} flex items-center gap-1 px-2 py-0.5`}>
            {icon}
            <span>{label}</span>
          </Badge>
        </TooltipTrigger>
        {date && (
          <TooltipContent>
            <p>{status === 'pending' ? 'Sent on' : `${label} on`}: {date}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}
