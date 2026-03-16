import { useLocation, Navigate } from "react-router-dom";

/**
 * Redirects URLs with trailing slashes to their non-trailing-slash equivalents.
 * This prevents duplicate content issues flagged by Google Search Console.
 */
const TrailingSlashRedirect = () => {
  const location = useLocation();

  // If pathname has a trailing slash (and isn't just "/"), redirect
  if (location.pathname !== "/" && location.pathname.endsWith("/")) {
    const newPath = location.pathname.slice(0, -1);
    return <Navigate to={newPath + location.search + location.hash} replace />;
  }

  return null;
};

export default TrailingSlashRedirect;
