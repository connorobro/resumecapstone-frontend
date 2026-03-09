const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Helper to build headers with optional auth token (JSON requests only)
function jsonHeaders(token) {
  const h = { "Content-Type": "application/json" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

// Helper to handle responses consistently
async function handleResponse(res) {
  const text = await res.text();
  let data;

  try {
    data = text? JSON.parse(text) : null;
  } catch {
    data = text; // fallback if not JSON
  }

  if (!res.ok) {
    const msg =
      (data && data.message) ||
      (typeof data === "string" && data) ||
      `Request failed with status ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// ──────────────────────────────────────────
// Auth
// ──────────────────────────────────────────

/**
 * POST /auth/register
 * @param {{ username: string, password: string }} credentials
 */
export async function register(credentials) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(credentials),
  });

  return handleResponse(res);
}

/**
 * POST /auth/login
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ token: string }>}
 */
export async function login(credentials) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(credentials),
  });

  return handleResponse(res);
}

// ──────────────────────────────────────────
// Reviews
// ──────────────────────────────────────────

/**
 * POST /reviews
 * Upload a resume file for AI review.
 * @param {File} file
 * @param {string} token
 * @returns {Promise<object>} review result
 */
export async function uploadResume(file, token) {
  const formData = new FormData();
  formData.append("resume", file); // MUST be "resume"

  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: token? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  return handleResponse(res);
}

/**
 * GET /reviews
 * Fetch all reviews for the logged-in user.
 * @param {string} token
 * @returns {Promise<object[]>}
 */
export async function getReviews(token) {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "GET",
    headers: jsonHeaders(token),
  });

  return handleResponse(res);
}

/**
 * GET /reviews/:id
 * Fetch a single review result.
 * @param {string|number} id
 * @param {string} token
 * @returns {Promise<object>}
 */
export async function getReview(id, token) {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "GET",
    headers: jsonHeaders(token),
  });

  return handleResponse(res);
}
