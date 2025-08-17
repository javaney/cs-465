# Travlr Getaways - Full Stack Web Application

## Project Overview
Travlr Getaways is a comprehensive travel booking platform built using the MEAN stack (MongoDB, Express.js, Angular, Node.js). The application serves both customer-facing and administrative interfaces, providing a complete solution for travel package management and booking.

## Features
- **Customer Website**: Browse and view travel packages with detailed information
- **Admin SPA**: Secure administrative interface for managing trips, users, and bookings
- **Authentication System**: JWT-based security with user registration and login
- **RESTful API**: Complete CRUD operations for trip management
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Database Integration**: MongoDB with Mongoose ODM for data persistence

## Technology Stack
- **Frontend**: Angular 18, Bootstrap 5, HTML5, CSS3
- **Backend**: Node.js, Express.js, Handlebars templating
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens, Passport.js, PBKDF2 password hashing
- **Development Tools**: Angular CLI, npm, Git

## Architecture

### Frontend Development Comparison

This project utilized three distinct frontend approaches:

**Express HTML with Handlebars Templates:**
- Server-side rendering for the customer-facing website
- Dynamic content generation using HBS templating engine
- Traditional MVC pattern with routes, controllers, and views
- SEO-friendly with faster initial page loads
- Used for public pages like trip listings and general information

**JavaScript Enhancement:**
- Client-side interactivity for form validation and dynamic content
- DOM manipulation for enhanced user experience
- Event handling for user interactions
- Progressive enhancement of static HTML content

**Single-Page Application (Angular):**
- Modern component-based architecture for the admin interface
- Client-side routing and state management
- Rich user interactions with real-time updates
- TypeScript for enhanced development experience
- Reactive forms with comprehensive validation
- Service-based architecture for API communication

### NoSQL MongoDB Database Choice

The backend utilizes MongoDB for several strategic reasons:

1. **Flexible Schema**: Travel data varies significantly (different trip types, amenities, pricing structures), making MongoDB's document-based approach ideal
2. **JSON-Native**: Seamless integration with JavaScript/Node.js ecosystem
3. **Scalability**: Horizontal scaling capabilities for growing travel inventory
4. **Performance**: Fast read operations for trip searches and listings
5. **Development Speed**: Rapid prototyping and schema evolution during development

## Functionality

### JSON vs JavaScript

**JavaScript** is a programming language that provides:
- Logic and functionality for web applications
- Event handling and DOM manipulation
- Client-side and server-side execution capabilities

**JSON (JavaScript Object Notation)** is a data format that:
- Provides lightweight data interchange between frontend and backend
- Maintains language-independent data structure
- Enables seamless API communication

**Integration in Full Stack Development:**
JSON serves as the communication bridge in our application:
- **API Responses**: Trip data sent from Express server to Angular client as JSON
- **Form Submissions**: User input serialized as JSON for database storage
- **Configuration**: Application settings and environment variables
- **Database Documents**: MongoDB stores data in BSON (Binary JSON) format

Example data flow:
```
MongoDB Document → Express API (JSON) → Angular Service → Component Display
```

### Code Refactoring and UI Components

**Refactoring Instances:**

1. **Static HTML to Dynamic Templates**
   - Converted static trip listings to Handlebars templates
   - Benefits: Dynamic content, reduced code duplication, easier maintenance

2. **Monolithic Forms to Reactive Forms**
   - Refactored basic HTML forms to Angular reactive forms
   - Benefits: Better validation, type safety, reusable form controls

3. **Authentication Service Creation**
   - Centralized authentication logic into a dedicated service
   - Benefits: Code reusability, consistent auth state management, easier testing

**Reusable UI Components Benefits:**
- **Trip Card Component**: Consistent trip display across different pages
- **Navbar Component**: Unified navigation with authentication state
- **Form Components**: Standardized input validation and styling
- **Reduced Development Time**: Write once, use everywhere
- **Consistent UX**: Uniform look and feel across the application
- **Easier Maintenance**: Single point of updates for component changes

## Testing

### API Testing Methods and Security

**HTTP Methods Understanding:**
- **GET**: Retrieve trip data (public endpoints)
- **POST**: Create new trips, user registration/login (protected)
- **PUT**: Update existing trips (admin-only, JWT required)
- **DELETE**: Remove trips (admin-only, JWT required)

**Endpoint Security Layers:**
1. **CORS Configuration**: Controlled cross-origin access
2. **JWT Middleware**: Token validation for protected routes
3. **Route Protection**: Authentication checks before controller execution
4. **Input Validation**: Mongoose schema validation and form validation

**Testing Challenges with Security:**
- **Token Management**: Ensuring valid JWT tokens for protected endpoint testing
- **Authentication Flow**: Testing login/logout scenarios and token expiration
- **Authorization Levels**: Verifying different user roles and permissions
- **Error Handling**: Testing unauthorized access and invalid token scenarios

**Testing Methods Used:**
- **Postman**: API endpoint testing with authentication headers
- **Browser Testing**: Frontend authentication flow and UI interactions
- **Command Line**: PowerShell commands for API validation
- **Integration Testing**: End-to-end user workflows

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd travlr
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd app_admin && npm install
   ```

3. **Environment Setup**
   - Create `.env` file with MongoDB connection string and JWT secret
   - Configure database connection in `app_api/models/db.js`

4. **Start the application**
   ```bash
   # Backend server (port 3002)
   npm start
   
   # Frontend admin app (port 4200)
   cd app_admin && ng serve
   ```

## API Endpoints

### Public Endpoints
- `GET /api/trips` - Retrieve all trips
- `GET /api/trips/:tripid` - Get trip by ID
- `GET /api/trips/code/:tripcode` - Get trip by code

### Protected Endpoints (JWT Required)
- `POST /api/trips` - Create new trip
- `PUT /api/trips/:tripcode` - Update trip
- `DELETE /api/trips/:tripcode` - Delete trip

### Authentication Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login

## Security Features
- JWT token-based authentication
- PBKDF2 password hashing with salt
- Protected API endpoints
- Automatic token expiration handling
- CORS configuration for secure cross-origin requests

## Future Enhancements
- Customer booking functionality
- Payment integration
- Email notifications
- Advanced search and filtering
- User profile management
- Trip reviews and ratings

## Reflection

### Professional Development Impact

This course has significantly advanced my capabilities as a full stack developer and enhanced my marketability in several key areas:

**Technical Skills Mastered:**
- **MEAN Stack Proficiency**: Comprehensive understanding of MongoDB, Express.js, Angular, and Node.js integration
- **RESTful API Development**: Design and implementation of scalable API architectures
- **Authentication & Security**: JWT implementation, password hashing, and secure endpoint protection
- **Database Design**: NoSQL schema design and optimization for web applications
- **Modern Frontend Development**: Component-based architecture, reactive programming, and TypeScript

**Professional Competencies Developed:**
- **Full Stack Architecture**: Ability to design and implement complete web application ecosystems
- **Security Best Practices**: Understanding of web application security vulnerabilities and mitigation strategies
- **Code Organization**: Modular development practices and separation of concerns
- **Testing Methodologies**: API testing, integration testing, and debugging techniques
- **Version Control**: Git workflow management and collaborative development practices

**Career Advancement:**
This project demonstrates my ability to deliver enterprise-level applications that meet real-world business requirements. The combination of customer-facing and administrative interfaces showcases versatility in addressing different user needs and technical challenges. The security implementation and professional code organization reflect industry-standard development practices that employers value.

**Marketable Skills Gained:**
- Full stack web development using modern frameworks
- Database design and management
- API development and integration
- Security implementation and best practices
- Responsive web design and user experience
- Project management and requirement analysis

This comprehensive project serves as a portfolio piece that demonstrates technical proficiency, problem-solving abilities, and the capacity to deliver complete software solutions from conception to deployment.

## License
This project is developed for educational purposes as part of CS-465 Full Stack Development coursework.
