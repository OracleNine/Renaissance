[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]


## About
Renaissance is a open source wiki engine that is currently in development. Renaissance has several planned features including Markdown-based pages, an admin panel which allows you to manage plugins and schedule backups, and all the other bells and whistles you would expect in a standard wiki engine. If you're curious about specific features, there is a roadmap available on our [Discord](https://discord.gg/JTMQq7mg22).

This is a personal project, so updates may be irregular. However, anyone is free to contribute and I will do my best to look through all pull requests.

[![Angular][Angular-img]][Angular-url]
[![Django][Django-img]][Django-url]

## Installation

***WARNING:*** Renaissance is still in development, and is not suitable for making wikis just yet. If you want to help with development, these are the instructions for installing and running a development server on your own computer.

1. Clone the repo, and navigate to the directory which contains `manage.py`.
```
git clone https://github.com/OracleNine/Renaissance.git
cd renaissance
```
> If you want to contribute, you should [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) first and then [clone the forked repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository) to your machine. 
2. Install [poetry](https://python-poetry.org/docs/#installing-with-the-official-installer), then run the following command.
```
poetry install
```
3. Create a copy of `.env.example` and rename this copy to `.env`. (This means you should have both a `.env.example` and a `.env` in your root directory). Leave `REN_DB_ENGINE` and `REN_DB_HOST` the same, the rest of the details you should change to what you want.

> `REN_DB_NAME` is the name of the database that renaissance uses, default is `renaissance_db`.
> 
> `REN_DB_USER` is the username of the database admin, default is `admin`.
> 
> `REN_DB_PASSWORD` is the password of the database admin.
> 
> `REN_DB_PORT` is the database port, default for postgresql is 5432.
4. On some systems, you may have to give permission to your machine to make the `entrypoint.sh` script executable.
```
cd server
chmod +x ./entrypoint.sh
```
5. Start the server with [docker](https://www.docker.com/). Execute this command in the root directory, the same folder that `docker-compose.yml` is located in.
```
docker compose up
```
6. Visit `localhost:5173` in your browser of choice.
If you see Renaissance, you did it!

## Dependency Management
Renaissance's dependencies are managed through [poetry](https://python-poetry.org/). Due to past issues with dependency conflicts, poetry is preferred over `pip`.

> **Note:** On Windows, run VSCode as an administrator or poetry commands may not work.

Start by navigating into the backend.
```
cd server
```

To add dependencies, run the following command. `<name>` is the name of the PyPi package you wish to install.
```
poetry add <name>
```
To remove dependencies, run the following command. `<name>` is the name of the PyPi package you wish to get rid of.
```
poetry remove <name>
```
In order for all of the depencies to be applied to the docker container, you need to export them to a `requirements.txt` file. Here's the command:
```
poetry self add poetry-plugin-export
poetry export -f requirements.txt --output requirements.txt
```

## Contact
* Join the [discord](https://discord.gg/JTMQq7mg22)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/OracleNine/Renaissance.svg?style=for-the-badge
[contributors-url]: https://github.com/OracleNine/Renaissance/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/OracleNine/Renaissance.svg?style=for-the-badge
[forks-url]: https://github.com/OracleNine/Renaissance/network/members
[stars-shield]: https://img.shields.io/github/stars/OracleNine/Renaissance.svg?style=for-the-badge
[stars-url]: https://github.com/OracleNine/Renaissance/stargazers
[issues-shield]: https://img.shields.io/github/issues/OracleNine/Renaissance.svg?style=for-the-badge
[issues-url]: https://github.com/OracleNine/Renaissance/issues
[license-shield]: https://img.shields.io/github/license/OracleNine/Renaissance.svg?style=for-the-badge
[license-url]: https://github.com/OracleNine/Renaissance/blob/main/LICENSE.txt
<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->
[Django-img]: https://img.shields.io/badge/Django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white
[Django-url]: https://djangoproject.com/
[Angular-img]: https://img.shields.io/badge/Angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.dev/