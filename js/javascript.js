console.log("Desarrollado por: Jesús Emmanuel Arreola Mejia :) ")


window.onload = function() {
    get_manufacturers();
    get_products('todos');
};



function get_manufacturers() {
    fetch('./api/get_fabricantes.php', {
        method: 'POST'
    })
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Error on load' +
                    response.status);
                return;
            }
            // is correct
            response.json().then(function (data) {
                let select_body = `<option value="def" disabled selected>Filtrar por fabricante</option>
                <option value="todos" selected>Todos los fabricantes</option>`;
                for(const item in data) {
                    select_body += `<option value="${data[item]}">${data[item]}</option>`;
                }
                document.getElementById("select_fabricante").innerHTML = select_body;
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error ', err);
    });

}



function get_products(param) {
    let parametros = {
        "filtro": param
    };
    fetch('./api/get_productos.php', {
        method: 'POST',
        body: JSON.stringify(parametros)
    })
    .then(
        function (response) {

            if (response.status !== 200) {
                console.log('Error on load' +
                    response.status);
                return;
            }

            // Si la peticion responde de manera exitosa
            response.json().then(function (data) {
                let body_item = ``;
                for (const product in data) {
                    body_item += `<div class="row border_tb p-3 animate__animated animate__fadeInUp animate__slow">
                        <!-- img -->
                        <div class="col-md-3 ">
                            <img class="mt-10"  src="./images/${data[product].img}.png" alt="" height="150" width="150">
                        </div>

                        <!-- info -->
                        <div class="col-md-5 ">
                            <h3 class="pb-4">${data[product].nombre}</h3>
                            <p><b>Descripción:</b><span> ${data[product].descripcion}</span></p>
                            <p><b>Fabricante:</b><span>${data[product].fabricante}</span></p>
                            <p><b>Articulo Id:</b><span>${data[product].idArticulo}</span></p>
                            <p><b>Precio:</b><span>$${data[product].precio}</span></p>
                        </div>

                        <!-- compra -->
                        <div class="col-md-3 p-3 shop_item">
                            <h6 class="text-dark">Configura tus productos.</h6> <i class="text-secondary">Disponible de 1 a 100</i>
                            <p class="text-dark ">¿Cuántos quieres?</p>
                            <div class="input-group mb-3 pt-3">
                                <span class="input-group-text cs_green" id="basic-addon1"><img src="./images/market.png" width="20" height="20" alt=""></span>
                                <input type="number" id="text_${data[product].id}" onkeypress="return onlyNumbers(event, id)" onChange="get_total(${data[product].id}, ${data[product].precio})" min="0"  class="form-control font-small" placeholder="Número de licencias"
                                aria-label="Número de licencias" aria-describedby="basic-addon1">
                            </div>
                            <p class="text-right text-dark text-end">Total: <span id="span_${data[product].id}">$0.00</span></p>
                            <button type="button" class="btn cs_green text-light float-r">Agregar al carrito</button>
                        </div>
                    </div>`;
                }

                document.getElementById("row_items").innerHTML = body_item;

            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error ', err);
    });
}





function search_product() {

    document.getElementById("select_fabricante").value = 'def';

    if (document.getElementById('search_item').value != '') {
        
        document.getElementById("info").innerHTML = '';

        let parametros = {
            "search_word": document.getElementById('search_item').value
        };
        fetch('./api/search_product.php', {
            method: 'POST',
            body: JSON.stringify(parametros)
        })
        .then(
            function (response) {
    
                if (response.status !== 200) {
                    console.log('Error on load' +
                        response.status);
                    return;
                }
    
                // Si la peticion responde de manera exitosa
                response.json().then(function (data) {
                    let body_item = ``;
                    if (data.res == 0) {
                        let notice = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                            Tu busqueda no obtuvo resultados.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`; 
                        document.getElementById("info").innerHTML = notice;
                    }else{

                        for (const product in data) {
                            body_item += `<div class="row border_tb p-3 animate__animated animate__fadeInUp animate__slow">
                                    <!-- img -->
                                    <div class="col-md-3 ">
                                        <img class="mt-10" src="./images/${data[product].img}.png" alt="" height="auto" width="150">
                                    </div>

                                    <!-- info -->
                                    <div class="col-md-5 ">
                                        <h3 class="pb-4">${data[product].nombre}</h3>
                                        <p><b>Descripción:</b><span> ${data[product].descripcion}</span></p>
                                        <p><b>Fabricante:</b><span>${data[product].fabricante}</span></p>
                                        <p><b>Articulo Id:</b><span>${data[product].idArticulo}</span></p>
                                        <p><b>Precio:</b><span>$${data[product].precio}</span></p>
                                    </div>

                                    <!-- compra -->
                                    <div class="col-md-3 p-3 shop_item">
                                        <h6 class="text-dark">Configura tus productos.</h6> <i class="text-secondary">Disponible de 1 a 100</i>
                                        <p class="text-dark ">¿Cuántos quieres?</p>
                                        <div class="input-group mb-3 pt-3">
                                            <span class="input-group-text" id="basic-addon1"><i class="fas fa-shopping-cart"></i></span>
                                            <input type="text" id="text_${data[product].id}" onkeypress="return onlyNumbers(event, id)" onChange="get_total(${data[product].id}, ${data[product].precio})" class="form-control font-small" placeholder="Número de licencias"
                                            aria-label="Número de licencias" aria-describedby="basic-addon1">
                                        </div>
                                        <p class="text-right text-dark text-end">Total: <span id="span_${data[product].id}">$0.00</span></p>
                                        <button type="button" class="btn cs_green text-light float-r">Agregar al carrito</button>
                                    </div>
                                </div>`;
                        }
        
                        document.getElementById("row_items").innerHTML = body_item;
        
                    }

                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error ', err);
        });
    }else{
        let notice = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            Por favor escribe el producto que deseas buscar.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`; 
        document.getElementById("info").innerHTML = notice;
    }
        
    
    
}





function onlyNumbers(e, id){
    let key = window.Event ? e.which : e.keyCode;
    return (key >= 48 && key <= 57);
}


function get_total(id, price){
    let items = document.getElementById('text_'+id).value;
    items = items * price;

    document.getElementById('span_'+id).innerHTML = '$' + items;

}