import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { PDFControls } from './PDFControls';
import '../utils/pdfWorkerConfig';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PDFViewerProps {
  file: File | string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => 
      Math.min(Math.max(1, prevPageNumber + offset), numPages || 1)
    );
  };

  const changeScale = (delta: number) => {
    setScale(prevScale => Math.min(Math.max(0.5, prevScale + delta), 2.0));
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 p-4">
      <PDFControls
        pageNumber={pageNumber}
        numPages={numPages}
        scale={scale}
        rotation={rotation}
        onPageChange={changePage}
        onZoomChange={changeScale}
        onRotate={rotate}
      />
      
      <div className="border rounded-lg shadow-lg bg-white p-4">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
            </div>
          }
          error={
            <div className="flex items-center justify-center h-96">
              <p className="text-red-500">Failed to load PDF. Please check if the file or URL is valid.</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            rotate={rotation}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
    </div>
  );
}