const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { default: rateLimit } = require("express-rate-limit");
const cors = require("cors");

const { AUTH_BACKEND_URL, FORTEND_URL, BOOKING_BACKEND_URL, PAYMENT_BACKEND_URL } = require("./serverConfig/serverConfig");

const app = express();
const PORT = 3001;

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 50,
});

app.use(morgan("combined"));
app.use(limiter);




app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:5173', 'https://online-movie-booking-fortend.vercel.app'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
  })
);


const booking_midle_proxy = createProxyMiddleware({
  target: BOOKING_BACKEND_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/booking': '',
  }
});




app.get('/', (req, res) => {
  res.json({
    name: 'Movie Ticket Booking API Gateway',
    version: '1.0.0',
    services: [
      {
        name: 'Authentication Service',
        baseUrl: '/authservice',
        description: 'Handles user authentication, registration, and profile management',
        endpoints: [
          { path: '/authservice/register', method: 'POST', description: 'Register a new user' },
          { path: '/authservice/login', method: 'POST', description: 'User login' },
          { path: '/authservice/profile', method: 'GET', description: 'Get user profile' }
        ]
      },
      {
        name: 'Booking Service',
        baseUrl: '/booking',
        description: 'Manages movie ticket bookings and seat reservations',
        endpoints: [
          { path: '/booking/movies', method: 'GET', description: 'Get available movies' },
          { path: '/booking/shows', method: 'GET', description: 'Get movie showtimes' },
          { path: '/booking/reserve', method: 'POST', description: 'Reserve seats' }
        ]
      },
      {
        name: 'Payment Service',
        baseUrl: '/payment',
        description: 'Handles payment processing for ticket bookings',
        endpoints: [
          { path: '/payment/process', method: 'POST', description: 'Process payment' },
          { path: '/payment/status', method: 'GET', description: 'Check payment status' }
        ]
      }
    ],
    documentation: 'For more details, contact the development team'
  });
});


const auth_midle_proxy = createProxyMiddleware({
  target: AUTH_BACKEND_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/authservice': '',
  },

});

const payment_midle_proxy = createProxyMiddleware({
  target: PAYMENT_BACKEND_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/payment': '',
  },

});


app.use("/authservice", auth_midle_proxy);
app.use("/booking", booking_midle_proxy);
app.use("/payment", payment_midle_proxy);

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
