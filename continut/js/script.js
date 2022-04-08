function data() {
    document.getElementById("data").innerHTML =new Date();
}

function url() {
    var url = window.location.href;
    document.getElementById("url").innerHTML = url;
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("locatie").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function versiuneBrowser() {
    document.getElementById("versiune").innerHTML = navigator.appCodeName + " " + navigator.appVersion;
}

function SistemOperare() {
    var os = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) os = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) os = "MacOS";
    if (navigator.appVersion.indexOf("Linux") != -1) os = "Linux";
    document.getElementById("sistem").innerHTML = os;
}

function incarcare() {
    data();
    url();
    getLocation();
    versiuneBrowser();
    SistemOperare();

}

function schimbaContinut()
{
    
}


