// oak is pretty much similar to express in nodejs
import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import works from "./models/work.json" with { type: "json" };

const router = new Router();

router
  .get("/works", (context) => {
    console.log('Processando requisição! /works');
    context.response.body = works;
  })
  .get("/", (context) => {
    console.log('Processando requisição! /');
    context.response.body = "Hello world!";
  });

// Create Application Like Express
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const opt = { hostname: "0.0.0.0", port: 5000 };
await app.listen(opt);
console.log(`Starting ${opt}`);