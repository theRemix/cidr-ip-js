const test = require('tape');
const ds = require('../ds');

test('Faux Datastore', it => {

  const testCidrPath1 = '10/1/0/0/16';
  it.test(`get(${testCidrPath1})`, (should)=> {

    let testCidr1 = ds.get(testCidrPath1);
    should.notEqual(testCidr1, null);
    should.end();

  });

  const testCidrPath2 = '10/123/0/0/16';
  it.test(`get(${testCidrPath2})`, (should)=> {

    let testCidr2 = ds.get(testCidrPath2);
    should.equal(testCidr2, null);
    should.end();

  });

  const testCidrPath3 = '10/2/1/0/24';
  it.test(`get(${testCidrPath3})`, (should)=> {

    let testCidr3 = ds.get(testCidrPath3);
    should.notEqual(testCidr3, null);
    should.end();

  });

  const testIpPath1 = '10/1/0/34';
  it.test(`get(${testIpPath1})`, (should)=> {

    let testIp1 = ds.get(testIpPath1);
    should.notEqual(testIp1, null);
    should.end();

  });

});
