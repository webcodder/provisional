(function($){
    var common = {
        init: function(){  //运行
            var that = this;
            that.render();
            that.onload();
            that.bind();
        },
        datas: {
             
        },
        render: function(){  //封装所有对应的元素
            var that = this;
            that.dot = document.documentElement;
        }, 
        onload: function(){  //load事件
            var that = this;
            that.dot.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
        },
        bind: function () {  //放所有的事件
            var that = this;
            window.addEventListener("resize",function(){
                that.do_sth();
            },false);
        },
        do_sth: function(){
            var that = this;
            that.dot.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
        }
    };
    common.init();
    exports = common;  //模块化
})(jQuery);

