// let allBtn = document.getElementById('all-btn');
// let openBtn = document.getElementById('open-btn');
// let closedBtn = document.getElementById('open-btn');

// allBtn.onclick = () => selectedIssue('all-btn')

document.getElementById("all-btn").onclick = function () {
  console.log('button clicked')
};

 const allIssuesCard = document.getElementById('issues-card')
 const loadingSpinner = document.getElementById('loading-spinner')

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
    }

    const displayAllIssues = (issues) =>{  
        // allIssuesCard.innerHTML = ""   

       issues.forEach(issue => {
        // console.log(issue)
          const issueCard = document.createElement("div")
          issueCard.innerHTML = `
          <div class="card bg-base-100 shadow-2xl border-t-4 border-t-[#00A96E] h-full">
            <div class="card-body">
              <div class="flex justify-between items-center">
                <div>${issue.status}</div>

                <button class="btn bg-[#FEECEC] text-[#EF4444] rounded-[100px] w-20 h-8 p-2 px-5">
                  ${issue.priority}
                </button>
              </div>
              <h2 class="card-title">${issue.title}</h2>
              <p class="text-color">
                ${issue.description}
              </p>
              <div class="flex gap-6 items-center py-3">
             ${createElements(issue.labels)}                
              </div>
            </div>
            <hr class="text-gray-400" />
            <div class="card-body text-color">
              <div>${issue.author}</div>
              <div>${issue.createdAt}</div>
            </div>
          </div>
          `
        allIssuesCard.appendChild(issueCard)
        
       });

    // const allBtn = document.getElementById('all-btn').addEventListener('click', function(){
    //     const issuesCount = document.getElementById('issues-count')
    //     issuesCount.innerText = allIssuesCard.children.length 
    // })
 

    }
loadAllIssue()


const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};
