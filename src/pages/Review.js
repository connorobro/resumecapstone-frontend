/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Review() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: fetch review by id when backend is ready
    // async function load() {
    //   setLoading(true);
    //   try {
    //     const data = await getReview(id, token);
    //     setReview(data);
    //   } catch (err) {
    //     if (err.status === 401) navigate('/login');
    //     else setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // load();
  }, [id, token, navigate]);

  return (
    <div>
      <Link to="/dashboard">← Back to Dashboard</Link>
      <h1>Review #{id}</h1>

      {loading && <p>Loading review…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {review ? (
        <div>
          <h2>Overall Score: {review.overall_score} / 100</h2>
          <p>{review.overall_summary}</p>

          <h2>Feedback</h2>
          {review.feedback && review.feedback.length > 0 ? (
            <ul>
              {review.feedback.map((item, index) => (
                <li key={index}>
                  <strong>{item.category}</strong> — Score: {item.score}
                  <p>{item.explanation}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No detailed feedback available.</p>
          )}
        </div>
      ) : (
        !loading && <p><em>Review data will appear here once the backend is connected.</em></p>
      )}
    </div>
  );
}
