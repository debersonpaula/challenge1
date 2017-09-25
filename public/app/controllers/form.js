(function () {

    var app = angular.module('app');
    
    var dataModel = {
        cliente:{field:'cliente',value:'',type:'text',class:'form-group',placeholder:'Nome do Cliente',required:1,disabled:0},
        peso:{field:'peso',value:'',type:'number',class:'form-group',placeholder:'Peso da Entrega (kg)',required:1,disabled:0},
        endereco:{field:'endereco',value:'',type:'text',class:'form-group',placeholder:'Endereço Cliente',required:1,disabled:0},
        complemento:{field:'complemento',value:'',type:'text',class:'form-group',placeholder:'Complemento',required:0,disabled:0},
        logradouro:{field:'logradouro',value:'',type:'hidden',class:'form-group',placeholder:'logradouro',required:0,disabled:0},
        numero:{field:'numero',value:'',type:'hidden',class:'form-group',placeholder:'numero',required:0,disabled:0},
        bairro:{field:'bairro',value:'',type:'hidden',class:'form-group',placeholder:'bairro',required:0,disabled:0},
        cidade:{field:'cidade',value:'',type:'hidden',class:'form-group',placeholder:'cidade',required:0,disabled:0},
        estado:{field:'estado',value:'',type:'hidden',class:'form-group',placeholder:'estado',required:0,disabled:0},
        pais:{field:'pais',value:'',type:'hidden',class:'form-group',placeholder:'pais',required:0,disabled:0},
        latitude:{field:'latitude',value:'',type:'text',class:'form-group',placeholder:'latitude',required:0,disabled:1},
        longitude:{field:'longitude',value:'',type:'text',class:'form-group',placeholder:'longitude',required:0,disabled:1}                                                        
    }

    app.controller('formcontroller',['$scope','$rootScope','geolocation','rest','maps',function(scope,rootScope,geolocation,rest,maps){
        //confirmações de endereço e número
        var enderecoConfirmado = false,
            numeroConfirmado = false;

        //atribui o dataModel ao scope
        scope.dados = dataModel;

        //metodo para procurar endereços
        scope.searchmap = function($event){
            $event.preventDefault();
            //reset o numero para validação
            scope.dados.numero.value = false;
            numeroConfirmado = false;
            //função de geolocalização
            geolocation(scope,function(){
                //focaliza a posição no endereço e adiciona um popup
                maps.locateMap(
                    scope.dados.latitude.value,
                    scope.dados.longitude.value,
                    16,
                    scope.dados.endereco.value);

                enderecoConfirmado = true;
                if (scope.dados.numero.value){
                    numeroConfirmado = true;
                }
            });
            return false;
        }
        //metodo submit
        scope.submit = function(){

            if (!enderecoConfirmado || !numeroConfirmado){
                alert('O endereço não está confirmado ou não tem número. Para confirmar, digite o endereço e clique em Procurar Endereço');
            }else{

                var postData = {};
                for (index in scope.dados){
                    postData[index] = scope.dados[index].value;
                }
                rest.create(postData)
                    .then(function(){
                        scope.reset();
                        rootScope.$emit('tableRequery');
                        rootScope.$emit('mapsRequery');
                    })
                    .catch(function(err){
                        window.alert(err.data.message);
                    });
            }
        }
        //metodo reset
        scope.reset = function(){
            for (index in scope.dados){
                scope.dados[index].value = '';
            }
        }
        //
        scope.change = function(data){
            if (data.field = 'endereco'){
                enderecoConfirmado = false;
            }
        }
    }]);

    app.directive('inputemplate',function(){
        return {
            template: '<input type="{{x.type}}" class="form-control" placeholder="{{x.placeholder}}" ng-model="x.value" ng-disabled="x.disabled" ng-required="x.required" ng-change="change(x)">'
          };
    });

})();