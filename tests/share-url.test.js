import assert from 'node:assert/strict'
import test from 'node:test'
import { estimateShareUrl } from '../src/sections/move-in-calculator/share-url.js'
test('plain configured share URL stays compatible', () => {
  assert.equal(estimateShareUrl('https://example.com/move-in-costs', new URLSearchParams({ rent: '120000', c: '4' })), 'https://example.com/move-in-costs?rent=120000&c=4')
})
test('configured source and fragment survive while estimate values replace defaults', () => {
  const url = new URL(estimateShareUrl('https://example.com/move-in-costs?utm_source=justejari&rent=1#estimate', new URLSearchParams({ rent: '120000', c: '4' })))
  assert.equal(url.searchParams.get('utm_source'), 'justejari')
  assert.equal(url.searchParams.getAll('rent').length, 1)
  assert.equal(url.searchParams.get('rent'), '120000')
  assert.equal(url.hash, '#estimate')
})
