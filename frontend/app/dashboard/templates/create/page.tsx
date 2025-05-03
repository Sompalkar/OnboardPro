"use client"

import type React from "react"

import { useState } from "react"
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
import { createTemplate } from "@/lib/api/templates"
import Link from "next/link"
import { TemplatePreview } from "@/components/template-preview"
import { DynamicFieldsEditor } from "@/components/dynamic-fields-editor"

export default function CreateTemplatePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")

  const [templateData, setTemplateData] = useState({
    title: "",
    description: "",
    content: `# [DOCUMENT_TITLE]

## Agreement

This agreement is entered into by and between:

**Client:** [CLIENT_NAME]
**Address:** [CLIENT_ADDRESS]
**Email:** [CLIENT_EMAIL]

and

**Service Provider:** [YOUR_NAME]
**Address:** [YOUR_ADDRESS]
**Email:** [YOUR_EMAIL]

collectively referred to as the "Parties."

## 1. Services

The Service Provider agrees to provide the following services to the Client:

[SERVICES_DESCRIPTION]

## 2. Term

This Agreement shall commence on [START_DATE] and shall continue until [END_DATE] or until the Services are completed, whichever occurs first, unless terminated earlier in accordance with this Agreement.

## 3. Compensation

As compensation for the Services, the Client agrees to pay the Service Provider as follows:

- **Rate:** [RATE]
- **Payment Schedule:** [PAYMENT_SCHEDULE]
- **Payment Method:** [PAYMENT_METHOD]

## 4. Intellectual Property

All intellectual property rights, including but not limited to copyrights, patents, trademarks, and trade secrets, in any work created, improved, or contributed to by the Service Provider in the course of providing the Services shall be the sole and exclusive property of the Client, subject to the Service Provider receiving full payment for the Services.

## 5. Confidentiality

The Service Provider agrees to keep confidential all information provided by the Client that is marked as confidential or that would reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure.

## 6. Termination

Either Party may terminate this Agreement with [NOTICE_PERIOD] written notice to the other Party. In the event of termination, the Client shall pay the Service Provider for all Services performed up to the date of termination.

## 7. Independent Contractor Status

The Service Provider is an independent contractor and not an employee of the Client. The Service Provider shall be responsible for all taxes, insurance, and other obligations related to the Service Provider's business.

## 8. Governing Law

This Agreement shall be governed by and construed in accordance with the laws of [JURISDICTION].

## 9. Entire Agreement

This Agreement constitutes the entire agreement between the Parties and supersedes all prior and contemporaneous agreements, representations, and understandings of the Parties.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.

**CLIENT:**

_______________________________
[CLIENT_NAME]
Date: [SIGNING_DATE]

**SERVICE PROVIDER:**

_______________________________
[YOUR_NAME]
Date: [SIGNING_DATE]`,
    category: "contract",
    dynamicFields: [
      { key: "[DOCUMENT_TITLE]", description: "Title of the document" },
      { key: "[CLIENT_NAME]", description: "Client's full name" },
      { key: "[CLIENT_ADDRESS]", description: "Client's address" },
      { key: "[CLIENT_EMAIL]", description: "Client's email address" },
      { key: "[YOUR_NAME]", description: "Your full name" },
      { key: "[YOUR_ADDRESS]", description: "Your address" },
      { key: "[YOUR_EMAIL]", description: "Your email address" },
      { key: "[SERVICES_DESCRIPTION]", description: "Detailed description of services to be provided" },
      { key: "[START_DATE]", description: "Project start date" },
      { key: "[END_DATE]", description: "Project end date" },
      { key: "[RATE]", description: "Your rate (e.g., $100/hour, $5,000 flat fee)" },
      { key: "[PAYMENT_SCHEDULE]", description: "When payments are due" },
      { key: "[PAYMENT_METHOD]", description: "Accepted payment methods" },
      { key: "[NOTICE_PERIOD]", description: "Notice period for termination (e.g., 14 days)" },
      { key: "[JURISDICTION]", description: "Governing law jurisdiction" },
      { key: "[SIGNING_DATE]", description: "Date of signing" },
    ],
    isPublic: false,
  })

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
      await createTemplate(templateData)
      toast({
        title: "Template created",
        description: "Your template has been created successfully.",
      })
      router.push("/dashboard/templates")
    } catch (error) {
      console.error("Error creating template:", error)
      toast({
        title: "Error",
        description: "Failed to create template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
              {isLoading ? "Saving..." : "Save Template"}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create Template</h1>
            <p className="text-sm text-muted-foreground">Create a new document template for your clients</p>
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
                  placeholder="e.g., Freelance Contract"
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
                      placeholder="Enter your template content here. Use markdown formatting."
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
