# logforge-logger-sdk

Server SDK for sending logs to the LogForge logging backend.

Requires Node.js 18 or newer.

## Install

```bash
npm install logforge-logger-sdk
```

## Usage

```js
const logger = require('logforge-logger-sdk');

logger.init({
  apiKey: 'YOUR_API_KEY',
  appName: 'shop-app',
  baseUrl: 'http://localhost:5000',
  maxRetries: 2,
  throwOnError: false
});

await logger.log({
  message: 'Payment failed',
  level: 'ERROR'
});
```

## API

### `init(options)`

- `apiKey` (required)
- `appName` (required, no whitespace, maximum 80 characters)
- `baseUrl` (required, HTTP or HTTPS URL)
- `throwOnError` (optional, default `false`)
- `maxRetries` (optional, default `2`)
- `timeoutMs` (optional, default `5000`)

### `log({ message, level })`

- `message`: required string, maximum 500 characters
- `level`: `INFO | WARN | ERROR`

Returns:

```js
{
  ok: boolean,
  status: number,
  data?: any,
  error?: string
}
```
