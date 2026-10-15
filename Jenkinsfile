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
        DEPLOY_APPS = ''
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

                    if (!currentBranch) {
                        currentBranch = sh(
                            script: 'git branch -r --contains HEAD',
                            returnStdout: true
                        ).trim()

                        if (currentBranch.readLines().size() == 1) {
                            currentBranch = currentBranch.readLines()[0]
                                .trim()
                                .replaceFirst(/^origin\//, '')
                        }
                    }

                    if (currentBranch != 'main') {
                        echo "Skipping pipeline: '${currentBranch ?: 'unknown'}' is not main."
                        env.SKIP_PIPELINE = 'true'
                        currentBuild.result = 'NOT_BUILT'
                    } else {
                        echo 'Branch validation passed: main'
                    }
                }
            }
        }

        stage('Detect Changes') {
            when {
                expression { env.SKIP_PIPELINE != 'true' }
            }
            steps {
                script {
                    def base = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT
                    def changedFiles = []
                    boolean deployAll = false

                    if (!base ||
                        sh(
                            returnStatus: true,
                            script: "git cat-file -e '${base}^{commit}'"
                        ) != 0 ||
                        sh(
                            returnStatus: true,
                            script: "git merge-base --is-ancestor '${base}' HEAD"
                        ) != 0) {
                        // First build or unavailable comparison: deploy everything.
                        deployAll = true
                    } else {
                        def output = sh(
                            returnStdout: true,
                            script: "git diff --name-only '${base}' HEAD"
                        ).trim()

                        if (output) {
                            changedFiles = output.readLines()
                        }
                    }

                    def apps = [] as Set

                    changedFiles.each { file ->
                        if (
                            file ==~ /(?i).*\\.(md|mdx)$/ ||
                            file.startsWith('docs/') ||
                            file.startsWith('.github/') ||
                            file == 'LICENSE' ||
                            file == '.gitignore' ||
                            file == 'Jenkinsfile'
                        ) {
                            // No frontend deployment required.
                        } else if (
                            file.startsWith('projects/shared/') ||
                            file in [
                                'package.json',
                                'package-lock.json',
                                'angular.json',
                                'tsconfig.json',
                                'tsconfig.app.json',
                                'firebase.json',
                                '.firebaserc'
                            ] ||
                            file.startsWith('tsconfig.') ||
                            file.endsWith('.config.mjs')
                        ) {
                            deployAll = true
                        } else if (file.startsWith('projects/shell/')) {
                            apps.add('shell')
                        } else if (file.startsWith('projects/vixi/')) {
                            apps.add('vixi')
                        } else if (file.startsWith('projects/portfolio/')) {
                            apps.add('portfolio')
                        } else {
                            deployAll = true
                        }
                    }

                    if (deployAll) {
                        apps = ['shell', 'vixi', 'portfolio'] as Set
                    }

                    env.DEPLOY_APPS = apps.toList().sort().join(',')

                    echo "Project: ${env.PROJECT_NAME}"
                    echo "Branch: ${env.BRANCH_NAME}"
                    echo "Firebase project: ${env.FIREBASE_PROJECT}"
                    echo "Changed files: ${changedFiles}"
                    echo "Applications selected: ${env.DEPLOY_APPS ?: 'none'}"
                }
            }
        }

        stage('Install Dependencies') {
            when {
                expression {
                    env.SKIP_PIPELINE != 'true' && env.DEPLOY_APPS?.trim()
                }
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
                expression {
                    env.SKIP_PIPELINE != 'true' && env.DEPLOY_APPS?.trim()
                }
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
                expression {
                    env.SKIP_PIPELINE != 'true' && env.DEPLOY_APPS?.trim()
                }
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
                expression {
                    env.SKIP_PIPELINE != 'true' && env.DEPLOY_APPS?.trim()
                }
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