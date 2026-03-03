pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'onkarsathe007/mainportfolio'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                                 -t ${DOCKER_IMAGE}:latest .
                '''
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
                        docker push ${DOCKER_IMAGE}:latest
                        docker logout
                    '''
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                sh '''
                    docker rmi ${DOCKER_IMAGE}:${BUILD_NUMBER} || true
                    docker rmi ${DOCKER_IMAGE}:latest || true
                '''
            }
        }
    }
    
    post {
        success {
            echo "✅ Pipeline completed successfully!"
            echo "Docker image pushed: ${DOCKER_IMAGE}:${BUILD_NUMBER}"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
        always {
            echo "🏁 Build finished"
            cleanWs()
        }
    }
}
