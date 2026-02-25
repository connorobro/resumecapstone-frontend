/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: fetch reviews when backend is ready
    // async function load() {
    //   setLoading(true);
    //   try {
    //     const data = await getReviews(token);
    //     setReviews(data);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // load();
  }, [token]);

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <button onClick={logout}>Log Out</button>
      </header>

      <section>
        <h2>Upload Resume</h2>
        {/* TODO: file upload form — waiting on S3 */}
        <p><em>Resume upload coming soon.</em></p>
      </section>

      <section>
        <h2>Past Reviews</h2>
        {loading && <p>Loading reviews…</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && reviews.length === 0 && (
          <p>No reviews yet. Upload your resume to get started.</p>
        )}
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <Link to={`/review/${review.id}`}>
                Review #{review.id} — Score: {review.overall_score}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
