'use client';

import { useState, useCallback } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { Header } from '@/components/Header';
import { Dropzone } from '@/components/Dropzone';
import { MetadataForm } from '@/components/MetadataForm';
import { loadPdfAndExtractMeta, applyMetadata, PDFMetadata } from '@/lib/pdf';
import { toast } from 'sonner';

export default function Home() {
  const { t } = useI18n();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBuffer, setPdfBuffer] = useState<ArrayBuffer | null>(null);
  const [metadata, setMetadata] = useState<PDFMetadata>({
    title: '',
    author: '',
    subject: '',
    keywords: [],
    creator: '',
    producer: '',
    creationDate: null,
    modDate: null,
  });

  const handleFileSelect = useCallback(
    async (file: File) => {
      try {
        setPdfFile(file);

        const buffer = await file.arrayBuffer();
        setPdfBuffer(buffer);

        const meta = await loadPdfAndExtractMeta(buffer);
        setMetadata(meta);

        toast.success(t.messages.success);
      } catch (error) {
        if (error instanceof Error && error.message === 'ENCRYPTED') {
          toast.error(t.messages.errorEncrypted);
        } else {
          toast.error(t.messages.errorReading);
        }
        console.error('Error reading PDF:', error);
      }
    },
    [t]
  );

  const handleApplyAndDownload = useCallback(async () => {
    if (!pdfBuffer || !pdfFile) {
      toast.error(t.messages.noPdfLoaded);
      return;
    }

    try {
      const updatedPdfBytes = await applyMetadata(pdfBuffer, metadata);

      const blob = new Blob([updatedPdfBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;

      const originalName = pdfFile.name.replace(/\.pdf$/i, '');
      link.download = `${originalName}.metadata.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(t.messages.success);
    } catch (error) {
      if (error instanceof Error && error.message === 'ENCRYPTED') {
        toast.error(t.messages.errorEncrypted);
      } else {
        toast.error(t.messages.errorWriting);
      }
      console.error('Error writing PDF:', error);
    }
  }, [pdfBuffer, pdfFile, metadata, t]);

  const handleClear = useCallback(() => {
    setMetadata({
      title: '',
      author: '',
      subject: '',
      keywords: [],
      creator: '',
      producer: '',
      creationDate: null,
      modDate: null,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white">{t.app.title}</h2>
          <p className="text-gray-400">{t.app.subtitle}</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          <Dropzone onFileSelect={handleFileSelect} fileName={pdfFile?.name} />

          <MetadataForm
            metadata={metadata}
            onMetadataChange={setMetadata}
            onApplyAndDownload={handleApplyAndDownload}
            onClear={handleClear}
            disabled={!pdfFile}
          />
        </div>
      </main>
    </div>
  );
}
