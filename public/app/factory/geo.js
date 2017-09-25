(function () {
    
    var app = angular.module('app');

    const googleKey = "AIzaSyDyt4MRunBjbBOt9IiKJbDEhZYosIgA5q8",
        googleURL = "https://maps.googleapis.com/maps/api/geocode/json?",
        googleParam = "&address=",
        googleMaps = "https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i349018013!3m9!2sen-US!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0",
        googleRequest = googleURL + (googleKey ? "&key=" + googleKey : "") + googleParam;

    const googleModel = {
            route: ['logradouro','long_name'],
            street_number: ['numero','short_name'],
            sublocality_level_1: ['bairro','long_name'],
            administrative_area_level_2: ['cidade','long_name'],
            administrative_area_level_1: ['estado','long_name'],
            country: ['pais','long_name']
        }

    app.factory('geolocation',['$http',function(http){
        return function($scope,callback){
            if (!$scope.dados.endereco.value){
                alert('Por favor digite um Endereço Cliente válido');
            }else{
                http.get(googleRequest + encodeURI($scope.dados.endereco.value)).then(function(response) {
                    //verifica se a quantidade de endereços procurado é > 0
                    if (response.data.results.length == 0){
                        alert("Endereço não encontrado. Digite um endereço válido. \n Ex.: av paulista, 100, sao paulo");
                    }else{
                        //atribui ao primeiro resultado (endereço) da lista
                        var result = response.data.results[0];
                        //altera o endereço para o formato válido do resultado
                        $scope.dados.endereco.value = result.formatted_address;

                        //loop: lista todos os campos de endereço do resultado
                        for (var i = 0; i < result.address_components.length; i++){
                            var dataComponent = false, dataType = false;
                            //procura os resultados da pesquisa se existem no googleModel
                            for (index in result.address_components[i].types){
                                if (googleModel[ result.address_components[i].types[index] ] ){
                                    //atribui o correspondente do googleModel ao dataModel
                                    dataComponent = googleModel[ result.address_components[i].types[index] ][0];
                                    //atribui o tipo de dado "long_name" ou "short_name"
                                    dataType = googleModel[ result.address_components[i].types[index] ][1];
                                    //atribui o valor do componente aos dados
                                    var val = result.address_components[i][ dataType ];
                                    $scope.dados[ dataComponent ].value = val;
                                    break;
                                }
                            }
                        }
                        //preenche a latitude e longitude
                        $scope.dados.latitude.value = result.geometry.location.lat;
                        $scope.dados.longitude.value = result.geometry.location.lng;
                        
                        if (callback) callback();
                    }
                });
            }
        }
    }]);

    app.factory('maps',[function(){
        this.map = {};
        this.markers = [];

        //cria o elemento map
        this.createMap = function(mapContainer,lat,lng,zoom){
            this.map = new L.Map(mapContainer, {center: new L.LatLng(lat, lng), zoom: zoom});
            L.tileLayer(googleMaps).addTo(this.map);
        }

        //localiza um ponto no map e cria um popup com o caption
        this.locateMap = function(lat,lng,zoom,caption){
            this.map.setView([lat,lng],zoom);
            L.popup()
                .setLatLng([lat,lng])
                .setContent(caption)
                .openOn(this.map);
        }

        //adiciona um marcado e associa um popup
        this.addMarker = function(lat,lng,caption){
            this.markers.push(
                L.marker([lat, lng]).addTo(this.map).bindPopup(caption)
            );

        }

        //limpa todos os marcadores
        this.clearMarkers = function(){
            this.map.closePopup();
            this.markers.forEach(function(marker) {
                this.map.removeLayer(marker);
            }, this);
        }

        //faz um zoom fit para todos os marcadores
        this.fitToAll = function(){
            if (this.markers.length > 0){
                var group = new L.featureGroup(this.markers);
                this.map.fitBounds(group.getBounds());
            }
        }

        return this;
    }]);

})();