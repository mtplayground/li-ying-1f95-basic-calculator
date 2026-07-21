import { describe, expect, it } from 'vitest';

describe('engine unit test runner', () => {
  it('runs without a DOM environment', () => {
    expect('document' in globalThis).toBe(false);
  });
});
