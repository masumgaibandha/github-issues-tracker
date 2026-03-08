 let allIssues = []
 const allIssuesCard = document.getElementById('issues-card')
 const loadingSpinner = document.getElementById('loading-spinner')
const openBtn = document.getElementById('open-btn')
const closedBtn = document.getElementById('closed-btn')

function setActiveBtn(activeBtn){
    allBtn.classList.remove('bg-[#4A00FF]', 'text-white')
    openBtn.classList.remove('bg-[#4A00FF]', 'text-white')
    closedBtn.classList.remove('bg-[#4A00FF]', 'text-white')
    activeBtn.classList.add('bg-[#4A00FF]', 'text-white')
 }

closedBtn.onclick = function(){
    const closedIssues = allIssues.filter(clIssue => 
        clIssue.status.toLowerCase()=== "closed"      
    )
    displayAllIssues(closedIssues)
    totalCounts(closedIssues)
    setActiveBtn(closedBtn)
} 

 const allBtn = document.getElementById('all-btn')
 const issuesCount = document.getElementById("issues-count")
 
 allBtn.onclick = function(){
    displayAllIssues(allIssues)
    totalCounts(allIssues);
    setActiveBtn(allBtn)
 }

 openBtn.onclick = function () {
  const openIssues = allIssues.filter(
    issue => issue.status.toLowerCase() === "open"
  );
  displayAllIssues(openIssues);
  totalCounts(openIssues);
  setActiveBtn(openBtn)
};
  
 
 function totalCounts(issues){
    issuesCount.innerText = issues.length; 
 }

 function showLoading(){
loadingSpinner.classList.remove("hidden")
allIssuesCard.innerHTML = ""   
 }
 function hideLoading(){
loadingSpinner.classList.add('hidden')
 }

 

async function loadAllIssue() {
    showLoading()
        const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
        const res = await fetch(url)
        const data = await res.json()
        hideLoading()
        displayAllIssues(data.data)
        allIssues = data.data
        totalCounts(allIssues)
    allBtn.classList.add('bg-[#4A00FF]', 'text-white')
    
    
       
    }


    const displayAllIssues = (issues) =>{  
 
        // console.log(issues)
        allIssuesCard.innerHTML = ""   

       issues.forEach(issue => {
        // console.log(issue)
          const issueCard = document.createElement("div")
          issueCard.innerHTML = `
          <div class="card bg-base-100 shadow-2xl border-t-4 border-t-[#00A96E] h-full">
            <div class="card-body">
              <div class="flex justify-between items-center">
                <div><button class="btn">${issue.status}</button></div>

                <button class="btn bg-[#FEECEC] text-[#EF4444] rounded-[100px] w-20 h-8 p-2 px-5">
                  ${issue.priority}
                </button>
              </div>
              <h2 onClick="my_modal_5.showModal()" class="card-title cursor-pointer">${issue.title}</h2>
              <p class="text-color">
                ${issue.description}
              </p>
              <div class="flex gap-6 items-center py-3">
             ${createElements(issue.labels)}                
              </div>
            </div>
            <hr class="text-gray-400" />
            <div class="card-body text-color">
              <div class="flex justify-between items-center">
              <span># ${issue.id} ${issue.author}</span>
              <span>${issue.createdAt}</span>
              </div>

              <div class="flex justify-between items-center">
              <span>assignee: ${issue.assignee? issue.assignee : "Blank"}</span>
              <span>${issue.updatedAt}</span>
              </div>
            </div>
          </div>
          `
        allIssuesCard.appendChild(issueCard)
        
       });


 }

     

loadAllIssue()
setActiveBtn(allBtn)


// const createElements = (arr) => {
//   const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
//   return htmlElements.join(" ");
// };

const createElements = (arr) =>{
    const htmlElements = arr.map((el)=>{
        if(el.toLowerCase()==="bug"){
            return `<span class="btn bg-[#feecec] text-[#EF4444] rounded-[100px] p-2 px-3">${el}</span>`
        }
        else if(el.toLowerCase()==="help wanted"){
            return `<span class="btn bg-[#fff8db] text-[#D97706] rounded-[100px] p-2 px-3">${el}</span>`
        }
        else if(el.toLowerCase()==="enhancement"){
            return `<span class="btn bg-[#defce8] text-[#00A96E] rounded-[100px] p-2 px-3">${el}</span>`
        }
        
        else{
             return `<span class="btn bg-[#d2f3c4] text-[#d94906] rounded-[100px] p-2 px-3">${el}</span>`;
        }
    })
    return htmlElements
}

