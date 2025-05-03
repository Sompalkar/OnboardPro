"use client"

import { useState } from "react"
import { Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DynamicField {
  key: string
  description: string
}

interface DynamicFieldsEditorProps {
  fields: DynamicField[]
  onChange: (fields: DynamicField[]) => void
}

export function DynamicFieldsEditor({ fields, onChange }: DynamicFieldsEditorProps) {
  const [newField, setNewField] = useState<DynamicField>({ key: "", description: "" })

  const handleAddField = () => {
    if (!newField.key || !newField.description) return

    // Ensure key is wrapped in square brackets
    let formattedKey = newField.key
    if (!formattedKey.startsWith("[")) {
      formattedKey = `[${formattedKey}`
    }
    if (!formattedKey.endsWith("]")) {
      formattedKey = `${formattedKey}]`
    }

    const updatedFields = [...fields, { key: formattedKey, description: newField.description }]
    onChange(updatedFields)
    setNewField({ key: "", description: "" })
  }

  const handleRemoveField = (index: number) => {
    const updatedFields = [...fields]
    updatedFields.splice(index, 1)
    onChange(updatedFields)
  }

  const handleFieldChange = (index: number, field: Partial<DynamicField>) => {
    const updatedFields = [...fields]
    updatedFields[index] = { ...updatedFields[index], ...field }
    onChange(updatedFields)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <Input
                value={field.key}
                onChange={(e) => handleFieldChange(index, { key: e.target.value })}
                placeholder="[FIELD_KEY]"
                className="text-sm bg-white dark:bg-gray-900"
              />
              <Input
                value={field.description}
                onChange={(e) => handleFieldChange(index, { description: e.target.value })}
                placeholder="Field description"
                className="text-sm bg-white dark:bg-gray-900"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveField(index)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Remove field</span>
            </Button>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t">
        <Label className="text-xs text-muted-foreground mb-2 block">Add New Field</Label>
        <div className="flex items-center space-x-2">
          <div className="flex-1 grid grid-cols-2 gap-2">
            <Input
              value={newField.key}
              onChange={(e) => setNewField({ ...newField, key: e.target.value })}
              placeholder="[FIELD_KEY]"
              className="text-sm bg-white dark:bg-gray-900"
            />
            <Input
              value={newField.description}
              onChange={(e) => setNewField({ ...newField, description: e.target.value })}
              placeholder="Field description"
              className="text-sm bg-white dark:bg-gray-900"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleAddField}
            disabled={!newField.key || !newField.description}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add field</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
