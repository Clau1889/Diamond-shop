jQuery(document).ready(function($){

    /*---Inicializando Carousel*/
	$('.carousel').carousel({
        interval: 2000
    });						

    getData();
    /*---FUNCION AJAX PARA TODOS LOS POKEMONES---*/
    function getData() {
        $.ajax({
            url: 'https://api.mercadolibre.com/sites/MLA/search?q=Jewelry=nacklaces=rings=bracelet',
            type: 'GET',
            datatype: 'json',
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
        let searchJewelry = data.results;

        for (var i = 0; i < searchJewelry.length; i++) {
            let allJewelry = searchJewelry[i];
            //console.log(allJewelry);
            let id = allJewelry.id;
            //console.log(id);
            let photo = allJewelry.thumbnail;
            //console.log(photo);
            let name = allJewelry.title;
            //console.log(name);
            let price= '$ ' + allJewelry.price.toFixed(2) + ' MX';
            //console.log(price);

        $("#template-card-item").append(createTemplate(id, photo, name, price));
        }
    }

    function createTemplate (id, photo, name, price){
        console.log(id, photo, name, price);

        const template = '<div class="col-6 col-md-3 col-lg-3 card-box">' +
                            '<div class="card">' +
                                '<img class="card-img-top" src="'+photo+'" alt="">' +
                                '<div class="card-body">' +
                                    '<p class="name-item">'+name+'</p>' +
                                    '<span class="price-item text-black font-weight-bold"> '+price+'</span>' +
                                    '<br>' +
                                    '<a class="card-title text-center right" href="" id-itemd="'+id+'">more ></a>' +
                                    '<button class="cart-icon" type="submit"><i class="fas fa-cart-plus"></i></button>'
                                '</div>' +
                            '</div>' +
                        '</div>'

        
        const boxPortfolio = $('#box-portfolio');
        boxPortfolio.append(template);

        return template;
    }


});