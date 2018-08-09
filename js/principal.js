jQuery(document).ready(function($){

    /*---Inicializando Carousel*/
	$('.carousel').carousel({
        interval: 2000
    });						

                            /*-------------------------------------
                                        PRINCIPAL PAGE
                            -------------------------------------*/

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
            let price= allJewelry.price.toFixed(2);
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
                                    '<button class="add-cart" type="submit" title="'+name+'" price="' +price+ '"><i class="fas fa-cart-plus"></i></button>'
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
        window.location.hash = 'jewerly/' + idItem;
    });
    

                            /*-------------------------------------
                                    DESCRIPTION-ITEM PAGE
                            -------------------------------------*/


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

        let price= dataItem.price.toFixed(2);
        console.log(price);
        

        $("#template-individual-item").append(createTemplateArticule(name,allPictures,photo, photo1, photo2, photo3, price));
    /*---Inicializando Carousel----*/
	$('.carousel').carousel({
        interval: 2000
    });	
    }

    function createTemplateArticule (name, allPictures,photo, photo1, photo2, photo3, price){
        console.log(name, allPictures, photo, photo1, photo2, photo3, price);

        const template= '<div id="box-description" class="row">' +
                            '<p class="col-6 col-md-4 col-lg-4 text-center font-weight-bold">'+name+'</p>' +
                            '<p class="col-3 col-md-3 col-lg-3 price text-center font-weight-bold">$ ' +price+ ' MX</p>' +
                            '<img class="col-3 col-md-5 col-lg-5" src="'+photo+'" alt="thumbnail">' +
                        '</div>' +
                        '<button id="back-page" class="col-6 col-md-3 col-lg-3 back" type="submit"><i class="fas fa-arrow-circle-left"></i>Back</button>' +
                        '<button id="add-cart" class="col-6 col-md-3 col-lg-3 back add-cart" title="'+name+'" price="'+price+'"  type="submit"><i class="fas fa-arrow-circle-left"></i>Add</button>' +
                        '<div id="carouselExampleFade" class="carousel slide carousel-fade border border-secondary w-85" data-ride="carousel">' +
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

    /*  ----------------------------------------------
          FUNCIÓN PARA REALIZAR EL URL PARA CAMBIARLO
    ------------------------------------------------- */

    $(window).on('hashchange', function (){
        /*----- DecodeURI => decodifica la URL -----*/
        decodeURL (decodeURI(window.location.hash));
    });

    /*----- Función para desencadenar la decodificación primeramente de la URL -----*/
    $(window).trigger('hashchange');

    /*Navegar en el "navigator"*/
    function decodeURL(url){
        console.log('navegador');

        /*----- La variable guardará en un array de cadenas la URL y la separará en cadenas individuales
        cada que encuentre el separador "/" -----*/
        const URLtemplate = url.split('/')[0];
        
        const map ={

            /*Función para arrojar TODOS los artículos"*/
            '': function(){
                    mainItemsPage();
            },

            /*Funcion para arrojar cada artículo"*/
            '#jewerly': function(){
                
                let eachId = url.split('#jewerly/')[1].trim();
                console.log(url); 
                console.log(url.split('#jewerly/'));
                
                    descriptionItemPage(eachId);
            }
        };

        if (map[URLtemplate]){
            map[URLtemplate]();
        }else{
            errorPage();
        }
    }

    function mainItemsPage(data){
        $(".main-all-items").show();
        getData();
        console.log('mainItemsPage');
    }

    function descriptionItemPage(eachId){
        $(".main-all-items").hide();
        getDataEachItem(eachId);
        console.log('descriptionItemPage');
    }

    function errorPage(){
        console.log('errorPage');
    }

    $(document).on('click', '#back-page', function(){
        window.location.href='';
    });


                            /*-------------------------------------
                                    LIST-CART  PAGE
                            -------------------------------------*/
                            

    function addListCart(name, price){

        let itemsCart= [];

        //variable para crear un objeto en donde se sustituira los atributos encontrados 
        let itemSelected= {
            name: name,
            price: price,
        }

        //Accediendo a local storage
        if(window.localStorage.eCommerceJewel){
            console.log('existe!');
            //Si ya hay datos en el localStorage se meten en la variable para ralizar un array de objetos
            itemsCart = JSON.parse(window.localStorage.eCommerceJewel);
        }

        //Cada articulo agregado se guarda en el array
        itemsCart.push(itemSelected);
        window.localStorage.eCommerceJewel = JSON.stringify(itemsCart);//se hace en string

    }

    //Funcion para que cuando se de agregar en el carrito se guarden los artículos
    $(document).on('click', '.add-cart', function(e){
        e.preventDefault();
        let name = $(this).attr('title');
        console.log(name);

        let price = Number($(this).attr('price'));
        console.log(price);

        addListCart(name, price);
    });

    //función para hacer click al botón DELETED
    $(document).on('click', '#deleted', function(e){
        e.preventDefault();

        let index = $(this).attr('i');
        console.log(index);

        deletedItem(index);
    });

    //Función para borrar artículos del carrito
    function deletedItem (i){
        if(window.localStorage.eCommerceJewel){
            console.log('existe!');
            //Si ya hay datos en el localStorage se meten en la variable para ralizar un array de objetos
            let itemsCart = JSON.parse(window.localStorage.eCommerceJewel);
            itemsCart.splice(i, 1); 

            window.localStorage.eCommerceJewel = JSON.stringify(itemsCart);
        }
    }



});