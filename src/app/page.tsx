import { SheetUploader } from '@/components/sheet-uploader';
import { FileSpreadsheet, Palette, FileDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold">Sheetifier</h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Transform Your Spreadsheets Instantly
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Upload your Excel or CSV files, let our AI beautify them, and download a professional-looking PDF in seconds.
          </p>
        </section>

        <SheetUploader />

        <section className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                <FileSpreadsheet className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Simple Upload</h3>
              <p className="mt-2 text-muted-foreground">
                Easily drag and drop or select your .xlsx and .csv files.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                <Palette className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">AI-Powered Styling</h3>
              <p className="mt-2 text-muted-foreground">
                Our smart AI automatically applies a clean, modern style to your data.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                <FileDown className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">PDF Export</h3>
              <p className="mt-2 text-muted-foreground">
                Download your styled table as a print-ready, landscape A4 PDF.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-6 md:px-8 border-t">
        <div className="container mx-auto flex items-center justify-center">
          <p className="text-center text-sm text-muted-foreground">
            Powered by AI, built for simplicity.
          </p>
        </div>
      </footer>
    </div>
  );
}
