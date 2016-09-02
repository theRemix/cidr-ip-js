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


module.exports = {
  get
};
