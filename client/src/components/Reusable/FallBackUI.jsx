export default function FallbackUI({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="border-8 border-gray-300 border-t-8 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      <p className="mt-4 text-lg text-gray-600">Loading, please wait...</p>
    </div>
  );
}
