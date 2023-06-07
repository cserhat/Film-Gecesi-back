import express from "express"
import filmRoutes from "./routes/filmler.js" 
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/server/filmler", filmRoutes);
app.use("/server/users", userRoutes);
app.use("/server/auth", authRoutes);

app.listen(8800, () => {
  console.log('connected');
});
