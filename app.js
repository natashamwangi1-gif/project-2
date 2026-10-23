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



