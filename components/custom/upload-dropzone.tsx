"use client";

import * as React from "react";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface UploadDropzoneProps {
  maxFiles?: number;
  className?: string;
  onFilesAdded?: (files: File[]) => void;
  onFilesRemoved?: (files: File[]) => void;
  ref?: React.RefObject<{
    clearFiles: () => void;
  }>;
}

export const UploadDropzone = React.forwardRef<
  { clearFiles: () => void },
  UploadDropzoneProps
>(({ maxFiles = 1, className, onFilesAdded, onFilesRemoved }, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<(string | null)[]>([]);

  // Expose clearFiles method via ref
  React.useImperativeHandle(ref, () => ({
    clearFiles: () => {
      setFiles([]);
      setPreviews([]);
    }
  }));

  const handleDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  // Generate preview URLs for image files
  const generatePreviews = React.useCallback((newFiles: File[]) => {
    // First, create placeholders for all files
    const placeholders = newFiles.map(file => file.type.startsWith('image/') ? null : null);
    setPreviews(prev => [...prev, ...placeholders]);

    // Then, asynchronously load image previews
    newFiles.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews(prev => {
            const newPreviews = [...prev];
            // Calculate the actual index in the previews array
            const previewIndex = prev.length - newFiles.length + index;
            if (previewIndex >= 0 && previewIndex < newPreviews.length) {
              newPreviews[previewIndex] = e.target?.result as string;
            }
            return newPreviews;
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const newFiles = droppedFiles.slice(0, maxFiles - files.length);

      if (newFiles.length > 0) {
        setFiles((prev) => [...prev, ...newFiles]);
        generatePreviews(newFiles);
        onFilesAdded?.(newFiles);
      }
    },
    [files, maxFiles, onFilesAdded, generatePreviews]
  );

  const handleFileInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        const selectedFiles = Array.from(e.target.files);
        const newFiles = selectedFiles.slice(0, maxFiles - files.length);

        if (newFiles.length > 0) {
          setFiles((prev) => [...prev, ...newFiles]);
          generatePreviews(newFiles);
          onFilesAdded?.(newFiles);
        }
      }
    },
    [files, maxFiles, onFilesAdded, generatePreviews]
  );

  const handleRemoveFile = React.useCallback(
    (index: number) => {
      setFiles((prev) => {
        const updatedFiles = prev.filter((_, idx) => idx !== index);
        onFilesRemoved?.(updatedFiles);
        return updatedFiles;
      });
      setPreviews((prev) => prev.filter((_, idx) => idx !== index));
    },
    [onFilesRemoved]
  );

  return (
    <div className="w-full mt-2">
      <div
        className={cn(
          "border-input bg-muted text-muted-foreground flex flex-col items-center justify-center rounded-md border-2 border-dashed p-4 transition-colors",
          isDragging && "border-primary bg-primary/5",
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium">
            Drag files here or click to upload
          </p>
          <p className="text-xs text-muted-foreground">
            Maximum {maxFiles} file{maxFiles > 1 ? "s" : ""}
          </p>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
            id="file-upload"
            accept="image/*,.pdf,.doc,.docx"
          />
          <label
            htmlFor="file-upload"
            className="mt-2 cursor-pointer text-sm text-primary hover:underline"
          >
            Browse files
          </label>
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex just items-center gap-2 rounded-md border p-1 bg-background shadow-sm"
            >
              {/* Image preview */}
              <div className="relative flex-shrink-0 w-10 h-10 overflow-hidden rounded-sm">
                {file.type.startsWith('image/') && previews[i] ? (
                  <Image
                    src={previews[i] as string}
                    alt={file.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-sm"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* File info + remove */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-medium truncate max-w-full">{file.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(i)}
                    className="p-1 rounded-full text-muted-foreground hover:text-destructive hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});