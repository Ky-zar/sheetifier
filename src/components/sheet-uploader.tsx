"use client";

import { useState, useRef, useEffect, type DragEvent } from 'react';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet, Download, Loader2, History, Trash2, RefreshCw } from 'lucide-react';

import { aiPoweredTableStyling } from '@/ai/flows/ai-powered-table-styling';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

type SavedProject = {
  id: string;
  fileName: string;
  styledHtml: string;
  createdAt: string;
};

export function SheetUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [styledHtml, setStyledHtml] = useState<string | null>(null);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const projects = JSON.parse(localStorage.getItem('sheetifier-projects') || '[]');
      setSavedProjects(projects);
    } catch (error) {
      console.error('Failed to load projects from localStorage', error);
      setSavedProjects([]);
    }
  }, []);

  const saveProject = (project: Omit<SavedProject, 'id' | 'createdAt'>) => {
    const newProject: SavedProject = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const updatedProjects = [newProject, ...savedProjects.slice(0, 9)];
    setSavedProjects(updatedProjects);
    localStorage.setItem('sheetifier-projects', JSON.stringify(updatedProjects));
  };
  
  const deleteProject = (id: string) => {
    const updatedProjects = savedProjects.filter(p => p.id !== id);
    setSavedProjects(updatedProjects);
    localStorage.setItem('sheetifier-projects', JSON.stringify(updatedProjects));
    toast({ title: 'Project deleted', description: 'The styled sheet has been removed from your history.' });
  };
  
  const clearProjects = () => {
    setSavedProjects([]);
    localStorage.removeItem('sheetifier-projects');
    toast({ title: 'History cleared', description: 'All saved projects have been deleted.' });
  };

  const loadProject = (project: SavedProject) => {
    setFileName(project.fileName);
    setStyledHtml(project.styledHtml);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleFile = async (file: File) => {
    if (!file) return;

    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
    ];
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload a .xlsx or .csv file.',
      });
      return;
    }

    setIsLoading(true);
    setStyledHtml(null);
    setFileName(file.name);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const html = XLSX.utils.sheet_to_html(worksheet);

      const result = await aiPoweredTableStyling({ tableHtml: html });
      setStyledHtml(result.styledTableHtml);
      saveProject({ fileName: file.name, styledHtml: result.styledTableHtml });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        variant: 'destructive',
        title: 'Processing Error',
        description: 'There was a problem processing your file. Please try again.',
      });
      setFileName(null);
    } finally {
      setIsLoading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFile(e.target.files[0]);
    }
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDownloadPdf = async () => {
    if (!tableRef.current || !styledHtml) return;

    const html2pdf = (await import('html2pdf.js')).default;

    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${fileName?.split('.')[0] || 'sheet'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().from(tableRef.current).set(options).save();
  };

  const resetState = () => {
    setStyledHtml(null);
    setFileName(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-10">
      <Card className="w-full mx-auto transition-all duration-300 shadow-lg">
        {!styledHtml && !isLoading && (
          <CardHeader className="text-center p-8">
            <CardTitle className="text-3xl font-bold">Start Here</CardTitle>
            <CardDescription className="text-md">Drag & drop or click to upload your spreadsheet.</CardDescription>
          </CardHeader>
        )}
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-80 gap-4" role="status" aria-live="polite">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground text-lg">AI is working its magic...</p>
            </div>
          ) : !styledHtml ? (
            <div
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300",
                isDragging ? "border-primary bg-accent/20" : "border-border hover:border-primary/80 hover:bg-accent/10"
              )}
              role="button"
              tabIndex={0}
              aria-label="File upload area"
            >
              <Upload className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-center text-muted-foreground">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-2">.xlsx or .csv files supported</p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                onChange={onFileChange}
                aria-hidden="true"
              />
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-7 w-7 text-primary" />
                  <span className="font-semibold text-lg">{fileName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={resetState} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    New File
                  </Button>
                  <Button onClick={handleDownloadPdf}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto border rounded-lg bg-card">
                 <div ref={tableRef} className="p-1" dangerouslySetInnerHTML={{ __html: styledHtml }} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {savedProjects.length > 0 && !styledHtml && (
        <div className="mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-3">
                <History className="h-7 w-7" />
                <h3 className="text-2xl font-bold">Your History</h3>
              </div>
              {savedProjects.length > 1 && (
                <Button variant="destructive" size="sm" onClick={clearProjects}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear History
                </Button>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedProjects.map((project) => (
                <Card key={project.id} className="flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-lg truncate">{project.fileName}</CardTitle>
                    <CardDescription>
                      {new Date(project.createdAt).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-2 pt-4">
                      <Button className="w-full" variant="outline" size="sm" onClick={() => loadProject(project)}>View</Button>
                      <Button variant="ghost" size="icon" aria-label="Delete project" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => deleteProject(project.id)}>
                          <Trash2 className="h-4 w-4" />
                      </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      )}
    </div>
  );
}
