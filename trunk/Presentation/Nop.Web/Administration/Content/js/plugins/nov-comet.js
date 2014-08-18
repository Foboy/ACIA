/*
**  Create by foboy.cray
**  2014/05/12
*/
(function (window, angular, undefined) {
    'use strict';
    angular.module('ngNovComet', ['ng', 'ngRestUrls']).
      config(['$provide', '$resturls', function ($provide, $resturls) {

          $provide.service('$novcomet', function () {
              var NovComet = {
                  stoped: true,
                  timestamp: 0,
                  sleepTime: 100,
                  _subscribed: {},
                  _timeout: undefined,
                  _baseurl: $resturls['AdvisoryObserve'],
                  _args: '',
                  _urlParam: 'subscribed',

                  stop: function () {
                      NovComet.stoped = true;
                      clearTimeout(NovComet._timeout);
                  },

                  start: function () {
                      clearTimeout(NovComet._timeout);
                      NovComet.stoped = false;
                      var timestamp = Math.round(new Date().getTime());
                      NovComet.timestamp = timestamp;
                      NovComet._timeout = setTimeout(function () {
                          NovComet.run(timestamp)
                      }, NovComet.sleepTime);
                  },

                  subscribe: function (id, callback) {
                      NovComet._subscribed[id] = {
                          cbk: callback,
                          timestamp: NovComet._getCurrentTimestamp()
                      };
                      return NovComet;
                  },

                  _refresh: function (timestamp) {
                      console.log("refresh");
                      if (NovComet.stoped)
                          return;
                      if (timestamp != NovComet.timestamp)
                          return;
                      NovComet._timeout = setTimeout(function () {
                          NovComet.run(timestamp)
                      }, NovComet.sleepTime);
                  },

                  init: function (baseurl) {
                      if (baseurl != undefined) {
                          NovComet._baseurl = baseurl;
                      }
                  },

                  _getCurrentTimestamp: function () {
                      return Math.round(new Date().getTime() / 1000);
                  },

                  run: function (timestamp) {
                      var cometCheckUrl = NovComet._baseurl + '?' + NovComet._args;
                      var subscribeds = [],timestamps = [];
                      for (var id in NovComet._subscribed) {
                          var currentTimestamp = NovComet._subscribed[id]['timestamp'];

                          cometCheckUrl += '&' + NovComet._urlParam + '[' + id + ']=' +
                             currentTimestamp;
                          subscribeds.push(id);
                          timestamps.push(currentTimestamp);
                      }
                      cometCheckUrl += '&' + NovComet._getCurrentTimestamp();
                      $.post(NovComet._baseurl, { subscribeds: subscribeds, timestamps: timestamps, t: NovComet._getCurrentTimestamp() }, function (data) {
                          console.log(data);
                          switch (data.s) {
                              case 0: // sin cambios
                                  NovComet._refresh(timestamp);
                                  break;
                              case 1: // trigger
                                  for (var id in data['k']) {
                                      NovComet._subscribed[id]['timestamp'] = data['k'][id];
                                      NovComet._subscribed[id].cbk(data);
                                  }
                                  NovComet._refresh(timestamp);
                                  break;
                          }
                      },'json');
                      /*
                      $.getJSON(cometCheckUrl, function (data) {
                          switch (data.s) {
                              case 0: // sin cambios
                                  NovComet._refresh();
                                  break;
                              case 1: // trigger
                                  for (var id in data['k']) {
                                      NovComet._subscribed[id]['timestamp'] = data['k'][id];
                                      NovComet._subscribed[id].cbk(data.k);
                                  }
                                  NovComet._refresh();
                                  break;
                          }
                      });*/

                  },

                  publish: function (id) {
                      /*
                      var cometPublishUrl = NovComet._baseurl + '?' + NovComet._args;
                      cometPublishUrl += '&publish=' + id;
                      $.getJSON(cometPublishUrl);
                      */
                      $.post(NovComet._baseurl, { publish: id }, function (data) {
                      });
                  }
              };
              console.log("new novcomet");
              return NovComet;
          });

      }]);
})(window, window.angular);


