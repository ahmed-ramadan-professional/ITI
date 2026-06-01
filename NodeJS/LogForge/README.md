# LogForge

<div align="center">

### Production-Grade Log Management Platform

Real-time log ingestion, deduplication, analytics, developer applications, and a standalone JavaScript logging SDK.

[Features](#features) •
[Architecture](#architecture) •
[Screenshots](#screenshots) •
[Quick Start](#quick-start) •
[SDK](#sdk) •
[API Reference](#api-reference)

</div>

---

## Overview

LogForge is a full-stack log management platform built for developers and teams who need a simple and scalable way to collect, analyze, and visualize application logs.

The platform provides:

- Secure developer authentication
- Application management
- API-key based log ingestion
- Log deduplication
- Analytics dashboards
- Search & filtering
- Standalone publishable logging SDK
- Production-ready backend architecture

---

## Features

### Authentication & Security

- JWT Authentication
- HttpOnly Secure Cookies
- Password Hashing
- Helmet Security Headers
- Rate Limiting
- CORS Protection

### Application Management

- Create Applications
- Delete Applications
- Unique Application Names
- Ownership Enforcement
- API Key Generation

### Log Ingestion

- SDK-based logging
- API Key Validation
- Log Deduplication
- Automatic Count Aggregation
- First Seen Tracking
- Last Seen Tracking

### Log Analytics

- Log Level Distribution
- Daily Activity Trends
- Date Range Filtering
- Search & Filtering
- Pagination
- Sorting

### Dashboard

- Modern React UI
- Responsive Design
- Analytics Charts
- API Key Management
- Application Management

### SDK

- Publishable npm package
- Retries
- Timeout Handling
- Input Validation
- Non-Throwing Mode
- Type-Safe API Design

---

# Screenshots

## Applications Page

![Applications](./screenshots/image-2.png)

---

## Dashboard Overview

![Dashboard](./screenshots/image-3.png)

---

## Analytics

![Analytics](./screenshots/image-4.png)

---

## Logs Table

![Logs](./screenshots/image-5.png)

---

## Architecture

```text
┌─────────────────┐
│ React Dashboard │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Express API     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ MongoDB         │
└─────────────────┘

         ▲
         │
         │ Log Ingestion
         │
┌─────────────────┐
│ Logger SDK      │
└─────────────────┘
```

---

# Monorepo Structure

```text
logforge/
│
├── apps/
│   ├── api/
│   └── dashboard/
│
├── packages/
│   ├── shared/
│   └── logger-sdk/
│
├── screenshots/
│
└── README.md
```

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser

## Frontend

- React
- Vite
- TailwindCSS
- Recharts

## Tooling

- ESLint
- npm Workspaces
- Vitest/Jest
- Prettier

---

# Quick Start

## Prerequisites

- Node.js 20+
- MongoDB

---

## Installation

```bash
git clone https://github.com/yourusername/logforge.git

cd logforge

npm install
```

---

## Environment Variables

### API

Create:

```bash
apps/api/.env
```

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/logforge

JWT_SECRET=your-secret

CLIENT_URL=http://localhost:5173
```

---

### Dashboard

Create:

```bash
apps/dashboard/.env
```

```env
VITE_API_URL=http://localhost:5000
```

---

## Start Development

```bash
npm run dev
```

Services:

| Service   | URL                   |
| --------- | --------------------- |
| API       | http://localhost:5000 |
| Dashboard | http://localhost:5173 |

---

# SDK

Package:

```bash
logforge-logger-sdk
```

## Installation

```bash
npm install logforge-logger-sdk
```

---

## Initialize

```javascript
import { init } from 'logforge-logger-sdk';

init({
  apiKey: 'YOUR_API_KEY',
  appName: 'MyApp',
  baseUrl: 'http://localhost:5000',
});
```

---

## Log Messages

```javascript
import { log } from 'logforge-logger-sdk';

await log({
  level: 'INFO',
  message: 'Application started',
});
```

---

## Advanced Configuration

```javascript
init({
  apiKey: 'YOUR_API_KEY',
  appName: 'MyApp',
  baseUrl: 'http://localhost:5000',
  throwOnError: false,
  maxRetries: 3,
  timeoutMs: 5000,
});
```

---

# API Reference

## Authentication

### Register

```http
POST /api/users/register
```

### Login

```http
POST /api/users/login
```

### Logout

```http
POST /api/users/logout
```

### Current User

```http
GET /api/users/me
```

---

## Applications

### List Applications

```http
GET /api/applications
```

### Create Application

```http
POST /api/applications
```

### Get Application

```http
GET /api/applications/:name
```

### Delete Application

```http
DELETE /api/applications/:name
```

---

## Logs

### Ingest Log

```http
POST /api/applications/:name/logs
```

Headers:

```http
x-api-key: YOUR_API_KEY
```

Body:

```json
{
  "message": "Server started",
  "level": "INFO"
}
```

---

### List Logs

```http
GET /api/applications/:name/logs
```

Query Parameters:

| Parameter | Description    |
| --------- | -------------- | ----- | ----- |
| page      | Page number    |
| limit     | Page size      |
| sortBy    | recent         | count |
| level     | INFO           | WARN  | ERROR |
| search    | Message search |

---

### Analytics

```http
GET /api/applications/:name/logs/analytics
```

Query Parameters:

| Parameter | Description     |
| --------- | --------------- |
| from      | Start date      |
| to        | End date        |
| level     | Optional filter |
| search    | Optional filter |

---

# Self Logging

The API automatically logs its own requests using the LogForge SDK.

Classification:

| Status Code | Level |
| ----------- | ----- |
| 2xx         | INFO  |
| 4xx         | WARN  |
| 404         | ERROR |
| 5xx         | ERROR |

Features:

- Automatic provisioning
- Recursive loop protection
- Request tracking
- Error monitoring

---

# Quality Assurance

Run all verification steps before deployment:

```bash
npm run lint
```

```bash
npm run test
```

```bash
npm run build
```

---

# Deployment

## Backend

Compatible with:

- Railway
- Render
- Fly.io
- AWS
- DigitalOcean
- Docker

## Frontend

Compatible with:

- Vercel
- Netlify
- Cloudflare Pages

---

# Future Improvements

- Real-Time Streaming Logs
- WebSocket Support
- Team Workspaces
- RBAC Permissions
- Alerting System
- Slack Integrations
- OpenTelemetry Support
- Log Retention Policies
- Export to CSV / JSON

---


<div align="center">

Built with ❤️ using React, Express, MongoDB, and Node.js.

</div>
