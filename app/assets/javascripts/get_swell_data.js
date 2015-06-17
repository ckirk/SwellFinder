// $(document).ready(function(){

// });

// swellData = [];

// function getData() {

// 	swellData = [];
// 	var baseURL = "http://www.swellinfo.com/data/timeline/wna_nj_seaside.xml";

//   $.ajax({
//     url: baseURL,
//     async: false,
//     dataType: "xml",
//     success: function(xml) {
//     	update_date = $(xml).find("surfcond_xml").attr("update");
//     	all_hours = $(xml).find("data");
//     	all_hours.each(function(){
//     		var hour = {
//     			id: $(this).attr("id"),
//     			surf: $(this).attr("surf"),
//     			cond: $(this).attr("cond"),
//     			day: $(this).attr("day"),
// 					day_name: $(this).attr("day_name"),
// 					hour: $(this).attr("hour"),
// 					month: $(this).attr("month"),
// 					swell1: $(this).attr("swell1"),
// 					swell2: $(this).attr("swell2"),
// 					wind: $(this).attr("wind")
//     		};
//     		swellData.push(hour);
//     	});

//     	return swell
//     }
//   });
//   jQuery.each(swellData, function(i){
//   	var data = swellData[i];
//   	console.log(data.day_name + ', ' + data.month + '/' + data.day + ' - ' + data.hour);
//   	console.log("Swell: " + data.surf);
//   	console.log("Conditions: " + data.cond);
//   	console.log("Wind: " + data.wind);
//   	console.log(' ');
//   });

// }

// getData();