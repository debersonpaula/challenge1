(function () {
    
        var app = angular.module('app');

        app.controller('mapcontroller',['$scope','$rootScope','rest','maps',function(scope,rootScope,rest,maps){
            maps.createMap('mapid',-23.18, -46.89, 9);

            scope.requery = function(){
                //limpa todos os marcadores
                maps.clearMarkers();

                rest.readAll().then(function(result){
                    for (i in result.data){
                        var lat = result.data[i].latitude,
                            lng = result.data[i].longitude,
                            cliente = result.data[i].cliente,
                            peso = result.data[i].peso;
                        maps.addMarker(lat,lng,`${cliente}<br />${peso} kg`);
                    }
                    maps.fitToAll();
                });
            }

            //declaração externa para outros controles chamarem
            rootScope.$on('mapsRequery',function(){
                scope.requery();
            });

            scope.requery();
        }]);

})();