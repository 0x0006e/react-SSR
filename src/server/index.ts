import "~/server/polyfill.server"

import Koa from "koa"
import Statics from "koa-static"

import resolveRoot from "~/libs/resolveRoot"

import reactApplication from "~/server/middlewares/reactApplication"
import apiErrorHandler from "~/server/middlewares/apiErrorHandler"

type Port = string | number

const port = process.env.PORT || 8083

const createServer = (port: Port) => {
  const app = new Koa()

  app.use(Statics(resolveRoot("dist")))

  app.use(reactApplication)
  app.use(apiErrorHandler)

  app.listen(port, () => console.log(`web server listening ${port}`))
}

createServer(port)
