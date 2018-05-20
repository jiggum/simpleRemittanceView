import {
  formatMoneySeparated,
  symmetryformatMoneySeparated,
  formatMoneyKo,
} from './string';

const assert = require('assert');

describe('stringUtil', () => {
  describe('formatMoneySeparated', () => {
    it('0', () => {
      assert.equal(formatMoneySeparated('0'), '0');
    });
    it('1234', () => {
      assert.equal(formatMoneySeparated('1234'), '1,234');
    });
    it('01234', () => {
      assert.equal(formatMoneySeparated('01234'), '1,234');
    });
    it('123456789', () => {
      assert.equal(formatMoneySeparated('123456789'), '123,456,789');
    });
    it('-123456789', () => {
      assert.equal(formatMoneySeparated('-123456789'), '-123,456,789');
    });
  });
  describe('symmetryformatMoneySeparated', () => {
    it('0', () => {
      assert.equal(symmetryformatMoneySeparated('0'), '0');
    });
    it('1,234', () => {
      assert.equal(symmetryformatMoneySeparated('1,234'), '1234');
    });
    it('123,456,789', () => {
      assert.equal(symmetryformatMoneySeparated('123,456,789'), '123456789');
    });
    it('-123,456,789', () => {
      assert.equal(symmetryformatMoneySeparated('-123,456,789'), '-123456789');
    });
  });
  describe('formatMoneyKo', () => {
    it('0', () => {
      assert.equal(formatMoneyKo('0'), '0원');
    });
    it('1234', () => {
      assert.equal(formatMoneyKo('1234'), '1234원');
    });
    it('01234', () => {
      assert.equal(formatMoneyKo('01234'), '1234원');
    });
    it('123456789', () => {
      assert.equal(formatMoneyKo('123456789'), '12345만 6789원');
    });
    it('123450000', () => {
      assert.equal(formatMoneyKo('123450000'), '12345만 원');
    });
    it('123450009', () => {
      assert.equal(formatMoneyKo('123450009'), '12345만 9원');
    });
    it('-123456789', () => {
      assert.equal(formatMoneyKo('-123456789'), '-12345만 6789원');
    });
    it('-6789', () => {
      assert.equal(formatMoneyKo('-6789'), '-6789원');
    });
  });
});