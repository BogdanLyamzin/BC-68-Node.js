const fs=require("fs/promises");

console.log(__dirname)

const getAllMovies = async()=> {
    const data = await fs.readFile("./movies/movies.json", "utf-8");
    return JSON.parse(data);
}