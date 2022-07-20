#!/usr/bin/env zx

const { version } = await fs.readJson("./package.json")
echo("Building Docker image", chalk.cyan(`#${version}`))

await $`docker build -t subztep/secretsmanager-local:${version} .`
await $`docker tag subztep/secretsmanager-local:${version} subztep/secretsmanager-local:latest`
await $`docker run -p 7000:7000 subztep/secretsmanager-local:latest`
