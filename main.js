song = "";
objects = [];
status = "";

function preload(){
song = loadSound('alarm_ring.mp3');
}

function setup(){
canvas = createCanvas(550,450);
canvas.center();
video = createCapture(VIDEO);
video.size(550,450);
video.hide();
objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("Status").innerHTML = "Status:- Detecting Objects";
}
    
function modelLoaded(){
console.log('Model Loaded');
status = true;
}
    
function gotResult(error,results){
if(error){
console.error(error);
}
else{
console.log(results);
objects = results;
}
}

function draw(){
image(video,0,0,550,450);
if(status != ""){
    objectDetector.detect(video,gotResult);
    
    r = random(255);
    g = random(255);
    b = random(255);
    
    for(i=0; i<objects.length, i++;)
    {
    document.getElementById("Status").innerHTML = "Status:- Object Is Detected";
    fill(r,g,b);
    percentage = floor(objects[i].confidence * 100);
    text(objects[i].label + "" + percentage + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

    if(objects[i].label == "person"){
    document.getElementById("H3_Found").innerHTML = "Baby Found";
    console.log("Stop");
    song.stop();
    }
    else{
    document.getElementById("H3_Found").innerHTML = "Baby Not Found";
    console.log("Play");
    song.play();
    }
    }

    if(objects.length == 0){
    document.getElementById("H3_Found").innerHTML = "Baby Not Found";
    console.log("Play");
    song.play();
    }
    }
}