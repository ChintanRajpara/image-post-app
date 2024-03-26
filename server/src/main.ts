import express from "express";
import cors from "cors";
import morgan from "morgan";
import env from "./utils/env.js";
import imageRoutes from "./routes/index.js";

const app = express();

app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" "),
  ),
);
app.use(cors());
app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: "application/webhook+json" }));
app.use(imageRoutes);

app.use(express.static("public"));

app.listen(env.APP_LISTEN_PORT, () =>
  console.log(`Server running on http://localhost:${env.APP_LISTEN_PORT}`),
);
