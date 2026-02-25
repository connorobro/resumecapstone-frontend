import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Generic data-fetching hook.
 * Pass in a fetcher function (from services/api.js) and it will
 * manage loading/error state and auto-redirect on 401.
 *
 * Usage:
 *   const { data, loading, error } = useFetch(() => getReviews(token));
 *
 * TODO: wire up once the backend is ready.
 */
export function useFetch(fetcherFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcherFn();
        if (!cancelled) setData(result);
      } catch (err) {
        if (err.status === 401) {
          logout();
          navigate('/login');
        } else if (!cancelled) {
          setError(err.message || 'Unexpected error');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
