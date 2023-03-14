# Wise Paals

## Overview

Wise Paals is a platform designed to connect students with tutors. Users can filter through various parameters, including subject and price, to find a tutor that meets their specific preferences. Additionally, users have the option to register as a tutor and add their information to the platform.

## Backend URL

https://clear-jade-scarab.cyclic.app

## Task Division
 
### Juan Gutierrez

I worked on the Find Tutors page in which a user can filter for tutors based on different parameters such as the subject and the price. I developed the front end and back end functionality.

The second page I worked on was the login, register and session features. I developed the front end and back end functionality. The authentication is implemented using JWT and the session is available in the client application using the redux store.

### Rodrigo

I worked on the UserProfile page in which a login user can see his information and update the name, last name or phone. If the user is a tutor, he can also update the tutori information like skills, languages, description, and profile picture. I developed the front end and backend of this page.

The second page I worked on was the contact form, in which you will send a message to a tutor you want to contact, the tutur id will be a parameter in the url, it will fetch the tutor data to populate the skills and language options. Once all of the input is filled it will save the user can send the contact form. I developed the front end and back end functionality

### Sourav Choudhary
I worked on the "Register as Tutor" page, where I was able to add the tutor's information, including their skills, languages, description, and profile picture. In case a user is already registered as a tutor they cant access this page but they can update their information in the "User Profile" page. Additionally, I developed the "Tutor Profile" page, where users can view the tutor's information. On this page, users can also see the tutor's reviews and ratings. If a user is logged in they can also leave a review and rating for the tutor. I was responsible for developing both the front-end and back-end of these pages.


## Features

- [x] Register and Login Page (Modal)
- [x] Session
- [x] JWT Authentication
- [x] Find Tutors based on different filters
- [x] Register as a tutor
- [x] Add a Review and Rating
- [x] Contact tutors
- [x] User and Tutor(Profile, Settings)

## Technologies

- [x] React.js
- [x] Node.js
- [x] Express.js
- [x] MongoDB
- [x] Javascript
- [x] Material-UI

## Prerequisites to run the REST API

- Node.js and npm

Add .env file in the root of the server folder with the following info:

```sh
PORT = 5001
MONGO_DB_URL = mongodb+srv://username:password@cluster0.ewxzt.mongodb.net/?retryWrites=true&w=majority
RANDOM_TUTORS_NUMBER = 30
UNSPLASH_ACCESS_KEY = your_key
```

## Start the project

Inside client and server folder run:

```sh
npm start
```

### Contributors

Juan Gutierrez [<img src="https://i.stack.imgur.com/gVE0j.png" alt="Linkedin">](https://www.linkedin.com/in/-juan-gutierrez/)  
Rodrigo Chavez [<img src="https://i.stack.imgur.com/gVE0j.png" alt="Linkedin">](https://www.linkedin.com/in/rodrigo-chavez-m/)  
Moanisha Velayuthem [<img src="https://i.stack.imgur.com/gVE0j.png" alt="Linkedin">](https://www.linkedin.com/in/moanisha-velayuthem/)  
Sourav Choudhary [<img src="https://i.stack.imgur.com/gVE0j.png" alt="Linkedin">](https://www.linkedin.com/in/sourav009/)
