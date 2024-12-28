import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { PDFViewer } from '../components/PDFViewer';

export const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">PDF Viewer</h1>
        
        {!selectedFile ? (
          <FileUpload onFileSelect={(file) => setSelectedFile(file)} />
        ) : (
          <div>
            <button
              onClick={() => setSelectedFile(null)}
              className="mb-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to upload
            </button>
            <PDFViewer file={selectedFile} />
          </div>
        )}
      </div>
    </div>
  );
}