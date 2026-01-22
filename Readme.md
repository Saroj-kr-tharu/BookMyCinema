# Movie Ticket Booking System - Microservice Architecture

This project is a **Movie Ticket Booking System** built using Node.js and MySQL, following a microservice architecture. It consists of five microservices, each responsible for a specific functionality. The system is designed to handle user authentication, movie booking, payment processing, reminders, and API gateway management.

## Microservices Overview

### 1. **Authentication Service**
   - **Description**: Handles user authentication and authorization.
   - **Features**:
     - User registration, login, and account management.
     - Password reset and email verification.
     - Role-based access control.
     - Generates and verifies JSON Web Tokens (JWT) for secure API access.
   - **Impact**:
     - Ensures secure access to the system.
     - Manages user data and roles efficiently.
   - **Usage**:
     - API Endpoints:
       - `POST /api/v1/signup` - Register a new user.
       - `POST /api/v1/signin` - Authenticate a user.
       - `POST /api/v1/sendResetLink` - Send a password reset link.
       - `GET /api/v1/verify` - Verify user email.

---

### 2. **API Gateway**
   - **Description**: Serves as the entry point for all client requests.
   - **Features**:
     - Routes requests to the appropriate microservices.
     - Implements rate limiting to prevent abuse.
     - Enables Cross-Origin Resource Sharing (CORS) for frontend integration.
     - Logs HTTP requests for debugging and monitoring.
   - **Impact**:
     - Simplifies client communication with the system.
     - Enhances security and scalability by centralizing request handling.
   - **Usage**:
     - Proxy routes:
       - `/authservice` - Routes to the Authentication Service.
       - `/booking` - Routes to the Movie Booking Service.
       - `/payment` - Routes to the Payment Microservice.

---

### 3. **Movie Booking Service**
   - **Description**: Manages movie, show, and cinema details, and handles ticket booking.
   - **Features**:
     - CRUD operations for movies, shows, and cinemas.
     - Ticket booking with seat selection and pricing.
     - Integration with the Payment Microservice for payment status updates.
   - **Impact**:
     - Provides a seamless movie booking experience for users.
     - Ensures accurate management of show timings and seat availability.
   - **Usage**:
     - API Endpoints:
       - `POST /api/v1/book` - Book tickets for a movie.
       - `GET /api/v1/movies` - Retrieve a list of movies.
       - `POST /api/v1/cinemas` - Add a new cinema.

---

### 4. **Payment Microservice**
   - **Description**: Handles payment transactions and integrations with multiple payment gateways.
   - **Features**:
     - Supports payment gateways like eSewa, Khalti, and Stripe.
     - Manages payment initialization, verification, and status updates.
     - Integrates with RabbitMQ for asynchronous communication.
   - **Impact**:
     - Ensures secure and reliable payment processing.
     - Provides flexibility with multiple payment options.
   - **Usage**:
     - API Endpoints:
       - `POST /api/v1/payment/initiate` - Initialize a payment.
       - `POST /api/v1/payment/verify` - Verify a payment transaction.

---

### 5. **Reminder Microservice**
   - **Description**: Sends email-based reminders and notifications to users.
   - **Features**:
     - Sends reminders for login, payment, and ticket details.
     - Generates email templates for various notifications.
     - Uses RabbitMQ for message brokering and cron jobs for scheduling tasks.
   - **Impact**:
     - Enhances user engagement with timely notifications.
     - Automates email delivery and status updates.
   - **Usage**:
     - API Endpoints:
       - `POST /api/v1/reminder/create` - Create a new reminder.
       - `GET /api/v1/reminder/pending` - Retrieve pending reminders.

---

## System Impact

- **Scalability**: The microservice architecture allows each service to scale independently based on demand.
- **Security**: The Authentication Service ensures secure access to the system, while the Payment Microservice handles sensitive transactions securely.
- **User Experience**: The Reminder Microservice and Movie Booking Service provide a seamless and engaging experience for users.
- **Maintainability**: Each microservice is modular, making it easier to update and maintain without affecting the entire system.

## Usage

1. **Setup**:
   - Clone the repository and navigate to each microservice directory.
   - Install dependencies using `npm install`.
   - Configure environment variables in the `.env` file for each service.

2. **Run Services**:
   - Start each microservice using `npm start`.
   - Use the API Gateway as the entry point for all client requests.

3. **Integration**:
   - Use the API Gateway to route requests to the appropriate microservices.
   - Ensure RabbitMQ is running for message brokering between services.

---

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

We would like to acknowledge the following resources and libraries that contributed to the development of this system:
- Node.js: https://nodejs.org/
- MySQL: https://www.mysql.com/
- RabbitMQ: https://www.rabbitmq.com/
- Express.js: https://expressjs.com/
- Sequelize ORM: https://sequelize.org/