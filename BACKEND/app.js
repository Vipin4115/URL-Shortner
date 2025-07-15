import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import short_url from "./src/routes/shortUrl.route.js";
import auth_routes from "./src/routes/auth.route.js";
import user_routes from "./src/routes/user.route.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"
dotenv.config({ path: "./.env" });

const app = express();
connectDB();

app.use(cors({
  origin: "https://url-eta-self.vercel.app/",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes);
app.use("/api/create",short_url);


app.get("/:id",redirectFromShortUrl);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
