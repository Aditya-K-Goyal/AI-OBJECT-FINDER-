Status ="";
input_text="";
objects=[];
function setup()
{
    canvas = createCanvas(420,420);
    video = createCapture(VIDEO);
    video.size(420,420);
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML =" status: Detecting Objects";
    input_text = document.getElementById("input").value;
}
function modelLoaded()
{
    console.log("model Loaded");
    Status = true;
}
function draw()
{
    image(video,0,0,420,420);
    if(Status != "")
    {
        objectDetector.detect(video,gotResults);
        for(i=0; i< objects.length ; i++){
            document.getElementById("status").innerHTML = "status :Objects Detected";
            fill("#FF0000");
            console.log(objects.length);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y ,objects[i].width , objects[i].height);

            if(objects[i].label == input_text)
            {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text + " found ";
                var synth = window.speechSynthesis;
                var utterThis = window.SpeechSynthesisUtterance(input_text + "found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input_text + " not found ";
            }
        }
    }
}
function gotResults(error,results)
{
    if(error){
        console.log("error")
    }
    console.log(results)
    Objects = results;
}
