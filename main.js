Status ="";
value="";
input_text="";
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
    input_text = document.getElementById("object_name").value;
}
function modelLoaded()
{
    console.log("model Loaded");
    Status = true;
}
function draw()
{
    image(video,0,0,420,420);
}
