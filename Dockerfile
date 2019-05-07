FROM python:3.7.3-alpine

EXPOSE 8000
RUN mkdir /app
RUN cd /app
COPY ./requirements.txt .
RUN apk update && \
    apk add --virtual build-deps gcc python-dev musl-dev && \
    apk add postgresql-dev postgresql-client
RUN pip install -r requirements.txt

