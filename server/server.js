const express = require("express");
const mongoose = require("mongoose");
const http = require("http"); 
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth_routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const chatRoutes = require("./routes/shop/chat-routes"); 

const commonFeatureRouter = require("./routes/common/feature-routes");

// Load environment variables from .env file
require('dotenv').config();


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://ecommerce-mern-stack-teal.vercel.app", // Vercel frontend
];

  const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'https://ecommerce-mern-stack-teal.vercel.app', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
   allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ], 
  credentials: true, 
};


const io = new Server(server, {
  cors: {
    origin: "https://ecommerce-mern-stack-teal.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Received message:", data);
    io.emit("message", data); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


app.use(cors(corsOptions));


app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products",adminProductsRouter)
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/chat", chatRoutes);

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
