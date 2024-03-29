import { expect } from 'chai'
import 'mocha'
import { CustomMatcher, matchCriteria } from '../src/criteriaMatcher'

describe('matchCriteria', function() {
  it('should match an implicit = operator', function() {
    expect(matchCriteria({ a: 'a' }, { a: 'a' })).to.be.true
    expect(matchCriteria({ a: 'a' }, { a: 'b' })).to.be.false
    expect(matchCriteria({}, { a: 'a' })).to.be.undefined

    expect(matchCriteria({ a: 'a' }, { '@not': true, a: 'a' })).to.be.false
    expect(matchCriteria({ a: 'a' }, { '@not': true, a: 'b' })).to.be.true
    expect(matchCriteria({}, { '@not': true, a: 'a' })).to.be.undefined
  })

  it('should match an implicit = operator involving null', function() {
    expect(matchCriteria({ a: null }, { a: null })).to.be.true
    expect(matchCriteria({}, { a: null })).to.be.undefined
    expect(matchCriteria({ a: 'a' }, { a: null })).to.be.false
    expect(matchCriteria({ a: { b: 'b' }}, { a: null })).to.be.false
    expect(matchCriteria({ a: new Date}, { a: null })).to.be.false

    expect(matchCriteria({ a: null }, { '@not': true, a: null })).to.be.false
    expect(matchCriteria({}, { '@not': true, a: null })).to.be.undefined
    expect(matchCriteria({ a: 'a' }, { '@not': true, a: null })).to.be.true
    expect(matchCriteria({ a: { b: 'b' }}, { '@not': true, a: null })).to.be.true
    expect(matchCriteria({ a: new Date}, { '@not': true, a: null })).to.be.true
  })

  it('should match with operator =', function() {
    expect(matchCriteria({ a: 'a' }, { a: { '@operator': '=', '@value': 'a' }})).to.be.true
    expect(matchCriteria({ a: 'a' }, { a: { '@operator': '=', '@value': 'b' }})).to.be.false
    expect(matchCriteria({}, { a: { '@operator': '=', '@value': 'b' }})).to.be.undefined

    expect(matchCriteria({ a: 'a' }, { '@not': true, a: { '@operator': '=', '@value': 'a' }})).to.be.false
    expect(matchCriteria({ a: 'a' }, { '@not': true, a: { '@operator': '=', '@value': 'b' }})).to.be.true
    expect(matchCriteria({}, { '@not': true, a: { '@operator': '=', '@value': 'b' }})).to.be.undefined
  })

  it('should match with operator >', function() {
    expect(matchCriteria({ a: 5 }, { a: { '@operator': '>', '@value': '4' }})).to.be.true
    expect(matchCriteria({ a: 5 }, { a: { '@operator': '>', '@value': '5' }})).to.be.false
    expect(matchCriteria({}, { a: { '@operator': '>', '@value': '5' }})).to.be.undefined

    expect(matchCriteria({ a: 5 }, { '@not': true, a: { '@operator': '>', '@value': '4' }})).to.be.false
    expect(matchCriteria({ a: 5 }, { '@not': true, a: { '@operator': '>', '@value': '5' }})).to.be.true
    expect(matchCriteria({}, { '@not': true, a: { '@operator': '>', '@value': '5' }})).to.be.undefined
  })

  it('should match with operator >=', function() {
    expect(matchCriteria({ a: 5 }, { a: { '@operator': '>=', '@value': '5' }})).to.be.true
    expect(matchCriteria({ a: 5 }, { a: { '@operator': '>=', '@value': '6' }})).to.be.false
    expect(matchCriteria({}, { a: { '@operator': '>=', '@value': '6' }})).to.be.undefined

    expect(matchCriteria({ a: 5 }, { '@not': true, a: { '@operator': '>=', '@value': '5' }})).to.be.false
    expect(matchCriteria({ a: 5 }, { '@not': true, a: { '@operator': '>=', '@value': '6' }})).to.be.true
    expect(matchCriteria({}, { '@not': true, a: { '@operator': '>=', '@value': '6' }})).to.be.undefined
  })

  it('should match with operator <', function() {
    expect(matchCriteria({ a: 5 }, { a: { '@operator': '<', '@value': '6' }})).to.be.true
    expect(matchCriteria({ a: 5 }, { a: { '@operator': '<', '@value': '5' }})).to.be.false
    expect(matchCriteria({}, { a: { '@operator': '<', '@value': '5' }})).to.be.undefined

    expect(matchCriteria({ a: 5 }, { '@not': true, a: { '@operator': '<', '@value': '6' }})).to.be.false
    expect(matchCriteria({ a: 5 }, { '@not': true, a: { '@operator': '<', '@value': '5' }})).to.be.true
    expect(matchCriteria({}, { '@not': true, a: { '@operator': '<', '@value': '5' }})).to.be.undefined
  })

  it('should match with operator <=', function() {
    expect(matchCriteria({ a: 5 }, { a: { '@operator': '<=', '@value': '5' }})).to.be.true
    expect(matchCriteria({ a: 5 }, { a: { '@operator': '<=', '@value': '4' }})).to.be.false
    expect(matchCriteria({}, { a: { '@operator': '<=', '@value': '4' }})).to.be.undefined

    expect(matchCriteria({ a: 5 }, { '@not': true, a: { '@operator': '<=', '@value': '5' }})).to.be.false
    expect(matchCriteria({ a: 5 }, { '@not': true, a: { '@operator': '<=', '@value': '4' }})).to.be.true
    expect(matchCriteria({}, { '@not': true, a: { '@operator': '<=', '@value': '4' }})).to.be.undefined
  })

  it('should match with operator !=', function() {
    expect(matchCriteria({ a: 'a' }, { a: { '@operator': '!=', '@value': 'aa' }})).to.be.true
    expect(matchCriteria({ a: 'a' }, { a: { '@operator': '!=', '@value': 'a' }})).to.be.false
    expect(matchCriteria({}, { a: { '@operator': '!=', '@value': 'a' }})).to.be.undefined

    expect(matchCriteria({ a: 'a' }, { '@not': true, a: { '@operator': '!=', '@value': 'aa' }})).to.be.false
    expect(matchCriteria({ a: 'a' }, { '@not': true, a: { '@operator': '!=', '@value': 'a' }})).to.be.true
    expect(matchCriteria({}, { '@not': true, a: { '@operator': '!=', '@value': 'a' }})).to.be.undefined
  })

  it('should match with operator != involving null', function() {
    expect(matchCriteria({ a: null }, { a: { '@operator': '!=', '@value': null }})).to.be.false
    expect(matchCriteria({}, { a: { '@operator': '!=', '@value': null }})).to.be.undefined
    expect(matchCriteria({ a: 'a' }, { a: { '@operator': '!=', '@value': null }})).to.be.true
    expect(matchCriteria({ a: { b: 'b' }}, { a: { '@operator': '!=', '@value': null }})).to.be.true
    expect(matchCriteria({ a: new Date}, { a: { '@operator': '!=', '@value': null }})).to.be.true

    expect(matchCriteria({ a: null }, { '@not': true, a: { '@operator': '!=', '@value': null }})).to.be.true
    expect(matchCriteria({}, { a: { '@not': true, '@operator': '!=', '@value': null }})).to.be.undefined
    expect(matchCriteria({ a: 'a' }, { '@not': true, a: { '@operator': '!=', '@value': null }})).to.be.false
    expect(matchCriteria({ a: { b: 'b' }}, { '@not': true, a: { '@operator': '!=', '@value': null }})).to.be.false
    expect(matchCriteria({ a: new Date}, { '@not': true, a: { '@operator': '!=', '@value': null }})).to.be.false
  })

  it('should match an implicit IN operator involving an array', function() {
    expect(matchCriteria({ a: 'z' }, { a: ['x','y','z']})).to.be.true
    expect(matchCriteria({ a: 'a' }, { a: ['x','y','z']})).to.be.false
    expect(matchCriteria({}, { a: ['x','y','z']})).to.be.undefined

    expect(matchCriteria({ a: 'z' }, { '@not': true, a: ['x','y','z']})).to.be.false
    expect(matchCriteria({ a: 'a' }, { '@not': true, a: ['x','y','z']})).to.be.true
    expect(matchCriteria({}, { '@not': true, a: ['x','y','z']})).to.be.undefined
  })

  it('should match with operator IN', function() {
    expect(matchCriteria({ a: 'a' }, { a: { '@operator': 'IN', '@value': ['a'] }})).to.be.true
    expect(matchCriteria({ a: 'a' }, { a: { '@operator': 'IN', '@value': ['aa'] }})).to.be.false
    expect(matchCriteria({}, { a: { '@operator': 'IN', '@value': ['aa'] }})).to.be.undefined

    expect(matchCriteria({ a: 'a' }, { '@not': true, a: { '@operator': 'IN', '@value': ['a'] }})).to.be.false
    expect(matchCriteria({ a: 'a' }, { '@not': true, a: { '@operator': 'IN', '@value': ['aa'] }})).to.be.true
    expect(matchCriteria({}, { '@not': true, a: { '@operator': 'IN', '@value': ['aa'] }})).to.be.undefined
  })

  it('should match with operator NOT IN', function() {
    expect(matchCriteria({ a: 'a' }, { a: { '@operator': 'NOT IN', '@value': ['a'] }})).to.be.false
    expect(matchCriteria({ a: 'a' }, { a: { '@operator': 'NOT IN', '@value': ['aa'] }})).to.be.true
    expect(matchCriteria({}, { a: { '@operator': 'NOT IN', '@value': ['aa'] }})).to.be.undefined

    expect(matchCriteria({ a: 'a' }, { '@not': true, a: { '@operator': 'NOT IN', '@value': ['a'] }})).to.be.true
    expect(matchCriteria({ a: 'a' }, { '@not': true, a: { '@operator': 'NOT IN', '@value': ['aa'] }})).to.be.false
    expect(matchCriteria({}, { '@not': true, a: { '@operator': 'NOT IN', '@value': ['aa'] }})).to.be.undefined
  })

  it('should match with operator LIKE', function() {
    expect(matchCriteria({ a: 'a' }, { a: { '@operator': 'LIKE', '@value': 'a' }})).to.be.true
    expect(matchCriteria({ a: 'ab' }, { a: { '@operator': 'LIKE', '@value': 'a' }})).to.be.false
    expect(matchCriteria({ a: 'ab' }, { a: { '@operator': 'LIKE', '@value': 'a%' }})).to.be.true
    expect(matchCriteria({ a: 'ab' }, { a: { '@operator': 'LIKE', '@value': '%a' }})).to.be.false
    expect(matchCriteria({ a: 'ab' }, { a: { '@operator': 'LIKE', '@value': '%a%' }})).to.be.true
    expect(matchCriteria({ a: 'ab' }, { a: { '@operator': 'LIKE', '@value': 'b%' }})).to.be.false
    expect(matchCriteria({ a: 'ab' }, { a: { '@operator': 'LIKE', '@value': '%b' }})).to.be.true
    expect(matchCriteria({ a: 'ab' }, { a: { '@operator': 'LIKE', '@value': '%b%' }})).to.be.true
    expect(matchCriteria({}, { a: { '@operator': 'LIKE', '@value': '%a%' }})).to.be.undefined

    expect(matchCriteria({ a: 'a' }, { '@not': true, a: { '@operator': 'LIKE', '@value': 'a' }})).to.be.false
    expect(matchCriteria({ a: 'ab' }, { '@not': true, a: { '@operator': 'LIKE', '@value': 'a' }})).to.be.true
    expect(matchCriteria({ a: 'ab' }, { '@not': true, a: { '@operator': 'LIKE', '@value': 'a%' }})).to.be.false
    expect(matchCriteria({ a: 'ab' }, { '@not': true, a: { '@operator': 'LIKE', '@value': '%a' }})).to.be.true
    expect(matchCriteria({ a: 'ab' }, { '@not': true, a: { '@operator': 'LIKE', '@value': '%a%' }})).to.be.false
    expect(matchCriteria({ a: 'ab' }, { '@not': true, a: { '@operator': 'LIKE', '@value': 'b%' }})).to.be.true
    expect(matchCriteria({ a: 'ab' }, { '@not': true, a: { '@operator': 'LIKE', '@value': '%b' }})).to.be.false
    expect(matchCriteria({ a: 'ab' }, { '@not': true, a: { '@operator': 'LIKE', '@value': '%b%' }})).to.be.false
    expect(matchCriteria({}, { a: { '@operator': 'LIKE', '@value': '%a%' }})).to.be.undefined
  })

  it('should accept multiple operator objects combined with simple values for one property', function() {
    expect(matchCriteria({ a: 3 }, { a: [ 3, { '@operator': '>', '@value': 6 }]})).to.be.true
    expect(matchCriteria({ a: 5 }, { a: [ 3, { '@operator': '>', '@value': 6 }]})).to.be.false
    expect(matchCriteria({ a: 7 }, { a: [ 3, { '@operator': '>', '@value': 6 }]})).to.be.true
    expect(matchCriteria({}, { a: [ 3, { '@operator': '>', '@value': 6 }]})).to.be.undefined

    expect(matchCriteria({ a: 3 }, { '@not': true, a: [ 3, { '@operator': '>', '@value': 6 }]})).to.be.false
    expect(matchCriteria({ a: 5 }, { '@not': true, a: [ 3, { '@operator': '>', '@value': 6 }]})).to.be.true
    expect(matchCriteria({ a: 7 }, { '@not': true, a: [ 3, { '@operator': '>', '@value': 6 }]})).to.be.false
    expect(matchCriteria({}, { '@not': true, a: [ 3, { '@operator': '>', '@value': 6 }]})).to.be.undefined
  })

  // it('should accept multiple operator objects for one property connected by explicitely given logical operators', function() {
  //   expect(matchCriteria({ a: 5 }, { a: [{ '@operator': '>', '@value': 3 }, 'AND', { '@operator': '<', '@value': 6 }]})).to.be.true
  //   expect(matchCriteria({ a: 1 }, { a: [{ '@operator': '>', '@value': 3 }, 'AND', { '@operator': '<', '@value': 6 }]})).to.be.false
  //   expect(matchCriteria({ a: 5 }, { a: [{ '@operator': '<', '@value': 3 }, 'OR', { '@operator': '>', '@value': 6 }]})).to.be.false
  //   expect(matchCriteria({ a: 1 }, { a: [{ '@operator': '<', '@value': 3 }, 'OR', { '@operator': '>', '@value': 6 }]})).to.be.true
  //   expect(matchCriteria({ a: 5 }, { a: [{ '@operator': '>', '@value': 3 }, 'XOR', { '@operator': '<', '@value': 6 }]})).to.be.false
  //   expect(matchCriteria({ a: 1 }, { a: [{ '@operator': '>', '@value': 3 }, 'XOR', { '@operator': '<', '@value': 6 }]})).to.be.true
  //   expect(matchCriteria({}, { a: [{ '@operator': '>', '@value': 3 }, 'XOR', { '@operator': '<', '@value': 6 }]})).to.be.undefined

  //   expect(matchCriteria({ a: 5 }, { '@not': true, a: [{ '@operator': '>', '@value': 3 }, 'AND', { '@operator': '<', '@value': 6 }]})).to.be.false
  //   expect(matchCriteria({ a: 1 }, { '@not': true, a: [{ '@operator': '>', '@value': 3 }, 'AND', { '@operator': '<', '@value': 6 }]})).to.be.true
  //   expect(matchCriteria({ a: 5 }, { '@not': true, a: [{ '@operator': '<', '@value': 3 }, 'OR', { '@operator': '>', '@value': 6 }]})).to.be.true
  //   expect(matchCriteria({ a: 1 }, { '@not': true, a: [{ '@operator': '<', '@value': 3 }, 'OR', { '@operator': '>', '@value': 6 }]})).to.be.false
  //   expect(matchCriteria({ a: 5 }, { '@not': true, a: [{ '@operator': '>', '@value': 3 }, 'XOR', { '@operator': '<', '@value': 6 }]})).to.be.true
  //   expect(matchCriteria({ a: 1 }, { '@not': true, a: [{ '@operator': '>', '@value': 3 }, 'XOR', { '@operator': '<', '@value': 6 }]})).to.be.false
  //   expect(matchCriteria({}, { '@not': true, a: [{ '@operator': '>', '@value': 3 }, 'XOR', { '@operator': '<', '@value': 6 }]})).to.be.undefined
  // })

  it('should match multiple connected criteria', function() {
    expect(matchCriteria({ a: 'a', b: 1 }, { a: ['a', 'b'], b: 1 })).to.be.true
    expect(matchCriteria({ a: 'b', b: 1 }, { a: ['a', 'b'], b: 1 })).to.be.true
    expect(matchCriteria({ a: 'a', b: 2 }, { a: ['a', 'b'], b: 1 })).to.be.false
    expect(matchCriteria({ a: 'b', b: 2 }, { a: ['a', 'b'], b: 1 })).to.be.false
    expect(matchCriteria({ a: 'c', b: 1 }, { a: ['a', 'b'], b: 1 })).to.be.false
    expect(matchCriteria({ a: 'c', b: 2 }, { a: ['a', 'b'], b: 1 })).to.be.false

    expect(matchCriteria({ a: 'a', b: 1 }, { '@not': true, a: ['a', 'b'], b: 1 })).to.be.false
    expect(matchCriteria({ a: 'b', b: 1 }, { '@not': true, a: ['a', 'b'], b: 1 })).to.be.false
    expect(matchCriteria({ a: 'a', b: 2 }, { '@not': true, a: ['a', 'b'], b: 1 })).to.be.true
    expect(matchCriteria({ a: 'b', b: 2 }, { '@not': true, a: ['a', 'b'], b: 1 })).to.be.true
    expect(matchCriteria({ a: 'c', b: 1 }, { '@not': true, a: ['a', 'b'], b: 1 })).to.be.true
    expect(matchCriteria({ a: 'c', b: 2 }, { '@not': true, a: ['a', 'b'], b: 1 })).to.be.true
  })

  it('should match an array of objects', function() {
    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { a: { b: 1 } })).to.be.true
    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { a: { b: 3 } })).to.be.false
    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { a: { b: null } })).to.be.false
    expect(matchCriteria({ a: [{ b: { c: 'c' }}, { b: { c: 'c' }}] }, { a: { b: null } })).to.be.false
    expect(matchCriteria({ a: [{ b: null }, { b: 1 }] }, { a: { b: null } })).to.be.true

    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { '@not': true, a: { b: 1 } })).to.be.false
    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { '@not': true, a: { b: 3 } })).to.be.true
    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { '@not': true, a: { b: null } })).to.be.true
    expect(matchCriteria({ a: [{ b: { c: 'c' }}, { b: { c: 'c' }}] }, { '@not': true, a: { b: null } })).to.be.true
    expect(matchCriteria({ a: [{ b: null }, { b: 1 }] }, { '@not': true, a: { b: null } })).to.be.false
  })

  it('should match the array length', function() {
    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { a: { '@count': 2 }})).to.be.true
    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { a: { '@count': 1 }})).to.be.false
    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { a: { '@count': 0 }})).to.be.false
    expect(matchCriteria({ a: [] }, { a: { '@count': 0 }})).to.be.true
    expect(matchCriteria({ a: null }, { a: { '@count': 0 }})).to.be.true
    expect(matchCriteria({}, { a: { '@count': 0 }})).to.be.undefined

    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { '@not': true, a: { '@count': 2 }})).to.be.false
    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { '@not': true, a: { '@count': 1 }})).to.be.true
    expect(matchCriteria({ a: [{ b: 2 }, { b: 1 }] }, { '@not': true, a: { '@count': 0 }})).to.be.true
    expect(matchCriteria({ a: [] }, { '@not': true, a: { '@count': 0 }})).to.be.false
    expect(matchCriteria({ a: null }, { '@not': true, a: { '@count': 0 }})).to.be.false
    expect(matchCriteria({}, { '@not': true, a: { '@count': 0 }})).to.be.undefined
  })

  it('should match an object', function() {
    expect(matchCriteria({ a: { b: 1 }}, { a: { b: 1 } })).to.be.true
    expect(matchCriteria({ a: { b: 1 }}, { a: { b: 3 } })).to.be.false

    expect(matchCriteria({ a: { b: 1 }}, { '@not': true, a: { b: 1 } })).to.be.false
    expect(matchCriteria({ a: { b: 1 }}, { '@not': true, a: { b: 3 } })).to.be.true
  })

  it('should match an object inside an object', function() {
    expect(matchCriteria({ a: { b: { c: 1 }}}, { a: { b: { c: 1 }}})).to.be.true
    expect(matchCriteria({ a: { b: { c: 1 }}}, { a: { b: { c: 3 }}})).to.be.false

    expect(matchCriteria({ a: { b: { c: 1 }}}, { '@not': true, a: { b: { c: 1 }}})).to.be.false
    expect(matchCriteria({ a: { b: { c: 1 }}}, { '@not': true, a: { b: { c: 3 }}})).to.be.true
  })

  it('should match an array inside an object', function() {
    expect(matchCriteria({ a: { b: [{ c: 2 }, { c: 1 }] }}, { a: { b: { c: 1 }}})).to.be.true
    expect(matchCriteria({ a: { b: [{ c: 2 }, { c: 1 }] }}, { a: { b: { c: 3 }}})).to.be.false

    expect(matchCriteria({ a: { b: [{ c: 2 }, { c: 1 }] }}, { '@not': true, a: { b: { c: 1 }}})).to.be.false
    expect(matchCriteria({ a: { b: [{ c: 2 }, { c: 1 }] }}, { '@not': true, a: { b: { c: 3 }}})).to.be.true
  })

  it('should match a date', function() {
    let now = new Date
    let nowMinusOneYear = new Date(now.getFullYear() - 1, now.getMonth())

    expect(matchCriteria({ a: now }, { a: now })).to.be.true
    expect(matchCriteria({ a: now }, { a: nowMinusOneYear })).to.be.false
    expect(matchCriteria({ a: now }, { a: { '@operator': '>', '@value': now }})).to.be.false
    expect(matchCriteria({ a: now }, { a: { '@operator': '>', '@value': nowMinusOneYear }})).to.be.true
    expect(matchCriteria({ a: now }, { a: { '@operator': '>=', '@value': now }})).to.be.true
    expect(matchCriteria({ a: now }, { a: { '@operator': '>=', '@value': nowMinusOneYear }})).to.be.true
    expect(matchCriteria({ a: now }, { a: { '@operator': '<', '@value': now }})).to.be.false
    expect(matchCriteria({ a: now }, { a: { '@operator': '<', '@value': nowMinusOneYear }})).to.be.false
    expect(matchCriteria({ a: now }, { a: { '@operator': '<=', '@value': now }})).to.be.true
    expect(matchCriteria({ a: now }, { a: { '@operator': '<=', '@value': nowMinusOneYear }})).to.be.false
    expect(matchCriteria({ a: now }, { a: { '@operator': 'IN', '@value': [ now ] }})).to.be.true
    expect(matchCriteria({ a: now }, { a: { '@operator': 'IN', '@value': [ nowMinusOneYear ] }})).to.be.false

    expect(matchCriteria({ a: now }, { '@not': true, a: now })).to.be.false
    expect(matchCriteria({ a: now }, { '@not': true, a: nowMinusOneYear })).to.be.true
    expect(matchCriteria({ a: now }, { '@not': true, a: { '@operator': '>', '@value': now }})).to.be.true
    expect(matchCriteria({ a: now }, { '@not': true, a: { '@operator': '>', '@value': nowMinusOneYear }})).to.be.false
    expect(matchCriteria({ a: now }, { '@not': true, a: { '@operator': '>=', '@value': now }})).to.be.false
    expect(matchCriteria({ a: now }, { '@not': true, a: { '@operator': '>=', '@value': nowMinusOneYear }})).to.be.false
    expect(matchCriteria({ a: now }, { '@not': true, a: { '@operator': '<', '@value': now }})).to.be.true
    expect(matchCriteria({ a: now }, { '@not': true, a: { '@operator': '<', '@value': nowMinusOneYear }})).to.be.true
    expect(matchCriteria({ a: now }, { '@not': true, a: { '@operator': '<=', '@value': now }})).to.be.false
    expect(matchCriteria({ a: now }, { '@not': true, a: { '@operator': '<=', '@value': nowMinusOneYear }})).to.be.true
    expect(matchCriteria({ a: now }, { '@not': true, a: { '@operator': 'IN', '@value': [ now ] }})).to.be.false
    expect(matchCriteria({ a: now }, { '@not': true, a: { '@operator': 'IN', '@value': [ nowMinusOneYear ] }})).to.be.true
  })

  it('should match an array of criteria', function() {
    expect(matchCriteria({ a: 5 }, [{ a: 1 }, { a: 5 }])).to.be.true
    expect(matchCriteria({ a: 3 }, [{ a: 1 }, { a: 5 }])).to.be.false
    expect(matchCriteria({}, [{ a: 1 }, { a: 5 }])).to.be.undefined
    expect(matchCriteria({ b: 5 }, [{ a: 1 }, { b: 5 }])).to.be.true
    expect(matchCriteria({ b: 3 }, [{ a: 1 }, { b: 5 }])).to.be.false
  })

  it('should use a custom matcher', function() {
    let customMatcher: CustomMatcher = {
      'A': [
        {
          field: 'a',
          match: (obj: any, criterium: number) => obj.a.indexOf(criterium) > -1
        }
      ]
    }

    expect(matchCriteria(new A('123'), { a: '1' }, customMatcher)).to.be.true
    expect(matchCriteria(new A('123'), { a: '4' }, customMatcher)).to.be.false

    expect(matchCriteria(new A('123'), { '@not': true, a: '1' }, customMatcher)).to.be.false
    expect(matchCriteria(new A('123'), { '@not': true, a: '4' }, customMatcher)).to.be.true
  })

  it('should match with the custom matcher and the other criteria', function() {
    let customMatcher: CustomMatcher = {
      'A': [
        {
          field: 'a',
          match: (obj: any, criterium: boolean) => obj.a.charCodeAt(0) == criterium
        }
      ]
    }

    expect(matchCriteria(new A('a', 1), { a: 97, b: 1 }, customMatcher)).to.be.true
    expect(matchCriteria(new A('a', 1), { a: 97, b: 2 }, customMatcher)).to.be.false
    expect(matchCriteria(new A('b', 1), { a: 97, b: 1 }, customMatcher)).to.be.false
    expect(matchCriteria(new A('b', 2), { a: 97, b: 1 }, customMatcher)).to.be.false

    expect(matchCriteria(new A('a', 1), { '@not': true, a: 97, b: 1 }, customMatcher)).to.be.false
    expect(matchCriteria(new A('a', 1), { '@not': true, a: 97, b: 2 }, customMatcher)).to.be.true
    expect(matchCriteria(new A('b', 1), { '@not': true, a: 97, b: 1 }, customMatcher)).to.be.true
    expect(matchCriteria(new A('b', 2), { '@not': true, a: 97, b: 1 }, customMatcher)).to.be.true
  })
})

class A {
  constructor(public a: string, public b?: number) {}
}