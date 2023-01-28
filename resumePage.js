
/* window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
    window.history.go(1);
}; */

var index=0;
var dataLength=0;
var search_keyword=document.getElementById("search_box");
let dataArray=[];

//adding event listener for logout button

const logout_button=document.querySelector("#log_out");

logout_button.addEventListener("click",()=>{

    location.replace("index.html");
});

//Fetching data from json file

function fetchData()
{
   /*  function disablePageBack()
    {
        window.history.forward();
    }
    setTimeout("disablePageBack()",0);
    window.onunload=function(){null}; */


    fetch("./data.json")
    .then((response) =>response.json())
    .then((data) =>{
        for(i=0;i<data.resume.length;i++)
        dataArray=dataArray.concat(data.resume[i]);
        displayData()})
    .catch((error) =>console.log(error));
 
}

//displaying data fetched from json file to webpage

function displayData()
{

    document.getElementById("buttons_div").style.display="block";
    document.getElementById("resume_display_div").style.display="block";
    document.getElementById("error_img").style.display="none";

    document.getElementById("skill_set").innerText="";
    document.getElementById("hobbies_list").innerText="";
    console.log(dataArray);
    dataLength=dataArray.length;
    console.log(`Displaying ${index+1} of ${dataLength} resumes`);

    // hiding/ displaying next and previous button based on the index value of resume displayed
    if(dataLength==1)
    {
        document.getElementById("prev_button").style.visibility="hidden";
        document.getElementById("next_button").style.visibility="hidden";
    }

    else if(index===0 && dataLength>1)
    {
        document.getElementById("next_button").style.visibility="visible";
        document.getElementById("prev_button").style.visibility="hidden";
    }
    
    else if(index===dataLength-1 && index!==0)
    {
        document.getElementById("next_button").style.visibility="hidden";
        document.getElementById("prev_button").style.visibility="visible";
    }
    
    else 
    {
        document.getElementById("prev_button").style.visibility="visible";
        document.getElementById("next_button").style.visibility="visible";
    }

    //displaying candidate information to webpage

    document.getElementById("candidate_name").innerText=dataArray[index].basics.name;
    document.getElementById("applied_for").innerText=dataArray[index].basics.AppliedFor;

    document.getElementById("phone_no").innerText=dataArray[index].basics.phone;
    document.getElementById("email").innerText=dataArray[index].basics.email;
    document.getElementById("network_url").innerHTML=`<a href=${dataArray[index].basics.profiles.url} target="blank">LinkedIn</a>`;

    var skillSet=dataArray[index].skills.keywords;
    var skillSetList= document.getElementById("skill_set");
    
    skillSet.forEach(item => {

        let li=document.createElement("li");
        li.innerText=item;
        skillSetList.appendChild(li);
        
    });


    var hobbies=dataArray[index].interests.hobbies;
    var hobbiesList=document.getElementById("hobbies_list");

    hobbies.forEach(item =>{

        let li=document.createElement("li");
        li.innerText=item;
        hobbiesList.appendChild(li);

    })

    
    document.getElementById(`company_name`).innerText=dataArray[index].work[`Company Name`];
    document.getElementById(`job_position`).innerText=dataArray[index].work[`Position`];
    document.getElementById(`job_start_date`).innerText=dataArray[index].work[`Start Date`];
    document.getElementById(`job_end_date`).innerText=dataArray[index].work[`End Date`];
    document.getElementById(`job_summary`).innerText=dataArray[index].work[`Summary`];

    document.getElementById(`project_name`).innerText=dataArray[index].projects.name+" : ";
    document.getElementById(`project_description`).innerText=dataArray[index].projects.description;


    var ug=dataArray[index].education.UG;
    document.getElementById("ug").innerText=`${ug['institute']}, ${ug['course']}, ${ug['Start Date']}, ${ug['End Date']}, ${ug['cgpa']}`;

    var seniorSecondary=dataArray[index].education[`Senior Secondary`];
    document.getElementById("senior_secondary").innerText=`${seniorSecondary['institute']}, ${seniorSecondary['cgpa']}`;

    var highSchool=dataArray[index].education[`High School`];
    document.getElementById("high_school").innerText=`${highSchool['institute']}, ${highSchool['cgpa']}`;

    var internship=dataArray[index].Internship;
    document.getElementById("intern_company").innerText=`${internship['Company Name']}`;
    document.getElementById("intern_position").innerText=`${internship['Position']}`;
    document.getElementById("intern_start_date").innerText=`${internship['Start Date']}`;
    document.getElementById("intern_end_date").innerText=`${internship['End Date']}`;
    document.getElementById("intern_summary").innerText=`${internship['Summary']}`;

    var achievements=dataArray[index].achievements;
    document.getElementById("achievements").innerHTML=`<b>>></b>  ${achievements['Summary']}`;
 
    }

const nextButton=document.querySelector("#next_button");
const previousButton=document.querySelector("#prev_button");

// adding event listener for next button

nextButton.addEventListener("click", ()=>{

    document.getElementById("skill_set").innerText="";
    document.getElementById("hobbies_list").innerText="";

    if(index<dataLength-1)  
    {
        index++;
    }
    
    displayData();
  
});

// adding event listener for previous button

previousButton.addEventListener("click", ()=>{

    document.getElementById("skill_set").innerText="";
    document.getElementById("hobbies_list").innerText="";

    if(index!==0)
    {
        index--;
    }
    displayData();
    
});

const searchButton=document.querySelector("#search_button");
var filteredArray;

// adding event listener for search button

searchButton.addEventListener("click", () => {

    filteredArray=[];
    dataArray=[];
    fetch('./data.json')
    .then(response => response.json())
    .then(data => filterData(data))
    .catch(error => console.log(error));
});

   
//fetching data from json file based on keyword entered by user

    function filterData(info)
    {
      
      var found=false;
      
      for(i=0;i<info.resume.length;i++)
      {
        if(info.resume[i].basics['AppliedFor'].toLowerCase()==search_keyword.value.toLowerCase())
        {
          found=true;
          filteredArray=filteredArray.concat(info.resume[i]);
        }
        
      }
      if(found==false)
      {
            document.getElementById("buttons_div").style.display="none";
            document.getElementById("resume_display_div").style.display="none";
            document.getElementById("error_img").style.display="block";
      }
      else
        {
            index=0;
            dataArray=filteredArray;
            displayData();
            
        }    
      
    }



