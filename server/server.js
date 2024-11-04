const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth_routes")

mongoose
  .connect("mongodb+srv://lakharaharsh4:1032006mar@cluster0.1go7m.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "DELETE", "PUT"],
    allowedHEaders: [
      "Countent-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    Credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
