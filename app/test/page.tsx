import FileUploadForm from '@/components/fileuploadForm';

export const metadata = {
  title: 'IPFS Upload with Pinata',
  description: 'Upload files to IPFS using Pinata in Next.js',
};

export default function UploadPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">IPFS File Upload with Pinata</h1>
      <FileUploadForm />
    </div>
  );
}