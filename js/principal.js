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
        $("#template-individual-item").empty();

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

        const eachURL= [];
        for (var j= 0; j < 3; j++){
            eachURL.push(allPictures[j]);
        }

        let photo1= eachURL[0].url;
        console.log(photo1);
        let photo2= eachURL[1].url;
        console.log(photo2);
        let photo3= eachURL[2].url;
        console.log(photo3);

        let price= '$ ' + dataItem.price.toFixed(2) + ' MX';
        console.log(price);
        

        $("#template-individual-item").append(createTemplateArticule(name,allPictures,photo, photo1, photo2, photo3, price));
    /*---Inicializando Carousel*/
	$('.carousel').carousel({
        interval: 2000
    });	
    }

    function createTemplateArticule (name, allPictures,photo, photo1, photo2, photo3, price){
        console.log(name, allPictures, photo, photo1, photo2, photo3, price);

        const template= '<div id="box-description" class="row">' +
                            '<p class="col-6 col-md-4 col-lg-4 text-center font-weight-bold">'+name+'</p>' +
                            '<p class="col-3 col-md-3 col-lg-3 price text-center font-weight-bold">'+price+'</p>' +
                            '<img class="col-3 col-md-5 col-lg-5" src="'+photo+'" alt="thumbnail">' +
                        '</div>' +
                        '<button class="add-cart" type="submit"><i class="fas fa-cart-plus"></i>Add to cart</button>' +
                        '<div id="carouselExampleFade" class="carousel slide carousel-fade border border-secondary" data-ride="carousel">' +
                            '<div class="carousel-inner">' +
                                '<div class="carousel-item active">' +
                                    '<img class="d-block w-100" src="'+photo1+'" alt="First slide">' +
                                '</div>' +
                                '<div class="carousel-item">' +
                                    '<img class="d-block w-100" src="'+photo2+'" alt="Second slide">' +
                                '</div>' +
                                '<div class="carousel-item">' +
                                    '<img class="d-block w-100" src="'+photo3+'" alt="Third slide">' +
                                '</div>' +
                            '</div>' +
                            '<a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">' +
                                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                                '<span class="sr-only">Previous</span>' +
                            '</a>' +
                            '<a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">' +
                                '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                                '<span class="sr-only">Next</span>' +
                            '</a>' +
                        '</div>'

        return template;
    }

});