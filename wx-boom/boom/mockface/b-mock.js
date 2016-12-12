/**
 * Created by Administrator on 2016/11/22.
 */

(function (window) {
    var env = "dev"

    var face = {}

    var log = function (message) {
        console.log("form " + env + ",message is: " + message)
    }

    window.bMock = {
        getFace: function (faceName) {
            log("get face" + faceName);
            var faceCollection = face[faceName];
            if (!faceCollection) {
                log(faceName + "is null")
                throw  new Error("当前接口未定义！")
            } else {
                var realFace = faceCollection[env];
                if (!realFace) {
                    throw  new Error("当前环境的接口地址未定义！")
                } else {
                    return realFace;
                }
            }
        },
        setEnv: function (newEnv) {
            env = newEnv ? newEnv : "dev";
        },
        setFace: function (realFace) {
            face = realFace;
        }
    }
})(window)
