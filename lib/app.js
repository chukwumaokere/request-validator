import express from "express";
import { expressLogger, expressErrorLogger } from "./logger";

const app = express();

app.use(expressLogger);
require("./middleware/express").default(app);
require("./routes").default(app);
app.use(expressErrorLogger);

export default app;
