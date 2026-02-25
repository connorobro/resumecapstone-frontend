const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper to build headers with optional auth token
function headers(token) {
  const h = { 'Content-Type': 'application/json' };
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

// ──────────────────────────────────────────
// Auth
// ──────────────────────────────────────────

/**
 * POST /auth/register
 * @param {{ username: string, password: string }} credentials
 */
export async function register(credentials) {
  // TODO: implement when backend is ready
  throw new Error('Not implemented');
}

/**
 * POST /auth/login
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ token: string }>}
 */
export async function login(credentials) {
  // TODO: implement when backend is ready
  throw new Error('Not implemented');
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
  // TODO: implement when S3 / Bedrock are ready
  throw new Error('Not implemented');
}

/**
 * GET /reviews
 * Fetch all reviews for the logged-in user.
 * @param {string} token
 * @returns {Promise<object[]>}
 */
export async function getReviews(token) {
  // TODO: implement when backend is ready
  throw new Error('Not implemented');
}

/**
 * GET /reviews/:id
 * Fetch a single review result.
 * @param {string|number} id
 * @param {string} token
 * @returns {Promise<object>}
 */
export async function getReview(id, token) {
  // TODO: implement when backend is ready
  throw new Error('Not implemented');
}
