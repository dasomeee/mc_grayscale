var static_value = {
	left_on_off_flag : false,
	right_on_off_flag : false
};

var portfolio_count_active = function (count_num_before, count_num_after){
	var obj = $('.inner_box_portfolio');
	var number_obj = obj.find('.number em');

	var string_value_before = new Array();							
	string_value_before[0] = Number(count_num_before.substring(0,1));
	string_value_before[1] = Number(count_num_before.substring(1,2));
	string_value_before[2] = Number(count_num_before.substring(2,3));

	var string_value_after = new Array();							
	string_value_after[0] = Number(count_num_after.substring(0,1));
	string_value_after[1] = Number(count_num_after.substring(1,2));
	string_value_after[2] = Number(count_num_after.substring(2,3));

	var flag = true;

	obj.bind('mouseover touchstart',function(e){
		if (flag){
			flag = false;
			for (var i = 0; i < string_value_after.length ; i++ ){
				number_obj.eq(i).stop().delay( (i * 150) ).animate({'top': - (string_value_after[i] * 91) },1000,'easeOutExpo',function (){
					if (i == 2){
						flag = true;
					}
				});
			}	
		}
	});

	obj.bind('mouseleave touchend',function(e){
		flag = true;
		for (var i = 0; i < string_value_before.length ; i++ ){
			number_obj.eq(i).stop().delay( (i * 100) ).animate({'top':  - (string_value_before[i] * 91) },1000,'easeOutExpo');
		}
	});

	setTimeout(function(){
		for (var i = 0; i < string_value_before.length ; i++ ){
			number_obj.eq(i).stop().delay( (i * 150) ).animate({'top': - (string_value_before[i] * 91) },1000,'easeOutExpo',function (){
				if (i == 2){
					flag = true;
				}
			});
		}
	},1000);
};


var window_resize_active = function (){
	var screen_width = $(window).width();
	var screen_height = $(window).height();
	var part_flag = 5000;

	var add_class = function (){
		if ( screen_width <= 1700  && screen_width > 1300 ){
			if (part_flag == 1){ return; }
			$('html').removeClass('size1700');
			$('html').removeClass('size960');
			$('html').removeClass('size600');
			$('html').addClass('size1300');
			part_flag = 1;
		}else if ( screen_width <= 1300  && screen_width > 960 ){
			if (part_flag == 2){ return; }
			$('html').removeClass('size1700');
			$('html').removeClass('size1300');
			$('html').removeClass('size960');
			$('html').removeClass('size600');

			part_flag = 2;
		}else if ( screen_width <= 960  && screen_width > 600 ){
			if (part_flag == 3){ return; }
			$('html').removeClass('size1700');
			$('html').removeClass('size1300');
			$('html').removeClass('size600');
			$('html').addClass('size960');
			part_flag = 3;
		}else if ( screen_width <= 600 ){
			if (part_flag == 4){ return; }
			$('html').removeClass('size1700');
			$('html').removeClass('size1300');	
			$('html').removeClass('size960');
			$('html').addClass('size600');
			part_flag = 4;
		}else {
			if (part_flag == 5){ return; }
			$('html').removeClass('size1300');
			$('html').removeClass('size960');
			$('html').removeClass('size600');
			$('html').addClass('size1700');
			part_flag = 5;
		}
	};


	var popup_resize_active = function(){
		var pop_height = $('#left_wrap').height();
		var target_obj = $('#left_wrap .pop_wrap');

		target_obj.css({'height':pop_height});
	};

	add_class();
	
	
	setTimeout(function(){
		popup_resize_active();
	},1000);
	

	$(window).resize(function(){
		screen_width = $(window).width();
		screen_height = $(window).height();
		popup_resize_active();

		add_class();
	});
};

var map;
function init(sp_value) {
	map = new daum.maps.Map(document.getElementById(sp_value.set_id), {
		center: new daum.maps.LatLng(sp_value.xylocation[0], sp_value.xylocation[1]),
		// center: new daum.maps.LatLng(37.537123, 127.005523),
		level: 3
	});

	var marker = new daum.maps.Marker({
		position: map.getCenter()
	});
	marker.setMap(map);
		
	var infowindow = new daum.maps.InfoWindow({
		content: sp_value.info_window,
		removable : true
	});
	
	daum.maps.event.addListener(marker, "click", function() {
		infowindow.open(map, marker);
	});

	var infowindow_only = new daum.maps.InfoWindow({
		position: new daum.maps.LatLng(sp_value.xylocation[0], sp_value.xylocation[1]),
		//position: new daum.maps.LatLng(37.537123, 127.005523),
		content: sp_value.info_window
	});
	infowindow_only.open(map);
}


var map_active = function (){
	var obj = $('#top_wrap');
	var open_btn = $('.inner_box_contact');
	var close_btn = obj.find('.top_close');
	var flag = true;
	var speed = 600;
	var ease = 'easeInOutExpo';

	open_btn.bind('click',function(){
		obj.stop().animate({'top':0},speed,ease);
	});

	close_btn.bind('click',function(){
		obj.stop().animate({'top':-700},speed,ease);
	});
};


var provision_pop_open = function (open_popup_parent, open_popup_target){
	var obj = $('#left_wrap');
	var pop_wrap =  obj.find('.pop_wrap');
	var pop_tartget =  pop_wrap.find(open_popup_target);

	//default 
	pop_wrap.css({'opacity':'0','display':'block'});
	pop_wrap.children().css({'display':'none'});
	pop_tartget.css({'display':'block'});

	pop_wrap.animate({'opacity':1},500);
};

var provision_pop_close = function (open_popup_parent, open_popup_target){
	var obj = $('#left_wrap');
	var pop_wrap =  obj.find('.pop_wrap');
	var pop_tartget =  pop_wrap.find(open_popup_target);	

	//default
	pop_wrap.animate({'opacity':0},500,function (){
		pop_wrap.css({'opacity':'0','display':'none'});
		pop_wrap.children().css({'display':'none'});
	});
};

var counsel_pop_open = function (open_popup_parent, open_popup_target){
	var obj = $('#left_wrap');
	var pop_wrap =  obj.find('.pop_wrap');
	var pop_tartget =  pop_wrap.find(open_popup_target);

	if($('#counsel_form_id1').val() == "" ){
		alert("�좏삎�� �좏깮�댁＜�몄슂");
		$('#counsel_form_id1').focus();
		return;
	}
	if($('#counsel_form_id2').val() == "" ){
		alert("�꾨줈�앺듃紐낆쓣 �낅젰�댁＜�몄슂");
		$('#counsel_form_id2').focus();
		return;
	}
	if($('#counsel_form_id3').val() == "" ){
		alert("�뚯궗紐낆쓣 �낅젰�댁＜�몄슂");
		$('#counsel_form_id3').focus();
		return;
	}
	if($('#counsel_form_id4').val() == "" ){
		alert("�대떦�� �대쫫�� �낅젰�댁＜�몄슂");
		$('#counsel_form_id4').focus();
		return;
	}
	if($('#counsel_form_id5').val() == "" ){
		alert("�곕씫泥섎� �낅젰�댁＜�몄슂");
		$('#counsel_form_id5').focus();
		return;
	}
	if($('#counsel_form_id6').val() == "" ){
		alert("�몃뱶�� 踰덊샇瑜� �낅젰�댁＜�몄슂");
		$('#counsel_form_id6').focus();
		return;
	}
	if($('#counsel_form_id7').val() == "" ){
		alert("�대찓�쇱쓣 �낅젰�댁＜�몄슂");
		$('#counsel_form_id7').focus();
		return;
	}
	if(!$('#counsel_form_id16').is(':checked')){
		alert("媛쒖씤�뺣낫 �섏쭛 諛� �ъ슜�� �숈쓽�섏꽭��. ");
		$('#counsel_form_id16').focus();
		return;
	}

	//default 
	pop_wrap.css({'opacity':'0','display':'block'});
	pop_wrap.children().css({'display':'none'});
	pop_tartget.css({'display':'block'});

	pop_wrap.animate({'opacity':1},500);
};

var counsel_pop_close = function (open_popup_parent, open_popup_target){
	var obj = $('#left_wrap');
	var pop_wrap =  obj.find('.pop_wrap');
	var pop_tartget =  pop_wrap.find(open_popup_target);	
		
	//default
	pop_wrap.animate({'opacity':0},500,function (){
		pop_wrap.css({'opacity':'0','display':'none'});
		pop_wrap.children().css({'display':'none'});
	});

	//�뚯씪�꾩넚	
	$('#counsel_form_ajax').attr("action","./2014/ajax/counsel_proc.ajax.php");
	$('#counsel_form_ajax').submit(); 
};

var counsel_simple_pop_open = function (open_popup_parent, open_popup_target){
	var obj = $('#left_wrap');
	var pop_wrap =  obj.find('.pop_wrap');
	var pop_tartget =  pop_wrap.find(open_popup_target);

	if($('#counsel_form_simple_id1').val() == "" ){
		alert("�좏삎�� �좏깮�댁＜�몄슂");
		$('#counsel_form_simple_id1').focus();
		return;
	}	
	if($('#counsel_form_simple_id2').val() == "" ){
		alert("�대떦�� �대쫫�� �낅젰�댁＜�몄슂");
		$('#counsel_form_simple_id2').focus();
		return;
	}
	if($('#counsel_form_simple_id3').val() == "" ){
		alert("�곕씫泥섎� �낅젰�댁＜�몄슂");
		$('#counsel_form_simple_id3').focus();
		return;
	}	
	if($('#counsel_form_simple_id4').val() == "" ){
		alert("�대찓�쇱쓣 �낅젰�댁＜�몄슂");
		$('#counsel_form_simple_id4').focus();
		return;
	}
	if(!$('#counsel_form_simple_id15').is(':checked')){
		alert("媛쒖씤�뺣낫 �섏쭛 諛� �ъ슜�� �숈쓽�섏꽭��. ");
		$('#counsel_form_simple_id15').focus();
		return;
	}


	//default 
	pop_wrap.css({'opacity':'0','display':'block'});
	pop_wrap.children().css({'display':'none'});
	pop_tartget.css({'display':'block'});

	pop_wrap.animate({'opacity':1},500);
};

var counsel_simple_pop_close = function (open_popup_parent, open_popup_target){
	var obj = $('#left_wrap');
	var pop_wrap =  obj.find('.pop_wrap');
	var pop_tartget =  pop_wrap.find(open_popup_target);
	
	//ajax
	$.ajax({ 
		type:"post",
		url:"/2014/ajax/counsel_simple_proc.ajax.php",
		data:{
			type:$('#counsel_form_simple_id1').val(), 			
			name:$('#counsel_form_simple_id2').val(),			
			mobile:$('#counsel_form_simple_id3').val(), 
			email:$('#counsel_form_simple_id4').val(), 
			op1:$(':radio[name="option1"]:checked').val(), 
			op2:$('#counsel_form_simple_id5_5').val(), 
			op3:$('#counsel_form_simple_id8').val(), 
			op4:$('#counsel_form_simple_id9').val(), 
			op5:$('#counsel_form_simple_id10').val(), 
			op6:$('#counsel_form_simple_id11').val(), 
			op7:$('#counsel_form_simple_id12').val(), 
			op8:$('#counsel_form_simple_id13').val(), 
			op9:$('#counsel_form_simple_id14').val(), 
			price:$('#counsel_form_simple_id20').val(),
			min_price:$('#counsel_form_simple_id21').val(),
			max_price:$('#counsel_form_simple_id22').val()
		},
		success:function(html){									
			$('.notice_wrap').html(html);
		}
	});

	//default
	pop_wrap.animate({'opacity':0},500,function (){
		pop_wrap.css({'opacity':'0','display':'none'});
		pop_wrap.children().css({'display':'none'});
	});
};

var left_layer_open_board = function (U_boardid,U_mode,U_no,U_start,U_search_str,U_val,U_key){
	var left_wrap_obj = $('#left_wrap');
	var inner_wrap_obj = $('#inner_wrap');
	var footer_wrap_obj = $('#footer');	
	var ease = 'easeOutExpo';
	var speed = 700;	
	$('.loading_wrap').removeClass("close");
	
	//ajax
	if(U_search_str==""){
		U_search_str = $('#search_str').val();
	}
	$.ajax({ 
		type:"post",
		url:"/2014/ajax/board.ajax.php",
		data:{boardid:U_boardid, mode:U_mode, no:U_no, start:U_start, search_str:U_search_str, val:U_val, cateNo:U_key},
		success:function(html){									
			$('.notice_wrap').html(html);
		}
	});

	//default 	
	left_wrap_obj.find('.notice_wrap').css({'display':'block'});

	left_wrap_obj.stop().animate({'left':0},speed,ease);
	inner_wrap_obj.stop().animate({'left':600},speed,ease);
	footer_wrap_obj.stop().animate({'left':600},speed,ease);

	static_value.left_on_off_flag = true;	
};

var left_layer_open = function (open_obj){
	var left_wrap_obj = $('#left_wrap');
	var inner_wrap_obj = $('#inner_wrap');
	var footer_wrap_obj = $('#footer');	
	var ease = 'easeOutExpo';
	var speed = 700;
	
	$('.loading_wrap').removeClass("close");
	
	$.ajax({ 
		type:"post",
		url:"/2014/ajax/consel.ajax.php",
		data:{kind:open_obj},
		success:function(html){									
			$('.notice_wrap').html(html);
		}
	});

	//default 
	left_wrap_obj.find('.notice_wrap').css({'display':'block'});

	left_wrap_obj.stop().animate({'left':0},speed,ease);
	inner_wrap_obj.stop().animate({'left':600},speed,ease);
	footer_wrap_obj.stop().animate({'left':600},speed,ease);

	static_value.left_on_off_flag = true;
};

var left_layer_close = function (close_obj){
	var left_wrap_obj = $('#left_wrap');
	var inner_wrap_obj = $('#inner_wrap');
	var footer_wrap_obj = $('#footer');
	var ease = 'easeOutExpo';
	var speed = 700;
	
	$('.loading_wrap').removeClass("close");

	//ajax	
	var data = "";
	$.ajax({ 
		type:"post",
		url:"/2014/ajax/board.ajax.php",
		data: data,
		success:function(html){									
			$('.notice_wrap').html(html);
		}
	});

	left_wrap_obj.stop().animate({'left':-600},speed,ease);
	inner_wrap_obj.stop().animate({'left':0},speed,ease);
	footer_wrap_obj.stop().animate({'left':0},speed,ease,function (){
		left_wrap_obj.find(close_obj).css({'display':'none'});	
	});

	static_value.left_on_off_flag = false;
};

var numValue = function (t){
	if(t.match(/^\d+$/ig) == null){
		return false;
	}else{
		return true;
    }
};


var number_format = function (num){
	var num_str = num.toString();
	var result = '';

	for(var i=0; i<num_str.length; i++) {
		var tmp = num_str.length-(i+1);
		if(i%3==0 && i!=0) {
			result = ',' + result;
		}
		result = num_str.charAt(tmp) + result;
	}
 
	return result
}; 

var unit = function (){
	var form = document.counsel_form_ajax;
	var siteChecked = 0;
	for (i = 0; i < form.option1.length; i++) {
		if (form.option1[i].checked == true) {
			siteChecked = 1;
			var Option1 = form.option1[i].value;
		}
    }
	if (siteChecked == 0) {
		alert('�좏삎�� 癒쇱� �좏깮�섏뿬 二쇱떗�쒖슂.');
		return;
	}
	if(!numValue(form.page_ea1.value)){
		alert ("�レ옄留� �낅젰�� 二쇱떗�쒖삤.");
		form.page_ea1.select();
		return;
	}
	if(!numValue(form.page_ea2.value)){
		alert ("�レ옄留� �낅젰�� 二쇱떗�쒖삤.");
		form.page_ea2.select();
		return;
	}	
	if(!numValue(form.page_ea3.value)){
		alert ("�レ옄留� �낅젰�� 二쇱떗�쒖삤.");
		form.page_ea3.select();
		return;
	}	
	if(!numValue(form.page_ea4.value)){
		alert ("�レ옄留� �낅젰�� 二쇱떗�쒖삤.");
		form.page_ea4.select();
		return;
	}	
	if(!numValue(form.page_ea5.value)){
		alert ("�レ옄留� �낅젰�� 二쇱떗�쒖삤.");
		form.page_ea5.select();
		return;
	}	
	if(!numValue(form.page_ea6.value)){
		alert ("�レ옄留� �낅젰�� 二쇱떗�쒖삤.");
		form.page_ea6.select();
		return;
	}	
	
	var page1_price = this.document.counsel_form_ajax.page1.value * this.document.counsel_form_ajax.page_ea1.value;
	var page2_price = this.document.counsel_form_ajax.page2.value * this.document.counsel_form_ajax.page_ea2.value;
	var page3_price = this.document.counsel_form_ajax.page3.value * this.document.counsel_form_ajax.page_ea3.value;
	var page4_price = this.document.counsel_form_ajax.page4.value * this.document.counsel_form_ajax.page_ea4.value;
	var page5_price = this.document.counsel_form_ajax.page5.value * this.document.counsel_form_ajax.page_ea5.value;
	var page6_price = this.document.counsel_form_ajax.page6.value * this.document.counsel_form_ajax.page_ea6.value;

    var Option1_array = Option1.split(':');
	var Page_price = Number(page1_price) + Number(page2_price) + Number(page3_price) + Number(page4_price) + Number(page5_price) + Number(page6_price);	
	var Now_price = Number(Page_price) * Option1_array[1];
	
	if(this.document.counsel_form_ajax.option2.checked){
		var Option2 = this.document.counsel_form_ajax.option2.value;
		var Option2_array = Option2.split(':');
		var Option2_price = Number(Now_price) * (Number(Option2_array[1])/100);
		var Now_price = Number(Now_price) + Number(Option2_price);

		this.document.counsel_form_ajax.unit_price.value = Now_price;
	}else{
		this.document.counsel_form_ajax.unit_price.value = Now_price;
	}

	if(!this.document.counsel_form_ajax.develop_chk.checked){
		this.document.counsel_form_ajax.unit_price.value = Now_price;
	}else{	
		var boardEA1 = this.document.counsel_form_ajax.page_ea4.value; //�쇰컲寃뚯떆��
		var boardEA2 = this.document.counsel_form_ajax.page_ea5.value; //媛ㅻ윭由ш쾶�쒗뙋

		var boardEA = Number(boardEA1) + Number(boardEA2); //寃뚯떆�� 珥앹닔��
		if(boardEA != 0){
			if(boardEA == 1){//寃뚯떆�� �섎웾�� 1媛쒕㈃ 湲곕낯�뗮똿媛믩쭔 +
				Now_price =  Number(Now_price) + Number(this.document.counsel_form_ajax.board_set.value);
			}else{
				var board_set_price =  Number(Now_price) + Number(this.document.counsel_form_ajax.board_set.value);
				var board_price1 =  Number(boardEA1) * Number(this.document.counsel_form_ajax.board_ea.value);
				var board_price2 =  Number(boardEA2) * Number(this.document.counsel_form_ajax.board_ea2.value);

				Now_price = Number(board_set_price) + Number(board_price1) + Number(board_price2);
			}
		}
		if(this.document.counsel_form_ajax.page_ea6.value > 0){
			var qna_price =  Number(this.document.counsel_form_ajax.page_ea6.value) * Number(this.document.counsel_form_ajax.qna_form.value);
			Now_price = Number(Now_price) + Number(qna_price);
		}

		this.document.counsel_form_ajax.unit_price.value = Now_price;
	}
	
	var min_price = Number(Now_price) * (Number(this.document.counsel_form_ajax.min_per.value)/100);
	var Min_price = Number(Now_price) - Number(min_price);

	var max_price = Number(Now_price) * (Number(this.document.counsel_form_ajax.max_per.value)/100);
	var Max_price = Number(Now_price) + Number(max_price);
	
	var Min_price = Math.floor(Min_price/10000) * 10000;
	var Max_price = Math.floor(Max_price/10000) * 10000;

	var D_Min_Price = number_format(Min_price);
	var D_Max_Price = number_format(Max_price);

	this.document.counsel_form_ajax.min_price.value = D_Min_Price;
	this.document.counsel_form_ajax.max_price.value = D_Max_Price;
	

};

$(document).ready(function(){
	window_resize_active();
	map_active();
});