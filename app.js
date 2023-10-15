const http = require("http");
const fs = require("fs");

const port = 8080;

const getFile = (filename, response, contentType) => {
  fs.readFile(filename, (error, data) => {
    if (error) {
      response.writeHead(500, { "Contanet-Type": "text/plain" });
      response.end("Internal Server Error");
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(data);
    }
  });
};

const getHTMLFile = (filename, response) => {
    getFile(filename, response, 'text/html')
}

const getCSSFile = (filename, response) => {
    getFile(filename, response, 'text/css')
}

const server = http.createServer((request, response) => {
//   console.log(request.url);
//   console.log(request.rawHeaders);
  if (request.method === "GET") {
    switch (request.url) {
      case "/": {
        getHTMLFile("index.html", response);
        break;
      }
      case "/about": {
        getHTMLFile("about.html", response);
        break;
      }
      case "/contact-me": {
        getHTMLFile("contact-me.html", response);
        break;
      }
      case "/style.css": {
        getCSSFile('style.css', response);
        break;
      }
      case "/favicon.ico": {
        getFile('favicon.png', response, 'image/png');
        break;
      }
      default: {
        getHTMLFile("404.html", response);
        break;
      }
    }
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
