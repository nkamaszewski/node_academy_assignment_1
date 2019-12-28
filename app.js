const http = require("http");

const path = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;
  res.statusCode = 200;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '<html><body><h3>Hello user!</h3><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body></html>'
    );
    res.end();
  } else if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><ul><li>User 01</li><li>User 02</li></ul></body></html>"
    );
  } else if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
      res.end(`<html><body><p>${username}</p></body></html>`);
    });
  }
});

server.listen(port, path, () => {
  console.log(`Server is running on ${path}:${port}`);
});
