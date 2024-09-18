# Task Scheduler Frontend

This is the frontend of the Task Scheduling App, built with Vite and ReactJs. It handles user authentication, task creation, editing, deletion, and notifications for tasks.

## Deployed Link 
```bash
https://boisterous-frangipane-9f323a.netlify.app/
```

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Functionalities](#functionalities)
- [API Documentation](#api-Documentation)

## Getting Started

To get a copy of the project up and running on your local machine, follow the instructions below.

### Clone the Repository

```bash
git clone git@github.com:jagdish-mindfire/task-scheduler-frontend.git
```
Navigate into the cloned repository:


```bash
cd task-scheduler-frontend
```

## Installation
Once inside the project directory, run the following command to install all the necessary dependencies:

```bash
npm install
```
## Environment Variables
Before running the app locally, create a .env file in the root of the project and fill in the required environment variables based on the .env.example file provided.

```bash
VITE_API_URL=https://task-scheduler-api.chickenkiller.com
```

## Running the App
Once inside the project directory, run the following command to install all the necessary dependencies:

To start the developement server locally, use the following command:

```bash
npm run dev
```

To run build use following command:
```bash
npm run build
```


## Functionalities
* **User Registration :** Users can create a new account.
* **User Login :** Users can log in using their credentials.
* **Task Management :**
  * **Create Task :** Users can create a task with a title, description, and due date.
  * **Edit Task :** Users can edit tasks they’ve created.
  * **Delete Task:** Users can delete tasks they no longer need.

## Backend Repo
you can access the backend(apis) used for this frontend by following link
```bash
git clone git@github.com:jagdish-mindfire/task-scheduler-backedn.git
```
