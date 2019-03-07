/* eslint-disable no-console */
import bar from '../../src/lib/bar'

describe('bar', () => {
  it('return a string with hello world', () => {
    expect(bar()).toBe('hello world')
  })
})
