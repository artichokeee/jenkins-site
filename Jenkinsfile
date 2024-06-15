pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/artichokeee/jenkins-site.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'cp -r ./dist /Documents/jenkins-deploy'
            }
        }
    }
}