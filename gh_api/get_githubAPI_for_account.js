export const githubUsername = "curettu";
const githubApi = "https://api.github.com";
export async function getGithubProfile() {
    const response = await fetch(`${githubApi}/users/${githubUsername}`);
    if (!response.ok)
        throw new Error(`GitHub profile request failed: ${response.status}`);
    return response.json();
}
export async function getGithubRepositories() {
    const response = await fetch(`${githubApi}/users/${githubUsername}/repos?sort=updated&per_page=12`);
    if (!response.ok)
        throw new Error(`GitHub repositories request failed: ${response.status}`);
    const repositories = await response.json();
    return repositories.filter((repository) => !repository.fork);
}
