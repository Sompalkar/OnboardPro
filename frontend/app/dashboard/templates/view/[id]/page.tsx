"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, FileText, Copy, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { getTemplateById } from "@/lib/api/templates"
import Link from "next/link"
import { TemplatePreview } from "@/components/template-preview"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export default function ViewTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isFetching, setIsFetching] = useState(true)
  const [activeTab, setActiveTab] = useState("preview")
  const [copied, setCopied] = useState(false)

  const [template, setTemplate] = useState<{
    _id: string
    title: string
    description: string
    content: string
    category: string
    dynamicFields: Array<{ key: string; description: string }>
    isPublic: boolean
    createdAt: string
    updatedAt: string
  } | null>(null)

  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
  const [processedContent, setProcessedContent] = useState("")

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setIsFetching(true)
        const templateData = await getTemplateById(params.id)
        setTemplate(templateData)

        // Initialize field values
        const initialValues: Record<string, string> = {}
        templateData.dynamicFields?.forEach((field) => {
          initialValues[field.key] = ""
        })
        setFieldValues(initialValues)
      } catch (error) {
        console.error("Error fetching template:", error)
        toast({
          title: "Error",
          description: "Failed to load template. Please try again.",
          variant: "destructive",
        })
        router.push("/dashboard/templates")
      } finally {
        setIsFetching(false)
      }
    }

    fetchTemplate()
  }, [params.id, router, toast])

  useEffect(() => {
    if (template) {
      let content = template.content
      Object.entries(fieldValues).forEach(([key, value]) => {
        content = content.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), value || key)
      })
      setProcessedContent(content)
    }
  }, [template, fieldValues])

  const handleFieldChange = (key: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(processedContent)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Template content has been copied to clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([processedContent], { type: "text/markdown" })
    element.href = URL.createObjectURL(file)
    element.download = `${template?.title || "template"}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (isFetching || !template) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="border-b">
          <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <Link href="/dashboard/templates" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Link>
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </header>
        <main className="flex-1 container px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-[500px] w-full" />
              </div>
            </div>

            <div className="space-y-6">
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard/templates"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" onClick={handleCopyToClipboard}>
              {copied ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold">{template.title}</h1>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
            </Badge>
          </div>
          {template.description && <p className="text-muted-foreground mb-6">{template.description}</p>}

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="raw">Raw Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <Card className="p-6 min-h-[500px] bg-white dark:bg-gray-900">
                    <TemplatePreview content={processedContent} />
                  </Card>
                </TabsContent>
                <TabsContent value="raw">
                  <Card className="p-6 min-h-[500px] bg-white dark:bg-gray-900">
                    <pre className="whitespace-pre-wrap font-mono text-sm">{processedContent}</pre>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="p-4">
                <h3 className="font-medium mb-4">Fill in Template Fields</h3>
                <div className="space-y-4">
                  {template.dynamicFields?.map((field, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`field-${index}`}>{field.description}</Label>
                      <Input
                        id={`field-${index}`}
                        placeholder={field.key}
                        value={fieldValues[field.key] || ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="bg-white dark:bg-gray-900"
                      />
                    </div>
                  ))}
                  {template.dynamicFields?.length === 0 && (
                    <p className="text-sm text-muted-foreground">This template has no dynamic fields.</p>
                  )}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-medium mb-2">Template Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{template.category.charAt(0).toUpperCase() + template.category.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dynamic Fields:</span>
                    <span>{template.dynamicFields?.length || 0}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/dashboard/templates/edit/${template._id}`)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Edit Template
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/dashboard/contracts/create?templateId=${template._id}`)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Create Contract
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
