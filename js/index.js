$(function(){
	var $num = $('#num>a');
	var $kind = $('.kind>a');
	
	var $pic = $('.smallpic');
	var $mpic = $('.main-pic');
	var $fpic = $('#float-pic');
	var $bpic = $('.big-pic > img');
	
	var $mwidth = parseInt($mpic.css('width'));
	var $fwidth = parseInt($fpic.css('width'));
	var $bwidth = parseInt($bpic.css('width'));
	

	var X,Y;
	var Min = 0,Max = $mwidth-$fwidth;
	var half = $fwidth/2;
	
	//获取当前日期并打印
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = "今天（" +year + "年" + month + "月" + strDate + "日）";
        return currentdate;
    }
	$('#today').text(getNowFormatDate());
	
	//鼠标进入小图更换大图
	$pic.mouseenter(function(){
		console.log($pic.index(this));
		for(var i = 0;i<$mpic.length;i++){
			$mpic.eq(i).css("display","none");
			$bpic.eq(i).css("display","none");
			$pic.eq(i).css("border-color","white");
		}
		$mpic.eq($pic.index(this)).css("display","block");
		$bpic.eq($pic.index(this)).css("display","block");
		$pic.eq($pic.index(this)).css("border-color","#e93536");
	});
	
	//调节商品数量
	$('#num-plus').click(function(){
		$num.text(parseInt($num.text())+1);
	});
	$('#num-minus').click(function(){
		if($num.text()>'1')
			$num.text(parseInt($num.text())-1);
	});
	
	//进入浮动框展示局部放大图
	$fpic.mouseenter(function(){
		$('.big-pic').css("display","block");
	});
	$fpic.mouseleave(function(){
		$('.big-pic').css("display","none");
	});
	
	//获取浮动框位置
	$mpic.mousemove(function (e) {
		X = parseInt(e.offsetX)-half;
		Y = parseInt(e.offsetY)-half;

		if(X<Min) X = Min;
		if(Y<Min) Y = Min;
		if(X>Max) X = Max;
		if(Y>Max) Y = Max;
		
		$fpic.css('left',X);
		$fpic.css('top',Y);
		$bpic.css('left',X/$mwidth*$bwidth);
		$bpic.css('top',Y/$mwidth*$bwidth);
    });
	
	$fpic.mousemove(function (e) {
		X += parseInt(e.offsetX)-half;
		Y += parseInt(e.offsetY)-half;

		console.log("X:"+X+" Y:"+Y);
		if(X<Min) X = Min;
		if(Y<Min) Y = Min;
		if(X>Max) X = Max;
		if(Y>Max) Y = Max;
		
		$fpic.css('left',X);
		$fpic.css('top',Y);
		$bpic.css('left',-(X/$mwidth*$bwidth));
		$bpic.css('top',-(Y/$mwidth*$bwidth));
	});
	
	$mpic.mouseenter(function (e) {
		$fpic.css('display','block');
	});
	
	$fpic.mouseleave(function (e) {
		$fpic.css('display','none');
	});
	
	//初始化
	for(var i = 0;i<$mpic.length;i++){
		$mpic.eq(i).css("display","none");
		$bpic.eq(i).css("display","none");
	}
	$mpic.eq(0).css("display","block");
	$bpic.eq(0).css("display","block");
	
});  

