$(window).on('load',function(event) {
	waterfall();
	var dataInt={"data":[
		{"src":'1.jpg'},
		{"src":'2.jpg'},
		{"src":'3.jpg'},
		{"src":'4.jpg'},
		{"src":'5.jpg'},
		{"src":'6.jpg'},
		{"src":'7.jpg'},
		{"src":'8.jpg'},
		{"src":'9.jpg'},
		{"src":'10.jpg'},
		{"src":'11.jpg'},
		{"src":'12.jpg'},
		{"src":'13.jpg'},
		{"src":'14.jpg'},
		{"src":'15.jpg'},
		{"src":'16.jpg'},
		{"src":'17.jpg'},
		{"src":'18.jpg'},
		{"src":'19.jpg'},
		{"src":'20.jpg'}
		]};//后台提供的json数据源
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(dataInt.data,function(key,value){//value:属于dom对象
				var oBox=$('<div>').addClass('box').appendTo($('#main'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				$('<img>').attr('src','img/'+value.src).appendTo($(oPic));//value.src==$(value).attr('src')
				//console.log(typeof(value.src));
				waterfall();
			})
		}
	});
});

function waterfall(){
	var $boxs=$('#main>div');
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$('main').width(w*cols).css('margin','0 auto');
	var hArr=[];
	$boxs.each(function(index,value){//index:每个box的索引，value：属于dom对象 例如<div>...</div>
		//console.log(index+"  "+value);
		var h=$boxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index]=h;
		}else{
 			var minH=Math.min.apply(null,hArr);
 			var minHIndex=$.inArray(minH,hArr);//$.inArray(val,arr):根据val从数组中找出返回索引
 			$(value).css({
 				'position':'absolute',
 				'top':minH+'px',
 				'left':minHIndex*w+'px'
 			});
 			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	});
	
}

function checkScrollSlide(){
	var $lastBox=$('#main>div').last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}