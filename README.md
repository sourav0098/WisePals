# Wise Paals

## Backend URL

https://clear-jade-scarab.cyclic.app

## Task Division

### Juan Gutierrez

I worked on the Find Tutors page in which a user can filter for tutors based on different parameters such as the subject and the price. I developed the front end and back end functionality.

The second page I worked on was the login, register and session features. I developed the front end and back end functionality. The authentication is implemented using JWT and the session is available in the client application using the redux store.

### Rodigo

I worked on the UserProfile page in which a login user can see his information and update the name, last name or phone. If the user is a tutor, he can also update the tutori information like skills, languages, description, and profile picture. I developed the front end and backend of this page.

The second page I worked on was the contact form, in which you will send a message to a tutor you want to contact, the tutur id will be a parameter in the url, it will fetch the tutor data to populate the skills and language options. Once all of the input is filled it will save the user can send the contact form. I developed the front end and back end functionality

## Overview

Wise Paals is a platform that connects students with tutors. The user can filter for the tutor of his preference from different parameters such as the subject and the price. The user can also register as a tutor and add his information to the platform.

## Features

- [x] Register and Login Page (Modal)
- [x] Session
- [x] JWT Authentication
- [x] Find Tutors based on different filters
- [x] Register as a tutor
- [x] Contact tutors
- [x] User and Tutor(Profile, Settings)

## Technologies

- [x] React.js
- [x] Node.js
- [x] Express.js
- [x] MongoDB
- [x] Javascript
- [x] CSS
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

## REST API Endpoints

- `GET /api/v1/tutors?skill=<tutor-skill>` -Retrieve a list of tutors filtered by skill
- `POST /api/v1/tutors` -Add a tutor
- `POST /api/v1/auth/register` -Register User
- `POST /api/v1/auth/login` -Login User
- `GET /api/v1/generate-random-tutors` -Populate DB with random tutors

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
