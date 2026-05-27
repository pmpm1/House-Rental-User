# House Rental Website for Myanmar (Full Stack)

Modern house-rental platform inspired by Myanmar property listing websites.

## Tech Decision
- **Frontend:** Next.js (TypeScript) for modern SSR/CSR hybrid and better SEO.
- **Backend:** FastAPI (Python).
- **Infra:** Docker, GitHub Actions CI/CD, AWS ECS deploy target.

## Features Implemented
- House/Apartment/Share-house listing and upload form.
- Search by city and house type.
- Google map embed per listing.
- Bilingual UI switch (English / Myanmar).
- Marketing event banner animation.
- Contact/help section prepared for chatbot integration.
- API layer split from form UI for maintainability.

## Project Structure
- `frontend/` Next.js app
- `backend/` FastAPI app
- `.github/workflows/` CI/CD for test+deploy
- `docs/AWS_DEPLOYMENT_MANUAL.md` AWS step-by-step

## Run Locally
1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. Start:
   ```bash
   docker compose up --build
   ```
3. Open:
   - Frontend: `http://localhost:3000`
   - Backend health: `http://localhost:8000/health`

## Notes
- To push this to your GitHub account, set your remote and run `git push` from your machine.
