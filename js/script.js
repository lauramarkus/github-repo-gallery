const profileInfo = document.querySelector(".overview")
const repoList = document.querySelector(".repo-list");
const username = "lauramarkus";
const repoSection = document.querySelector(".repos");
const repoDetails = document.querySelector(".repo-data");
const viewRepoButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


//async function to fetch info from github profile
const getInfo = async function(){
    const request = await fetch (`https://api.github.com/users/${username}`);
    const data = await request.json();
    //console.log(data);
    
    displayUserInfo(data);
};

getInfo();

//function to specify info to use
const displayUserInfo = function (data){
    const avatar = data.avatar_url;
    const myname = data.name;
    const bio = data.bio;
    const location = data.location;
    const numRepos = data.public_repos;

//creates a div for displaying user info
    const infoDiv = document.createElement("div");
        infoDiv.classList.add("user-info");
        infoDiv.innerHTML= `
        <figure> 
            <img src=${avatar} alt="user avatar" /> 
        </figure>
        <div>
            <p><strong>Name:</strong> ${myname}</p>
            <p><strong>Bio:</strong> ${bio}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Number of public repos:</strong> ${numRepos}</p>
        </div> 
        `;
        profileInfo.append(infoDiv);
    getRepos(username);
};

//async function to fetch github repos
const getRepos = async function (username){
    const repoRequest = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoResult = await repoRequest.json();
    //console.log(repoResult);
    displayRepoInfo(repoResult);
};


//function to display repo names in a list
const displayRepoInfo = function (repos){
    filterInput.classList.remove("hide");

    for (const repo of repos){
        const li=document.createElement("li");
        li.innerHTML = `<h3>${repo.name} </h3>`;
        li.classList.add("repo");
        repoList.append(li);
    }
};

//even listener for clicking on repo list
repoList.addEventListener("click", function(e){
    if (e.target.matches ("h3")){
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
        }
});

//fetches individual repos
const getRepoInfo = async function (repoName){
    const infoRequest = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await infoRequest.json();
    //console.log(repoInfo);

//gets language info
    const fetchLanguages = await fetch (repoInfo.languages_url);
        const languageData = await fetchLanguages.json();
        //console.log(languageData);

//creates array for list of languages
    const languages = [];
        for (const language in languageData){
            languages.push(language);
            //console.log(languages);
        }
showRepoInfo(repoInfo, languages);
};

    const showRepoInfo = function (repoInfo, languages){
        viewRepoButton.classList.remove("hide");
        repoDetails.innerHTML="";
        repoDetails.classList.remove("hide");
        repoSection.classList.add("hide");
        
    const repoDiv=document.createElement("div");
            repoDiv.innerHTML=`
            <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
            `;
            repoDetails.append(repoDiv);
    };

    viewRepoButton.addEventListener("click", function(){
        repoSection.classList.remove("hide");
        repoDetails.classList.add("hide");
        viewRepoButton.classList.add("hide");
    });

// Dynamic search function

  filterInput.addEventListener("input", function(e){
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos){
        const lowerCaseRepo = repo.innerText.toLowerCase();
        if (lowerCaseRepo.includes(searchLowerText)){
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
    
});