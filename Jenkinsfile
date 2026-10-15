
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
        SKIP_PIPELINE = 'false'
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
                    def currentBranch = env.BRANCH_NAME?.trim()

                    if (currentBranch != 'master') {
                        echo "Skipping pipeline: '${currentBranch ?: 'unknown'}' is not master."
                        env.SKIP_PIPELINE = 'true'
                        currentBuild.result = 'NOT_BUILT'
                    } else {
                        echo 'Branch validation passed: master'
                    }
                }
            }
        }

        stage('Select Applications') {
            when {
                expression { env.SKIP_PIPELINE != 'true' }
            }
            steps {
                script {
                    // Every master build deploys all three applications.
                    env.DEPLOY_APPS = 'shell,vixi,portfolio'

                    echo 'Full deployment mode enabled.'
                    echo "Applications selected: ${env.DEPLOY_APPS}"
                }
            }
        }

        stage('Install Dependencies') {
            when {
                expression { env.SKIP_PIPELINE != 'true' }
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
                expression { env.SKIP_PIPELINE != 'true' }
            }
            steps {
                script {
                    def apps = ['shell', 'vixi', 'portfolio']

                    for (app in apps) {
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
                expression { env.SKIP_PIPELINE != 'true' }
            }
            steps {
                script {
                    def apps = ['shell', 'vixi', 'portfolio']

                    for (app in apps) {
                        echo "Verifying ${app} artifacts"

                        sh """
                            set -eu

                            test -f dist/${app}/browser/index.html

                            if [ "${app}" != "shell" ]; then
                                test -f dist/${app}/browser/remoteEntry.json
                            fi

                            echo "Verified ${app} build artifacts"
                        """
                    }
                }
            }
        }

        stage('Deploy to Firebase Hosting') {
            when {
                expression { env.SKIP_PIPELINE != 'true' }
            }
            steps {
                withCredentials([
                    file(
                        credentialsId: env.FIREBASE_CREDENTIALS_ID,
                        variable: 'GOOGLE_APPLICATION_CREDENTIALS'
                    )
                ]) {
                    script {
                        def apps = ['shell', 'vixi', 'portfolio']

                        for (app in apps) {
                            echo "Deploying ${app} to Firebase project ${env.FIREBASE_PROJECT}"

                            sh """
                                set -eu
                                export CI=true

                                npx --yes firebase-tools@${FIREBASE_TOOLS_VERSION} deploy --only hosting:${app} --project ${FIREBASE_PROJECT} --non-interactive
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                if (env.SKIP_PIPELINE == 'true') {
                    echo 'Pipeline skipped because this is not master.'
                } else {
                    echo 'Sivaxi Frontend pipeline completed successfully.'
                    echo 'Applications processed: shell, vixi, portfolio'
                }
            }
        }

        failure {
            echo 'Sivaxi Frontend pipeline failed. Check the stage logs.'
        }

        always {
            echo 'Pipeline finished.'
        }
    }
}
