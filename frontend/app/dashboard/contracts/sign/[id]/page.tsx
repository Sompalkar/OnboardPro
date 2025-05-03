"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SignaturePad } from "@/components/e-signature/signature-pad"
import { useToast } from "@/hooks/use-toast"
import { getContract, signContract } from "@/lib/api/contracts"
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { motion } from "framer-motion"

export default function SignContractPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [contract, setContract] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [signing, setSigning] = useState(false)
  const [signature, setSignature] = useState<string | null>(null)
  const [signatureComplete, setSignatureComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const contractId = params.id as string

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const data = await getContract(contractId)
        setContract(data)
      } catch (err) {
        console.error("Error fetching contract:", err)
        setError("This contract is not available or has expired.")
      } finally {
        setLoading(false)
      }
    }

    fetchContract()
  }, [contractId])

  const handleSignatureChange = (signatureData: string) => {
    setSignature(signatureData)
  }

  const handleSign = async () => {
    if (!signature) {
      toast({
        title: "Signature required",
        description: "Please draw your signature before signing the document.",
        variant: "destructive",
      })
      return
    }

    setSigning(true)

    try {
      await signContract(contractId, signature)
      setSignatureComplete(true)
      toast({
        title: "Document signed successfully",
        description: "Thank you for signing the document.",
      })
    } catch (err) {
      console.error("Error signing contract:", err)
      toast({
        title: "Failed to sign document",
        description: "There was an error signing the document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSigning(false)
    }
  }

  const handleDecline = () => {
    // Implement decline functionality
    router.push(`/dashboard/contracts/decline/${contractId}`)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <p className="text-lg text-muted-foreground">Loading document...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <XCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Document Unavailable</h2>
        <p className="text-lg text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => router.push("/")}>Return to Home</Button>
      </div>
    )
  }

  if (signatureComplete) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[60vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Document Signed!</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Thank you for signing the document. A copy has been emailed to you for your records.
        </p>
        <Button onClick={() => router.push("/")}>Return to Home</Button>
      </motion.div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">{contract?.title || "Document for Signature"}</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Document Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: contract?.content || "" }} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Signature</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              By signing this document, you acknowledge that you have read and agree to the terms outlined above.
            </p>
            <SignaturePad onSave={handleSignatureChange} />
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleDecline}>
            Decline
          </Button>
          <Button 
            onClick={handleSign} 
            disabled={!signature || signing}
            className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
          >
            {signing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing...
              </>
            ) : (
              "Sign Document"
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
