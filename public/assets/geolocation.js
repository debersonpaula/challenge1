var autocomplete;
var componenteEndereco = {
    route: ['logradouro','long_name'],
    street_number: ['numero','short_name'],
    sublocality_level_1: ['bairro','long_name'],
    administrative_area_level_2: ['cidade','long_name'],
    administrative_area_level_1: ['estado','long_name'],
    country:   ['pais','long_name']
}

//insere os controle de endereço
var formCadastro = $('#formCadastro');
for (componente in componenteEndereco){
    formCadastro.append('<input type="text" name="'+ componenteEndereco[componente][0] + '" id="'+ componente + '">');
    
}

//inicia a função de autocomplete do google
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('address')),
        {types: ['geocode']});

    // Depois que o usuário selecionar o endereço, preenche os campos "hidden" no formulário
    autocomplete.addListener('place_changed', carregaEndereco);
}

//altera o valor de um campo
function alteraCampo(nome,valor){
    $('#'+nome).val(valor);
}

function carregaEndereco() {
    var place = autocomplete.getPlace();
    console.log(place);
    //limpa todos os campos de endereço
    for (componente in componenteEndereco){
        alteraCampo(componente,'');
    }
    //varre a lista do place e preenche os campos correspondentes
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componenteEndereco[addressType]) {
            var val = place.address_components[i][componenteEndereco[addressType][1]];
            alteraCampo(addressType,val);
        }
    }
    //preenche a latitude e longitude
    alteraCampo('latitude',place.geometry.location.lat());
    alteraCampo('longitude',place.geometry.location.lng());
}


function geolocate() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
        });
    }
}