# AWS Secrets Manager:tm: — _on localhost_

Minimal AWS Secrets Manager server mock

- HTTP only
- Consentaneous response :trollface:
- Public Docker image
- Zero dependencies
- PR welcome

## Usage

### Client setup

```js
const client = new SecretsManagerClient({
  region: "eu-west-1",
  endpoint: "http://localhost:7000",
});
```

### Environment variables

| Name          | Description                      | Value            |      Required      |
| ------------- | -------------------------------- | ---------------- | :----------------: |
| SERVER_PORT   | Express server port              | `7000`           |        :x:         |
| SECRET_NAME   | Secret "table" name              | `TestName`       |        :x:         |
| SECRET_STRING | Secret value in stringified JSON | `{"test":"abc"}` | :heavy_check_mark: |

### CLI

```sh
# Download image
$ docker pull subztep/secretsmanager-local:0.1.0

# Run container
$ docker container run \
  -p 7000:7000 \
  --env SECRET_STRING="{\"test\":\"abc\"}" \
  subztep/secretsmanager-local:0.1.0
```

---

_wip/tbc_
