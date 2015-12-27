var assert = require('assert');
var app = require('../app.js')

describe('chess', function(){
  describe('change_turn', function(){
    it('change_turn', function(){
      assert.equal('1', app.change_turn(0));
    })
  })
  describe('pk1', function(){
    it('pk1', function(){
      assert.equal(true, app.pk(14, 17));
    })
  })
  describe('pk2', function(){
    it('pk2', function(){
      assert.equal(true, app.pk(17, 16));
    })
  })
  describe('pk3', function(){
    it('pk3', function(){
      assert.equal(true, app.pk(6, 32));
    })
  })
  describe('move', function(){
    it('move', function(){
      assert.equal(true, app.move(1, 5));
    })
  })
})
