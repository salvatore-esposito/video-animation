FROM node:10-alpine

ARG user

WORKDIR /home/$user

COPY . /home/$user

RUN adduser --home /home/$user \
            --shell /bin/bash \
            --disabled-password $user && \
            npm install && \
            chown -R $user:$user .

USER $user
EXPOSE 3000

CMD ["npm", "run", "dev"]
