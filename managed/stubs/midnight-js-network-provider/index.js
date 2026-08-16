"use strict";
module.exports = {
  getMidnightNetworkProvider: function(config) {
    return {
      networkId: (config && config.networkId) || 'preprod',
      indexerUrl: (config && config.indexerUrl) || 'https://indexer.preprod.midnight.network',
      nodeUrl: (config && config.nodeUrl) || 'https://rpc.preprod.midnight.network',
      proofServerUrl: (config && config.proofServerUrl) || 'http://localhost:6300'
    };
  }
};
