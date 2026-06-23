## About
Renaissance is a open source wiki engine that is currently in development. Renaissance has several planned features including Markdown-based pages, an admin panel which allows you to manage plugins and schedule backups, and all the other bells and whistles you would expect in a standard wiki engine. If you're curious about specific features, there is a roadmap available on our [Discord](https://discord.gg/JTMQq7mg22).

This is a personal project, so updates may be irregular. However, anyone is free to contribute and I will do my best to look through all pull requests.

[![Django][Djangoproject.com]][Django-url] 
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![HTMX][Htmx.org]][Htmx-url]
[![AlpineJS][Alpinejs.dev]][Alpinejs-url]

## Installation

1. Make sure Python and git are installed, Renaissance is on Python `3.12.4`.
2. Create a directory where you want Renaissance to be installed. 
3. Inside this directory, initialize a virtual environment.
```
python3 -m venv venv
```
4. Activate the virtual environment.

Windows:
```
venv\Scripts\activate
```
MacOS/Linux:
```
source venv/bin/activate
```

5. Clone the repo, and navigate to the directory which contains `manage.py`.
```
git clone https://github.com/OracleNine/Renaissance.git
cd renaissance
```
> If you want to contribute, you should [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) and [clone it](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository) to your machine. 
6. Install all requirements.
```
pip install -r requirements.txt
npm install
```
7. In your database system of choice, create a new database.
> Only postgresql has been tested currently. I do not know if other DBs are compatible, but you are welcome to try.
```
CREATE DATABASE <database_name>;
```
8. Rename the `.env.example` file to `.env`, and then fill it out with your database information.
9. Make migrations. This creates the tables in your database.
```
python3 manage.py makemigrations
python3 manage.py migrate
```
10. To start the server, run these commands.
```
npm run build
python3 manage.py runserver
```
> `npm run build` isn't necessary if you haven't changed anything in the `assets/alpine.js` file.

Go to your browser and visit `localhost:8000`. If you see Renaissance, then the installation was successful.

## Contributing



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