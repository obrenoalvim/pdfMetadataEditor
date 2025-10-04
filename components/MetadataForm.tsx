'use client';

import { useI18n } from '@/lib/i18n-context';
import { PDFMetadata } from '@/lib/pdf';
import { dateToDatetimeLocal, datetimeLocalToDate } from '@/lib/dates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Download, Eraser } from 'lucide-react';

interface MetadataFormProps {
  metadata: PDFMetadata;
  onMetadataChange: (metadata: PDFMetadata) => void;
  onApplyAndDownload: () => void;
  onClear: () => void;
  disabled: boolean;
}

export function MetadataForm({
  metadata,
  onMetadataChange,
  onApplyAndDownload,
  onClear,
  disabled,
}: MetadataFormProps) {
  const { t } = useI18n();

  const handleFieldChange = (field: keyof PDFMetadata, value: string) => {
    if (field === 'keywords') {
      onMetadataChange({
        ...metadata,
        keywords: value.split(',').map((k) => k.trim()).filter((k) => k),
      });
    } else if (field === 'creationDate') {
      onMetadataChange({
        ...metadata,
        creationDate: datetimeLocalToDate(value),
      });
    } else if (field === 'modDate') {
      onMetadataChange({
        ...metadata,
        modDate: datetimeLocalToDate(value),
      });
    } else {
      onMetadataChange({
        ...metadata,
        [field]: value,
      });
    }
  };

  return (
    <Card className="border-gray-800 bg-gray-900/50 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">{t.form.title}</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-200">
            {t.form.fields.title}
          </Label>
          <Input
            id="title"
            value={metadata.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="border-gray-700 bg-gray-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author" className="text-gray-200">
            {t.form.fields.author}
          </Label>
          <Input
            id="author"
            value={metadata.author || ''}
            onChange={(e) => handleFieldChange('author', e.target.value)}
            className="border-gray-700 bg-gray-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-gray-200">
            {t.form.fields.subject}
          </Label>
          <Input
            id="subject"
            value={metadata.subject || ''}
            onChange={(e) => handleFieldChange('subject', e.target.value)}
            className="border-gray-700 bg-gray-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="creator" className="text-gray-200">
            {t.form.fields.creator}
          </Label>
          <Input
            id="creator"
            value={metadata.creator || ''}
            onChange={(e) => handleFieldChange('creator', e.target.value)}
            className="border-gray-700 bg-gray-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="producer" className="text-gray-200">
            {t.form.fields.producer}
          </Label>
          <Input
            id="producer"
            value={metadata.producer || ''}
            onChange={(e) => handleFieldChange('producer', e.target.value)}
            className="border-gray-700 bg-gray-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="creationDate" className="text-gray-200">
            {t.form.fields.creationDate}
          </Label>
          <Input
            id="creationDate"
            type="datetime-local"
            value={dateToDatetimeLocal(metadata.creationDate || null)}
            onChange={(e) => handleFieldChange('creationDate', e.target.value)}
            className="border-gray-700 bg-gray-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="modDate" className="text-gray-200">
            {t.form.fields.modDate}
          </Label>
          <Input
            id="modDate"
            type="datetime-local"
            value={dateToDatetimeLocal(metadata.modDate || null)}
            onChange={(e) => handleFieldChange('modDate', e.target.value)}
            className="border-gray-700 bg-gray-800 text-white"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="keywords" className="text-gray-200">
            {t.form.fields.keywords}
          </Label>
          <Textarea
            id="keywords"
            value={metadata.keywords.join(', ')}
            onChange={(e) => handleFieldChange('keywords', e.target.value)}
            placeholder={t.form.fields.keywordsPlaceholder}
            className="border-gray-700 bg-gray-800 text-white"
            rows={2}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          onClick={onApplyAndDownload}
          disabled={disabled}
          className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 sm:flex-initial"
        >
          <Download className="h-4 w-4" />
          {t.form.buttons.applyAndDownload}
        </Button>
        <Button
          onClick={onClear}
          variant="outline"
          className="flex-1 gap-2 border-gray-700 sm:flex-initial"
        >
          <Eraser className="h-4 w-4" />
          {t.form.buttons.clear}
        </Button>
      </div>
    </Card>
  );
}