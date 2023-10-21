const http = require("http");
const fs = require("fs");
const express = require("express");

const port = 8080;
const app = express();

const getFile = (filename, response, contentType) => {
  fs.readFile(filename, (error, data) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Internal Server Error");
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(data);
    }
  });
};

app.get("/", (req, res) => {
  getFile("index.html", res, "text/html");
});

app.get("/about", (req, res) => {
  getFile("about.html", res, "text/html");
});

app.get("/contact-me", (req, res) => {
  getFile("contact-me.html", res, "text/html");
});

app.get("/style.css", (req, res) => {
  getFile("style.css", res, "text/css");
});

app.get("/favicon.ico", (req, res) => {
  getFile("favicon.png", res, "image/png");
});

app.use((req, res, next) => {
  res.status(404);
  getFile("404.html", res, "text/html");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
