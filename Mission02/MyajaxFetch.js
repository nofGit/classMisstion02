
$(function()
{
    $("#getAll").click(function()
    {
        getAll();
    });

    $("#getOne").click(function()
    {
        getOne();
    })
});

function getAll()
{
    let url  = "https://restcountries.eu/rest/v2/all";
    let  cb= function (xhr)
    {
        if(xhr.status === 200)
        {
            showData(xhr)
        }
    }
    ajaxFetch('get', url , cb)
}

function getOne()
{
    let url  = "https://restcountries.eu/rest/v2/name";

    if($("#countryNameInput").val()==="")
    {
        alert("Please enter a country");
        $("#countryNameInput").focus();
        return
    }
    
    const cb = function(xhr)
    {
    if(xhr.status === 200)
    {
            showData(xhr)
    }
    }
    url += "/" + $("#countryNameInput").val()    
    ajaxFetch('get' , url , cb);
}  

function showData(xhr)
{
    let data = JSON.parse(xhr.responseText);
    let messageArea = document.querySelector("#messageArea");
    messageArea.innerHTML="";  
    for(var i =0; i<data.length; i++)
    {
        let createDiv= document.createElement("div");
        createDiv.setAttribute('class' , 'generalDiv')
        
        let countryFlag = document.createElement("div");
        countryFlag.setAttribute('class' , 'flag')
        countryFlag.innerHTML = "<a href='"+ data[i].flag + "'>" +" <img class='imgFlag' src= '" + data[i].flag + "'>" +"</a>"
        
        let countryDetails = document.createElement("div");
        countryDetails.setAttribute('class' , 'countryDetails'  )
        countryDetails.innerHTML =`
        <div id='contentFont'> name : ${data[i].name} </div>
        <div id='contentFont'> Top level domain :  ${data[i].topLevelDomain}</div>
        <div id='contentFont'> ${data[i].capital}</div>
        <div id='contentFont'> 
        Code: ${data[i].currencies[0].code} <br>
        Name: ${data[i].currencies[0].name} <br>
        Currency: ${data[i].currencies[0].symbol}
        </div>
        `

        createDiv.appendChild(countryFlag);
        createDiv.appendChild(countryDetails)
        messageArea.appendChild(createDiv);

    }
}

