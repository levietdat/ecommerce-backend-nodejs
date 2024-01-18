const app = require("./src/app");

const server = app.listen(process.env.DEV_APP_PORT, () => {
  console.log(`Server listening on port ${process.env.DEV_APP_PORT}`);
});

// process.on("SIGINT", () => {
//   server.close(() => console.log(`Server in PORT ${PORT} closed`));
// });
