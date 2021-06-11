function getCovidStats()
{
    var request=new XMLHttpRequest();
    var country=document.getElementById("nation").value;
    var sd=document.getElementById("date").value;
    
    var url= `https://api.covid19api.com/live/country/${country}`;
    //var url=`https://api.covid19api.com/country/${country}/status/confirmed/live?from=${sd}T00:00:00Z&to=${ed}T00:00:00Z`
    
    request.open('GET',url,true);
    request.onload=function()
    {
        var res=JSON.parse(this.response);
        var temp=document.getElementById("temp");
        temp.innerHTML="";
        table=document.createElement("table");
        table.border="1";
        table.width="100%";
        table.align="center";
        row=table.insertRow(-1)
        // row.style.width ='50px';
        row.style.height ='50px';
        cellH1=row.insertCell(-1)
        cellH2=row.insertCell(-1)
        cellH3=row.insertCell(-1)
        cellH4=row.insertCell(-1)
        cellH5=row.insertCell(-1)
        cellH1.innerHTML="STATE";
        cellH1.style.backgroundColor = "#292b2c"
        cellH1.style.color = "#ffff"
        cellH2.innerHTML="CONFIRMED"
        cellH2.style.backgroundColor = "#0275d8"
        cellH3.innerHTML="ACTIVE"
        cellH3.style.backgroundColor = "#f0ad4e"
        cellH4.innerHTML="RECOVERED"
        cellH4.style.backgroundColor = "#6ba644"
        cellH5.innerHTML="DECEASED";
        cellH5.style.backgroundColor = "#d9534f"
        
        res.forEach((day) => 
        {
            if(day.Date.includes(sd))
            {
                row1=table.insertRow(-1)
                cell1=row1.insertCell(-1)
                cell2=row1.insertCell(-1)
                cell3=row1.insertCell(-1)
                cell4=row1.insertCell(-1)
                cell5=row1.insertCell(-1)
                cell1.innerHTML=day.Province;
                cell2.innerHTML=day.Confirmed;
                cell3.innerHTML=day.Active;
                cell4.innerHTML=day.Recovered;
                cell5.innerHTML=day.Deaths;
                // console.log(day)
            }
        })
        
        document.getElementById("tmp").innerHTML = "Covid19 cases in "+country;
        temp.append(table);
    }
    request.send();
}
