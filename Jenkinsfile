pipeline {
    agent any

    environment {
        NODE_PATH = "/Users/rusau/.nvm/versions/node/v16.14.2/bin"
        PATH = "${env.NODE_PATH}:${env.PATH}"
    }

    stages {
        stage('Check Node and NPM') {
            steps {
                script {
                    echo "Node version:"
                    sh 'node -v'
                    echo "NPM version:"
                    sh 'npm -v'
                }
            }
        }

        stage('Prepare Workspace') {
            steps {
                dir('/Users/rusau/.jenkins/workspace/landing-page') {
                    script {
                        // Установите зависимости
                        sh 'npm install'

                        // Соберите проект
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Start Server') {
            steps {
                dir('/Users/rusau/.jenkins/workspace/landing-page') {
                    script {
                        // Запустите новый сервер в фоновом режиме на порту 8082
                        sh 'npm start &'
                        
                        // Сохраните PID нового сервера, чтобы можно было остановить его после тестов
                        script {
                            env.NEW_SERVER_PID = sh(script: "echo \$!", returnStdout: true).trim()
                        }

                        // Дайте серверу время на запуск
                        sleep 5
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('/Users/rusau/.jenkins/workspace/landing-page') {
                    script {
                        // Запустите тесты
                        sh 'npm test'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Остановите новый сервер
                sh "kill ${env.NEW_SERVER_PID}"
            }
        }
    }
}
