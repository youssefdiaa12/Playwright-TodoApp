# Use the official Playwright image (v1.58.2) based on Ubuntu Noble
# This image comes preinstalled with browsers and dependencies for Playwright testing
FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Set the working directory inside the container to /project
WORKDIR /project

# Copy package.json and package-lock.json (if present) to the container
# This allows npm install to run only when dependencies change, improving build caching
COPY package*.json ./

# Install Node.js dependencies defined in package.json
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Update package lists and install Java 17 runtime (headless version)
# Some test frameworks or tools may require Java (e.g., Selenium, Appium, or other integrations)
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless

# Set JAVA_HOME environment variable so tools can locate the Java installation
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Define an environment variable for the test command
# This makes it easy to override the command without editing the Dockerfile
ENV CommandToRunTests="npm run test"

# Default command: run the test command defined above
# "sh -c" ensures the environment variable is expanded properly
CMD ["sh", "-c", "$CommandToRunTests"]
