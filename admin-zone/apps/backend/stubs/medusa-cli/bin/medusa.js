#!/usr/bin/env node

const http = require("http")

const command = process.argv[2]

if (command === "db:migrate") {
  console.log("Legacy Medusa backend has been retired. Skipping migrations.")
  process.exit(0)
}

if (command === "start") {
  const port = Number(process.env.PORT || 3000)

  const server = http.createServer((_, res) => {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(
      JSON.stringify({
        ok: true,
        message:
          "Legacy Medusa backend retired. The Linh Trang app now runs as a single Next.js + Payload service on the frontend deployment.",
      })
    )
  })

  server.listen(port, "0.0.0.0", () => {
    console.log(`Legacy backend compatibility stub listening on ${port}`)
  })

  return
}

console.log(`Legacy Medusa stub received unsupported command: ${command || "none"}`)
process.exit(0)
