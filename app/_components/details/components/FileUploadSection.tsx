"use client";

import { useState, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { UploadDropzone } from "@/components/custom/upload-dropzone";
import { FileUploadGroup, FileUploadGroupItem } from "./FileUploadGroupItem";

interface FileUploadSectionProps {
  form: UseFormReturn<any>;
  fileUploadGroups: FileUploadGroup[];
  setFileUploadGroups: React.Dispatch<React.SetStateAction<FileUploadGroup[]>>;
}

export function FileUploadSection({
  form,
  fileUploadGroups,
  setFileUploadGroups
}: FileUploadSectionProps) {
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const uploadDropzoneRef = useRef<{ clearFiles: () => void }>(null);

  // Handle file uploads
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

    if (!groupName) {
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

    // Reset the form fields and current files
    form.setValue("groupName", "");
    form.setValue("description", "");
    setCurrentFiles([]);

    // Clear the files in the dropzone
    if (uploadDropzoneRef.current) {
      uploadDropzoneRef.current.clearFiles();
    }
  };

  // Remove a file upload group
  const removeFileUploadGroup = (id: string) => {
    setFileUploadGroups(fileUploadGroups.filter(group => group.id !== id));
  };

  return (
    <>
      <div className="space-y-1 mt-6">
        <p className="text-sm font-medium">Upload Menus (for food ordering or inquiries)</p>
      </div>

      {/* Group Name */}
      <FormField
        control={form.control}
        name="groupName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Group Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter group name" className="bg-muted text-foreground border border-border focus-visible:ring-ring" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter description (optional)" {...field} className="resize-none bg-muted text-foreground border border-border focus-visible:ring-ring" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator className="my-4" />

      {/* File Upload */}
      <div className="space-y-1">
        <Label>Files (Max 10)</Label>
        <UploadDropzone
          ref={uploadDropzoneRef}
          maxFiles={10}
          onFilesAdded={handleFilesAdded}
          onFilesRemoved={handleFilesRemoved}
        />
      </div>

      {/* Add button for file upload group */}
      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          onClick={addFileUploadGroup}
          variant="secondary"
        >
          Add Files with Group Info
        </Button>
      </div>

      {/* Display uploaded file groups */}
      {fileUploadGroups.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-medium">Added items: </h3>
          <div className="space-y-4">
            {fileUploadGroups.map((group) => (
              <FileUploadGroupItem
                key={group.id}
                group={group}
                onRemove={removeFileUploadGroup}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
