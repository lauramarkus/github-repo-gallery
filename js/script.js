const profileInfo = document.querySelector(".overview")
const repoList = document.querySelector(".repo-list");
const username = "lauramarkus";
const repoSection = document.querySelector(".repos");
const repoDetails = document.querySelector(".repo-data");


//async function to fetch info from github profile
const getInfo = async function(){
    const request = await fetch (`https://api.github.com/users/${username}`);
    const data = await request.json();
    console.log(data);
    
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
            <img src=${avatar} alt="user avatar" /> </figure>
        <div>
            <p><strong>Name:</strong> ${myname}</p>
            <p><strong>Bio:</strong> ${bio}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Number of public repos:</strong> ${numRepos}</p>
        </div> 
        `;
        profileInfo.append(infoDiv);
};

//async function to fetch github repos
const getRepos = async function (){
    const repoRequest = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await repoRequest.json();
    console.log(repos);
    displayRepoInfo(repos);
};
getRepos(); 

//function to display repo names in a list
const displayRepoInfo = function (repos){
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
        console.log(repoName);
        }
        
});

