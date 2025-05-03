"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Download, Eye, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TemplateEditorPage() {
  const [templateTitle, setTemplateTitle] = useState("Freelance Contract")
  const [templateContent, setTemplateContent] = useState(`# FREELANCE SERVICES AGREEMENT

This Freelance Services Agreement (the "Agreement") is entered into by and between:

**Client:** [CLIENT_NAME]
**Address:** [CLIENT_ADDRESS]
**Email:** [CLIENT_EMAIL]

and

**Freelancer:** [FREELANCER_NAME]
**Address:** [FREELANCER_ADDRESS]
**Email:** [FREELANCER_EMAIL]

collectively referred to as the "Parties."

## 1. SERVICES

The Freelancer agrees to provide the following services to the Client (the "Services"):

[SERVICES_DESCRIPTION]

## 2. TERM

This Agreement shall commence on [START_DATE] and shall continue until [END_DATE] or until the Services are completed, whichever occurs first, unless terminated earlier in accordance with this Agreement.

## 3. COMPENSATION

As compensation for the Services, the Client agrees to pay the Freelancer as follows:

- **Rate:** [RATE]
- **Payment Schedule:** [PAYMENT_SCHEDULE]
- **Payment Method:** [PAYMENT_METHOD]

## 4. INTELLECTUAL PROPERTY

All intellectual property rights, including but not limited to copyrights, patents, trademarks, and trade secrets, in any work created, improved, or contributed to by the Freelancer in the course of providing the Services shall be the sole and exclusive property of the Client, subject to the Freelancer receiving full payment for the Services.

## 5. CONFIDENTIALITY

The Freelancer agrees to keep confidential all information provided by the Client that is marked as confidential or that would reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure.

## 6. TERMINATION

Either Party may terminate this Agreement with [NOTICE_PERIOD] written notice to the other Party. In the event of termination, the Client shall pay the Freelancer for all Services performed up to the date of termination.

## 7. INDEPENDENT CONTRACTOR STATUS

The Freelancer is an independent contractor and not an employee of the Client. The Freelancer shall be responsible for all taxes, insurance, and other obligations related to the Freelancer's business.

## 8. GOVERNING LAW

This Agreement shall be governed by and construed in accordance with the laws of [JURISDICTION].

## 9. ENTIRE AGREEMENT

This Agreement constitutes the entire agreement between the Parties and supersedes all prior and contemporaneous agreements, representations, and understandings of the Parties.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.

**CLIENT:**

_______________________________
[CLIENT_NAME]
Date: [SIGNING_DATE]

**FREELANCER:**

_______________________________
[FREELANCER_NAME]
Date: [SIGNING_DATE]`)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard/templates" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Template Editor</h1>
          <p className="text-sm text-muted-foreground">Create and edit your document templates</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="template-title">Template Title</Label>
              <Input id="template-title" value={templateTitle} onChange={(e) => setTemplateTitle(e.target.value)} />
            </div>

            <Tabs defaultValue="editor">
              <TabsList className="mb-4">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="editor">
                <Card>
                  <Textarea
                    className="min-h-[500px] font-mono text-sm"
                    value={templateContent}
                    onChange={(e) => setTemplateContent(e.target.value)}
                  />
                </Card>
              </TabsContent>
              <TabsContent value="preview">
                <Card className="p-6 min-h-[500px]">
                  <div className="prose max-w-none dark:prose-invert">
                    {/* This would be rendered markdown in a real app */}
                    <div className="whitespace-pre-wrap">{templateContent}</div>
                  </div>
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
                  <Select defaultValue="contract">
                    <SelectTrigger id="template-category">
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
                    placeholder="Brief description of this template"
                    defaultValue="Standard contract for freelance work"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-2">Dynamic Fields</h3>
              <p className="text-sm text-muted-foreground mb-4">
                These fields will be replaced with client information when using the template.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm font-medium">[CLIENT_NAME]</span>
                  <span className="text-xs text-muted-foreground">Client Name</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm font-medium">[CLIENT_EMAIL]</span>
                  <span className="text-xs text-muted-foreground">Client Email</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm font-medium">[CLIENT_ADDRESS]</span>
                  <span className="text-xs text-muted-foreground">Client Address</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm font-medium">[FREELANCER_NAME]</span>
                  <span className="text-xs text-muted-foreground">Your Name</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm font-medium">[START_DATE]</span>
                  <span className="text-xs text-muted-foreground">Project Start</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">[RATE]</span>
                  <span className="text-xs text-muted-foreground">Your Rate</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Custom Field
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
