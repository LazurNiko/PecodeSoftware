FROM cypress/included:4.12.1

WORKDIR /app

COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json

RUN npx cypress open
