import { createServer } from "node:http"

const {
  SERVER_PORT,
  HEALTHY_TIMEOUT,
  SECRET_NAME: Name,
  SECRET_STRING: SecretString,
  SECRET_VERSION_ID: VersionId,
  SECRET_ARN: ARN,
} = process.env

/*#*
 ** Server
 */

const server = createServer(async (req, res) => {
  const statusCode = isHealthCheck(req) && Number(HEALTHY_TIMEOUT) > process.uptime() ? 500 : 200
  const response = await generateResponse(req)

  res.writeHead(statusCode, { "Content-Type": "application/json" })
  res.end(JSON.stringify(response), () => {
    log(`RESPONSE ${statusCode}`, {
      ...response,
      SecretString: `${SecretString.substring(0, 24)}...`,
    })
  })
})

server.listen(SERVER_PORT, () => log(`Secrets Manager is listening on port ${SERVER_PORT}`))

/*#*
 ** Signals for Docker
 */

process.on("SIGINT", shutdown("SIGINT"))
process.on("SIGTERM", shutdown("SIGTERM"))

/*#*
 ** Hoists
 */

function log(message, ...optionalParams) {
  if (process.env.CONSOLE_OFF) return
  console.log(message, ...optionalParams)
}

function isHealthCheck(req) {
  return req.url === "/health"
}

async function generateResponse(req) {
  if (isHealthCheck(req)) {
    return { status: "UP" }
  }

  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }
  log(`${req.method} ${req.url}`, Buffer.concat(buffers).toString())
  log("REQUEST HEADERS", req.headers)

  return {
    ARN,
    Name,
    VersionId,
    SecretString,
    VersionStages: [VersionId],
    CreatedDate: new Date().toISOString().split(".")[0],
  }
}

function shutdown(name) {
  return () => {
    log(`${name} signal received`)
    server.close(() => {
      log("Server closed")
      process.exit()
    })
  }
}
