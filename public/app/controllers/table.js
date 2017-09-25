(function () {

    var app = angular.module('app');

    app.controller('tablecontroller',['$scope','$rootScope','rest',function(scope,rootScope,rest){
        scope.totalclientes = 0;
        scope.totalpeso = 0;
        scope.listaclientes = [];

        scope.requery = function(){
            rest.readAll().then(function(result){
                scope.listaclientes = result.data;
                scope.totalclientes = result.data.length;
                scope.totalpeso = result.data.reduce(getSomePeso,0);
            });
        }
        
        //declaração externa para outros controles chamarem
        rootScope.$on('tableRequery',function(){
            scope.requery();
        });

        scope.delete = function(data){
            //console.log(data);
            rest.delete(data._id).then(function(err,result){
                scope.requery();
                rootScope.$emit('mapsRequery');
            });
        }

        scope.requery();
    }]);

    function getSomePeso(total, data) {
        return total + data.peso;
    }

})();