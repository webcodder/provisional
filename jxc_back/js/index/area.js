/**
 * @author zmx2321
 * @return
 */

function getProvinceBuy() {
    var province = eval(proStr);
    
    var newStr = new Array();
    for (var i = 0, psize = province.length; i < psize; i++) {
        province[i].NAME;
        var city = eval(province[i].ITEMS);
        newStr.push(`
            <li class="pro${i}" onclick="getCityBuy(${i})">
                <dl>
                    <dd>${province[i].NAME}</dd>
                </dl>
            </li>
        `);
    }
    $('#addressBox').find('ul').html(newStr);
}

function getCityBuy(val) {
    $('.pro' + val).addClass("active").siblings().removeClass("active");

    var province = eval(proStr);
    var city = eval(province[val].ITEMS);
    var newStr = new Array();

    for (var i = 0, csize = city.length; i < csize; i++) {
        var area = eval(city[i].ITEMS);

        newStr.push(
            "<li class='city" + i + " ' onclick='getAreaBuy(" + i + "," + val + ")'>" +
                "<dl>" +
                    "<dd>" + city[i].NAME + "</dd>" +
                "</dl>" + 
            "</li>"
        );
    }
    $('#addressBox').find('ul').html(newStr);
}

function getAreaBuy(val, val1) {
    $('.city' + val).addClass("active").siblings().removeClass("active");

    var province = eval(proStr);
    var city = eval(province[val1].ITEMS);
    var area = eval(city[val].ITEMS);
    var newStr = new Array();

    for (var i = 0, asize = area.length; i < asize; i++) {
        area[i].NAME;
        newStr.push(
            "<li class='area" + i + " ' onclick='getallArea(" + val1 + "," + val + "," + i + ")'>" +
                "<dl>" +
                    "<dd>" + area[i].NAME + "</dd>" +
                "</dl>" + 
            "</li>"
        );
    }
    $('#addressBox').find('ul').html(newStr);

    if (asize == 0){
        var allarea = province[val1].NAME + city[val].NAME;;

        $('#addressDetail span').text(allarea);

        $('body').removeClass('f-oh');
        $('.addressModal').fadeOut();
        $('.m-select_address').slideUp();
    }
}

function getallArea(val, val1, val2) {
    $('.area' + val2).addClass("active").siblings().removeClass("active");

    var province = eval(proStr);
    var city = eval(province[val].ITEMS);
    var area = eval(city[val1].ITEMS);
    var allarea = province[val].NAME + city[val1].NAME + area[val2].NAME;

    $('#addressDetail span').text(allarea);

    $('body').removeClass('f-oh');
    $('.addressModal').fadeOut();
    $('.m-select_address').slideUp();
}