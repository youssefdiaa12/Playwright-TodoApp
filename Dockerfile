FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /project

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

ENV CommandToRunTests="npm run test"

CMD ["sh", "-c", "$CommandToRunTests"]
