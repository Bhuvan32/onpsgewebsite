/* ---------------------------------------------------*/
					//Get Id's
var videoId = document.getElementById('videoId');
var playBtnId = document.getElementById('play');
var fullScreenBtnId = document.getElementById('fullScreen');
var progressId = document.getElementById('progressId');
var volumeMuteId = document.getElementById('volume');
var next=document.getElementById("playnext");
var prev=document.getElementById("playprevious");
var volumeslider = document.getElementById('volSlider');
var curtimetext = document.getElementById("curtimetext");
var	durtimetext = document.getElementById("durtimetext");
var	progressId_1 = document.getElementById("progressId_1");


/* ---------------------------------------------------*/
					
/* ---------------------------------------------------*/
					//Events 
var playPause = videoId.addEventListener("click", playPause);
var playPauseVideo = playBtnId.addEventListener("click", playPauseVideo);
var volumeMute = volumeMuteId.addEventListener("click", volumeMute);
var fullScreen = fullScreenBtnId.addEventListener("click", FullScreen);
var progressSlider = videoId.addEventListener('timeupdate', progressBar);
var playNextVideo = next.addEventListener("click", playnext);
var playPreviousVideo = prev.addEventListener("click", playprev);
var changeIcon = videoId.addEventListener('ended',myHandler,false);
var VolumeAdjust = volumeslider.addEventListener("mousemove", setvolume);
var currentTimeandDuration = videoId.addEventListener("timeupdate",seektimeupdate,false); 
vasliderControl = progressId.addEventListener("click", sliderClick);
var key_press = window.addEventListener("keypress", keyPress);


/* ---------------------------------------------------*/

			//FUNCTIONS AND EVENT-HANDLER STARTS  

/* ---------------------------------------------------*/
			// play pause video

function playPauseVideo(){
	if(videoId.paused){
		
		videoId.play();

	} else {
		
		videoId.pause();
	}
	playpauseAction();
}
function playPause(){
	if(videoId.paused){
		videoId.play();		
	} else {
		videoId.pause();
	}
	playpauseAction();
}
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
					//Mute

function volumeMute(){
	if (videoId.muted) {
		videoId.muted =false;		
	} else {
		videoId.muted =true;
	}
}
/* ---------------------------------------------------*/


/* ---------------------------------------------------*/
					//Full Screen

function FullScreen(){
	if(!videoId.webkitRequestFullscreen()){
	videoId.webkitRequestFullscreen();
	}	else {
	videoId.exitFullscreen();
	}
}
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
			// video forward and backward //
			
var theVideo = document.getElementById("videoId");
  document.onkeydown = function(event) {
      switch (event.keyCode) {
         case 37:
              event.preventDefault();
              
              vid_currentTime = theVideo.currentTime;
              theVideo.currentTime = vid_currentTime - 5;
            break;
         
         case 39:
              event.preventDefault();
              
              vid_currentTime = theVideo.currentTime;
              theVideo.currentTime = vid_currentTime + 5;
            break;
         
      }
  };
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
					//Progress
function progressBar(){
	var value = (100 / videoId.duration) * videoId.currentTime;
	progressId.value = (100 / videoId.duration) * videoId.currentTime;  
	// console.log(videoId.buffered)
	// progressId.value = videoId.duration * (progressId.value / 100);
	// videoId.currentTime =progress_bar;
}
/* ---------------------------------------------------*/
videoId.addEventListener('loadedmetadata', function() {
    if (videoId.buffered.length === 0) return;

    var bufferedSeconds = videoId.buffered.end(0) - videoId.buffered.start(0);
    console.log(bufferedSeconds + ' seconds of video are ready to play!');
  });
/* ---------------------------------------------------*/
			// Play Pause using Space key
function keyPress(e) {
  var video = document.getElementById("videoId");
  if (e.which == 32) {
  	console.log(e.which)
    if (video.paused)
      video.play();
    else
      video.pause();
  }
	playpauseAction();
}
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
		// Display Duration and CurrentDuration
function seektimeupdate(){
	var curmins = Math.floor(videoId.currentTime / 60);
	var cursecs = Math.floor(videoId.currentTime - curmins * 60);
	var durmins = Math.floor(videoId.duration / 60);
	var dursecs = Math.floor(videoId.duration - durmins * 60);
	if(cursecs < 10){ 
		cursecs = "0"+cursecs; 
	}
	if(dursecs < 10){ 
		dursecs = "0"+dursecs; 
	}
	if(curmins < 10){ 
		curmins = "0"+curmins; 
	}
	if(durmins < 10){ 
		durmins = "0"+durmins; 
	}
	curtimetext.innerHTML = curmins+":"+cursecs;
	durtimetext.innerHTML = durmins+":"+dursecs;
    var bufferedSeconds = videoId.buffered.end(0) - videoId.buffered.start(0);
	progressId.style.background = 'linear-gradient(90deg, rgb(65, 137, 171)'+progressId.value+ '%, rgb(255,255,255)'+progressId.value+'%)';	 

}
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
				//next play
var videoSource = new Array();

videoSource[0]='videos/SampleVideo_2.mp4';
videoSource[1]='videos/MVC.mp4';
videoSource[2]='videos/SampleVideo_2.mp4';


var videoCount = videoSource.length;

videoId.setAttribute("src",videoSource[0]); 


function videoPlay(videoNum)
{
	videoId.setAttribute("src",videoSource[videoNum]);
	videoId.load();

}
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
			//Play Next Video
var i=0;

function playnext()
{

	if(i<videoCount-1)
	{
		i=i+1;
		videoPlay(i);
	}
	else
	{
		videoPlay(0);
		i=0;
	}
}
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
				//Play Previous Video
function playprev()
{

	if(i>0)
		{
			i=i-1;
			videoPlay(i);
		}
		else
		{
		videoPlay(0);
		i=0;
		}
}
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
				//Volume Controls 
    function setvolume(){
	    videoId.volume = volumeslider.value / 100;
    }
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
		//Range Slider Contol
function sliderClick(e){
    var percent = e.offsetX / this.offsetWidth;
    console.log(percent)
    videoId.currentTime = percent * videoId.duration;
    progressId.value = percent / 100;
}
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
	//Change Fontawesome Icon When Video Finished
function myHandler() {
   	$('#play').find("i").removeClass(" fa-pause-circle");
    $('#play').find("i").addClass(" fa-play-circle");
}

function playpauseAction(){
	if($("#play").find("i").hasClass('fa-play-circle')){
		$("#play").find("i").removeClass(" fa-play-circle");
	    $("#play").find("i").addClass(" fa-pause-circle");			
	}	
	else{
		$("#play").find("i").addClass(" fa-play-circle");
        $("#play").find("i").removeClass(" fa-pause-circle");				
	}
	if (!($("#videoId").attr({"autoplay": ""}))) {
		$("#play").find("i").removeClass(" fa-play-circle");
	    $("#play").find("i").addClass(" fa-pause-circle");
	}
}
/* ---------------------------------------------------*/

/* ---------------------------------------------------*/
				//Video List
$(function() {
    $("#playlist li").on("click", function() {
        $("#videoId").attr({
            "src": $(this).attr("data-movieurl"),
            "poster": $(this).attr("moviesposter"),
            "autoplay": "",
        })
    })
})

/* ---------------------------------------------------*/
