export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-md w-full text-center bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-4">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 rounded bg-primary text-primary-foreground"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
