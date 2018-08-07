jQuery(document).ready(function($){

    /*---Inicializando Carousel*/
	$('.carousel').carousel({
        interval: 2000
    });						

    getData();
    /*---FUNCION AJAX PARA TODA LA DATA POR CATEGORIA JEWELRY---*/
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
        //console.log(data);
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
            let justPrice= allJewelry.price;
            let price= '$ ' + allJewelry.price.toFixed(2) + ' MX';
            //console.log(price);

        $("#template-card-item").append(createTemplate(id, photo, name, price));
        }
    }

    function createTemplate (id, photo, name, price){
        // console.log(id, photo, name, price);

        const template = '<div class="col-6 col-md-3 col-lg-3 card-box">' +
                            '<div class="card">' +
                                '<img class="card-img-top" src="'+photo+'" alt="">' +
                                '<div class="card-body">' +
                                    '<p class="name-item">'+name+'</p>' +
                                    '<span class="price-item text-black font-weight-bold"> '+price+'</span>' +
                                    '</br>' +
                                    '<a class="card-title text-center right see-more" href="" id-item="'+id+'">More ></a>' +
                                    '<button class="cart-icon" type="submit"><i class="fas fa-cart-plus"></i></button>'
                                '</div>' +
                            '</div>' +
                        '</div>'


        return template;
    }

    /*---FUNCIÓN PARA ENLAZAR ID DEL ITEM SELECCIONADO AL DAR CLICK EN "MORE"---*/
    $(document).on('click','.see-more', function(e){
        e.preventDefault();

        const idItem = $(this).attr('id-item');
        // console.log(idItem);
        getDataEachItem(idItem);
    });
    
    /*---FUNCIÓN PARA OBTENER LA DATA INFORMACION DEL ARTÍCULO SEGUN EL ID---*/
    function getDataEachItem(eachData){
        $.ajax({
            url: 'https://api.mercadolibre.com/items/' + `${eachData}`,
            type: 'GET',
            datatype: 'json',
        })
            .done(function (response) {
                const eachItem = (response);
                descriptionItem(eachItem);
            })
            .fail(function () {
                console.log("Error");
            })
        }
    
    /*---FUNCIÓN PARA OBTENER LA DATA SELECCIONADO---*/
    function descriptionItem(dataItem){
        console.log(dataItem);

        let name= dataItem.title;
        console.log(name);
        let photo= dataItem.thumbnail;
        console.log(photo);
        let allPictures= dataItem.pictures;

        for (var j= 0; j < allPictures.length; j++){
            let pictures= allPictures[j];
            console.log(pictures);

            let url= pictures.url;
            console.log(url);
        }

        let price= dataItem.price;
        console.log(price);
        

        return (name, photo, allPictures, price);
    }

});