import express, { Request, Response } from "express";
import { GraphQLClient } from "graphql-request";
import githubConfig from "../config/github"

const router = express.Router();
const githubToken = githubConfig.token;
const githubEndpoint = githubConfig.endpoint;
const graphqlClient = new GraphQLClient(githubEndpoint, {
    headers: {
        Authorization: `bearer ${githubToken}`
    }
});

export async function getOwnTeamRepo(req: Request, res: Response) {
    const teamName = req.params.teamName || '';
    const orgLogin = req.params.orgLogin || '';
    const query = `
        query getOwnTeamRepos($teamName: String!) { 
            viewer {
                name
                organizations(first: 10) {
                    totalCount
                    nodes {
                        name
                        login
                        teams(first: 100, query: $teamName) {
                            totalCount
                            nodes {
                                name
                                repositories(first: 100) {
                                    totalCount
                                    nodes {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        teamName
    }

    const result: any = await graphqlClient.request(query, variables)
        .catch(err => {
            return res.status(500).send(err);
        })

    let repoList = [];
    result.viewer.organizations.nodes.forEach(org => {
        if (org.login !== orgLogin) return
        org.teams.nodes.forEach(team => {
            if (team.name !== teamName) return

            repoList = team.repositories.nodes.map(repo => repo.name)
        })
    })

    res.json({
        organization: orgLogin,
        team: teamName,
        repositories: repoList
    })
}

router.get("/own-team-repo/:orgLogin/:teamName", getOwnTeamRepo)

export default router