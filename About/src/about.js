import { getGithubProfile } from "../../gh_api/get_githubAPI_for_account.js";
getGithubProfile().then((profile) => {
    const avatar = document.querySelector("#about-avatar");
    if (avatar)
        avatar.src = profile.avatar_url;
}).catch((error) => console.error(error));
