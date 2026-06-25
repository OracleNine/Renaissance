## About
Renaissance is a open source wiki engine that is currently in development. Renaissance has several planned features including Markdown-based pages, an admin panel which allows you to manage plugins and schedule backups, and all the other bells and whistles you would expect in a standard wiki engine. If you're curious about specific features, there is a roadmap available on our [Discord](https://discord.gg/JTMQq7mg22).

This is a personal project, so updates may be irregular. However, anyone is free to contribute and I will do my best to look through all pull requests.

[![Django][Djangoproject.com]][Django-url] 
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![HTMX][Htmx.org]][Htmx-url]
[![AlpineJS][Alpinejs.dev]][Alpinejs-url]

## Installation

***WARNING:*** Renaissance is still in development, and is not suitable for making wikis just yet. If you want to help with development, these are the instructions for installing and running a development server on your own computer

1. Clone the repo, and navigate to the directory which contains `manage.py`.
```
git clone https://github.com/OracleNine/Renaissance.git
cd renaissance
```
> If you want to contribute, you should [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) first and then [clone the forked repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository) to your machine. 
2. Install [poetry](https://python-poetry.org/docs/#installing-with-the-official-installer).
See the section below on "Dependency Management" for more information.
3. Start the server with docker.
```
docker compose up
```
4. Visit `localhost:8000` in your browser of choice.
If you see Renaissance, you did it!

## Dependency Management
Renaissance's dependencies are managed through [poetry](https://python-poetry.org/). Due to past issues with dependency conflicts, poetry is preferred over `pip`.

> **Note:** On Windows, run VSCode as an administrator or poetry commands may not work.

To add dependencies, run the following command. `<name>` is the name of the PyPi package you wish to install.
```
poetry add <name>
```
To remove dependencies, run the following command. `<name>` is the name of the PyPi package you wish to get rid of.
```
poetry remove <name>
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
[license-url]: https://github.com/OracleNine/Renaissance/blob/master/LICENSE.txt
<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Djangoproject.com]: https://img.shields.io/badge/Django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white
[Django-url]: https://djangoproject.com
[Htmx.org]: https://img.shields.io/badge/HTMX-36C?style=for-the-badge&logo=htmx&logoColor=fff
[Htmx-url]: https://htmx.org/
[Alpinejs.dev]: https://img.shields.io/badge/alpinejs-white.svg?style=for-the-badge&logo=alpinedotjs&logoColor=%238BC0D0
[Alpinejs-url]: https://alpinejs.dev/