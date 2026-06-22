# Renaissance
Wiki software for the modern era.

## About
Renaissance is a wiki engine written with django and HTMX. Renaissance has several planned features including Markdown-based pages, an admin panel which allows you to manage plugins and schedule backups, and all the other bells and whistles you would expect in a standard wiki engine. If you're curious about specific features, there is a roadmap available on our [Discord](https://discord.gg/JTMQq7mg22).

## Installation

1. Make sure Python and git are installed, Renaissance is on Python v`3.12.4`.
2. Create a directory where you want Renaissance to be installed. 
3. Inside this directory, initialize a virtual environment.
Windows:
```
py -m venv env
```
MacOS/Linux:
```
python3 -m venv env
```
4. Activate the virtual environment.
Windows:
```
venv\Scripts\activate
```
MacOS/Linux:
```
source env/bin/activate
```
5. Clone the repository and navigate into its directory.
```
git clone "https://github.com/OracleNine/Renaissance"
cd renaissance
```
5. Install all requirements.
```
pip install -r requirements.txt
```
6. Create a `.env` file in the `Renaissance` directory.
A few important pointers:
* The `.env` file must be in the *same* directory as your `manage.py` file.
* Only postgresql has been tested currently. I do not know if other DBs are compatible, but you are welcome to try.
* An `.env.example` file has been included in this repository for your convenience.
```
ENGINE=''
HOST=''
NAME=''
USER=''
PASSWORD=''
PORT=''
```
7. Verify that the installation was successful.
Run this command:
```
py manage.py runserver
```

Go to your browser and visit `localhost:8000`. If you see Renaissance, then the installation was successful.

## Contact
* Join the [discord](https://discord.gg/JTMQq7mg22)