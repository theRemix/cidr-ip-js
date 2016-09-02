/*
 * faux datastore
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
const data = {
  10 : { _isDir : true,
    1 : { _isDir : true,
      0 : { _isDir : true,
        0 : { _isDir : true,
          16 : { createdAt : Date.now() } // cidr
        },
        34 : { createdAt : Date.now() } // ip
      }
    },
    2 : { _isDir : true,
      0 : { _isDir : true,
        0 : { _isDir : true,
          16 : { createdAt : Date.now() } // cidr
        }
      },
      1 : { _isDir : true,
        0 : { _isDir : true,
          24 : { createdAt : Date.now() } // cidr
        }
      },
      2 : { _isDir : true,
        0 : { _isDir : true,
          24 : { createdAt : Date.now() } // cidr
        },
        3 : { createdAt : Date.now() }, // ip
        4 : { createdAt : Date.now() }  // ip
      }
    }
  }
};

/*
 * addr is a string path
 *   10/1/0/0/16
 * return the node or null
 */
const get = addr => addr.split('/').reduce((node, part) => node ? node[part] : null, data);


/*
 * _G is the graph
 * v are vertices
 * return list of subnets
 */
const subnets = (path, _G) => {
  _G = _G || data;

  return Object.keys( _G )
    .reduce(( list, v ) => {
      let curPath = path ? path + '/' + v : v;
      if( _G[v]._isDir ){
        return subnets( curPath, _G[v] ).concat(list);
      } else if( v !== '_isDir' && curPath.split('/').length === 5 ){ // cidr
        list.push({ path : curPath, node : _G[v] });
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
