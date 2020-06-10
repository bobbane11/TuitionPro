var jobRequest = new XMLHttpRequest();
var disabilityRequest = new XMLHttpRequest();
var raceRequest = new XMLHttpRequest();
var incomeRequest = new XMLHttpRequest();

listContainer = document.createElement('div');
listContainer.setAttribute("style", "overflow:auto;height:160px;background:white;");

listElement = document.createElement('ul');

document.getElementById("body").appendChild(listContainer);
listContainer.appendChild(listElement);

lineBreak = document.createElement('br');
document.body.appendChild(lineBreak);
head = document.createElement('header');
head.innerHTML = "Jobs";
document.body.appendChild(head);

if(sessionStorage.getItem("disorders") == "yes")
{
    disabilityRequest.open("POST", "http://52.86.25.124:4200/grants?grant_type=Disabled");
    disabilityRequest.send();
}

raceRequest.open("POST", "http://52.86.25.124:4200/grants?grant_type=" + sessionStorage.getItem("race"));
raceRequest.send();

if(sessionStorage.getItem("income") == "yes")
{
    incomeRequest.open("POST", "http://52.86.25.124:4200/grants?grant_type=Low-Income");
    incomeRequest.send();
}

jobRequest.open("POST", "http://52.86.25.124:4200/jobs?job_info=" + sessionStorage.getItem("job") + "," + sessionStorage.getItem("city") + "," + sessionStorage.getItem("state"));
jobRequest.send();

listContainer2 = document.createElement('div');
listContainer2.setAttribute("style", "overflow:auto;height:160px;background:white;");

listElement2 = document.createElement('ul');

document.getElementById("body").appendChild(listContainer2);
listContainer2.appendChild(listElement2);

jobRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var jobs = JSON.parse(jobRequest.responseText);
        for (i = 0; i < jobs.job_opportunities.length; ++i) {
            listItem = document.createElement('li');
            listItem.innerHTML = "<a href="+jobs.job_opportunities[i]+">"+jobs.job_opportunities[i].split("/")[3].split("-").join(" ")+"</a>";
            listElement2.appendChild(listItem);
        }
        console.log(jobRequest.responseText);
    }
};

disabilityRequest.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var disabilities = JSON.parse(disabilityRequest.responseText);
        for (i = 0; i < disabilities.length; ++i) {
            listItem = document.createElement('li');
            listItem.innerHTML = disabilities[i];
            listElement.appendChild(listItem);
        }
    }
};

raceRequest.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var races = JSON.parse(raceRequest.responseText);
        for (i = 0; i < races.length; ++i) {
            listItem = document.createElement('li');
            listItem.innerHTML = races[i];
            listElement.appendChild(listItem);
        }
    }
};

incomeRequest.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var incomes = JSON.parse(incomeRequest.responseText);
        for (i = 0; i < incomes.length; ++i) {
            listItem = document.createElement('li');
            listItem.innerHTML = incomes[i];
            listElement.appendChild(listItem);
        }
    }
};