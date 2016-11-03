    $(function () {
        $("#btn").click(function () {//无序
            var len = $("#main div").length;
            for (var i = 0; i < len; i++) {
                $("#main div").eq(i).css("top", Math.random() * 75 + "%");
                $("#main div").eq(i).css("left", Math.random() * 80 + "%");
            }
        });

        $("#btn2").click(function () {//有序
            var len = $("#main div").length;
            for (var i = 0; i < len; i++) {
                $("#main div").eq(i).css("top", "0");
                $("#main div").eq(i).css("left", "0");
            }
        });

        $("#main div").mouseover(function () {
            var divid = $(this).attr("id"); //获取当前div的id
            var odiv = document.getElementById(divid); //得到当前div
            $(this).css("z-index", "100").siblings().css("z-index", "0"); //div层叠顺序
            $(this).addClass("pointer"); //初始化指针样式
            moveDiv(odiv);
        });

        function moveDiv(obj) {
            obj.onmousedown = function (e) {//鼠标按下事件
                var oe = e || window.event;
                var $this = this;
                var startX = oe.clientX - $this.offsetLeft;
                var startY = oe.clientY - $this.offsetTop;
                obj.className = "on"; //css3阴影样式添加
                document.onmousemove = function (e) {//鼠标移动事件
                    var oe = e || window.event;
                    $this.style.left = oe.clientX - startX + "px";
                    $this.style.top = oe.clientY - startY + "px";
                }

                document.onmouseup = function () {//鼠标松开事件
                    document.onmousemove = null;
                    document.onmouseup = null;
                    obj.className = "off"; //css3阴影样式去除

                    if ($this.releaseCapture) {//debug释放鼠标捕获
                        $this.releaseCapture();
                    }
                }
                if ($this.setCapture) {//debug设置鼠标捕获
                    $this.setCapture();

                }
                return false;
            }
        }
    });