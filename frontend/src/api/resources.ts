export const apiGit = async () => {
    try {
        const response = await fetch("https://api.github.com/users/FabbSantos/repos")
        const repos = await response.json()
        return repos;

    } catch (error) {
        console.error(`We couldn't retrieve the data...`, error);
        return null;
    }
}

export const apiWorks = async () => {
    try {
        const response = await fetch("http://localhost:5000/works")
        const works = await response.json()
        return works;

    } catch (error) {
        console.error(`We couldn't retrieve the data...`, error);
        return null;
    }
}