import { port } from "config";
import { logger } from "./logger";
import app from "./app";

app.listen(port, () => {
  logger.info(
    `Express server listening on port ${port} in ${app.get("env")} mode`
  );
});

module.exports = app;
