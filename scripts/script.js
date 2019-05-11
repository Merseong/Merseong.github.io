var selHeader = document.getElementById('selectTitle');
var selSection = document.getElementById('selectContent');
var catSection = document.getElementById('cateContent');

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

    for (var i = 0; i < linklist.matching.length; i++)
    {
        categoryAdd(linklist, i);
    }

    // call (category).json
    var alcRequest = new XMLHttpRequest();
    alcRequest.open('GET', alcURL + 'yakju.json');
    alcRequest.responseType = 'json';
    alcRequest.send();
    alcRequest.onload = function() 
    {
        data = alcRequest.response;
        changeHeader(data);
        printAlcList(data);
    }
}

function categoryAdd(jsonObj, i)
{
    var myArti = document.createElement('article');
    var myH2 = document.createElement('h2');
    var myH3 = document.createElement('h3');

    myH2.textContent = jsonObj.matching[i].kr;
    myH3.textContent = jsonObj.matching[i].en;

    myArti.appendChild(myH2);
    myArti.appendChild(myH3);

    catSection.appendChild(myArti);
}

function changeHeader(jsonObj) 
{
    selHeader.textContent = jsonObj.krCategory + ", " + jsonObj.alcList.length + "개";
}

function printAlcList(jsonObj) 
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

        selSection.appendChild(myArti);
    }
}

