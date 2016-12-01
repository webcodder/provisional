$(function(){
    //aa();

    bb();
});

function aa(){
    //es6语法
    $.ajax({
        type: "get",
        //url: "http://school.iboom.tv/cs/data.json?x=" + Math.random(),
        url: "http://localhost/lx2/json/jsnlx.json",
        scriptCharset: 'gbk',
        dataType: "json",
        success: function (data) {
            datalength = data.length;
                var str = "";
                for(var i = 0; i < datalength; i++) {
                    str += 
                    `
                        <dd>
                            <ul>
                                <li>${data[i]["position"]}</li>
                                <li>${data[i]["className"]}</li>
                                <li>${data[i]["key"]}</li>
                                <li>
                                    <div class="lx_pic">
                                        <img src='${Img(data[i]['header'])}' />
                                    </div>
                                    <span>${data[i]["name"]}</span>
                                </li>
                                <li>${data[i]["score"]}</li>
                            </ul>
                        </dd>
                    `
                }
                $("#lx_main").append(str);
        },
        error: function () {

        }
    });    
}

function bb(){
    //常用
    $.ajax({
        type: "get",
        //url: "http://school.iboom.tv/cs/data.json?x=" + Math.random(),
        url: "http://localhost/lx2/json/jsnlx.json",
        scriptCharset: 'gbk',
        dataType: "json",
        success: function (data) {
            var datalength = data.length;
            var str = "";
            for (var i = 0; i < datalength; i++) {
                str += "<dd><ul><li>" + data[i]["position"] + 
                "</li><li>" + data[i]["className"] +
                "</li><li>" + data[i]["key"] + 
                "</li><li><div class='lx_pic'><img src='" + Img(data[i]["header"]) + "' /></div><span>" + data[i]["name"] + 
                "</span></li><li>" + data[i]["score"] +
                "s</li></ul></dd>";
            }
            $("#lx_main").append(str);
        },
        error: function () {

        }
    });    
}

function Img(url) {
    if (url == null) {
        return "images/defaultIco.png";
    } else {
        return "http://static.iboom.tv/static/img/" + url;
    }
}