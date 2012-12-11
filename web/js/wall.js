var jsonurl = '/wall_locations.json';
var jsondata = null;
var loaded = false;
var z_tracker = 100;
var canvas, ctx, image;

/*
var x=0, 
    y=0,
    rate=0,
    maxspeed=10;
var backdrop = $('#wall');



$('.direction').mousemove(function(e){
	console.log("asdf")
    var $this = $(this);
    var left = $this.is('.left');
    
    if (left){
        var w = $this.width();
        rate = (w - e.pageX - $(this).offset().left + 1)/w;
    }
    else{
        var w = $this.width();
        rate = -(e.pageX - $(this).offset().left + 1)/w;
    }
});

backdrop.hover(
    function(){
        var scroller = setInterval( moveBackdrop, 30 );
        $(this).data('scroller', scroller);
    },
    function(){
        var scroller = $(this).data('scroller');
        clearInterval( scroller );
    }
);   

function moveBackdrop(){
    x += maxspeed * rate;
    var newpos = x+'px '+y+'px';
    backdrop.css('background-position',newpos);
}
*/

$.ajax({
   url: jsonurl,
   dataType: 'json',
   success: function(data){	
		jsondata = data;
		if (loaded) { parseData(data); }
	}
});
function parseData(data){
	console.log('parse')
	$.each(data.locations, function(i, item) {
//		console.log(item.info_x)
				
		var duration = Math.random() + 2
		var delay = String(Math.floor(Math.random()*1000))+'ms';
		console.log("DELAY "+delay)
		$(document.createElement('div'))
			.hide()
			.addClass("infobuttonbg_container")
			.attr('id', item.id+"_button_bg")
			.css('top', String(item.info_y-19)+"px")
			.css('left', String(item.info_x-19)+"px")
			.css('z-index', ++z_tracker)
			.css('-webkit-animation-delay', delay)
			.append(
			    $('<div>')
			    .addClass('infobutton_bg')
			  )
			.show()
			.prependTo($("#buttons")
		);
		
		
		var my_infobutton = $(document.createElement('div'))
			.hide()
			.addClass("infobutton")
			.attr('id', item.id+"_button")
			.css('top', String(item.info_y)+"px")
			.css('left', String(item.info_x)+"px")
			.css('z-index', ++z_tracker)
			.show()
			.prependTo($("#buttons")
			);
			
			
		var close_button_side = (item.id == 'blue_tang' || item.id == 'soapfish' || item.id == 'scorpionfish' || item.id == 'starlet_coral' || item.id == 'star_coral') ? "left_side" : "";
			
		var my_popup = $(document.createElement('div'))
			.hide()
			.addClass("popup")
			.attr('id', item.id+"_popup")
			.css('top', String(item.pop_y-185)+"px")
			.css('left', String(item.pop_x+34)+"px")
			.css('background-image', "url(/images/wall/"+ item.image +")")
			.append(
			    $('<div>')
			    .addClass('close_button')
				.addClass(close_button_side)
			  )
			.prependTo($("#popups")
			);
		
		
		  my_popup.find(".close_button").click(function(){	
			$(".popup").fadeOut(100);
		  })
		  my_infobutton.click(function(){
		  //	console.log("clickin on ")
		//	console.log($(this))

			// if the popup is currently hidden
		  	if (String($(".popup").css("display")) != "block") {
		  		//turn off any other on popups
				$(".popup").fadeOut(100);
				// turn on your special popup
			///	console.log("MY POPUP!! ")
			//	console.log(my_popup)
		  		var popupx = parseInt((my_popup.css("left")))- 0.5*$(document).width() + 200;
				var popupy = parseInt((my_popup.css("top")))- 0.5*$(document).height() + 200;
			//	console.log(popupx)
		  //		console.log(popupy)
		  		$("#container").scrollTo( { top:popupy, left:popupx}, 1000, {easing:'easeOutQuad'}  );
		  	}
		  	my_popup.fadeIn(600);
		
		
	})
	
//	$( "#logo" ).draggable();
//	$(".infobutton").draggable()
//	$(".popup").draggable();

  })
}
/*
function moveBioCircleIpad(e){
	console.log("MOVE IPAD!!!")
	$("#debug").html("WTF "+canvas)
	 canvas.width = canvas.width;
   ctx.beginPath();
    ctx.arc(10 , 10,210,0, Math.PI * 2, false);
   ctx.clip();
    ctx.drawImage(img, 0, 0);

}

*/



function updateBioCircleSettings(e){
	
	
	console.log("MOVE BIO CIRCLE!")
	console.log(canvas)
	console.log(ctx)
	console.log(img)
    

	canvas.width = canvas.width;
	ctx.beginPath();
	ctx.arc(e.pageX +$("#container").scrollLeft(),  e.pageY+$("#container").scrollTop(), 210,0, Math.PI * 2, false);

	//ctx.arc(10 , 10,210,0, Math.PI * 2, false);

	ctx.clip();
	ctx.drawImage(img, 0, 0);
	
//	$("#logo").css("left", e.pageX +$("#container").scrollLeft())	
//	$("#logo").css("top", e.pageY +$("#container").scrollTop())

}
function setUpCanvas(){
	console.log("setting up canvas!")
	// register canvas
	canvas = document.getElementById("bioluminescent_layer");
	
//	canvas = canvas;
	console.log(canvas)
    console.log(canvas.scrollWidth)
	canvas.width = canvas.scrollWidth;
	canvas.height = canvas.scrollHeight;


	ctx = canvas.getContext('2d');
	// Create an image element
	img = new Image(); //document.createElement('IMG');
//	document.body.addEventListener("touchmove", moveBioCircleIpad, false);
	
//	$('body').mousemove(updateBioCircleSettings);

   // // When the image is loaded, draw it
    img.onload = function () {
    console.log("img loaded!")
        ctx.drawImage(img, 0, 0, 400, 200);
    
    }

	// Specify the src to load the image
	img.src = "/images/wall/background_fluoresce.jpg";

}




$(document).ready(function(){
	console.log("w = "+ $(window).width())
	console.log("w = "+ $(window).height())
	loaded = true;
	// correctly size wall image container
	resizeContainer();
	
	// make it draggable/scrollable
//	$('#container').dragscrollable({dragSelector: '#bioluminescent_layer', acceptPropagatedEvent: false});

	
	
	// if the json is sitting there, load it
//	console.log(jsondata)
    if (jsondata != null) {
 //   	parseData(jsondata);
    }
 

//	setUpCanvas();

});
function resizeContainer(){
	console.log("ASDFASFD")
	var h = window.innerHeight ? window.innerHeight : $(window).height()
	var w = $(window).width();
	console.log(w+", "+h)
	$("#container").css("height", h);
	$("#container").css("width", w);
}

$(window).resize(resizeContainer);