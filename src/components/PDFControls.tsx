import React from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface PDFControlsProps {
  pageNumber: number;
  numPages: number | null;
  scale: number;
  rotation: number;
  onPageChange: (offset: number) => void;
  onZoomChange: (delta: number) => void;
  onRotate: () => void;
}

export const PDFControls: React.FC<PDFControlsProps> = ({
  pageNumber,
  numPages,
  scale,
  rotation,
  onPageChange,
  onZoomChange,
  onRotate,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onPageChange(-1)}
          disabled={pageNumber <= 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Previous page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <span className="text-sm">
          Page {pageNumber} of {numPages || '?'}
        </span>
        
        <button
          onClick={() => onPageChange(1)}
          disabled={pageNumber >= (numPages || 1)}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Next page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="border-l h-6 mx-2" />
        
        <button
          onClick={() => onZoomChange(-0.1)}
          className="p-2 rounded-full hover:bg-gray-100"
          title="Zoom out"
        >
          <ZoomOut className="w-6 h-6" />
        </button>
        
        <span className="text-sm w-16 text-center">
          {Math.round(scale * 100)}%
        </span>
        
        <button
          onClick={() => onZoomChange(0.1)}
          className="p-2 rounded-full hover:bg-gray-100"
          title="Zoom in"
        >
          <ZoomIn className="w-6 h-6" />
        </button>
        
        <div className="border-l h-6 mx-2" />
        
        <button
          onClick={onRotate}
          className="p-2 rounded-full hover:bg-gray-100"
          title="Rotate"
        >
          <RotateCw className="w-6 h-6" />
        </button>
        
        <span className="text-sm w-16 text-center">
          {rotation}°
        </span>
      </div>
    </div>
  );
}