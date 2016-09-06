/*
 * in from etcd tree
 *
 * subnets:
 *   - 10.1.0.0/16
 *   - 10.2.0.0/16
 *   - 10.2.1.0/24
 *   - 10.2.2.0/24
 *
 * ips:
 *   - 10.1.0.34
 *   - 10.2.2.3
 *   - 10.2.2.4
 */
const ROOT_NODE = "/root/";

const data = {
  "action": "get",
  "node": {
    "createdIndex": 11,
    "dir": true,
    "key": "/root",
    "modifiedIndex": 11,
    "nodes": [
      {
        "createdIndex": 15,
        "dir": true,
        "key": "/root/10",
        "modifiedIndex": 15,
        "nodes": [
          {
            "createdIndex": 25,
            "dir": true,
            "key": "/root/10/1",
            "modifiedIndex": 25,
            "nodes": [
              {
                "createdIndex": 25,
                "dir": true,
                "key": "/root/10/1/0",
                "modifiedIndex": 25,
                "nodes": [
                  {
                    "createdIndex": 25,
                    "dir": true,
                    "key": "/root/10/1/0/0",
                    "modifiedIndex": 25,
                    "nodes": [
                      {
                        "createdIndex": 25,
                        "key": "/root/10/1/0/0/16",
                        "modifiedIndex": 25,
                        "nodes": null,
                        "value": "{\"createdAt\":\"2016-09-03T20:33:02.568481563-10:00\"}"
                      }
                    ],
                    "value": ""
                  }
                ],
                "value": ""
              }
            ],
            "value": ""
          },
          {
            "createdIndex": 26,
            "dir": true,
            "key": "/root/10/2",
            "modifiedIndex": 26,
            "nodes": [
              {
                "createdIndex": 27,
                "dir": true,
                "key": "/root/10/2/1",
                "modifiedIndex": 27,
                "nodes": [
                  {
                    "createdIndex": 27,
                    "dir": true,
                    "key": "/root/10/2/1/0",
                    "modifiedIndex": 27,
                    "nodes": [
                      {
                        "createdIndex": 27,
                        "key": "/root/10/2/1/0/24",
                        "modifiedIndex": 27,
                        "nodes": null,
                        "value": "{\"createdAt\":\"2016-09-03T20:33:14.365729981-10:00\"}"
                      }
                    ],
                    "value": ""
                  }
                ],
                "value": ""
              },
              {
                "createdIndex": 28,
                "dir": true,
                "key": "/root/10/2/2",
                "modifiedIndex": 28,
                "nodes": [
                  {
                    "createdIndex": 28,
                    "dir": true,
                    "key": "/root/10/2/2/0",
                    "modifiedIndex": 28,
                    "nodes": [
                      {
                        "createdIndex": 28,
                        "key": "/root/10/2/2/0/24",
                        "modifiedIndex": 28,
                        "nodes": null,
                        "value": "{\"createdAt\":\"2016-09-03T20:33:21.729318396-10:00\"}"
                      }
                    ],
                    "value": ""
                  }
                ],
                "value": ""
              },
              {
                "createdIndex": 26,
                "dir": true,
                "key": "/root/10/2/0",
                "modifiedIndex": 26,
                "nodes": [
                  {
                    "createdIndex": 26,
                    "dir": true,
                    "key": "/root/10/2/0/0",
                    "modifiedIndex": 26,
                    "nodes": [
                      {
                        "createdIndex": 26,
                        "key": "/root/10/2/0/0/16",
                        "modifiedIndex": 26,
                        "nodes": null,
                        "value": "{\"createdAt\":\"2016-09-03T20:33:07.803664184-10:00\"}"
                      }
                    ],
                    "value": ""
                  }
                ],
                "value": ""
              }
            ],
            "value": ""
          }
        ],
        "value": ""
      }
    ],
    "value": ""
  },
  "prevNode": null
};

/*
 * addr is a string path
 *   10/1/0/0/16
 * return the node or null
 */
//   don't need to get
const get = addr => null;


/*
 * _G is the graph
 * v are vertices
 * return list of subnets
 */
const subnets = (path, _G) => {
  _G = _G || data.node;

  return _G.nodes
    .reduce(( list, v ) => {
      let curPath = v.key.split(ROOT_NODE).pop();
      if( v.dir ){
        return subnets( curPath, v ).concat(list);
      } else if( !v.dir ){ // cidr
        list.push({ path : curPath, node : v });
      }
      return list;

    }, []);
};

/*
 * _G is the graph
 * v are vertices
 * return list of ips
 */
const ips = (path, _G) => {
  _G = _G || data;

  return Object.keys( _G )
    .reduce(( list, v ) => {
      let curPath = path ? path + '/' + v : v;
      let depth = curPath.split('/').length;
      if( depth < 4 && _G[v]._isDir ){
        return ips( curPath, _G[v] ).concat(list);
      } else if( v !== '_isDir' && !_G[v]._isDir && depth === 4 ){ // ip
        list.push({ path : curPath, node : _G[v] });
      }
      return list;

    }, []);
};

module.exports = {
  data,
  get,
  subnets,
  ips
};

