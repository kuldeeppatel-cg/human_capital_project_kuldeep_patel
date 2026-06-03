# Human Capital Project

An application designed for tracking, managing, and analyzing Human Capital indicators, pricing metrics, and country datasets. This repository provides a backend system powered by Node.js, Express, and MongoDB, alongside a designated placeholder directory for frontend development.

---

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Getting Started / Installation](#getting-started--installation)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Setup](#step-by-step-setup)
- [API Documentation & Routes](#api-documentation--routes)
  - [Base URL Configurations](#base-url-configurations)
  - [System Endpoints](#system-endpoints)
  - [Countries Endpoints](#countries-endpoints)
  - [Indicators Endpoints](#indicators-endpoints)
  - [Prices Endpoints](#prices-endpoints)
  - [Time Endpoints](#time-endpoints)

---

## Introduction

The **Human Capital Project** is a data-driven system built to handle demographic and financial indices. It tracks economic indices (such as indicators and prices) across different countries over time. 

The application utilizes a RESTful API backend to perform CRUD operations on:
- **Countries**: Standardized geographical entities.
- **Indicators**: Specific human capital or socioeconomic metrics.
- **Prices**: Value data tracked across specific time periods (months/years) under distinct indicators.

---

## Project Structure

```text
human_capital_project_kuldeep_patel/
├── Backend/                 # REST API Backend
│   ├── src/
│   │   ├── config/          # Configurations (Database connection)
│   │   ├── controllers/     # Route controller logic
│   │   ├── models/          # Mongoose database schemas
│   │   ├── routes/          # Express routing files
│   │   ├── app.js           # Express App setup & middleware
│   │   └── index.js         # Entry point for the server
│   ├── .env.example         # Environment template file
│   ├── package.json         # Server scripts & dependencies
│   └── package-lock.json    # Dependency lockfile
├── FrontEnd/                # Reserved directory for the UI client
└── README.md                # Project documentation
```

---

## Getting Started / Installation

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v16.x or higher recommended)
- **npm** (v7.x or higher)
- **MongoDB** (Local instance or MongoDB Atlas URI)

---

### Step-by-Step Setup

#### 1. Clone the Repository
```bash
git clone <repository_url>
cd human_capital_project_kuldeep_patel
```

#### 2. Backend Setup
1. **Navigate to the Backend directory:**
   ```bash
   cd Backend
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file by copying the template file:
   ```bash
   cp .env.example .env
   ```
   Open the newly created `.env` file and fill in your details:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/human_capital
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Run the Server:**
   - **For Development** (with automatic hot-reloads via Nodemon):
     ```bash
     npm run dev
     ```
   - **For Production:**
     ```bash
     npm start
     ```

#### 3. Frontend Setup
The `FrontEnd` directory is currently a placeholder and ready for UI implementation (such as React, Vue, or Next.js).

---

## API Documentation & Routes

### Base URL Configurations
All routes are mounted and accessible under both:
- **API Root namespace**: `http://localhost:<PORT>/<route>`
- **API Versioned namespace**: `http://localhost:<PORT>/api/<route>`

---

### System Endpoints

#### Health Check
* **Route**: `/health` or `/api/health`
* **Method**: `GET`
* **Access**: Public
* **Description**: Verifies that the Express server is up and running.
* **Success Response (200 OK)**:
  ```json
  {
    "status": "ok",
    "message": "Server is running"
  }
  ```

---

### Countries Endpoints

#### 1. Get All Countries
* **Route**: `/countries` or `/api/countries`
* **Method**: `GET`
* **Access**: Public
* **Description**: Fetches all country records, sorted alphabetically by name.
* **Success Response (200 OK)**:
  ```json
  [
    {
      "_id": "60d0fe4f5311236168a109ca",
      "code": "US",
      "name": "United States",
      "createdAt": "2026-06-03T10:00:00.000Z",
      "updatedAt": "2026-06-03T10:00:00.000Z"
    }
  ]
  ```

#### 2. Create Country
* **Route**: `/countries` or `/api/countries`
* **Method**: `POST`
* **Access**: Public
* **Description**: Creates a new country.
* **Request Body (JSON)**:
  ```json
  {
    "code": "IN",
    "name": "India"
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "_id": "60d0fe4f5311236168a109cb",
    "code": "IN",
    "name": "India",
    "createdAt": "2026-06-03T10:05:00.000Z",
    "updatedAt": "2026-06-03T10:05:00.000Z"
  }
  ```

---

### Indicators Endpoints

#### 1. Get All Indicators
* **Route**: `/indicators` or `/api/indicators`
* **Method**: `GET`
* **Access**: Public
* **Description**: Fetches all indicators, sorted alphabetically by name.
* **Success Response (200 OK)**:
  ```json
  [
    {
      "_id": "60d0fe4f5311236168a109cc",
      "code": "HC.EDU.TERT",
      "name": "Tertiary Education Rate",
      "description": "Percentage of workforce with tertiary degrees",
      "createdAt": "2026-06-03T10:00:00.000Z",
      "updatedAt": "2026-06-03T10:00:00.000Z"
    }
  ]
  ```

#### 2. Create Indicator
* **Route**: `/indicators` or `/api/indicators`
* **Method**: `POST`
* **Access**: Public
* **Description**: Creates a new human capital indicator.
* **Request Body (JSON)**:
  ```json
  {
    "code": "HC.EDU.TERT",
    "name": "Tertiary Education Rate",
    "description": "Percentage of workforce with tertiary degrees"
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "_id": "60d0fe4f5311236168a109cc",
    "code": "HC.EDU.TERT",
    "name": "Tertiary Education Rate",
    "description": "Percentage of workforce with tertiary degrees",
    "createdAt": "2026-06-03T10:05:00.000Z",
    "updatedAt": "2026-06-03T10:05:00.000Z"
  }
  ```

---

### Prices Endpoints

#### 1. Get All Prices
* **Route**: `/prices` or `/api/prices`
* **Method**: `GET`
* **Access**: Public
* **Description**: Fetches all price records sorted by year and month in descending order.
* **Success Response (200 OK)**:
  ```json
  [
    {
      "_id": "60d0fe4f5311236168a109d0",
      "countryCode": "US",
      "country": "United States",
      "indicator": "HC.EDU.TERT",
      "indicatorName": "Tertiary Education Rate",
      "year": 2026,
      "month": 6,
      "value": 45.2,
      "freq": "M",
      "frequency": "Monthly"
    }
  ]
  ```

#### 2. Get Price by ID
* **Route**: `/prices/:priceId` or `/api/prices/:priceId`
* **Method**: `GET`
* **Access**: Public
* **Description**: Retrieves a single price record details using its MongoDB ID.

#### 3. Get Prices by Country Code
* **Route**: `/prices/country/:countryCode` or `/api/prices/country/:countryCode`
* **Method**: `GET`
* **Access**: Public
* **Description**: Fetches all price records matching the specified country code (case-insensitive).
* **Success Response (200 OK)**: Returns an array of matching price objects.

#### 4. Get Prices by Year
* **Route**: `/prices/year/:year` or `/api/prices/year/:year`
* **Method**: `GET`
* **Access**: Public
* **Description**: Fetches all price records matching the specified year.
* **Success Response (200 OK)**: Returns an array of matching price objects.

#### 5. Get Prices by Month
* **Route**: `/prices/month/:month` or `/api/prices/month/:month`
* **Method**: `GET`
* **Access**: Public
* **Description**: Fetches all price records matching the specified month number.
* **Success Response (200 OK)**: Returns an array of matching price objects.

#### 6. Get Prices by Indicator
* **Route**: `/prices/indicator/:indicator` or `/api/prices/indicator/:indicator`
* **Method**: `GET`
* **Access**: Public
* **Description**: Fetches all price records matching the specified indicator code/name (case-insensitive).
* **Success Response (200 OK)**: Returns an array of matching price objects.

#### 7. Get Prices by Value
* **Route**: `/prices/value/:value` or `/api/prices/value/:value`
* **Method**: `GET`
* **Access**: Public
* **Description**: Fetches all price records matching the exact numeric value.
* **Success Response (200 OK)**: Returns an array of matching price objects.

#### 8. Create Price Record
* **Route**: `/prices` or `/api/prices`
* **Method**: `POST`
* **Access**: Public
* **Description**: Adds a new price record. All fields are required.
* **Request Body (JSON)**:
  ```json
  {
    "countryCode": "US",
    "country": "United States",
    "indicator": "HC.EDU.TERT",
    "indicatorName": "Tertiary Education Rate",
    "year": 2026,
    "month": 6,
    "value": 45.2,
    "freq": "M",
    "frequency": "Monthly"
  }
  ```
* **Success Response (201 Created)**: Returns the saved price object.

#### 9. Replace Price Record
* **Route**: `/prices/:priceId` or `/api/prices/:priceId`
* **Method**: `PUT`
* **Access**: Public
* **Description**: Completely replaces a price record matching the ID. All fields must be sent.

#### 10. Update Price Record Fields
* **Route**: `/prices/:priceId` or `/api/prices/:priceId`
* **Method**: `PATCH`
* **Access**: Public
* **Description**: Modifies specific fields of an existing price record.
* **Request Body (JSON)**: (Include only the fields to update, e.g. `{ "value": 46.5 }`)

#### 11. Delete Price Record
* **Route**: `/prices/:priceId` or `/api/prices/:priceId`
* **Method**: `DELETE`
* **Access**: Public
* **Description**: Deletes a price record.
* **Success Response (200 OK)**:
  ```json
  {
    "message": "Price record deleted successfully",
    "id": "60d0fe4f5311236168a109d0",
    "deletedRecord": { ... }
  }
  ```

---

### Time Endpoints

#### 1. Get Unique Months
* **Route**: `/months` or `/api/months`
* **Method**: `GET`
* **Access**: Public
* **Description**: Fetches all unique month numbers (e.g., `[1, 2, 3...]`) present across all price records and dataset collections.

#### 2. Get Unique Years
* **Route**: `/years` or `/api/years`
* **Method**: `GET`
* **Access**: Public
* **Description**: Fetches all unique years (e.g., `[2024, 2025, 2026]`) present across all price records and dataset collections.