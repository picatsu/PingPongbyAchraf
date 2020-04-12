const http = require("http");
const app = require("./routes/routes");
const port = process.env.PORT || 3000;
const server = http.createServer(app);

//////// FIREBASE

///////////// END FIREBASE
server.listen(port);
console.log("server starting on port :", 3000);
