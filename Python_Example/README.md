# Viam Python SDK MQL/SQL Querying Quickstart

This example demonstrates how to connect to the Viam cloud and query historic data using MQL or SQL.

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

Run `python njordlink_query.py` and you should see the JSON contents of the last 2 PGNs scroll down the screen.

<div align="center">
<img src="https://github.com/digitalyacht/Getting-Started-with-Njord-Cloud/blob/5d50a3e0b195bcee5ec81c3c6494d43e5bdca88a/images/Python_Output.png" width=70%>
</div>
