export const githubUsername = "curettu";
const githubApi = "https://api.github.com";

export type GithubUser = { login: string; name: string | null; avatar_url: string; followers: number; following: number; public_repos: number };
export type GithubRepository = { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; fork: boolean; updated_at: string };

export async function getGithubProfile(): Promise<GithubUser> {
	const response = await fetch(`${githubApi}/users/${githubUsername}`);
	if (!response.ok) throw new Error(`GitHub profile request failed: ${response.status}`);
	return response.json();
}

export async function getGithubRepositories(): Promise<GithubRepository[]> {
	const response = await fetch(`${githubApi}/users/${githubUsername}/repos?sort=updated&per_page=12`);
	if (!response.ok) throw new Error(`GitHub repositories request failed: ${response.status}`);
	const repositories: GithubRepository[] = await response.json();
	return repositories.filter((repository) => !repository.fork);
}
