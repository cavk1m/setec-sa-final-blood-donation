# Blood Donation System

Full-stack blood donation management platform built with Spring Boot, Next.js, and PostgreSQL.

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 24+ (for local dev)
- Java 17+ (for backend dev)

### Start Everything
```bash
docker compose up --build
```

### Access
- **API**: http://localhost:8081
- **Website**: http://localhost:3000
- **Dashboard**: http://localhost:3001

## Project Structure
```
├── backend/          # Spring Boot API
├── website/          # Public website (Next.js)
├── dashboard/        # Admin panel (Next.js + Ant Design)
└── docker-compose.yml
```

## Tech Stack
- **Backend**: Java 17, Spring Boot 3, PostgreSQL
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Dashboard**: Ant Design, TanStack Query
- **DevOps**: Docker, Docker Compose

## Local Development

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Website
```bash
cd website
pnpm install
pnpm dev
```

### Dashboard
```bash
cd dashboard
pnpm install
pnpm dev
```

## Testing API
```bash
curl http://localhost:8081/api/greeting
```

## Common Troubleshooting
- **Port in use**: Check `lsof -i :8081` (or 3000/3001)
- **DB connection failed**: Ensure PostgreSQL is running
- **CORS errors**: Check backend `@CrossOrigin` annotation

## Key Endpoints
- `GET /api/greeting` - Test greeting message

## Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
git commit -am "Description"
git push origin feature/your-feature

# Create PR
```

## Team Notes
- All services run in Docker Compose for easy local setup
- CORS enabled for development across all origins
- Database auto-migrates on startup
- Frontend hot-reload enabled in dev mode

---
**Last Updated**: March 11, 2026  
**Team**: Blood Donation System Development
