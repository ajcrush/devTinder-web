# Devtinder

- Created a vite + react project
- Remove unnecessary code and created a hello world app
- Install tailwindCSS
- Install daisyui
- Add navbar component to app.jsx
- Created navbar in seperate file
- Installed react-router-dom
- Create BrowserRouter > Routes > Route = / Body > RouteChildren
- Create an Outlet in your body component
- Created a footer
- Create a login page
- Install axios
- Install cors in backend => add middleware to with configuration : origin and configuration as true
- Whenver you are making api call pass withcredential in axios
- Install react-redux + @reduxjs/toolkit
- configureStore => Provider => createSlice => addReducer to store
- Add redux toolkit in your chrome
- See if your data is coming on that store or not
- Navbar should be updated as soon as user logged in
- Refactor our code to add constant file + create a components folder
- You should not be access to other routes login
- If token is not present redirect user to login page
- Logout feature added with dynamic error in login page
- get the feed and add the feed in the store
- Build the user card on feed
- Edit profile features build show toast message on save profile
- New page - See all my connections
- New page - See all my connection requests
- feature accept/reject connection request
- Send or ignore card from feed
- signup page
- ETE testing

# Deployment

- Sign up on aws
- Launch instance
- Create a key-val pair
- chmod 400 secret.pem
- ssh -i "Dev-Tinder-Secret.pem" ubuntu@ec2-13-61-147-205.eu-north-1.compute.amazonaws.
- Install node 20.16.0
- Git clone to aws instance

-Frontend

- npm install in devtinder remote -> dependency install
- npm run build
- sudo apt update
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy code from dist folder to /var/www/html
- sudo scp -r dist/ /var/www/html
- enable port 80 of your instance

- backend

- Allowed ec2 instance public ip in mongoDB
- install pm2(npm install pm2 -g)
- pm2 start npm -- start
- pm2 list ,pm2 log,pm2 flush <name> ,pm2 delete<name>,pm2 stop<name>
- pm2 start npm --name "devTinder-backend" -- start (if you want to give custom name)
- config nginx - /etc/nginx/sites-available/default
- nginx config :
  server_name http://13.61.145.49;

          location /api {
          proxy_pass http://localhost:7777/; # Forward requests to the Node.js app
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
          }

- restart nginx sudo systemctl restart nginx
- Modify the base URL in fe project to /api

- Frontend = 13.61.145.49
- Backend = 13.61.145.49
- Domain name = devtinder.com => 13.61.145.49
- Frontend = 13.61.145.49
- Backend = 13.61.145.49:7777

# Adding a custom domain name

- purchased domain name devtinder.fun from hosinger
- sign up on cloudflare
- change the nameservers on hostinger and point it to cloudflare
- Wait for sometime till your nameserver are updated ~ 15mins
- In dns record you have to create A record

# Sending emails via aws ses

- Create a IAM user
- Give access to amazonSESFullAccess
- create an identity in AWS ses
- Verify your domain name
- verify an email address
- Install AWS SDK-v3 - https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code
- setup SesClient
- Acess credential should be created in IAM under security credentials tab
- Add the credentials to the .env file
- Write code for SesClient
- Write code for sending email address
- Make the email dynamic by passing more para to the run function
