;(function($){
	$(function(){
        var ready = function(){
			$('.time_x span:even').addClass('even_num');
			$('.time_x2 span:even').addClass('even_num')
			
			var city = $('#thiscity').val(),date = $('#time_value').val().split('-').join('');$('#thistime').val(date);
			$.getJSON('http://10.3.20.160:51671/c/orderassign/dayline?regionId='+city+'&day='+date+'',function(ret){
				var alldata = ret.data;
				if (ret.code == 0) {
									for (var i=0;i<alldata.length;i++) {
											var time = alldata[i].time,
												status = Number(alldata[i].availCars);
											if (status == 0) {
												  $('.time_items .time_x_span').eq(i).addClass('gray_back')
											}else{
												  $('.time_items .time_x_span').eq(i).addClass('green_back') 
											}      
									}
				}
			})
			$('.time_form').bind('submit',function(e){
				 e.preventDefault();
				 city = $('#city_id').val();date = $('#time_value').val().split('-').join('');
				 $('#thistime').val(date);
				 $('.time_x_span').removeClass('gray_back');
				 $('.time_x_span').removeClass('green_back');
				 $.getJSON('http://10.3.20.160:51671/c/orderassign/dayline?regionId='+city+'&day='+date+'',function(ret){
					var alldata = ret.data;
					if (ret.code == 0) {
										for (var i=0;i<alldata.length;i++) {
												var time = alldata[i].time,
													status = Number(alldata[i].availCars);
												if (status == 0) {
													  $('.time_items .time_x_span').eq(i).addClass('gray_back')
												}else{
													  $('.time_items .time_x_span').eq(i).addClass('green_back') 
												}      
										}
					}
				})
			})
			$('.time_items span.time_x_span').bind('mouseover',function(){
				var index = $(this).index();
				$('.time_items .time_x_span').removeClass('yellow_back');
				if(index <=1){
					$('.time_items .time_x_span').eq(index).addClass('yellow_back');
					$('.time_items .time_x_span').eq(index+1).addClass('yellow_back');
					$('.time_items .time_x_span').eq(index+2).addClass('yellow_back');
					$('.time_items .time_x_span').eq(index+3).addClass('yellow_back');
				}else{
					$('.time_items .time_x_span').eq(index-1).addClass('yellow_back');
					$('.time_items .time_x_span').eq(index-2).addClass('yellow_back');
					$('.time_items .time_x_span').eq(index).addClass('yellow_back');
					$('.time_items .time_x_span').eq(index+1).addClass('yellow_back');
					$('.time_items .time_x_span').eq(index+2).addClass('yellow_back');
					$('.time_items .time_x_span').eq(index+3).addClass('yellow_back');
				}
				
			})
			$('.time_items span.time_x_span').bind('click',function(){
			    var thistime = $('#thistime').val(),orderid = $('#orderid').val();
				var index = $(this).index(),time = $(this).attr('id');
				var popup = '<div class="pop_wrapper">'+
						'<div class="status_top" data="'+thistime+'-'+time+'">'+time+'点<span>可预约</span></div>'+
						'<div class="all_car">'+
						'</div>'+
						'<span class="form_btn">确定选择</span>'+
					    '</div>';
					$(this).append(popup);
				$.getJSON('http://10.3.20.160:51671/c/orderassign/preview?date='+thistime+'-'+time+'&orderId='+orderid+'',function(ret){
					var cardata = ret.data;var tem ='';
					for(var i=0;i<cardata.length;i++){
					    var dis = ((cardata[i].distance)/1000).toFixed(1),
						    dur = ((cardata[i].duration)/60).toFixed(0);
						if(cardata[i].comeType ==1){
							tem = '<div class="car_items car_items_dan">'+
										'<a class="car_num" href="" id="'+cardata[i].carId+'">'+cardata[i].carPlateNo+'</a>'+
										'<span class="distance">'+dis+'</span>'+
										'<span class="car_time">'+dur+'分钟</span>'+
										'</div>';
						}else if(cardata[i].comeType ==2){
							tem = '<div class="car_items car_items_yuan">'+
										'<a class="car_num" href="" id="'+cardata[i].carId+'">'+cardata[i].carPlateNo+'</a>'+
										'<span class="distance">'+dis+'</span>'+
										'<span class="car_time">'+dur+'分钟</span>'+
										'</div>';
						}else{
							tem = '<div class="car_items car_items_dan">'+
									'<a class="car_num" href="" id="'+cardata[i].carId+'">'+cardata[i].carPlateNo+'</a>'+
									'<span class="distance">'+dis+'</span>'+
									'<span class="car_time">'+dur+'分钟</span>'+
									 '</div>'
						}
						$('.all_car').append(tem);
					}
				})
				
				
				if($(this).hasClass('gray_back')){
					$('.pop_wrapper').addClass('gray_pop');
					$('.status_top span').text('已满');
					$('.form_btn').remove();
				}else{
					
				}
				
				
			})
					$('body').delegate('.time_items span.time_x_span','mouseleave',function(){
						$(this).find('.pop_wrapper').remove();
						$('.time_items span').removeClass('yellow_back');
					})
					$('body').delegate('.car_items','click',function(){
						$(this).parent('.all_car').find('.car_items').removeClass('choose_car')
						$(this).addClass('choose_car');
						
					})
                }
		
                ready();
	});
})(jQuery)