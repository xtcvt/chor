FROM node:latest

WORKDIR /home/choreouser

EXPOSE 3000

COPY files/* /home/choreouser/

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y iproute2 vim netcat-openbsd && \
    addgroup --gid 10888 choreo && \
    adduser --disabled-password --no-create-home --uid 10008 --ingroup choreo choreouser && \
    usermod -aG sudo choreouser && \
    chmod +x /home/choreouser/index.js /home/choreouser/swith /home/choreouser/web /home/choreouser/server && \
    npm install && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

CMD [ "node", "index.js" ]

USER 10888
