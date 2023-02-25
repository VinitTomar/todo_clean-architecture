import { ExpressAppServer } from "@main/server";

const port = 3300;

const app = ExpressAppServer.setup();

app.listen(port, () => {
  console.log('Express server is running at port: ' + port);
})