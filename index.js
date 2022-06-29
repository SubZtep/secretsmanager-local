import http from "node:http"

if (!process.env.SECRET_STRING) {
  console.error("Missing SECRET_STRING environment variable")
  process.exit(1)
}

const port = process.env.SERVER_PORT || 7000

const server = http.createServer(async (req, res) => {
  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const response = {
    ARN: "xxx",
    Name: process.env?.SECRET_NAME ?? "TestName",
    VersionId: "x",
    SecretString: process.env.SECRET_STRING,
    VersionStages: ["x"],
    CreatedDate: 0,
  }

  console.log(`${req.method} ${req.url}`, Buffer.concat(buffers).toString())
  console.log("RESPONSE", response)

  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(JSON.stringify(response))
})

server.listen(port, () =>
  console.log(`Secrets Manager is listening on port ${port}`)
)
