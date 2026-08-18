# Maia App


## Project Description

Maia is our very own islamic app with an emotion tracker and chatbot. 

### Main technologies used

Frontend: Javascript and React

Backend: Python and Node.js
![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)

Database: Mongodb

#### Frontend

##### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#### Backend

The libraries used were Flask, pymongo and google.generativeai.

Flask - create API endpoints to connect with the front end to display the chatbot responses.

pymongo - Mongodb Python SDK to interact with mongodb.

google.generativeai - to access the model for the chatbot.

## Installation instructions
Git is used to manage and track the process of the project. If git is not installed check [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

To clone this project:

```bash
git clone https://github.com/Tech-Sisters/hackathon24-team2.git
```

If SSH is set up. HIGHLY recommend!

This project uses the conda environment

For a full list of the project's dependencies, check the enviroment.yml file in the project's root directory.

### For conda users
To create and activate the new enviroment:

```bash
conda env create -f environment.yml

 conda activate new_environment_name
```

### For pip users:
run the following commands to create the mrdc environment

```bash
./env_setup_for_pip_users.sh
```

