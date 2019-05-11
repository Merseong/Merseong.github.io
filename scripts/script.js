var header = document.querySelector('header');
var section = document.getElementById('all');

var linklist;
var alcURL;
var data;

// call linklist.json
var requestURL = 'https://raw.githubusercontent.com/Merseong/alcohol-json-library/master/linklist.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() 
{
    linklist = request.response;
    alcURL = linklist.link;

    // call (category).json
    var alcRequest = new XMLHttpRequest();
    alcRequest.open('GET', alcURL + 'yakju.json');
    alcRequest.responseType = 'json';
    alcRequest.send();
    alcRequest.onload = function() 
    {
        data = alcRequest.response;
        myHeader(data);
        mySection(data);
    }
}



function myHeader(jsonObj) 
{
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj.category;
    header.appendChild(myH1);

    var myPara = document.createElement('p');
    myPara.textContent = 'Size: ' + jsonObj.alcList.length;
    header.appendChild(myPara);
}

function mySection(jsonObj) 
{
    var sools = jsonObj.alcList;

    for (var i = 0; i < sools.length; i++)
    {
        var myArti = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myDegree = document.createElement('p');
        var myMade = document.createElement('p');

        myH2.textContent = sools[i].alcName;
        myDegree.textContent = sools[i].alcDegree;
        myMade.textContent = sools[i].alcMade;

        myArti.appendChild(myH2);
        myArti.appendChild(myDegree);
        myArti.appendChild(myMade);

        section.appendChild(myArti);
    }
}

