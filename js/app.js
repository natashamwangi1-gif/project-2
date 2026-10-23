let map;
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

    alert("Your report has been submitted successfully!")
    document.getElementById("form-sec").hidden=true

    const reportContainer=document.getElementById("r-cont")
    const newReport=document.createElement('div')
    newReport.className='card'

    const category=document.getElementById("i-cat")
    const categoryHead=document.createElement('h3')
    newReport.textContent=category
    newReport.appendChild(categoryHead)
    
    const location=document.getElementById("i-loc")
    const description=document.getElementById("i-desc")


})

const issueCategory= document.getElementById("i-cat")
issueCategory.addEventListener('change', function(){
    const otherLabel=document.querySelector('label[for= "other-issue"]')
    otherLabel.hidden=false

    const otherInput= document.getElementById("other-issue")
    otherInput.hidden=false
    otherInput.required=issueCategory.value==="other"

    if(issueCategory.value==="other"){
        otherLabel.hidden=false;
        otherInput.hidden=false;
    }else{
        otherLabel.hidden=true;
        otherInput.hidden=true;
    }
})

//information from leaflet 

const mapElement= document.getElementById("map")

if(mapElement && typeof L !=="undefined"){
 map= L.map ("map").setView([-1.2197, 36.8911], 13)
    
    L. tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: '&copy;<a href="https://www.openstreetmap.org/copyright">openstreetmap</a> contributors'
}).addTo(map)
L.marker([-1.2197, 36.8911])
.addTo(map)
.bindPopup("FixMyBlock - kasarani, Nairobi")
.openPopup()
}

const API_URL="./report.json"
async function fetchReport(){
    try{
        const response=await fetch(API_URL)
        if (!response.ok){
            throw new error("could not load reports")}
            const reports=await response.json()
    
   console.log(reports)

   if(map){
   reports.forEach(function(report){
    L.marker([report.latitude, report.longitude])
    .addTo(map)
    .bindPopup(
        `<strong>${report.title}</strong><br>${report.description}`
    )
   })
}
        }catch (error){
        console.error("error fetching reports:" ,error)
 }
}
fetchReport()
let selectedMarker =null;

map.on("click", function (event) {
    console.log("Map clicked!", event.latlng)
  const latitude = event.latlng.lat;
  const longitude = event.latlng.lng;

  const latInput=document.getElementById("i-loc")
  const longInput=document.getElementById("i-loc")

  if (latInput&&longInput){
    latInput.value=latitude
    longInput.value=longitude
  }

  if (selectedMarker) {
    map.removeLayer(selectedMarker);
  }

  selectedMarker = L.marker([latitude, longitude]).addTo(map);

  selectedMarker
    .bindPopup("Selected problem location")
    .openPopup();
});





