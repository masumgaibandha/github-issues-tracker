let allIssues = [];
const allIssuesCard = document.getElementById("issues-card");
const loadingSpinner = document.getElementById("loading-spinner");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

function setActiveBtn(activeBtn) {
  allBtn.classList.remove("bg-[#4A00FF]", "text-white");
  openBtn.classList.remove("bg-[#4A00FF]", "text-white");
  closedBtn.classList.remove("bg-[#4A00FF]", "text-white");
  activeBtn.classList.add("bg-[#4A00FF]", "text-white");
}

closedBtn.onclick = function () {
  const closedIssues = allIssues.filter(
    (clIssue) => clIssue.status.toLowerCase() === "closed",
  );
  displayAllIssues(closedIssues);
  totalCounts(closedIssues);
  setActiveBtn(closedBtn);
};

const allBtn = document.getElementById("all-btn");
const issuesCount = document.getElementById("issues-count");

allBtn.onclick = function () {
  displayAllIssues(allIssues);
  totalCounts(allIssues);
  setActiveBtn(allBtn);
};
openBtn.onclick = function () {
  const openIssues = allIssues.filter(
    (issue) => issue.status.toLowerCase() === "open",
  );
  displayAllIssues(openIssues);
  totalCounts(openIssues);
  setActiveBtn(openBtn);
};

function totalCounts(issues) {
  issuesCount.innerText = issues.length;
}

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  allIssuesCard.innerHTML = "";
}
function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

async function loadAllIssue() {
  showLoading();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  hideLoading();
  displayAllIssues(data.data);
  allIssues = data.data;
  totalCounts(allIssues);
  allBtn.classList.add("bg-[#4A00FF]", "text-white");
}

const displayAllIssues = (issues) => {
  // console.log(issues)
  allIssuesCard.innerHTML = "";

  issues.forEach((issue) => {
    // console.log(issue)
    const issueCard = document.createElement("div");
    issueCard.innerHTML = `
          <div onClick="loadIssuesDetails(${issue.id})" class="cursor-pointer card bg-base-100 shadow-2xl border-t-4 

          ${issue.status.toLowerCase() === "open" ? "border-t-[#00A96E]" : "border-t-[#A855F7]"}  
          
          h-full">
            <div class="card-body">
              <div class="flex justify-between items-center">
                <div>
                
                <button class=""> <img src="${issue.status === "closed" ? "./assets/closed-status.png" : "./assets/open.png"}" alt="status" /></button>

                </div>

                <button class="btn 
                
                ${
                  issue.priority.toLowerCase() === "medium"
                    ? "bg-[#fff6d1] text-[#F59E0B]"
                    : issue.priority.toLowerCase() === "high"
                      ? "bg-[#FEECEC] text-[#EF4444]"
                      : issue.priority.toLowerCase() === "low"
                        ? "bg-[#EEEFF2] "
                        : ""
                }
                
                rounded-[100px] w-20 h-8 p-2 px-5">
                  ${issue.priority}
                </button>
              </div>
              <h2  class="card-title cursor-pointer">${issue.title}</h2>
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
              <span>${issue.createdAt.split("T")[0]}</span>
              </div>

              <div class="flex justify-between items-center">
              <span>assignee: ${issue.assignee ? issue.assignee : "Blank"}</span>
              <span>${issue.updatedAt.split("T")[0]}</span>
              </div>
            </div>
          </div>
          `;
    allIssuesCard.appendChild(issueCard);
  });
};

async function loadIssuesDetails(id) {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayIssuesDetails(details.data);
  console.log(details.data);
}

const displayIssuesDetails = (item) => {
  // modalContainer.innerHTML = ""
  console.log(item);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    <h3 class="text-lg font-bold">Fix broken image uploads</h3>
              <div class="text-color py-3">
                <button
                  class="btn outline-none

                  ${
                    item.status.toLowerCase() === "open"
                      ? "bg-[#00A96E] text-[#FFFFFF]"
                      : item.status.toLowerCase() === "closed"
                        ? "bg-[#A855F7] text-[#FFFFFF]"
                        : ""
                  }
                  
                  rounded-[100px] w-20 h-8 p-2 px-5">
                  ${item.status}
                </button>
                <span class="px-3">Opened by ${item.author}</span>
                <span>${item.createdAt.split("T")[0]}</span>
              </div>

              <div class="py-3 rounded-3xl px-6 ">
                ${createElements(item.labels)}
              </div>

              <div>
                <p class="py-4 text-color">
                  ${item.description}
                </p>
              </div>

              <div class="flex space-y-3">
                <div class="">
                  <p class="text-color py-2">Assignee: </p>
                  <p>${item.assignee ? item.assignee : "Blank"}</p>
                </div>
                <div class="ml-24">
                  <p class="py-2">Priority:</p>
                  <button
                    class="btn
                    ${
                      item.priority.toLowerCase() === "medium"
                        ? "bg-[#fff6d1] text-[#F59E0B]"
                        : item.priority.toLowerCase() === "high"
                          ? "bg-[#EF4444] text-[#FFFFFF]"
                          : item.priority.toLowerCase() === "low"
                            ? "bg-[#EEEFF2] "
                            : ""
                    }
                     rounded-[100px] p-2 px-6">
                    ${item.priority}
                   
                  </button>
                </div>
              </div>

              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button
                    class="btn bg-[#4A00FF] text-white py-5 px-4 rounded-xl"
                  >
                    Close
                  </button>
                </form>
              </div>
    `;
  document.getElementById("my_modal_5").showModal();
};

loadAllIssue();
setActiveBtn(allBtn);

const createElements = (arr) => {
  const htmlElements = arr.map((el) => {
    if (el.toLowerCase() === "bug") {
      return `<span class="btn bg-[#feecec] text-[#EF4444] rounded-[100px] p-2 px-3">${el}</span>`;
    } else if (el.toLowerCase() === "help wanted") {
      return `<span class="btn bg-[#fff8db] text-[#D97706] rounded-[100px] p-2 px-3">${el}</span>`;
    } else if (el.toLowerCase() === "enhancement") {
      return `<span class="btn bg-[#defce8] text-[#00A96E] rounded-[100px] p-2 px-3">${el}</span>`;
    } else {
      return `<span class="btn bg-[#d2f3c4] text-[#d94906] rounded-[100px] p-2 px-3">${el}</span>`;
    }
  });
  return htmlElements;
};

document.getElementById("issue-btn").addEventListener("click", function () {
  const input = document.getElementById("search-input");
  const searchText = input.value.trim().toLowerCase();

  if(searchText === ""){
    displayAllIssues(allIssues);
    totalCounts(allIssues);
    setActiveBtn(allBtn);
    return;
  }
  


  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
  )
    .then((res) => res.json())
    .then((data) => {
      displayAllIssues(data.data);
      totalCounts(data.data);
      
    });
});
