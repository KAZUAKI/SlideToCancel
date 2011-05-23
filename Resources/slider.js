/*
* Slide To Cancel with Titanium
* 2011.05.23
* @kaz_konno
*/

var sliderwin = Ti.UI.currentWindow;

var startbtn = Ti.UI.createButton({
    title:'Slider ON/OFF',
    width:200,
    height:40
});
sliderwin.add(startbtn);

var unlockview = Ti.UI.createView({
	backgroundImage:'images/sliderTrack.png',
    width:'100%', 
    height:100, 
    bottom:-100,
    backgroundColor:'#666'
});
sliderwin.add(unlockview);

var sliderView = Titanium.UI.createView({
	top:28,
	height:44,
	left: 24,
	width:272,
	backgroundColor:'none'
});
unlockview.add(sliderView);

var sliderButton = Titanium.UI.createView({
	width:68,
	borderRadius:5,
	backgroundImage:'images/slider_btn.png',
	height:sliderView.height,
	left:sliderView.left,
	top:sliderView.top
});
unlockview.add(sliderButton);

startbtn.addEventListener('click', function(e){
    sliderButton.animate({center:{x:(sliderView.left+sliderButton.width/2),y:(sliderButton.top+(sliderButton.height/2))}, duration:100});
    if (unlockview._up == true) {
        unlockview.animate({bottom:-100,duration:500});
        unlockview._up = false;
    } else {
        unlockview.animate({bottom:0,duration:500});
        unlockview._up = true;
    }
});


function unlock (){
        unlockview.animate({bottom:-100,duration:500});
        unlockview._up = false;
};

sliderButton.addEventListener('touchmove', function(e) 
{	var moveX = e.x + sliderButton.animatedCenter.x - sliderButton.width/2; 
	if (moveX + sliderButton.width/2 >= sliderView.left + sliderView.width)
	{	
		moveX = sliderView.left + sliderView.width - (sliderButton.width/2);
	}
	else if (moveX - sliderButton.width/2 <= sliderView.left)
	{	
		moveX = sliderView.left + (sliderButton.width/2);
	}	
	sliderButton.animate({center:{x:moveX,y:(sliderButton.top+(sliderButton.height/2))}, duration:1});
});

sliderButton.addEventListener('touchend', function(e) 
{	var endX = sliderButton.animatedCenter.x + (sliderButton.width/2);
	if (endX ==  sliderView.left + sliderView.width)
	{	
		unlock();
    } else{
    sliderButton.animate({center:{x:(sliderView.left+sliderButton.width/2),y:(sliderButton.top+(sliderButton.height/2))}, duration:300});
    }
});
