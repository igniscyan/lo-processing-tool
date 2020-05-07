var sample;
var loopStart = 0;
var loopJump = 0;
var loopDuration = 0.4;
var addl = 0.2;
var rate = 1;
var addr = 0.5;
var sampletoggle = false;


function preload(){

sample = loadSound('assets/AJEET.wav');

}

function setup(){
	let cnv = createCanvas(windowWidth,windowHeight);

	background(220);


}


function draw(){



}


function keyReleased(){


}


function keyPressed(){


	if(keyCode===82){
		rate = rate + addr;
		if(sampletoggle){
			sample.stop();
			sample.loop(0,(rate),0.6,0.1, loopDuration);

		}


	} if(keyCode===69){
		rate = rate - addr;
		if(sampletoggle){
			sample.stop();
			sample.loop(0,(rate),0.6,0.1, loopDuration);
		}

	} if(keyCode==190){
		loopJump = loopJump + 1;


	} if(keyCode===32){
		sampletoggle = !sampletoggle;
		if(sampletoggle){
		sample.loop(0,(rate),0.6,0.1, loopDuration);
 		background(100,0,10);

	}	if(!sampletoggle){
		sample.stop();
		background(220);
	 }

	} if(keyCode===190){
		loopDuration = loopDuration + addl;
		if(sampletoggle){
			sample.stop();
			sample.loop(0,(rate),0.6,0.1, loopDuration);
		}

	} if(keyCode===188){
		loopDuration = loopDuration - addl;

		if(sampletoggle){

			sample.stop();
			sample.loop(0,(rate),0.6,0.1, loopDuration);
		}
	}


}
