

# Viam Python SDK MQL/SQL Querying Quickstart

These code snippets demonstrate how to connect to the Viam cloud get live data or historical data using SQL or MQL queries

## Create Virtual Environemt and Install Dependencies

From within the project folder run the following commands...

```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Create `.env` file

The `.env`file is used to store and load your credentials for accessing the data via the script.
Create a file with the name `.env` and add the following content including your personal credentials:

```
ORG_ID="<YOUR-ORG-ID>"
API_KEY_ID="<YOUR-API-KEY-ID>"
API_KEY_SECRET="<YOUR-API-KEY>"
```

## Usage

Run `python njordlink_query.py` and you should see the JSON contents of the PGNs scroll down the screen.

<div align="center">
<img src="/images/Python_Output.png" width=70%>
</div>


# Running in Windows

While using a virtualisation isn't necessary, it may help when it comes to deploying your project. 
In this project we have included a dockerfile so that Docker can be used.

* [Docker Desktop Download](https://www.docker.com/products/docker-desktop/)
* [Install Python via the Docker Hub](https://hub.docker.com/_/python/) (should be on the left of the Docker Desktop)
* build the application (in powershell or cmd) `docker build -t <build_name_here>`
    * make sure you're running powershell or cmd in the correct directory
* run the application `docker run -it --rm --name <process_name_here> <build_name_here>`

<div align="center">
<img src="/images/python_docker_solution.png" width="70%"><br>
output of the njordlink_doCommand.py file
</div>
