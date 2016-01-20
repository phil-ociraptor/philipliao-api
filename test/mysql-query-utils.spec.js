require('babel-register');
var utils = require('../src/mysql-query-utils.js');
var assert = require('assert');

describe('MysqlQueryUtils', () => {
    describe('escapeIfString()', () => {
        
       it('should do nothing if passed a number', () => {
           assert.equal(utils.escapeIfString(4), 4);
       });
       
       it('should do nothing if passed an object', () => {
           assert.deepEqual(utils.escapeIfString({}), {});
       });
       
       it('should do nothing if passed undefined', () => {
           assert.equal(utils.escapeIfString(undefined), undefined);
       });
       
       it('should wrap a string with escaped quotes', () => {
          assert.equal(utils.escapeIfString('hi'), '\"hi\"'); 
       });
       
       it('should wrap a double quoted string with espaced quotes', () => {
           assert.equal(utils.escapeIfString("hi"), "\"hi\""); 
       });

    }); 
    
    describe('prepareFields()', () => {
        
        var fields = ['a', 'b', 'c', 'd', 'e'];
        
        it('should pluck only the fields that exist on the entity', () => {
            var entity = {
                a: 1,
                c: 3,
                e: 5
            };
            var result = utils.prepareFields(fields, entity);
            assert.equal(result, 'a, c, e');
        });
        
        it('should ignore fields on the entity if not in the fields array', () => {
           var entity = {
               a: 1,
               g: 7, // should ignore
               h: 8  // should ignore
           };
           var result = utils.prepareFields(fields, entity);
           assert.equal(result, 'a');
        });
        
    });
    
    describe('prepareValues()', () => {
        
        var fields = ['a', 'b', 'c', 'd', 'e'];
        
        it('should pluck only the values from the entity that exist in the fields array', () => {
            var entity = {
                a: 1,
                b: 2,
                c: 3,
                e: 5
            };
            var result = utils.prepareValues(fields, entity);
            assert.equal(result, '1, 2, 3, 5');
        });
        
         it('should ignore values from the entity that do not exist in the fields array', () => {
            var entity = {
                a: 1,
                b: 2,
                c: 3,
                h: 7
            };
            var result = utils.prepareValues(fields, entity);
            assert.equal(result, '1, 2, 3');
        });
        
        it('should wrap string values with escaped quotes', () => {
            var entity = {
                a: 'one',
                b: 'two',
                c: 'three',
                e: 'five',
                h: 'seven'
            };
            var result = utils.prepareValues(fields, entity);
            assert.equal(result, '\"one\", \"two\", \"three\", \"five\"');
        });
        
    });
    
    describe('prepareFieldsToValues()', () => {
       
       var fields = ['a', 'b', 'c', 'd', 'e'];
       
       it('should pair fields with values, i.e. a=1, b=2', () => {
            var entity = {
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                e: 5
            };
            var result = utils.prepareFieldsToValues(fields, entity);
            assert.equal(result, 'a=1, b=2, c=3, d=4, e=5');
       });
       
       it('should ignore mismatched fields (between the fields array and entity)', () => {
          var entity = {
              a: 1,
              random: 42, // should ignore
              mismatchedField: 'should not be in result'
          };
          var result = utils.prepareFieldsToValues(fields, entity);
          assert.equal(result, 'a=1');
       });
       
       it('should wrap string values in escaped quotes', () => {
           var entity = {
               a: 'one'
           };
           var result = utils.prepareFieldsToValues(fields, entity);
           assert.equal(result, 'a=\"one\"');
       });
        
    });
});
