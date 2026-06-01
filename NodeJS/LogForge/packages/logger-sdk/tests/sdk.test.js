let sdk;

function makeResponse(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(body)
  };
}

describe('logforge-logger-sdk', () => {
  beforeEach(() => {
    vi.resetModules();
    global.fetch = vi.fn();
    sdk = require('../src/index');
  });

  it('requires init before log', async () => {
    await expect(sdk.log({ message: 'x', level: 'INFO' })).rejects.toThrow(/init/i);
  });

  it('validates level and sends request with api key', async () => {
    sdk.init({
      apiKey: 'abc',
      appName: 'shop-app',
      baseUrl: 'http://localhost:5000'
    });

    fetch.mockResolvedValue(makeResponse(201, { log: { id: '1' } }));

    const result = await sdk.log({ message: 'ok', level: 'INFO' });

    expect(result.ok).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/applications/shop-app/logs',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'x-api-key': 'abc'
        })
      })
    );
  });

  it('retries transient server errors', async () => {
    sdk.init({
      apiKey: 'abc',
      appName: 'shop-app',
      baseUrl: 'http://localhost:5000',
      maxRetries: 2
    });

    fetch
      .mockResolvedValueOnce(makeResponse(500, { message: 'temporary' }))
      .mockResolvedValueOnce(makeResponse(201, { log: { id: '1' } }));

    const result = await sdk.log({ message: 'retry me', level: 'WARN' });

    expect(result.ok).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('returns non-throwing error payload when configured', async () => {
    sdk.init({
      apiKey: 'abc',
      appName: 'shop-app',
      baseUrl: 'http://localhost:5000',
      throwOnError: false,
      maxRetries: 0
    });

    fetch.mockResolvedValue(makeResponse(403, { message: 'forbidden' }));

    const result = await sdk.log({ message: 'oops', level: 'ERROR' });

    expect(result.ok).toBe(false);
    expect(result.status).toBe(403);
  });
});
