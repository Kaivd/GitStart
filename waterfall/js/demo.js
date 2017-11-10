window.onload=function(){
		waterfall('main','box');
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
		window.onscroll=function(){
			if(checkScrollSilde){
				var oParent=document.getElementById('main');
				//将数据块渲染到当页面的尾部
				for(var i=0;i<dataInt.data.length;i++){
					var oBox=document.createElement('div');
					oBox.className='box';
					oParent.appendChild(oBox);
					var oPic=document.createElement('div');
					oPic.className='pic';
					oBox.appendChild(oPic);
					var oImg=document.createElement('img');
					oImg.src="img/"+dataInt.data[i].src;
					oPic.appendChild(oImg);
				}
				waterfall('main','box');
			}
		}
	}
	function waterfall(parent,box){
		//将main下的所有class为box的元素取出来
		var oparent=document.getElementById(parent);
		var oBoxs=getByClass(oparent,box);
		//计算整个页面显示的列数（颜面宽/box的宽）
		var oBoxW=oBoxs[0].offsetWidth;//每一个box的宽（同宽）
		var cols=Math.floor(document.documentElement.clientWidth/oBoxW);//box的列数
		//console.log(cols);
		//设置main的宽度
		oparent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';//main的样式
		var hArr=[];// 存放每一列的高度
		//根据每列的高度插入图片
		for(var i=0;i<oBoxs.length;i++){
			if(i<cols){
				hArr.push(oBoxs[i].offsetHeight);
			}else{
				var minH=Math.min.apply(null,hArr);//列组中最低的高度
				var index=getMinHIndex(hArr,minH);//获取最低高度的index
				oBoxs[i].style.position = 'absolute';
				oBoxs[i].style.top=minH+'px';
				//oBoxs[i].style.left= oBoxW*index+'px';
				oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
				hArr[index]+=oBoxs[i].offsetHeight;//添加图片后，更新列组的高度，最低的高度+新添加图片的高度
			} 
		}
	}
	//根据class获取元素，每个box
	function getByClass(parent,clsname){
		var boxArr=[], //用来存储获取到的所有class为box的元素
			oElements=parent.getElementsByTagName('*'); 
		for(var i=0;i<oElements.length;i++){
			if(oElements[i].className==clsname){
				boxArr.push(oElements[i]);
			}
		}
		return boxArr;	
	}
	//获取高度最小的图片的index值
	function getMinHIndex(arr,val){
		for(var i in arr){
			if(arr[i]==val){
				return i;
			}
		}
	}

	//检测是否具备了滚动条加载数据块的条件：当滚动条滑到最后一张图片的一半时返回true值执行加载，利用最后一个box的lastbox与scrolltop+height的比较
	function checkScrollSilde(){
		var oParent=document.getElementById("main");
		var oBoxs=getByClass(oParent,'box');
		//最后一个box的一半的高度+该box距离main的top值
		var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
		var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//滚动条的top值
		var height=document.body.clientHeight||document.documentElement.clientHeight;//窗口页面高度
		return (lastBoxH<scrollTop+height)?true:false;
	}