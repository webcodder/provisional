var str="sdddrtkjsfkkkasjdddj";
var max=0;
var char;
function Search(str){
    var json={};
    for(var i=0;i<str.length;i++){
        if(!json[str[i]]){
            json[str[i]]=str[i];
        }
        else{
            json[str[i]]+=str[i];
        }
    }

    for(var i=0;i<str.length;i++){
        if(json[str[i]].length>max){
            max=json[str[i]].length;
            char=str[i];
        }
    }
    console.log("出现次数最多的字符是"+char+",出现了"+max+"次")
}
Search(str);