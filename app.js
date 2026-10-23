const reportButton= document.getElementById("r-btn")
reportButton.addEventListener("click", ()=> {
    document.getElementById("form-sec").hidden=false
})

const cancelButton= document.getElementById("cancel")
cancelButton.addEventListener('click',function (){
    document.getElementById("form-sec").hidden=true
})

const issueForm=document.getElementById("form-issue")
issueForm.addEventListener('submit', function(event){
    event.preventDefault()

    const reportContainer=document.getElementById("r-cont")
    const newReport=document.createElement('div')
    newReport.className='card'
    newReport.textContent=category
    newReport.appendChild(categoryHead)
    const categoryHead=document.createElement('h3')
    const category=document.getElementById("i-cat")



    const location=document.getElementById("i-loc")
    const description=document.getElementById("i-desc")


    alert("Your report has been submitted successfully!")
    document.getElementById("form-sec").hidden=true
})

const issueCategory= document.getElementById("i-cat")
issueCategory.addEventListener('change', function(){
    const otherLabel=document.querySelector('label[for= "other-issue"]')
    otherLabel.hidden=false

    const otherInput= document.getElementById("other-issue")
    otherInput.hidden=false
    otherInput.required=issueCategory==="other"

    if(issueCategory==="other"){
        otherLabel.hidden=false;
        otherInput.hidden=false;
    }else{
        otherLabel.hidden=true;
        otherInput.hidden=true;
    }
})
//information from leaflet
const mapElement= document.getElementById("map")
if(mapElement&& typeof L !=="undefined"){
    const map= L.map ("map").setView([-1.2197, 36.8911], 13)
    L. tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:
    '&copy;<a href="https://www.openstreetmap.org/copyright">openstreetmap</a> contributors'
}).addTo(map)
L.marker([-1.2197, 36.8911])
.addTo(map)
.bindpopup("FixMyBlock - kasarani, Nairobi")
.openPopup()
}
const API_URL="./report.json"
async function fetchReport(){
    try{
        const response=await fetch("API_URL" )
        if (!response.ok){
            throw new error("could not load reports")}
            const reports=await response.json()
    
   console.log(reports)
   reports.forEach(function(report){
    L.marker([report.latitude, report.longitude])
    .addTo(map)
    .bindpopup(
        `<strong>${report.title}</strong><br>${report.description}`
    )
   })
        }catch (error){
        console.error("error fetching reports:" ,error)
 }
}
fetchReport()

