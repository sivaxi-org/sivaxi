
pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 45, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        FIREBASE_PROJECT = 'sivaxi-ui'
        FIREBASE_CREDENTIALS_ID = 'firebase-service-account-json'
        NODE_IMAGE = 'node:24-bookworm'
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
                    if (env.BRANCH_NAME != 'master') {
                        echo "Skipping deployment for branch: ${env.BRANCH_NAME}"
                        currentBuild.result = 'NOT_BUILT'
                        env.SKIP_DEPLOYMENT = 'true'
                    } else {
                        echo "Branch validation passed: master"
                        env.SKIP_DEPLOYMENT = 'false'
                    }
                }
            }
        }

        stage('Select Applications') {
            when {
                expression { env.SKIP_DEPLOYMENT != 'true' }
            }
            steps {
                script {
                    env.DEPLOY_APPS = 'shell,vixi,portfolio,auth'
                    echo "Applications selected: ${env.DEPLOY_APPS}"
                }
            }
        }

        stage('Install Dependencies') {
            when {
                expression { env.SKIP_DEPLOYMENT != 'true' }
            }
            steps {
                script {
                    docker.image(env.NODE_IMAGE).inside {
                        sh '''
                            set -eu
                            node --version
                            npm --version
                            npm ci
                        '''
                    }
                }
            }
        }

        stage('Build Shared Library') {
            when {
                expression { env.SKIP_DEPLOYMENT != 'true' }
            }
            steps {
                script {
                    docker.image(env.NODE_IMAGE).inside {
                        sh '''
                            set -eu
                            npx ng build shared --configuration production
                            test -f dist/shared/package.json
                            echo "Shared library built successfully."
                        '''
                    }
                }
            }
        }

        stage('Build Applications') {
            when {
                expression { env.SKIP_DEPLOYMENT != 'true' }
            }
            steps {
                script {
                    docker.image(env.NODE_IMAGE).inside {
                        sh '''
                            set -eu

                            echo "Building shell..."
                            npx ng build shell --configuration production

                            echo "Building vixi..."
                            npx ng build vixi --configuration production

                            echo "Building portfolio..."
                            npx ng build portfolio --configuration production
                        '''
                    }
                }
            }
        }

        stage('Verify Build Artifacts') {
            when {
                expression { env.SKIP_DEPLOYMENT != 'true' }
            }
            steps {
                sh '''
                    set -eu

                    echo "Checking shell build..."
                    test -f dist/shell/browser/index.html

                    echo "Checking vixi build..."
                    test -f dist/vixi/browser/remoteEntry.json

                    echo "Checking portfolio build..."
                    test -f dist/portfolio/browser/remoteEntry.json

                    echo "All expected build artifacts exist."
                '''
            }
        }

        stage('Deploy to Firebase Hosting') {
            when {
                expression { env.SKIP_DEPLOYMENT != 'true' }
            }
            steps {
                script {
                    docker.image(env.NODE_IMAGE).inside {
                        withCredentials([
                            file(
                                credentialsId: env.FIREBASE_CREDENTIALS_ID,
                                variable: 'GOOGLE_APPLICATION_CREDENTIALS'
                            )
                        ]) {
                            sh '''
                                set -eu

                                for app in shell vixi portfolio; do
                                    echo "Deploying ${app} to Firebase Hosting..."

                                    npx --yes firebase-tools@15.28.1 deploy \
                                        --only "hosting:${app}" \
                                        --project "${FIREBASE_PROJECT}" \
                                        --non-interactive
                                done

                                echo "All Firebase deployments completed."
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Sivaxi frontend pipeline completed successfully.'
        }

        failure {
            echo 'Sivaxi frontend pipeline failed. Check the stage logs.'
        }

        always {
            echo 'Pipeline finished.'
        }
    }
}
