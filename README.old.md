# Resume Reviewer — Frontend

## Project Overview
An AI-powered resume reviewer that scores resumes against California Community College standards. Users create an account, log in, upload a resume, and receive an AI-generated score and feedback. All past reviews are saved and accessible from the user's dashboard.

## Full Stack
| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js / Express |
| Database | PostgreSQL (AWS RDS) |
| File Storage | AWS S3 |
| AI | AWS Bedrock (Claude) |
| Frontend Hosting | AWS Amplify |
| Backend Hosting | AWS Elastic Beanstalk |

## What the Frontend Owns
- All UI and user-facing pages
- Routing between pages
- Auth state (storing JWT token, protecting routes)
- Sending resume files to the backend via multipart form
- Displaying AI results returned from the backend
- Displaying review history

## Pages
- `/register` — create a new account (username + password, no OAuth)
- `/login` — log in, receives a JWT token from the backend
- `/dashboard` — shows the upload form and the user's past reviews
- `/review/:id` — shows the full result for a specific review

## API Contract
The frontend talks to the backend via REST. Base URL is stored in an environment variable `REACT_APP_API_URL`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in, returns JWT |
| POST | `/reviews` | Upload a resume (multipart/form-data) |
| GET | `/reviews` | Get all reviews for logged in user |
| GET | `/reviews/:id` | Get a single review result |

All requests except register and login require an `Authorization: Bearer <token>` header.

## Auth
- On login the backend returns a JWT token
- Store the token in memory or localStorage
- Attach it to every protected request as a Bearer token
- If a request returns 401 redirect the user to `/login`

## Resume Upload
- Accept PDF, DOCX, and TXT files only
- Send as `multipart/form-data` with the field name `resume`
- Show a loading state while the backend processes — the AI call may take a few seconds

## Review Result Shape
The backend returns a JSON object after processing. The exact scoring structure is TBD but will include at minimum:
- `overall_score` — integer 0–100
- `overall_summary` — string
- `feedback` — array of category results, each with a score and explanation

## Environment Variables
```
REACT_APP_API_URL=http://localhost:5000
```

## Local Development
```bash
npm install
npm start
```
Runs on `http://localhost:3000`. Expects the backend running on port 5000.