/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getReviews, uploadResume } from "../services/client";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const [file, setFile] = useState(null);

  useEffect(() => {
    // TODO: fetch reviews when backend is ready
    async function loadReviews() {
      setError(null);
      setLoadingReviews(true);
      try {
        const data = await getReviews(token);
        setReviews(array.isArray(data) ? data : [];
      } catch (err) {
        setError(err.message || "Failed to load reviews.");
      } finally {
        setLoadingReviews(false);
      }
  }

    useEffect(() => {
      if (!token) return;
      loadReviews();
    }, [token]);

    function handleFileChange(e){
      setError(null);
      const selected = e.target.files?.[0] || null;

      if (!selected) {
        setFile(null);
        return;
      }

      //Validate type (best effort) + extension fallback
      const name = selected.name.toLowerCase();
      const hasAllowedExt = name.endsWith(".pdf) || name.endsWith(".docx") || name.endsWith(".txt");

      if (!allowedTypes.has(selected.type) && !hasAllowedExt) {
        setFile(null);
        setError("Please upload a PDF, DOCX, or TXT file.");
        return;
      }
      setFile(selected);
    }

    async function handleUpload(e) {
      e.preventDefault();
      setError(null);

      if (!file) {
        setError("Please chose a file first.");
        return;
      }

      setUploading(true);
      try {
        const result = await uploadResume(file, token);

        //If the backend returns an ID, go straight to the review page.
        //Otherwise reload list.
        if (result && result.id) {
          navigate(`/review/${result.id}`);
        } else {
          await loadReviews();
        }

        setFile(null);
        e.target.reset?.();
      } catch (err) {
        setError(err.message || "Upload failed!");
      } finally {
        setUploading(false);
      }
    }

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard</h1>
        <button onClick={logout}>Log Out</button>
      </header>

      <section>
        <h2>Upload Resume</h2>

        <form onSubmir={handleUpload}>
            <input
            type="file"
            accept=".pdf,.docx,.txt,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            disabled={uploading}
          />
       <button type="submit" disabled={uploading} style={{ marginLeft: 8 }}> {uploading ? "Processing.." : "Upload"}</button>
      </form>
      {uploading && (
          <p>Processing your resume… this may take a few seconds.</p>
        )}
      </section>

      <section style={{ marginTop: 24 }}>
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
