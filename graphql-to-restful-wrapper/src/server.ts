import app from "./app";

const server = app.listen(8080, () => {
  console.log("Server is listening on 8080 port");
})

export default server;