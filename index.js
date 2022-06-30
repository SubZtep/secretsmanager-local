import { createServer } from "node:http"

const {
  SERVER_PORT = 7000,
  SECRET_NAME: Name = "TestName",
  SECRET_STRING: SecretString,
} = process.env

if (!SecretString) {
  console.error("Missing SECRET_STRING environment variable")
  process.exit(1)
}

const server = createServer(async (req, res) => {
  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }
  console.log(`${req.method} ${req.url}`, Buffer.concat(buffers).toString())

  const response = {
    ARN: "xxx",
    Name,
    VersionId: "x",
    SecretString,
    VersionStages: ["x"],
    CreatedDate: 0,
  }
  console.log("RESPONSE", response)

  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(JSON.stringify(response))
})

server.listen(SERVER_PORT, () =>
  console.log(`Secrets Manager is listening on port ${SERVER_PORT}`)
)
