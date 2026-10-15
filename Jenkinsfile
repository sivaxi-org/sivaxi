
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 45, unit: 'MINUTES')
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
                    env.DEPLOY_APPS = 'shell,vixi,portfolio'
                    echo "Applications selected: ${env.DEPLOY_APPS}"
                }
            }
        }

        stage('Install Dependencies') {
            when {
                expression { env.SKIP_PIPELINE != 'true' }
            }
            steps {
                script {
                    docker.image('node:24-bookworm').inside {
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

        stage('Build Applications') {
            when {
                expression { env.SKIP_PIPELINE != 'true' }
            }
            steps {
                script {
                    docker.image('node:24-bookworm').inside {
                        for (app in ['shell', 'vixi', 'portfolio']) {
                            echo "Building ${app}"

                            sh """
                                set -eu
                                npx ng build ${app} --configuration production
                            """
                        }
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
                    for (app in ['shell', 'vixi', 'portfolio']) {
                        echo "Verifying ${app}"

                        sh """
                            set -eu
                            test -f dist/${app}/browser/index.html

                            if [ "${app}" != "shell" ]; then
                                test -f dist/${app}/browser/remoteEntry.json
                            fi

                            echo "Verified ${app} artifacts"
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
                        docker.image('node:24-bookworm').inside {
                            for (app in ['shell', 'vixi', 'portfolio']) {
                                echo "Deploying ${app}"

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
    }

    post {
        success {
            script {
                if (env.SKIP_PIPELINE == 'true') {
                    echo 'Pipeline skipped: non-master branch.'
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
