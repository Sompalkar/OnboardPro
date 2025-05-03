"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Eye, FileText } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { getTemplateById, updateTemplate } from "@/lib/api/templates"
import Link from "next/link"
import { TemplatePreview } from "@/components/template-preview"
import { DynamicFieldsEditor } from "@/components/dynamic-fields-editor"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [activeTab, setActiveTab] = useState("editor")

  const [templateData, setTemplateData] = useState({
    title: "",
    description: "",
    content: "",
    category: "contract",
    dynamicFields: [] as Array<{ key: string; description: string }>,
    isPublic: false,
  })

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setIsFetching(true)
        const template = await getTemplateById(params.id)
        setTemplateData({
          title: template.title,
          description: template.description || "",
          content: template.content,
          category: template.category,
          dynamicFields: template.dynamicFields || [],
          isPublic: template.isPublic,
        })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTemplateData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setTemplateData((prev) => ({ ...prev, category: value }))
  }

  const handleDynamicFieldsChange = (dynamicFields: Array<{ key: string; description: string }>) => {
    setTemplateData((prev) => ({ ...prev, dynamicFields }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateTemplate(params.id, templateData)
      toast({
        title: "Template updated",
        description: "Your template has been updated successfully.",
      })
      router.push("/dashboard/templates")
    } catch (error) {
      console.error("Error updating template:", error)
      toast({
        title: "Error",
        description: "Failed to update template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
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
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-[500px] w-full" />
              </div>
            </div>

            <div className="space-y-6">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[300px] w-full" />
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
            <Button variant="outline" onClick={() => setActiveTab(activeTab === "editor" ? "preview" : "editor")}>
              {activeTab === "editor" ? (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Edit
                </>
              )}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Edit Template</h1>
            <p className="text-sm text-muted-foreground">Update your document template</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="template-title">Template Title</Label>
                <Input
                  id="template-title"
                  name="title"
                  value={templateData.title}
                  onChange={handleChange}
                  className="bg-white dark:bg-gray-900"
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                  <Card>
                    <Textarea
                      className="min-h-[500px] font-mono text-sm bg-white dark:bg-gray-900 p-4"
                      name="content"
                      value={templateData.content}
                      onChange={handleChange}
                    />
                  </Card>
                </TabsContent>
                <TabsContent value="preview">
                  <Card className="p-6 min-h-[500px] bg-white dark:bg-gray-900">
                    <TemplatePreview content={templateData.content} />
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="p-4">
                <h3 className="font-medium mb-2">Template Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-category">Category</Label>
                    <Select value={templateData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger id="template-category" className="bg-white dark:bg-gray-900">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="proposal">Proposal</SelectItem>
                        <SelectItem value="scope">Scope of Work</SelectItem>
                        <SelectItem value="legal">Legal Document</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-description">Description</Label>
                    <Textarea
                      id="template-description"
                      name="description"
                      placeholder="Brief description of this template"
                      value={templateData.description}
                      onChange={handleChange}
                      className="bg-white dark:bg-gray-900"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-medium mb-2">Dynamic Fields</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These fields will be replaced with client information when using the template.
                </p>
                <DynamicFieldsEditor fields={templateData.dynamicFields} onChange={handleDynamicFieldsChange} />
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
