import { SheetUploader } from '@/components/sheet-uploader';
import { FileSpreadsheet } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <FileSpreadsheet className="h-7 w-7 text-primary" />
          <p className="ml-3 text-2xl font-bold text-foreground">Sheetifier</p>
        </div>
      </header>
      <main className="flex-1">
        <SheetUploader />
      </main>
      <footer className="py-6 md:px-8">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            An AI-powered tool to beautify your spreadsheets.
          </p>
        </div>
      </footer>
    </div>
  );
}
