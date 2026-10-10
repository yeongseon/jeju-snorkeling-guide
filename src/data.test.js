import test from 'node:test'
import assert from 'node:assert/strict'
import { checklist, filterPlaces, places } from './data.js'

test('source-backed list has six unique place names', () => {
  assert.equal(places.length, 6)
  assert.equal(new Set(places.map((place) => place.name)).size, 6)
})

test('region and name filters use only known fields', () => {
  assert.deepEqual(filterPlaces({ region: '제주 서쪽' }).map((place) => place.name), ['판포포구', '월령포구'])
  assert.deepEqual(filterPlaces({ search: '강정' }).map((place) => place.name), ['강정천'])
})

test('unverified facilities never yield a matching recommendation', () => {
  assert.deepEqual(filterPlaces({ transport: true }), [])
  assert.deepEqual(filterPlaces({ rental: true }), [])
})

test('checklist identifiers are stable and unique', () => {
  assert.equal(new Set(checklist.map((item) => item.id)).size, checklist.length)
})
