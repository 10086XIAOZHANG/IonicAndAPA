define(['app'],function (app) {
  app.factory('dataFactory', function ($http, $q) {
    var factory = {};
    factory.getlist = function (endpoint, method, headers, params) {
      var defer = $q.defer();
      if (method == 'GET') {
        $http({
          url: endpoint,
          method: "GET",
          headers: headers,
          params: params,
        }).success(function (data) {
          defer.resolve(data);
        }).error(function (data, status, headers, config) {
          // defer.resolve(data);
          defer.reject(data);
        });
      } else {
        var param = function(obj) {
          var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

          for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
              for(i=0; i<value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            }
            else if(value instanceof Object) {
              for(subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            }
            else if(value !== undefined && value !== null)
              query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
          }
          return query.length ? query.substr(0, query.length - 1) : query;
        };
        $http({
          url: endpoint,
          method: method,
          headers: headers,
          data: param(params),
        }).success(function (data) {
          defer.resolve(data);
        }).
        error(function (data, status, headers, config) {
          // defer.resolve(data);
          defer.reject(data);
        });
      }
      return defer.promise;
    };
    return factory;
  });
});
