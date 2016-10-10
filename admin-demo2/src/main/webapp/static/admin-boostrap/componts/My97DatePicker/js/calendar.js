$(document).ready(function() {
	
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
                
        var cal_all = [],city = Number($('#didian').val());
		$.getJSON('http://10.3.20.160:51671/c/orderassign/monthtable?regionId='+city+'',function(ret){
                            var all = ret.data;
                            for(var i=0;i<all.length;i++){
                                var carnum = Number(all[i].availCars),y = Number(all[i].year),m = Number(all[i].month),d =Number(all[i].date);
								var dayurl = 'http://10.3.20.160:51671/c/orderassign/dayline?regionId='+city+'&day='+y+m+d+'';
								if(carnum == 0){
									dayurl ='';
								}
                                cal_all[i]={
											title: ''+carnum+'辆车可预约',
											start: new Date(y, m, d),
											url: dayurl
										}
                            }
							$('#calendar').fullCalendar({
								theme: true,
								header: {
									left: 'prev,next today',
									center: 'title'
									//right: 'month,agendaWeek,agendaDay'
								},
								editable: false,
								events: cal_all
							});
							status();
                })
		
		var status = function(){
			$('.fc-event-title').each(function(){
				var _this = $(this),num = Number(_this.text().replace(/[^0-9]/ig,''));
				if (0<num && num <5) {
					_this.parent('div').parent('.fc-event').css({'background-color':'#f4d000','border-color':'#f4d000'})
				}else if (num == 0) {
					_this.parent('div').parent('.fc-event').css({'background-color':'#ff5e48','border-color':'#ff5e48'}).attr('target','_blank')
				}else if (num>=5) {
					_this.parent('div').parent('.fc-event').attr('target','_blank')
				}
			})	
		}
		$('.time_form').bind('submit',function(e){
		    e.preventDefault();
		    city = $('#city_id').val(); $('#didian').val(city);
			$('#calendar').empty();
			$.getJSON('http://10.3.20.160:51671/c/orderassign/monthtable?regionId='+city+'',function(ret){
                            var all = ret.data;
                            for(var i=0;i<all.length;i++){
                                var carnum = Number(all[i].availCars),y = Number(all[i].year),m = Number(all[i].month),d =Number(all[i].date);
								var dayurl = 'http://10.3.20.160:51671/c/orderassign/dayline?regionId='+city+'&day='+y+m+d+'';
								if(carnum == 0){
									dayurl ='';
								}
                                cal_all[i]={
											title: ''+carnum+'辆车可预约',
											start: new Date(y, m, d),
											url: dayurl
										}
                            }
							$('#calendar').fullCalendar({
								theme: true,
								header: {
									left: 'prev,next today',
									center: 'title'
									//right: 'month,agendaWeek,agendaDay'
								},
								editable: false,
								events: cal_all
							});
							status();
                })
		})
	});