export const apiGit = async () => {
    try {
        const response = await fetch("https://api.github.com/users/FabbSantos/repos")
        const repos = await response.json()

        return repos;
    } catch (error) {
        console.error('Something went wrong... ', error);
        return null;
    }
}