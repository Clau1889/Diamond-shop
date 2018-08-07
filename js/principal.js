jQuery(document).ready(function($){

    /*---Inicializando Carousel*/
	$('.carousel').carousel({
        interval: 2000
    });						

    getData();
    /*---FUNCION AJAX PARA TODOS LOS POKEMONES---*/
    function getData() {
        $.ajax({
            url: 'https://api.mercadolibre.com/sites/MLA/search?q=joyeria',
            type: 'GET',
            datatype: 'json',
            primary_results: 25,
            limit: 12
        })
            .done(function (response) {
                const getAllData = (response);
                getDescriptionJewelry(getAllData);
            })
            .fail(function () {
                console.log("Error");
            })
    }

    function getDescriptionJewelry(data){
        console.log(data);
        let arrayjewelry= [];
        let searchJewelry = data.results;

        for (var i = 0; i < searchJewelry.length; i++) {
            let allJewelry = searchJewelry[i];
            console.log(allJewelry);
            let photo = allJewelry.thumbnail;
            console.log(photo);
            let title = allJewelry.title;
            console.log(title);
            let price= allJewelry.price;
            console.log(price);
        }
    }
});