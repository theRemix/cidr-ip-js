const test = require('tape');
const ds = require('../ds');
const tree = require('../tree');

test('Faux Datastore .get()', it => {

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

test('Faux Datastore .subnets()', should => {

  const allSubnets = [
    { path: '10/1/0/0/16', node: ds.data[10][1][0][0][16] },
    { path: '10/2/0/0/16', node: ds.data[10][2][0][0][16] },
    { path: '10/2/1/0/24', node: ds.data[10][2][1][0][24] },
    { path: '10/2/2/0/24', node: ds.data[10][2][2][0][24] }
  ];

  const actual = ds.subnets();
  should.ok(actual.every( subnet => allSubnets.some( expected => expected.path === subnet.path && expected.node === subnet.node ) ),
           'subnets() should have only 4 reserved subnets');
  should.ok(allSubnets.every( subnet => actual.some( expected => expected.path === subnet.path && expected.node === subnet.node ) ),
           'subnets() should have only 4 reserved subnets');
  should.end();

});

test('Faux Datastore .ips()', should => {

  const allIps = [
    { path: '10/2/2/3', node: ds.data[10][2][2][3] },
    { path: '10/2/2/4', node: ds.data[10][2][2][4] },
    { path: '10/1/0/34', node: ds.data[10][1][0][34] }
  ];

  const actual = ds.ips();
  should.ok(actual.every( ip => allIps.some( expected => expected.path === ip.path && expected.node === ip.node ) ),
           'ips() should have only 3 reserved ips');
  should.ok(allIps.every( ip => actual.some( expected => expected.path === ip.path && expected.node === ip.node ) ),
           'ips() should have only 3 reserved ips');
  should.end();

});

test.skip('etcd tree .get()', it => {

  const testCidrPath1 = '10/1/0/0/16';
  it.test(`get(${testCidrPath1})`, (should)=> {

    let testCidr1 = tree.get(testCidrPath1);
    console.log(testCidr1);
    should.notEqual(testCidr1, null);
    should.end();

  });

  const testCidrPath2 = '10/123/0/0/16';
  it.test(`get(${testCidrPath2})`, (should)=> {

    let testCidr2 = tree.get(testCidrPath2);
    should.equal(testCidr2, null);
    should.end();

  });

  const testCidrPath3 = '10/2/1/0/24';
  it.test(`get(${testCidrPath3})`, (should)=> {

    let testCidr3 = tree.get(testCidrPath3);
    should.notEqual(testCidr3, null);
    should.end();

  });

  const testIpPath1 = '10/1/0/34';
  it.test(`get(${testIpPath1})`, (should)=> {

    let testIp1 = tree.get(testIpPath1);
    should.notEqual(testIp1, null);
    should.end();

  });

});

test('etcd tree .subnets()', should => {

  const allSubnets = [
    { path: '10/1/0/0/16', node: tree.data.node.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0] },
    { path: '10/2/0/0/16', node: tree.data.node.nodes[0].nodes[1].nodes[2].nodes[0].nodes[0] },
    { path: '10/2/1/0/24', node: tree.data.node.nodes[0].nodes[1].nodes[0].nodes[0].nodes[0] },
    { path: '10/2/2/0/24', node: tree.data.node.nodes[0].nodes[1].nodes[1].nodes[0].nodes[0] }
  ];

  const actual = tree.subnets();
  should.ok(actual.every( subnet => allSubnets.some( expected => expected.path === subnet.path && expected.node === subnet.node ) ),
           'subnets() should have only 4 reserved subnets');
  should.ok(allSubnets.every( subnet => actual.some( expected => expected.path === subnet.path && expected.node === subnet.node ) ),
           'subnets() should have only 4 reserved subnets');
  should.end();

});

test.skip('etcd tree .ips()', should => {

  const allIps = [
    { path: '10/2/2/3', node: tree.data.node.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0] },
    { path: '10/2/2/4', node: tree.data.node.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0] },
    { path: '10/1/0/34', node: tree.data.node.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0] }
  ];

  const actual = tree.ips();
  should.ok(actual.every( ip => allIps.some( expected => expected.path === ip.path && expected.node === ip.node ) ),
           'ips() should have only 3 reserved ips');
  should.ok(allIps.every( ip => actual.some( expected => expected.path === ip.path && expected.node === ip.node ) ),
           'ips() should have only 3 reserved ips');
  should.end();

});

