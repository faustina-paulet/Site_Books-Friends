function data() {
    document.getElementById("data").innerHTML = Date();
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

function showPosition(position) {
    document.getElementById("locatie").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
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

function getMousePos(evt) {
    return {
        x: evt.offsetX,
        y: evt.offsetY
    };
}
var isFirst = true;
var pct = null;

function desenare(event) {

    var canvas = document.getElementById("Canvas");
    var pos = getMousePos(event);
    var posx = pos.x;
    var posy = pos.y;


    if (isFirst == true) {
        isFirst = false;
        pct = pos;
    } else {
        isFirst = true;

        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(pct.x, pct.y, Math.abs(posx - pct.x), Math.abs(posy - pct.y));
        ctx.lineWidth = 5;
        ctx.strokeStyle = document.getElementById("contur").value;
        ctx.stroke();
        ctx.fillStyle = document.getElementById("umplere").value;
        ctx.fill();
    }
}


/*Sectiunea3*/
function inserareColoana() {
    var poz = document.getElementById("poz").value;
    var tbl = document.getElementById('tabel');
    var i;
    for (i = 0; i < tbl.rows.length; i++) {
        creareColoana(tbl.rows[i].insertCell(poz), i);
    }
}



function inserareRand() {
    var poz = document.getElementById("poz").value;
    var tbl = document.getElementById('tabel');
    var row = tbl.insertRow(poz);
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        creareColoana(row.insertCell(i), i);
    }
}

function creareColoana(cell, text) {
    var div = document.createElement('div');
    var txt = document.createTextNode(text);
    div.appendChild(txt);
    cell.appendChild(div);
}

function schimbaCuloare_coloana() {
    var poz = document.getElementById("poz").value;
    var x = document.getElementById("tabel").getElementsByTagName("td");
    x[poz].style.backgroundColor = document.getElementById("culoare").value;
}

function schimbaCuloare_linie() {
    var poz = document.getElementById("poz").value;
    var x = document.getElementById("tabel").getElementsByTagName("tr");
    x[poz].style.backgroundColor = document.getElementById("culoare").value;
}

function schimbaContinut(resursa, jsFisier, jsFunctie) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML =
                this.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function() {
                    console.log("hello");
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
        }
    };
    xhttp.open("GET", resursa + ".html", true);
    xhttp.send();
}


function validare() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if (document.getElementById("user").value == obj[0].utilizator && document.getElementById("parola").value == obj[0].parola) {
                document.getElementById("validare1").innerHTML = "Nume utilizator+parolă corecte";
            } else if (document.getElementById("user").value != obj[0].utilizator && document.getElementById("parola").value != obj[0].parola) {
                document.getElementById("validare1").innerHTML = "Nume utilizator+parolă greșite";
            } else if (document.getElementById("user").value != obj[0].utilizator) {
                document.getElementById("validare1").innerHTML = "Nume utilizator greșit";
            } else if (document.getElementById("parola").value != obj[0].parola) {
                document.getElementById("validare1").innerHTML = "Parolă greșită";
            }
        }
    };

    xhttp.open("GET", "../../resurse/utilizatori.json", true);
    xhttp.send();
}