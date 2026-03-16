import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-reading px-6 py-20 text-center">
      <h1 className="font-display text-4xl font-bold text-foreground">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Page not found. The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4 font-display text-sm">
        <Link to="/" className="text-accent hover:underline">
          Go home
        </Link>
        <Link to="/weeknotes" className="text-accent hover:underline">
          Read weeknotes
        </Link>
      </div>
    </div>
  );
}
