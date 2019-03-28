import dotenv from "dotenv";

const config = dotenv.config({ path: ".env" });

export default {
    endpoint: "https://api.github.com/graphql",
    token: config.parsed.GITHUB_TOKEN || ''
}