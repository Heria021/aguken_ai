"use client";

import React, { useRef, useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/components/custom/upload-dropzone";
import { UseFormReturn } from "react-hook-form";
import { SopFormValues } from "./sop-form";

export interface FileUploadGroup {
  id: string;
  groupName: string;
  description: string;
  files: File[];
}

interface FileUploadSectionProps {
  form: UseFormReturn<SopFormValues>;
  fileUploadGroups: FileUploadGroup[];
  setFileUploadGroups: React.Dispatch<React.SetStateAction<FileUploadGroup[]>>;
}

export default function FileUploadSection({
  form,
  fileUploadGroups,
  setFileUploadGroups,
}: FileUploadSectionProps) {
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const uploadDropzoneRef = useRef<{ clearFiles: () => void }>(null);

  // Handle file additions
  const handleFilesAdded = (files: File[]) => {
    setCurrentFiles(files);
  };

  // Handle file removals
  const handleFilesRemoved = (files: File[]) => {
    setCurrentFiles(files);
  };

  // Add a new file upload group
  const addFileUploadGroup = () => {
    const groupName = form.getValues().groupName;
    const description = form.getValues().description || "";

    if (!groupName || groupName.trim() === "") {
      form.setError("groupName", {
        type: "manual",
        message: "Group name is required to add files"
      });
      return;
    }

    if (currentFiles.length === 0) {
      // Show an error or alert that files are required
      alert("Please upload at least one file");
      return;
    }

    const newGroup: FileUploadGroup = {
      id: Date.now().toString(),
      groupName,
      description,
      files: [...currentFiles],
    };

    setFileUploadGroups([...fileUploadGroups, newGroup]);
    
    // Clear the form fields and files
    form.setValue("groupName", "");
    form.setValue("description", "");
    setCurrentFiles([]);
    uploadDropzoneRef.current?.clearFiles();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold mb-4">Upload SOPs (Standard Operating Procedures)</h3>
      
      {/* Group Name */}
      <FormField
        control={form.control}
        name="groupName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Group Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter name" 
                className="bg-muted text-foreground border border-border focus-visible:ring-ring"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


      {/* File Upload */}
      <div>
        <FormLabel>Files (Max 10)</FormLabel>
        <UploadDropzone
          ref={uploadDropzoneRef}
          maxFiles={10}
          onFilesAdded={handleFilesAdded}
          onFilesRemoved={handleFilesRemoved}
        />
      </div>

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter description" 
                className="resize-none bg-muted text-foreground border border-border focus-visible:ring-ring"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


      {/* Add button for file upload group */}
      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          onClick={addFileUploadGroup}
          variant="secondary"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
