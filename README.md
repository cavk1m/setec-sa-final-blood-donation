# Blood Donation System - Full Stack

A comprehensive full-stack blood donation management system built with Spring Boot backend and Next.js frontends (public website + admin dashboard).

## Overview

This is a production-ready blood donation management platform featuring:
- **Backend API**: Spring Boot 3.x REST API with PostgreSQL
- **Public Website**: Next.js and React public-facing interface
- **Admin Dashboard**: Next.js admin panel with Ant Design
- **Containerization**: Docker Compose orchestration for all services
- **Developer Experience**: TypeScript, hot reload, modern tooling

## Technology Stack

### Backend
- **Java 17** with Spring Boot 3.4.3
- **Maven 3.9.3** for dependency management
- **PostgreSQL 16** for data persistence
- **Spring Data JPA** for ORM
- **Spring Web** for REST APIs
- **Lombok** for reducing boilerplate

### Frontend (Website)
- **Next.js 16.1.6** with React 19.2.3
- **TypeScript 5.9.3** for type safety
- **Tailwind CSS 4.2.1** for styling
- **TanStack React Query 5.90.21** for server state management
- **Axios 1.13.6** for HTTP requests
- **shadcn/ui** for UI components
- **Day.js 1.11.19** for date handling

### Frontend (Dashboard)
- **Next.js 16.1.6** with React 19.2.4
- **Ant Design 6.3.2** for enterprise UI components
- **TypeScript 5.9.3** for type safety
- **Tailwind CSS 4.2.1** for styling
- **TanStack React Query 5.90.21** for data fetching
- **Axios 1.13.6** for HTTP requests
- **Day.js 1.11.19** for date handling

### DevOps
- **Docker** for containerization
- **Docker Compose** for orchestration
- **PostgreSQL 16** containerized database
- **pnpm 10.32.0** for Node.js package management

## Project Structure

```
setect-sa-final-blood-donation/
├── backend/                          # Spring Boot backend
│   ├── Dockerfile                    # Backend container definition
│   ├── pom.xml                       # Maven project configuration
│   └── src/
│       ├── main/java/com/setect/backend/
│       │   ├── BackendApplication.java
│       │   └── controller/
│       │       └── GreetingController.java
│       └── main/resources/
│           └── application.properties
│
├── website/                          # Public website (Next.js)
│   ├── Dockerfile
│   ├── package.json
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── axios.ts
│       ├── queryClient.ts
│       └── features/
│           └── greeting/
│               └── Greeting.tsx
│
├── dashboard/                        # Admin dashboard (Next.js)
│   ├── Dockerfile
│   ├── package.json
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── axios.ts
│       ├── queryClient.ts
│       └── features/
│           └── greeting/
│               └── Greeting.tsx
│
├── docker-compose.yml               # Orchestration configuration
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 24+ (for local development)
- Java 17+ (for local backend development)
- Maven 3.9.3+ (for local backend building)

### Running with Docker Compose

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd setect-sa-final-blood-donation
   ```

2. **Start all services**
   ```bash
   docker compose up --build
   ```

3. **Access the applications**
   - Backend API: http://localhost:8081
   - Public Website: http://localhost:3000
   - Admin Dashboard: http://localhost:3001

4. **View logs**
   ```bash
   docker compose logs -f
   ```

5. **Stop services**
   ```bash
   docker compose down
   ```

### Local Development Setup

#### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
# Runs on http://localhost:8081
```

#### Website
```bash
cd website
pnpm install
pnpm dev
# Runs on http://localhost:3000
```

#### Dashboard
```bash
cd dashboard
pnpm install
pnpm dev
# Runs on http://localhost:3001
```

## API Documentation

### Base URL
- **Development**: http://localhost:8081
- **Production**: [Configure based on deployment]

### Authentication
- Currently uses CORS for cross-origin requests
- `@CrossOrigin` annotation enables cross-origin API calls

### Endpoints

#### GET /api/greeting
Returns a test greeting message.

**Response:**
```json
"Hello Team!"
```

**Status Code**: 200 OK

**CORS Headers**:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: *
```

## Architecture

### Services Communication
```
┌─────────────────────┐
│   PostgreSQL 16     │
│   (localhost:5432)  │
└──────────┬──────────┘
           │
           │ JDBC Connection
           ▼
┌─────────────────────────────────────┐
│  Spring Boot Backend                │
│  (localhost:8081)                   │
│  - GreetingController               │
│  - CORS Enabled                     │
└─────────────────────────────────────┘
       ▲                  ▲
       │ HTTP REST        │ HTTP REST
       │ Axios            │ Axios
       │                  │
   ┌───┴──────────┐   ┌──┴──────────┐
   │   Website    │   │  Dashboard  │
   │   (port 3000)│   │ (port 3001) │
   │   Next.js    │   │   Next.js   │
   └──────────────┘   └─────────────┘
```

### Data Flow
1. **Client Request**: Website/Dashboard uses Axios to call backend API
2. **Query Caching**: TanStack React Query caches responses
3. **Backend Processing**: Spring Boot controller handles request
4. **Database Access**: Spring Data JPA queries PostgreSQL
5. **Response**: JSON response sent back to client with CORS headers

## Configuration

### Backend Configuration (application.properties)
```properties
# Server
server.port=8081

# PostgreSQL
spring.datasource.url=jdbc:postgresql://db:5432/blood_donation
spring.datasource.username=postgres
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### Frontend Configuration (Axios)
```typescript
const api = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Docker Compose Services

**PostgreSQL Database**
- Image: `postgres:16`
- Port: 5432 (internal)
- Volume: `postgres_data` (persistent storage)
- Database: `blood_donation`

**Backend Service**
- Dockerfile: Multi-stage Maven build
- Port: 8081
- Environment: PostgreSQL connection string
- Depends on: db service

**Website Service**
- Dockerfile: Node 24-Alpine with pnpm
- Port: 3000
- Command: `pnpm dev`

**Dashboard Service**
- Dockerfile: Node 24-Alpine with pnpm
- Port: 3001 (external) → 3000 (internal)
- Command: `pnpm dev`

## Dependencies

### Backend (Maven)
- `spring-boot-starter-web`: REST API support
- `spring-boot-starter-data-jpa`: ORM and database access
- `postgresql`: PostgreSQL JDBC driver
- `lombok`: Boilerplate reduction
- All dependencies defined in `backend/pom.xml`

### Website & Dashboard (npm/pnpm)
- `next`: React framework
- `react`: UI library
- `@tanstack/react-query`: Server state management
- `axios`: HTTP client
- `tailwindcss`: CSS framework
- `dayjs`: Date utility
- All dependencies listed in respective `package.json`

## Testing

### Manual API Testing with curl
```bash
# Test backend connectivity
curl -X GET http://localhost:8081/api/greeting \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" \
  -v

# Expected response:
# "Hello Team!"
# With Access-Control-Allow-Origin: * header
```

### Testing Through UI
1. Open http://localhost:3000 (website)
2. Check browser console for API call logs
3. Verify greeting message displays
4. Open http://localhost:3001 (dashboard)
5. Verify greeting displays in Ant Design Card

## Docker Commands

### Build Services
```bash
# Build all services
docker compose build

# Build specific service
docker compose build backend
docker compose build website
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f website

# Last 50 lines
docker compose logs --tail=50
```

### Database Access
```bash
# Connect to PostgreSQL
docker compose exec db psql -U postgres -d blood_donation

# List tables
\dt

# View data
SELECT * FROM table_name;
```

### Clean Up
```bash
# Stop and remove containers
docker compose down

# Remove volumes (delete data)
docker compose down -v

# Remove images
docker image rm setect-sa-final-blood-donation-backend \
                  setect-sa-final-blood-donation-website \
                  setect-sa-final-blood-donation-dashboard
```

## Development Workflow

### Code Editing
1. **Backend**: Edit Java files → Recompile with `mvn compile`
2. **Website/Dashboard**: Edit TypeScript/React files → Auto-reload with pnpm dev

### Adding Features
1. Create API endpoint in backend controller
2. Add query/mutation in frontend with TanStack Query
3. Update component to use new data
4. Test through UI and with curl
5. Commit changes: `git add . && git commit -m "..."`

### Debugging
- **Backend**: Check logs: `docker compose logs backend`
- **Website**: Browser DevTools (F12)
- **Dashboard**: Browser DevTools (F12)
- **Database**: Connect with `docker compose exec db psql ...`

## Key Features

- ✅ Full-stack architecture with modern frameworks
- ✅ Type-safe code with TypeScript everywhere
- ✅ REST API with CORS support
- ✅ Responsive UI with Tailwind CSS
- ✅ Enterprise-grade dashboard with Ant Design
- ✅ Server state management with TanStack Query
- ✅ Docker containerization and orchestration
- ✅ PostgreSQL persistence layer
- ✅ Hot module reload in development
- ✅ Production-ready configuration

## Security Considerations

### Current Implementation
- CORS enabled for all origins (`*`) - suitable for development
- No authentication/authorization implemented yet
- API runs on internal Docker network
- Database credentials in application.properties

### Production Recommendations
1. **CORS**: Restrict origins to specific domains
2. **Authentication**: Implement JWT or OAuth2
3. **Authorization**: Add role-based access control
4. **Database**: Use environment variables for credentials
5. **HTTPS**: Enable SSL/TLS in production
6. **Input Validation**: Add request validation on backend
7. **Rate Limiting**: Implement API rate limiting
8. **Logging**: Centralize logs with ELK stack or similar

## Environment Variables

### Backend (application.properties)
```properties
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/blood_donation
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=password
```

### Frontend
- No sensitive environment variables required for development
- In production, configure API_BASE_URL for production backend

## Troubleshooting

### Services Won't Start
1. Check ports are not in use: `lsof -i :8081` (port 8081), etc.
2. View logs: `docker compose logs service_name`
3. Rebuild: `docker compose build --no-cache`

### CORS Errors in Browser
- Backend requires `@CrossOrigin` annotation on controller
- Check frontend is calling correct API endpoint
- Verify baseURL in Axios configuration

### Database Connection Failed
- Ensure PostgreSQL container is running: `docker compose ps`
- Check connection string in application.properties
- Verify network connectivity: `docker compose exec backend ping db`

### Frontend Not Loading
- Check Node/pnpm versions
- Clear .next build: `rm -rf website/.next dashboard/.next`
- Rebuild: `docker compose build --no-cache`

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit changes: `git commit -am "Add feature description"`
4. Push to branch: `git push origin feature/your-feature`
5. Create Pull Request

## Project Status

**Status**: ✅ Complete - Core architecture and testing complete

**Completed**:
- ✅ Backend Spring Boot API with PostgreSQL
- ✅ Public website with Next.js
- ✅ Admin dashboard with Ant Design
- ✅ Docker Compose orchestration
- ✅ CORS configuration
- ✅ API endpoint paths verified
- ✅ All services running and tested
- ✅ Documentation complete

**Future Enhancements**:
- Blood donation database models and endpoints
- User authentication and authorization
- Donation scheduling system
- Admin analytics and reporting
- Mobile-responsive improvements
- Payment integration for blood bank fees
- Email notifications
- API documentation with Swagger/OpenAPI

## License

[Add your license here]

## Support

For issues and questions:
1. Check troubleshooting section above
2. Review Docker logs: `docker compose logs`
3. Check GitHub Issues
4. Contact: [Add contact information]

---

**Last Updated**: March 11, 2024
**Version**: 1.0.0
**Author**: Development Team
