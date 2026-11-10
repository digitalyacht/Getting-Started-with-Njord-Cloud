# using the downloaded python container
# https://hub.docker.com/_/python/
FROM python:3

# WORKDIR may need to be changed
WORKDIR /usr/src/app

# install requirements.txt
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# copy the working files for the application 
COPY . .

# runs the files we want to use
CMD [ "python", "./njordlink_query.py" ]
# CMD [ "python", "./njordlink_doCommand.py" ]