var form_dist = document.getElementById('form');

form_dist.onsubmit = function() {
	
	var request=new XMLHttpRequest();
	document.getElementById('details').innerHTML = '';
	
	var state = document.querySelector('select[name=state]').value;
	var district = document.querySelector('select[name=district]').value;
	var date = document.querySelector('input[name=datestate]').value;
	date = date.split('-').reverse().join('-');

  if(date==""){
    alert("Please select a date!")
  }

	let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+district_data[district]+"&date="+date;


	fetch(url)
		.then(function(response){
 			return response.json();
		})
		.then(function(jsondata){
			formatDataDist(jsondata);
			// console.log(jsondata)
			// console.log(jsondata.sessions[1])
		})
    .catch((err) => {
      // document.getElementById("err").innerHTML = err.message;
      console.log(err.message);
    });
	return false;
};

function formatDataDist(data)
{	
	console.log(data)
	console.log(data['sessions'].length)
	if(data['sessions'].length==0){
		document.getElementById('details').innerHTML = "No data available or the data has not been updated.";
	}
  else{
    document.getElementById('details').innerHTML = "Available Vaccination slots in "+data.sessions[0].district_name+", "+data.sessions[0].state_name+".";

    document.getElementById('datedisplay').innerHTML = "Date : "+data.sessions[0].date;
  }  
	var slotstable=document.getElementById("slotstable");
	slotstable.innerHTML="";
	table=document.createElement("table");
	table.border="1px solid black";
	table.width="100%";
	table.align="center";
	row=table.insertRow(-1);
	row.style.height ='50px';
  row.style.textAlign="center";
  row.style.color="#ffffff";
  row.style.backgroundColor="#292b2c";
	cellH1=row.insertCell(-1)
	cellH2=row.insertCell(-1)
	cellH3=row.insertCell(-1)
  cellH4=row.insertCell(-1)
	cellH5=row.insertCell(-1)
	cellH6=row.insertCell(-1)
	cellH7=row.insertCell(-1)
	cellH8=row.insertCell(-1)
	cellH9=row.insertCell(-1)
	cellH10=row.insertCell(-1)

	// cellH1.innerHTML="Date";
	// cellH1.style.border="2px solid white";
	cellH1.innerHTML="HOSPITAL NAME";
	cellH1.style.border="1px solid #ffffff";
	cellH2.innerHTML="ADDRESS"
	cellH2.style.border="1px solid #ffffff";
  cellH3.innerHTML="PINCODE"
	cellH3.style.border="1px solid #ffffff";
	cellH4.innerHTML="FEE TYPE"
	cellH4.style.border="1px solid #ffffff";
  cellH5.innerHTML="FEE"
	cellH5.style.border="1px solid #ffffff";
	cellH6.innerHTML="VACCINE"
	cellH6.style.border="1px solid #ffffff";
	cellH7.innerHTML="MIN AGE GROUP"
	cellH7.style.border="1px solid #ffffff";
	cellH8.innerHTML="DOSE 1"
	cellH8.style.border="1px solid #ffffff";
	cellH9.innerHTML="DOSE 2"
	cellH9.style.border="1px solid #ffffff";
	cellH10.innerHTML="AVAILABLE CAPACITY"
	cellH10.style.border="1px solid #ffffff";

	data['sessions'].forEach((data)=>{
		if(data.available_capacity>0){
			row1=table.insertRow(-1)
			cell1=row1.insertCell(-1)
			cell2=row1.insertCell(-1)
			cell3=row1.insertCell(-1)
			cell4=row1.insertCell(-1)
			cell5=row1.insertCell(-1)
			cell6=row1.insertCell(-1)
			cell7=row1.insertCell(-1)
			cell8=row1.insertCell(-1)
			cell9=row1.insertCell(-1)
			cell10=row1.insertCell(-1)
			
			cell1.innerHTML=data.name;
			cell2.innerHTML=data.address;
      cell3.innerHTML=data.pincode;
			cell4.innerHTML=data.fee_type;
      cell5.innerHTML=data.fee;
			cell6.innerHTML=data.vaccine;
			cell7.innerHTML=data.min_age_limit;
			cell8.innerHTML=data.available_capacity_dose1;
			cell9.innerHTML=data.available_capacity_dose2;
			cell10.innerHTML=data.available_capacity;

      if((data.fee_type)=="Free" && data.fee==0){
        cell4.style.border="2px solid #6ba644"
				cell5.style.border="2px solid #6ba644"
			}
      else{
        cell4.style.border="2px solid #d9534f"
				cell5.style.border="2px solid #d9534f"
			}
      cell10.style.backgroundColor = "#6ba644"
		}
	});
	slotstable.append(table);

  data['sessions'].forEach((data)=>{
		if(data.available_capacity==0){
			row1=table.insertRow(-1)
			cell1=row1.insertCell(-1)
			cell2=row1.insertCell(-1)
			cell3=row1.insertCell(-1)
			cell4=row1.insertCell(-1)
			cell5=row1.insertCell(-1)
			cell6=row1.insertCell(-1)
			cell7=row1.insertCell(-1)
			cell8=row1.insertCell(-1)
			cell9=row1.insertCell(-1)
			cell10=row1.insertCell(-1)
			
			cell1.innerHTML=data.name;
			cell2.innerHTML=data.address;
      cell3.innerHTML=data.pincode;
			cell4.innerHTML=data.fee_type;
      cell5.innerHTML=data.fee;
			cell6.innerHTML=data.vaccine;
			cell7.innerHTML=data.min_age_limit;
			cell8.innerHTML=data.available_capacity_dose1;
			cell9.innerHTML=data.available_capacity_dose2;
			cell10.innerHTML=data.available_capacity;

      if((data.fee_type)=="Free" && data.fee==0){
        cell4.style.border="2px solid #6ba644"
				cell5.style.border="2px solid #6ba644"
			}
      else{
        cell4.style.border="2px solid #d9534f"
				cell5.style.border="2px solid #d9534f"
			}
      cell10.style.backgroundColor = "#d9534f"
		}
	});
	slotstable.append(table);
}
