var experienceCount=1;
var educationCount=1;
const skillSet= new Set();
var filename="";

function previewImage(event){
    console.log("previewImage(event) <<")
    console.log(typeof event)
    var imagePreview=document.getElementById("image-preview")

    if(event.target.files[0]){
        imagePreview.src=URL.createObjectURL(event.target.files[0]);
        imagePreview.style.display="block";
        imagePreview.onload=function(){
            URL.revokeObjectURL(imagePreview.src);
        }
    }
    console.log("previewImage(event) >>")
}

function addSkill(){
    console.log("addskill() <<")
    if(document.querySelector("#skill-input").value.length==0){
        alert("Please Enter a skill");
    }else{
        var skillValue=document.querySelector("#skill-input").value;
        if(skillSet.has(skillValue)){
            alert("Skill already exits");
            return;
        }
        skillSet.add(skillValue);

        document.querySelector("#skills").innerHTML+=`
        <div class="skill mt-1">
        <span class="skill-name" >${skillValue}</span>
        <button class="btn btn-outline-danger delete">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        </div>
        `;

        document.querySelector("#skill-input").value="";
        var current_tasks=document.querySelectorAll(".delete");
        for(var i=0;i<current_tasks.length;i++){
            current_tasks[i].onclick=function(){
                this.parentNode.remove();
            };
        }
        console.log("addskill() >>");
    }
}   


function addWorkExperience() {
    console.log("addWorkExperience() << " + experienceCount);
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "we-field", "mt-1");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute("id", "experience-" + ++experienceCount);
    newNode.setAttribute(
      "placeholder",
      "Enter work experience " + experienceCount
    );
    let experieceDiv = document.getElementById("experience-div");
    let experienceAddButtonDivs = document.getElementById("we-btns-div");
    let we_del_btn = document.getElementById("we-del-btn");

  
    experieceDiv.insertBefore(newNode, experienceAddButtonDivs);
    console.log("addWorkExperience() >> " + experienceCount);
}

function removeWorkExperience() {
    console.log("removeWorkExperience() << " + experienceCount);
    let latestExperience = document.getElementById(
      "experience-" +experienceCount
    );
    let we_del_btn = document.getElementById("we-del-btn");
  
    if (experienceCount == 1) {
      we_del_btn.classList.remove("btn-danger");
      we_del_btn.classList.add("btn-outline-danger");
      we_del_btn.setAttribute("disabled", true);
    }
  
    if (experienceCount != 0) {
      latestExperience.remove();
      --experienceCount;
    }
    console.log("removeWorkExperience() >> " + experienceCount);
}

function addEducation() {
    console.log("addEducation() << " + educationCount);
    
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "ed-field", "mt-1");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute("id", "education-" + ++educationCount);
    newNode.setAttribute(
      "placeholder",
      "Enter academic qualifiaction  " + educationCount
    );
    let educationDiv = document.getElementById("education-div");
    let educationAddButtonDivs = document.getElementById("ed-btns-div");
    let ed_del_btn = document.getElementById("ed-del-btn");
  
    if (educationCount > 1) {
      ed_del_btn.classList.remove("btn-outline-danger");
      ed_del_btn.classList.add("btn-danger");
      ed_del_btn.removeAttribute("disabled");
    }
  
    educationDiv.insertBefore(newNode, educationAddButtonDivs);
    console.log("addEducation() >> " + educationCount);
}

function removeEducation() {
    console.log("removeEducation() << " + educationCount);
    let latestEducation = document.getElementById(
      "education-" + educationCount
    );
    let ed_del_btn = document.getElementById("ed-del-btn");
  
    if (educationCount == 2) {
      ed_del_btn.classList.remove("btn-danger");
      ed_del_btn.classList.add("btn-outline-danger");
      ed_del_btn.setAttribute("disabled", true);
    }
  
    if (educationCount > 1) {
      latestEducation.remove();
      --educationCount;
    }
    console.log("removeEducation() >> " + educationCount);
}

function startOver(){
    console.log("startOver() <<");
    window.location.reload();
    console.log("startOver() >>");
}

function generateResume(){
    console.log("generateResume() <<");
    //name
    let fullname=document.getElementById("full-name").value;
    let fullNameTemplate=document.getElementById("full-name-template");
    fullNameTemplate.innerHTML=fullname;
    filename=fullname;

    //dob
    let dob=document.getElementById("dob").value;
    let dobTemplate=document.getElementById("dob-template");
    dobTemplate.innerHTML=dob;

    //phonenumber
    let phoneNumber=document.getElementById("phone").value;
    let phoneNumberTemplate=document.getElementById("phone-template");
    phoneNumberTemplate.innerHTML=phoneNumber;

    //email
    let eMail=document.getElementById("email").value;
    let eMailTemplate=document.getElementById("email-template");
    eMailTemplate.innerHTML=eMail;

    //address
    let address=document.getElementById("address").value;
    let addressTemplate=document.getElementById("address-template");
    addressTemplate.innerHTML=address;

    //linkedlink
    let linkedLink=document.getElementById("linkedin").value;
    let linkedLinkTemplate=document.getElementById("linkedin-template");
    linkedLinkTemplate.innerHTML=linkedLink;

    //github
    let githubLink=document.getElementById("github").value;
    let githubLinkTemplate=document.getElementById("github-template");
    githubLinkTemplate.innerHTML=githubLink;

    //objective
    let objective=document.getElementById("objective").value;
    let objectiveTemplate=document.getElementById("objective-template");
    objectiveTemplate.innerHTML=objective;

    //skills
    let skillSetString="";
    for(let skill of skillSet){
        skillSetString +=`<span class="badge rounded-pill bg-secondary skill-pill">${skill}</span>`;
    }
    document.getElementById("skills-template").innerHTML=skillSetString;

    let experiences=document.getElementsByClassName("we-field");
    let experienceListString="";
    for(let experience of experiences){
      experienceListString+=`<li>${experience.value}</li>`;
    }
    document.getElementById("work-template").innerHTML=experienceListString;

    //academics
    let academics=document.getElementsByClassName("ed-field");
    let academicListString="";
    for(let academic of academics){
      academicListString+=`<li>${academic.value}`;
    }
    document.getElementById("ed-template").innerHTML=academicListString;  

    let file = document.getElementById("profile-img").files[0];
  console.log(file);
  if (file === undefined) {
    console.log("No file selected");
  } else {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      //setting when data loading is complete
      document.getElementById("profile-img-template").src = reader.result;
    };
  }

  document.getElementById("resumeform").style.display = "none";
  document.getElementById("resume-template").style.display = "block";
  document.getElementById("save-btn").style.display = "block";

  console.log("generateResume() >>");
}

function printResume(resumetemplate){
  console.log("printResume <<");
  var printContent=document.getElementById("print").innerHTML;
  var originalContent=document.body.innerHTML;
  originalContent=printContent;
  window.print();
  document.body.innerHTML=originalContent;


  console.log("printResume >>");
}
