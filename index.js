import http from "node:http"

if (!process.env.SECRET_STRING) {
  console.error("Missing SECRET_STRING environment variable")
  process.exit(1)
}

const port = process.env.SERVER_PORT || 7000

const server = http.createServer((req, res) => {
  log(req.headers)
  res.setHeader("Content-Type", "application/json")
  req.on("end", () => {
    res.end(
      JSON.stringify({
        ARN: "xxx",
        Name: process.env?.SECRET_NAME ?? "TestName",
        VersionId: "x",
        SecretString: process.env.SECRET_STRING,
        VersionStages: ["x"],
        CreatedDate: 0,
      })
    )
  })
})

server.listen(port, () =>
  console.log(`Secrets Manager local listening on port ${port}`)
)

function log(json) {
  console.info("\x1b[36m%s\x1b[0m", "Request", JSON.stringify(json, null, 2))
}
