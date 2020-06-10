var cont = true;
function loadData()
{
    var xhttp = new XMLHttpRequest();
    var cost = document.getElementById("form1");
    var location = document.getElementById("form2");
    var external = document.getElementById("form3");
    var job = document.getElementById("form6");
    var race = document.getElementsByName("race");
    var disorders = document.getElementsByName("disorders");
    var income = document.getElementsByName("income");
    var error = document.getElementById("error");
    sessionStorage.setItem("scholarships", []);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            sessionStorage.setItem("scholarships", (xhttp.responseText));
            console.log(xhttp.responseText);
        }
    };

    sessionStorage.setItem("costAttendance", parseInt(cost.elements[0].value));
    validateData("costAttendance");
    sessionStorage.setItem("costLiving", parseInt(cost.elements[1].value));
    validateData("costLiving");

    sessionStorage.setItem("state", (location.elements[0].value));
    sessionStorage.setItem("city", (location.elements[1].value));
    sessionStorage.setItem("job", (job.elements[0].value));

    sessionStorage.setItem("familyContributions", parseInt(external.elements[0].value));
    validateData("familyContributions");
    sessionStorage.setItem("grants", parseInt(external.elements[1].value));
    validateData("grants");
    sessionStorage.setItem("other", parseInt(external.elements[2].value));
    validateData("other");

    for(var i = 0; i < race.length; i++)
    {
        if(race[i].checked)
        {
            sessionStorage.setItem("race", race[i].value);
        }
    }

    for(var i = 0; i < disorders.length; i++)
    {
        if(disorders[i].checked)
        {
            sessionStorage.setItem("disorders", disorders[i].value);
        }
    }

    for(var i = 0; i < income.length; i++)
    {
        if(income[i].checked)
        {
            sessionStorage.setItem("income", disorders[i].value);
        }
    }

    if(cont)
    {
        window.location.href = "output.html";
    }
}

function validateData(id)
{
    if(isNaN(sessionStorage.getItem(id)))
    {
        cont = false;
        error.innerText = "invalid value found or field not entered";
    } else if(cont) {
        cont = true;
        error.innerText = "";
    }
}
