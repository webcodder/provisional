/**
 * Created by Administrator on 2016/3/18.
 */
var myLoginInfo=JSON.parse(localStorage.getItem("myLoginInfo"))
cc.setRank(true)
cc.setRankUrl("/school/boot/rank/saveRank")
cc.setRankUrlAjax(true)
cc.setCallback(function (data) {
    sessionStorage.setItem("myGameRunk",JSON.stringify(data))
})

cc.setConvert(function (data) {
    console.log("score" + data);
    return {"studentNum":myLoginInfo.studentNum,"gameId":"1","score": data};
})

