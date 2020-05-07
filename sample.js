//disregard the layout and visuals, the loop end display is broken and displays a weird number if you play with it right now

//my aim is to add a drag and drop component to swap the loaded sample

//TEMP CONTROLS:
// PPOOOOPPP

skdfjaskfjaskdfj
fasjdkfjaskdjfas
fjaskdfjaskdjfkadf,j

//PRESS 'SPACE' BAR to PLAY SAMPLE

//'A' lowers sample rate, 'S' speeds it up

//(note: you can go to negative samplerate to get reverse loops)

//'Z' is to jump back a second in the loop start time
//'X' is to jump forward a second in the loop

//the '<' key is to shorten the loop
//the '>' key is to lengthen the loop

//PRESS 'R' to record your section, once recording 'R' again to stop recording, and then to save your recording to downloads press 'R' a third time

// the temp SLIDER is the master volume

// if you press 'F' your mouseX value becomes the cuttof frequency of a lowpass filter.


let recorder, soundFile;

var allowBox = false;

let titleFont;



let state = 0;
var sample;

var dropzone;

var loopStart;
var cueStart;

//var contents = "";

var addl = 0.2;
var rate = 1;
var addr = 0.5;
var sampletoggle = false;
var loopplus = 0;
var freqf
var filter;
let reverb;

var bpmString = ""

var bpmInt = 90;

var bpm = bpmInt;
var beat = 60 / bpm

var bpmSelect = false;
var typeState = 0;

var currentLoop = beat * 4 ;
var loopDuration = currentLoop;

var loopCue = loopDuration + loopplus;

var stutter = false;



var rateplus = 1;
var recordwindow = 0;

var volhistory = [];

var sampleamp = 0.18;

var levelslider = 100;


var displayLoopStart = 0;
var displayLoopEnd = 4;


//let menu;
let sel;

//SLIDER

var MP;





function preload(){

sample = loadSound('assets/jul.WAV');
titleFont = loadFont('assets/Fipps-Regular.otf');
//sample.amp(sampleamp);
}

function setup(){

	sel = createSelect();
	sel.size(100);
	sel.position(0,80);
	sel.option('jul');


	//menu = new Dropdown();


	var width = windowWidth;
	var height = windowWidth;
	let cnv = createCanvas(windowWidth,windowHeight);

		cnv.id('mycanvas');

		//dropzone = select('mycanvas');
		cnv.dragOver(highlight);
		cnv.dragLeave(unHighlight);
		cnv.drop(gotFile, unHighlight);


    //CUSTOMSLIDER VOLUME
    sliderVol = new SliderClass(32, 190, 240, 0, 100, 10, 4, [120,0,0], false, false, false, false, true);

		sliderRev = new SliderClass(32 , 265, 240, 0, 100, 10, 4, [120,0,0,], false, false, false, false, true);
    //SLIDER STARTING POINT
    //X-VALUE in pixels
    sliderVol.x = sliderVol.xStart+120;


    ////////////////

	filter = new p5.LowPass();

	recorder = new p5.SoundRecorder();
	recorder.setInput();

	soundFile = new p5.SoundFile();

	amp = new p5.Amplitude();

	reverb = new p5.Reverb();

	sample.disconnect(); // so we'll only hear reverb...

// connect soundFile to reverb, process w/
// 3 second reverbTime, decayRate of 2%
	reverb.process(sample, 3, 2);
	//reverb.chain(filter);

}

function highlight() {



}



function unHighlight() {



}

function gotFile(file){
	sample.stop();

	sample = loadSound(file.data);

	sample.disconnect();
	reverb.process(sample, 3, 2);
	sampletoggle = false;
	recordwindow = 0;

//	beat = 60 / bpm
//	currentLoop = beat * 4 ;
//	loopDuration = currentLoop;


}



/*class Dropdown {

	constructor() {

		this.w = 200;
		this.h = 30;
	}

	clicked() {
		if (mousePressed) {

		}

	}

	option(){


	}

	select(){

		return val;
	}


	display() {
		stroke(255,255,255,50);
		fill(255,255,255,50);

		if (recordwindow == 1) {
			stroke(200,200,200,100);
			fill(200,200,200,100);

		}
		rect(windowWidth*0.8, windowHeight*0.26, this.w, this.h);
	}

}
*/


function draw(){
	width = windowWidth;
	height = windowHeight;




    sample.amp(sliderVol.sliderValue/100);
		reverb.drywet(sliderRev.sliderValue/100);



	if(recordwindow===0){
if(sampletoggle){
	background(20,20,20);
	push();
	textAlign(CENTER);
	textFont('Courier New');
	textSize(19);
	fill(200,200,200,150);
	stroke(200,200,200,100);
	text('SPACE TO STOP SAMPLE',windowWidth/2,100);
	rectMode(CENTER);
	//noFill();
	stroke(200,200,200,150);
	//rect(windowWidth/2, 95, 300 ,50);
	pop();
	push();
	fill(255,255,255,150);
	textAlign(CENTER);
	textSize(40);
	textFont(titleFont);

	text("THE GENERATOR", width/2,  75);

	pop();



}else if(!sampletoggle){

	background(200);
	textAlign(CENTER);
	textFont('Courier New');
	textSize(19);
	fill(0,0,0,150);
	stroke(0,0,0,80);

	text('SPACE TO PLAY SAMPLE',windowWidth/2,100);
	rectMode(CENTER);
	noFill();
	//rect(windowWidth/2, 95, 300 ,50)
	push();
	fill(20,20,20,150);
	textAlign(CENTER);
	textSize(40);
	textFont(titleFont);

	text("THE GENERATOR", width/2,  75);

	pop();

}
}	else if (recordwindow===1){
	push();
	background(0);
	noStroke();
	textAlign(CENTER);
	textFont('Courier New');
	textSize(19);
	fill(200,200,200,150);
	stroke(200,200,200,100);

	text('Recording... PRESS R to stop.',windowWidth/2,100);
	rectMode(CENTER);
	fill(255,0,0);
	ellipseMode(CENTER);
	noStroke();
	ellipse(windowWidth/2+180,95,20,20);
	noFill();
	stroke(200);
	//rect(windowWidth/2, 95, 500 ,50);

	pop();

} else if ( recordwindow===2){

	background(0);
	push();
	textAlign(CENTER);
	textFont('Courier New');
	textSize(19);
	textSize(19);
	fill(200,200,200,150);
	stroke(200,200,200,100);

	text('Recording stopped. PRESS R to SAVE and PLAY',windowWidth/2,100);
	push();
	textSize(18);
	//textStyle(ITALIC);
	stroke(20,20,20,140);
	text('OR press SPACE to delete',windowWidth/2,200);
	pop();
	//fill(255,0,0);
	//ellipseMode(CENTER);
	//noStroke();
	//ellipse(windowWidth/2+180,95,20,20);
	//noFill();
	//rect(windowWidth/2, 95, 300 ,50);

}








	//sample.masterVolume(0.1, 1);

	let playbackRate = rateplus;
//	playbackRate = constrain(playbackRate, 0.01, 4);



	sample.rate(playbackRate);

	filter.freq(freqf);
// give the filter a narrow band (lower res = wider bandpass)
	filter.res(10);

	//push();
	//rectMode(CENTER);
	//rect(100, 350, 50, 50);
	//pop();




	var vol = amp.getLevel();
	volhistory.push(vol);

	//console.log(vol);

	push();
	noFill();

	stroke(220,220,220,150);
	ellipse(windowWidth/2,windowHeight/2, vol*4800, vol * 4800);
	stroke(200,200,200,120);
	ellipse(windowWidth/2,windowHeight/2, vol*4400, vol * 4400);
	stroke(200,200,200,100);
	ellipse(windowWidth/2,windowHeight/2, vol*4000, vol * 4000);
	stroke(200,200,200,80);
	ellipse(windowWidth/2,windowHeight/2, vol*3600, vol * 3600);
	stroke(200,200,200,60);
	ellipse(windowWidth/2,windowHeight/2, vol*3200, vol * 3200);
	stroke(200,200,200,40);
	ellipse(windowWidth/2,windowHeight/2, vol*2800, vol * 2800);
	stroke(200,200,200,20);
	ellipse(windowWidth/2,windowHeight/2, vol*2400, vol * 2400);
	stroke(200,200,200,15);
	ellipse(windowWidth/2,windowHeight/2, vol*2000, vol * 2000);
	stroke(200,200,200,10);
	ellipse(windowWidth/2,windowHeight/2, vol*1600, vol * 1600);

	ellipse(windowWidth/2,windowHeight/2, vol*1200, vol * 1200);
	pop();


	fill(200);
	text(mouseX,20,20);
	text(mouseY,50,20);


    //fill(0);
    //rect(100,100,100,100)


    //SLIDER BOX DISPLAY
    fill(200,200,200,80);
    noStroke();
    rect(158 ,232,285,160);


    //strokeWeight(1);
    sliderVol.move();
    sliderVol.display();
		text("VOLUME", 155, 220);

	 	sliderRev.move();
    sliderRev.display();



		push();
		//stroke(0 ,0,0,180);
		noFill();



		text("REVERB", 155, 295);


		pop();



		fill(255,255,255,200);
		noStroke();
		rect(windowWidth-300,600,10,10);
		stroke(255,255,255, 100);
		strokeWeight(1);

		for(let y = 110; y < 400; y = y + vol*350 + 1) {


			line(windowWidth-300, 600, 354, y);

		}

		//if ((vol*1000) > 28){
		//	noStroke();
		//	fill(200,20,20,100);
		//	rect(random(windowWidth-600,windowWidth-450), random(windowHeight/2-100,windowHeight/2+100), vol*350 ,vol*350);
		//}

		//console.log(vol*1000);




		push();
		textAlign(CENTER);
		fill(255,0,0, 180);
		stroke(125,0,0, 180);
		textSize(16);



		text("BPM           :", 100, 355);
		text(bpm, 200, 355)

		text("SAMPLE RATE   x", 100,400);
		textSize(20);
		text(playbackRate, 200,400);

		textSize(16);
		text("LOOP START    :", 100,450);
		textSize(20);
		text("beat   " + displayLoopStart, 245,450);
		//text('beats', 235,450);

		textSize(16);
		text("LOOP DURATION :", 100,500);
		textSize(20);
		text(displayLoopEnd, 200,500);
		text('beat(s)', 255,500);



		if(stutter == true){
			text('S', 100,550);
			noFill();
			rect(100,544,20,20)

		} else {

		}
		//BPM ARROWS

		//noFill();
		//rect(125,350,10,10);
		//text(">", 125,356);
		//text("<", 75,356);


		pop();


		push();
		fill(255);
		textAlign(CENTER);

		text("RGH Creative Solutions © 2020", width/2, height - 35);

		pop();


		//menu.display();






}
//DRAW END



function jumploop(){


	sample.jump(loopplus);

}

function loopsection(){


	if(sampletoggle){

	jumploop();
	//console.log(loopDuration);




    sample.clearCues();
    loopCue = loopDuration + loopplus;
	sample.addCue(loopCue, jumploop);

    //console.log(loopDuration);
	sampletoggle = true;
}if(!sampletoggle){
	sample.stop();



}

}











function keyPressed(){


if (typeState == 1){


	bpmString += key;
	console.log(bpmString);
	console.log(bpmInt);

	if(keyCode === 13){

		bpmInt = int(bpmString);
		bpm = bpmInt;
		beat = 60 / bpm
		currentLoop = beat * 4 ;
		loopDuration = currentLoop;
		loopsection();
		//console.log(beat);
		typeState = 0;

	}



} else {
	//bpmString = "";

	//STUTTER
	if (keyCode === 16) {
		stutter = true;
		loopDuration = 60 / bpm / 4;
		loopsection();
	} else


	if(keyCode===83){
		rateplus = rateplus + 0.5;
	}
	if(keyCode===65){
		rateplus = rateplus - 0.5;
	}
	if(keyCode===32){

		if(state===2){
			recordwindow = 0;
			state = 0;

		}else{
		sampletoggle = !sampletoggle;
		loopsection();
	}

	}

//THIS IS THE LOOPPLUS section
//LOOP PLUS ALTERS THE LOOP START TIME

	if(keyCode===88){

		loopplus = loopplus + beat;
		displayLoopStart++;
		if(sampletoggle){
			sample.stop();
			loopsection();
		}

	}	if(keyCode===90){
		if (loopplus - beat <= 0){

		} else {
		loopplus = loopplus - beat;
		displayLoopStart--;
		}
		if(sampletoggle){
			sample.stop();
			loopsection();
		}

		// THIS IS THE LOOPDURATION section
		//LOOPDUrATION ALTERS LENGTH OF LOOP
	} if(keyCode===190){


		currentLoop = currentLoop + beat;
		loopDuration = currentLoop;
		displayLoopEnd ++;
		//if(sampletoggle){
		//if(sample.time(loopplus)){
	//		sample.stop();
			loopsection();
			console.log(loopDuration);
	//	}
		//}


	} if(keyCode===188){

		currentLoop = currentLoop - beat;
		loopDuration = currentLoop;

		displayLoopEnd --;
        loopsection();

	}

	if(keyCode===70){
		let filteron = true

		if(filteron){

		sample.disconnect();

		sample.connect(filter);
		freqf = map(mouseX, 0, windowWidth, 20, 10000);
 		freqf = constrain(freqf, 0, 22050);


		filter.chain(reverb);
		reverb.process(filter, 3, 2);

		//recorder.setInput();



//	filteron = !filteron
	}

}







	if(keyCode===82){


		if (state === 0) {
    // Tell recorder to record to a p5.SoundFile which we will use for playback
		recordwindow = 1;
		recorder.record(soundFile);

    state++;
  } else if (state === 1) {
		recordwindow = 2;
    recorder.stop(); // stop recorder, and send the result to soundFile



    state++;
		if(sampletoggle){

		sampletoggle = !sampletoggle;
		loopsection();
	}

  }else if (state === 2) {

		recordwindow = 0;
		state++;
		//soundFile.play(); // play the result!
    saveSound(soundFile, 'mySound.wav'); // save file
    state = 0;

	}


}
}



	return false;

}


function keyReleased(){
	if (keyCode === 16){
		stutter = false;
		loopDuration = currentLoop;

		loopsection();


	}
	return false;
}

function bpmBox(){
	if (mouseX >= 120 && mouseX<= 130 && bpmSelect == true){
		if (mouseY >= 325 && mouseY <= 375){
			//bpm = bpm + 1

		}
	} if (mouseX >= 70 && mouseX<= 80 && bpmSelect == true){
		if (mouseY >= 325 && mouseY <= 375){
			//bpm = bpm - 1

		}
	} if (mouseX >= 190 && mouseX<= 210 && bpmSelect == true){
		if (mouseY >= 325 && mouseY <= 375){

			typeState = 1;

			}
		} else {

	typeState = 0

	bpmString = "";

	}
	//beat = 60 / bpm
	//console.log(beat);
	//loopsection();

}


function mousePressed() {

	bpmSelect = !bpmSelect;
	bpmBox();


  MP = true;
	console.log(typeState);

}


function mouseReleased() {

  MP = false

}
