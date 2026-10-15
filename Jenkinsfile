pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        PROJECT_NAME = 'Sivaxi Frontend'
        FIREBASE_PROJECT = 'sivaxi-ui'
        FIREBASE_CREDENTIALS_ID = 'firebase-service-account-json'
        FIREBASE_TOOLS_VERSION = '15.28.1'
    }

    stages {
            stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Validate Branch') {
        steps {
            script {
                def currentBranch = sh(
                    script: 'git branch --show-current',
                    returnStdout: true
                ).trim()

                if (currentBranch != 'main') {
                    error(
                        "Pipeline aborted: deployments are allowed only from main. " +
                        "Current branch: ${currentBranch ?: 'unknown'}"
                    )
                }

                echo 'Branch validation passed: main'
            }
        }
    }

    stage('Detect Changes') {
        // Keep your existing Detect Changes stage here.
    }


        stage('Install Dependencies') {
            when {
                expression { env.DEPLOY_APPS?.trim() }
            }
            steps {
                sh '''
                    set -eu
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }

        stage('Build Applications') {
            when {
                expression { env.DEPLOY_APPS?.trim() }
            }
            steps {
                script {
                    env.DEPLOY_APPS.split(',').each { app ->
                        echo "Building ${app}"

                        sh """
                            set -eu
                            npx ng build ${app} --configuration production
                        """
                    }
                }
            }
        }

        stage('Verify Build Artifacts') {
            when {
                expression { env.DEPLOY_APPS?.trim() }
            }
            steps {
                script {
                    env.DEPLOY_APPS.split(',').each { app ->
                        sh """
                            set -eu
                            test -f dist/${app}/browser/index.html
                            test -f dist/${app}/browser/remoteEntry.json
                            echo "Verified ${app} build artifacts"
                        """
                    }
                }
            }
        }

        stage('Deploy to Firebase Hosting') {
            when {
                expression { env.DEPLOY_APPS?.trim() }
            }
            steps {
                withCredentials([
                    file(
                        credentialsId: env.FIREBASE_CREDENTIALS_ID,
                        variable: 'GOOGLE_APPLICATION_CREDENTIALS'
                    )
                ]) {
                    script {
                        env.DEPLOY_APPS.split(',').each { app ->
                            echo "Deploying ${app} to ${env.FIREBASE_PROJECT}"

                            sh """
                                set -eu
                                export CI=true

                                npx --yes firebase-tools@${FIREBASE_TOOLS_VERSION} \
                                    deploy \
                                    --only hosting:${app} \
                                    --project ${FIREBASE_PROJECT} \
                                    --non-interactive
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "${env.PROJECT_NAME} pipeline completed. Applications: ${env.DEPLOY_APPS ?: 'none'}"
        }

        failure {
            echo "${env.PROJECT_NAME} pipeline failed. Check the stage logs."
        }

        always {
            echo 'Pipeline finished.'
        }
    }
}