song="";

function preload()
{
    song=loadSound("music.mp3");
}

rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;

score_leftWrist=0;
score_rightWrist=0;


function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
console.log('PoseNet is intialized')
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        score_rightWrist=results[0].pose.keypoints[10].score;
        score_leftWrist=results[0].pose.keypoints[9].score;
        console.log("score_leftWrist = "+score_leftWrist);
        console.log("score_rightWrist = "+score_rightWrist);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);
    }
}


function draw()
{
    image(video,0,0,600,500);

    fill("#ff0000");
    stroke("#ff0000");

    if(score_rightWrist>0.2)
    {
        circle(rightWristtX,rightWristY,20);

        if(rightWristY>0 && rightWristY<=100)
        {
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }

        else if(rightWristY>100 && rightWristY<=200)
        {
            document.getElementById("speed").innerHTML="Speed=1x";
            song.rate(1);
        }

        else if(rightWristY>200 && rightWristY<=300)
        {
            document.getElementById("speed").innerHTML="Speed=1.5x";
            song.rate(1.5);
        }

        else if(rightWristY>300 && rightWristY<=400)
        {
            document.getElementById("speed").innerHTML="Speed=2x";
            song.rate(2);
        }

        else if(rightWristY>400 && rightWristY<=500)
        {
            document.getElementById("speed").innerHTML="Speed=2.5x";
            song.rate(2.5);
        }
    }    

    if(score_leftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);

        InNumberleftWristY=Number(leftWristY);
        remove_decimals=floor(InNumberleftWristY);
        leftWristY_divide_500=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume="+leftWristY_divide_500;
        song.setVolume(leftWristY_divide_500);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
