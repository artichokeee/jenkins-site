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
                sh 'echo "Building the website"'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "Deploying the website"'
            }
        }
    }
}