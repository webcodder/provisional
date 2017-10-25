//全选
var selectAll = function(){
	$('#selectAll').click(function(){
	    if(this.checked){   
	    	$('.select :checkbox').prop("checked", true); 
	    }else{   
	    	$('.select :checkbox').prop("checked", false);
	    }   
	});
}

$(function(){
	selectAll();	//全选
});