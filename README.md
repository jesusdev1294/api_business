# arquitectura-act-1


# indicators-backend



$ npm install -g serverless
$ npm install serverless-offline --save-dev

levantar local:  
$ serverless offline start

$ npm install --save express serverless-http

# build docker image:
docker build -t app-indicator .

# run docker image
$ docker run -p 3002:3002 -e ENVIRONMENT=dev  app-indicator

# run demon server
$ npm install pm2 -g



#Ec2
$ sudo npx playwright install-deps