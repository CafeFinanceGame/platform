'use client';

import { useState } from 'react';

export default function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  interface IpfsResult {
    success: boolean;
    ipfsHash: string;
    pinataUrl: string;
  }

  const [ipfsResult, setIpfsResult] = useState<IpfsResult | null>(null);
  const [error, setError] = useState('');
  
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file first');
      return;
    }
    
    setUploading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/ipfs', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload');
      }
      
      const data = await response.json();
      setIpfsResult(data);
    } catch (error) {
      console.error('Error uploading: ', error);
      setError((error as any).message || 'Failed to upload file to IPFS');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload File to IPFS</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Select File:
            <input 
              type="file" 
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>
        
        {error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload to IPFS'}
        </button>
      </form>
      
      {ipfsResult && ipfsResult.success && (
        <div className="mt-6 p-4 border rounded-md bg-green-50">
          <h3 className="font-bold text-green-800 mb-2">Successfully Uploaded!</h3>
          <p className="mb-1"><span className="font-semibold">IPFS Hash:</span> {ipfsResult.ipfsHash}</p>
          <p className="mb-1"><span className="font-semibold">Pinata URL:</span></p>
          <a 
            href={ipfsResult.pinataUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {ipfsResult.pinataUrl}
          </a>
        </div>
      )}
    </div>
  );
}