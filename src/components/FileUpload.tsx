import React, { useRef, useState } from 'react';
import { File, X } from 'lucide-react';

interface FileUploadProps {
  setText: (text: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setText }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    
    if (!file) {
      return;
    }
    
    // Currently only support .txt files
    if (file.type !== 'text/plain') {
      setError('Only .txt files are supported at this time');
      setFileName(null);
      setText('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
    };
    reader.onerror = () => {
      setError('Failed to read file');
      setText('');
    };
    reader.readAsText(file);
  };

  const clearFile = () => {
    setFileName(null);
    setText('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Upload a text file (.txt)
      </label>
      
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200">
        <div className="space-y-1 text-center">
          <File className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" />
          <div className="flex text-sm text-gray-600 dark:text-gray-400">
            <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-transparent rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none">
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".txt"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Only .txt files are supported currently
          </p>
        </div>
      </div>
      
      {fileName && (
        <div className="mt-3 flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md text-blue-700 dark:text-blue-300">
          <span className="text-sm truncate max-w-xs">{fileName}</span>
          <button 
            onClick={clearFile}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;