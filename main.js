song="";
leftwristX=0;
leftwristY=0;
RightwristX=0;
RightwristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log(leftwristX,leftwristY);
        RightwristX=results[0].pose.rightWrist.x;
        RightwristY=results[0].pose.rightWrist.y;
        console.log(RightwristX,RightwristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        scoreRightWrist=results[0].pose.keypoints[10].score;   
     }
}
function modelLoaded(){
    console.log("poseNet is Initialized");
}
function draw(){
image(video,0,0,600,500);
fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2){
        circle(leftwristX,leftwristY,20);
        InVolumeLeftwrist=Number(leftwristY);
        removeDecimal=floor(InVolumeLeftwrist);
        volume=removeDecimal/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);
    }

if(scoreRightWrist>0.2){
    circle(RightwristX,RightwristY,20);
    if(RightwristY>0&&RightwristY<=100){
    document.getElementById("speed").innerHTML="speed is= 0.5x";
    song.rate(0.5);
}

if(RightwristY>100&&RightwristY<=200){
    document.getElementById("speed").innerHTML="speed is= 1x";
    song.rate(1);
    }

    if(RightwristY>200&&RightwristY<=300){
        document.getElementById("speed").innerHTML="speed is= 1.5x";
        song.rate(1.5);
        }

        if(RightwristY>300&&RightwristY<=400){
            document.getElementById("speed").innerHTML="speed is= 2x";
            song.rate(2);
            }

            if(RightwristY>400&&RightwristY<=500){
                document.getElementById("speed").innerHTML="speed is= 2.5x";
                song.rate(2.5);
                }
}}
function preload(){
song=loadSound("music.mp3");
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
function stop(){
    song.stop();
song.setVolume(0);
}