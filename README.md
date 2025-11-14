# Job Board API

A professional job board REST API built with NestJS, Prisma, and PostgreSQL. Features role-based access control, file uploads, email notifications, and comprehensive job/application management.

## 🚀 Features

### Authentication & Authorization
- **User Registration** with email verification
- **JWT-based authentication** (access & refresh tokens)
- **Password management** (forgot/reset/change)
- **Role-based access control** (Admin, Employer, Job Seeker)
- **Session management** with refresh token rotation

### User Management
- User profile management with avatar upload
- Account deletion with cleanup
- Email change with password verification

### Company Management
- Create and manage company profiles
- Logo upload via Cloudinary
- Company verification system
- Search and filter companies by industry, size, location

### Job Management
- Create, update, and delete job postings
- Job status management (Draft, Open, Closed, Filled)
- Advanced filtering (type, experience level, salary range)
- Job expiration dates
- Company association

### Application Management
- Submit applications with resume upload
- Role-specific application updates:
  - **Job Seekers**: Update resume, cover letter, salary expectations
  - **Employers**: Update status, add notes
  - **Admins**: Full control over all fields
- Application status tracking with history
- Prevent duplicate applications

### Security & Performance
- **Rate limiting** with multiple tiers (strict, medium, default)
- **Helmet.js** for security headers
- **XSS protection**
- **Input validation** with class-validator
- **File type validation** and size limits
- **Global exception handling**

### File Management
- **Cloudinary integration** for file storage
- Support for images (avatars, logos) and documents (resumes)
- File type verification (MIME type + extension)
- Automatic cleanup on deletion

### API Documentation
- **Swagger/OpenAPI** documentation at `/api/docs`
- Interactive API explorer
- Detailed endpoint descriptions
- Request/response examples
- Authentication flow documentation

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary account (for file uploads)
- SMTP server (for emails)

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd jobboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jobboard"

# JWT Secrets
JWT_ACCESS="your-access-token-secret"
JWT_REFRESH="your-refresh-token-secret"

# Cloudinary
CLOUD_NAME="your-cloudinary-cloud-name"
API_KEY="your-cloudinary-api-key"
API_SECRET="your-cloudinary-api-secret"

# Email (Mailtrap or your SMTP)
MAILTRAP_HOST="smtp.mailtrap.io"
MAILTRAP_USER="your-mailtrap-user"
MAILTRAP_PASS="your-mailtrap-password"

# Frontend URL (for email links)
FRONTEND_URL="http://localhost:3001"

# Server Port
PORT=3000
```

4. **Run database migrations**

```bash
npx prisma migrate deploy
npx prisma generate
```

## 🚀 Running the Application

### Development Mode

```bash
npm run start
```

### Watch Mode (auto-reload)

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

## 📚 API Documentation

Once the server is running, access the interactive Swagger API documentation at:

```
http://localhost:3000/api/docs
```

The Swagger UI provides:
- Complete list of all endpoints
- Request/response schemas
- Try-it-out functionality
- Authentication examples
- Data model definitions

## 🔑 API Endpoints Overview

### Authentication (`/auth`)
- `POST /auth/register` - Register new account
- `GET /auth/verify-email/:token` - Verify email
- `POST /auth/login` - Login
- `POST /auth/refresh-token` - Refresh access token
- `POST /auth/logout` - Logout
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password/:token` - Reset password
- `PUT /auth/change-password` - Change password (authenticated)

### Users (`/users`)
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update profile
- `DELETE /users/me` - Delete account

### Companies (`/companies`)
- `POST /companies` - Create company (Employer/Admin)
- `GET /companies` - List companies (paginated, filterable)
- `GET /companies/:id` - Get company details
- `PUT /companies/:id` - Update company
- `DELETE /companies/:id` - Delete company

### Jobs (`/jobs`)
- `POST /jobs` - Create job posting (Employer/Admin)
- `GET /jobs` - List jobs (paginated, filterable)
- `GET /jobs/:id` - Get job details
- `PUT /jobs/:id` - Update job
- `PATCH /jobs/:id` - Update job status
- `DELETE /jobs/:id` - Delete job

### Applications (`/applications`)
- `POST /applications` - Submit application (Job Seeker)
- `GET /applications` - List applications (role-filtered)
- `GET /applications/:id` - Get application details
- `PUT /applications/:id/job-seeker` - Update own application
- `PUT /applications/:id/employer` - Update application (Employer)
- `PUT /applications/:id/admin` - Update application (Admin)
- `DELETE /applications/:id` - Delete application

## 🔒 Rate Limiting

The API implements tiered rate limiting:

- **Strict** (5 requests/minute): Login, password operations
- **Medium** (10 requests/hour): Company/job creation, profile updates
- **Default** (100 requests/minute): General endpoints
- **Skip**: Read operations (GET requests)

## 📊 Database Schema

### User
- Authentication fields (email, password, tokens)
- Profile data (name, avatar, bio, phone)
- Roles: `JOB_SEEKER`, `EMPLOYER`, `ADMIN`

### Company
- Company information (name, description, industry)
- Contact details (email, phone, website)
- Owned by User (Employer/Admin)

### Job
- Job details (title, description, location)
- Salary range and type
- Experience level and status
- Associated with Company and Employer

### Application
- Resume and cover letter
- Status tracking with history
- Salary expectations and availability
- Linked to Job and Applicant

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📁 Project Structure

```
src/
├── auth/                  # Authentication module
│   ├── DTO/              # Data transfer objects
│   ├── strategy/         # Passport JWT strategy
│   ├── auth.controller.ts
│   └── auth.service.ts
├── users/                # User management
├── companies/            # Company management
├── jobs/                 # Job postings
├── applications/         # Job applications
├── cloudinary/           # File upload service
├── common/               # Shared utilities
│   ├── decorators/       # Custom decorators
│   ├── filters/          # Exception filters
│   ├── guard/            # Auth guards
│   ├── interfaces/       # Type definitions
│   └── utils/            # Helper functions
├── prisma/               # Database service
└── main.ts               # Application entry point

prisma/
├── schema.prisma         # Database schema
└── migrations/           # Database migrations
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Refresh token rotation
- Email verification requirement
- File type validation (MIME + extension check)
- XSS protection
- Helmet security headers
- Rate limiting
- Input validation and sanitization

## 🌐 CORS Configuration

By default, CORS is enabled for `http://localhost:3001`. Update in `main.ts`:

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
});
```

## 📧 Email Templates

Two email templates are included in `src/common/utils/email.ts`:

1. **Email Verification** - Welcome email with verification link
2. **Password Reset** - Password reset link with expiration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.

## 👤 Author

Built with ❤️ using NestJS

## 🐛 Known Issues & Limitations

- Email verification is required before login
- File uploads limited to specific types and sizes
- Rate limiting applies globally (consider Redis for distributed systems)
- Cloudinary is the only supported file storage provider

## 🔮 Future Enhancements

Consider adding:
- Real-time notifications (WebSockets)
- Advanced search with Elasticsearch
- Job recommendations algorithm
- Application analytics dashboard
- Multi-language support
- Social authentication (Google, LinkedIn)
- Resume parsing
- Interview scheduling
- Messaging system between employers and candidates

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Tech Stack:** NestJS | Prisma | PostgreSQL | Cloudinary | JWT | Swagger | TypeScript
