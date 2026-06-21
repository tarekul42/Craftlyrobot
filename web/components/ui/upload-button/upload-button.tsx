"use client";

import * as React from "react";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadButtonProps {
  onFilesSelected?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  className?: string;
}

/**
 * UploadButton — file upload with preview list.
 * Shows selected files with remove buttons.
 */
function UploadButton({
  onFilesSelected,
  accept = "image/png,image/jpeg,image/webp",
  multiple = false,
  label = "Upload Screenshot",
  className,
}: UploadButtonProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles(selected);
    onFilesSelected?.(selected);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
        aria-label={label}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-input bg-muted/50 px-4 py-6 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <UploadCloud className="h-5 w-5" aria-hidden="true" />
        {label}
      </button>
      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between rounded-md border bg-background px-3 py-1.5 text-sm">
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-2 rounded-sm p-1 hover:bg-muted"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { UploadButton };
