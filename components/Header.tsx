'use client';

import { useI18n } from '@/lib/i18n-context';
import { FileText, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { t, locale, setLocale } = useI18n();

  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-white">{t.header.title}</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Languages className="h-4 w-4" />
                {locale === 'en' ? 'EN' : 'PT'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLocale('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale('pt')}>
                Português (BR)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}