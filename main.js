status_model = "";
objects ="";

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
}

function preload() {
    mySound = loadSound('alarm.mp3');
}

function draw() {
    image(video, 0, 0, 400, 400);

    if (status_model === 1) {
        objectDetector.detect(video, gotResult);
        alarm.mp3.pause();
        status_model.html = "Baby detected";
        }

        else {
            status_model.html = "Baby not detected";
            alarm.mp3.play();
        }

        for(i=0; i < objects.length; i++) {

            fill('red');
            text(objects[i].label , objects[i].x, objects[i].y);
            stroke('red');
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            textSize(20);
        }
   
    }




function modelLoaded() {
    console.log("Model Loaded");
    status_model = 1;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        
        objects = results;
    }
}

function start() 
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
}
