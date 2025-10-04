'use client';

import { useCallback, useState } from 'react';
import { Upload, FileCheck } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { Card } from '@/components/ui/card';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  fileName?: string;
}

export function Dropzone({ onFileSelect, fileName }: DropzoneProps) {
  const { t } = useI18n();
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type === 'application/pdf') {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type === 'application/pdf') {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect]
  );

  return (
    <Card
      className={`border-2 border-dashed transition-all ${
        isDragging
          ? 'border-blue-500 bg-blue-950/20'
          : 'border-gray-700 bg-gray-900/50'
      }`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <label className="flex cursor-pointer flex-col items-center justify-center px-6 py-10">
        <input
          type="file"
          className="hidden"
          accept=".pdf,application/pdf"
          onChange={handleFileInput}
        />

        {fileName ? (
          <>
            <FileCheck className="mb-3 h-12 w-12 text-green-500" />
            <p className="mb-2 text-sm font-medium text-gray-200">
              {t.dropzone.fileSelected}
            </p>
            <p className="text-sm text-gray-400">{fileName}</p>
          </>
        ) : (
          <>
            <Upload className="mb-3 h-12 w-12 text-gray-400" />
            <p className="mb-2 text-sm font-medium text-gray-200">
              {t.dropzone.description}
            </p>
            <p className="text-xs text-gray-500">{t.dropzone.acceptedTypes}</p>
          </>
        )}
      </label>
    </Card>
  );
}