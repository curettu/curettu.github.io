import { getGithubProfile, getGithubRepositories } from "../../gh_api/get_githubAPI_for_account.js";

const repositoryList = document.querySelector<HTMLDivElement>("#repository-list");

function repositoryCard(repository: { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number }): string {
	return `<a class="repository-card" href="${repository.html_url}" target="_blank" rel="noreferrer"><div class="repo-top"><span>PROJECT / ${repository.name.slice(0, 2).toUpperCase()}</span><span>↗</span></div><div><h3 class="repo-name">${repository.name}</h3><p class="repo-description">${repository.description || "Project/experiment"}</p></div><div class="repo-bottom"><span class="repo-language">${repository.language || "code"}</span><span>★ ${repository.stargazers_count}</span></div></a>`;
}

async function loadGithubData(): Promise<void> {
	try {
		const [profile, repositories] = await Promise.all([getGithubProfile(), getGithubRepositories()]);
		document.querySelector<HTMLImageElement>("#profile-avatar")!.src = profile.avatar_url;
		document.querySelector("#repo-count")!.textContent = String(profile.public_repos);
		document.querySelector("#follower-count")!.textContent = String(profile.followers);
		document.querySelector("#following-count")!.textContent = String(profile.following);
		if (repositoryList) repositoryList.innerHTML = repositories.length ? repositories.slice(0, 6).map(repositoryCard).join("") : "<p class=\"loading-message\">Public repo not yet</p>";
	} catch (error) {
		if (repositoryList) repositoryList.innerHTML = "<p class=\"loading-message\">GitHub not avaiable.</p>";
		console.error(error);
	}
}

loadGithubData();
