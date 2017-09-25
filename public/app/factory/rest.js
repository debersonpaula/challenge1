(function () {

    var app = angular.module('app');

    app.factory('rest',['$http',function(http){

        this.create = function(value){
            return http.post('/rest', value);
        }

        this.readAll = function(){
            return http.get('/rest');
        }

        this.delete = function(id){
            return http.delete('/rest/' + id);
        }

        return this;
    }]);

})();