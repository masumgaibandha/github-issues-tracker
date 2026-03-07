async function loadAllIssue() {
        const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
        const res = await fetch(url)
        const data = await res.json()
        displayAllIssues(data.data)
    }
    const displayAllIssues = (issues) =>{
        const allIssuesCard = document.getElementById('issues-card')    
        allIssuesCard.innerHTML = ""   
        
//         {
//     "id": 47,
//     "title": "Add code syntax highlighting",
//     "description": "Implement syntax highlighting for code blocks in comments and descriptions.",
//     "status": "open",
//     "labels": [
//         "enhancement",
//         "good first issue"
//     ],
//     "priority": "low",
//     "author": "syntax_simon",
//     "assignee": "",
//     "createdAt": "2024-01-25T11:00:00Z",
//     "updatedAt": "2024-01-25T11:00:00Z"
// }

       issues.forEach(issue => {
        console.log(issue)
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
       
       
    }
loadAllIssue()


const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};
