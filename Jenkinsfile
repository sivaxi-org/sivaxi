
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
                        error('Cannot determine branch name. This must run as a Multibranch Pipeline.')
                    }

                    if (currentBranch != 'master') {
                        echo "Skipping pipeline: '${currentBranch}' is not master."
                        env.SKIP_PIPELINE = 'true'
                        currentBuild.result = 'NOT_BUILT'
                    } else {
                        echo 'Branch validation passed: master'
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

                    // If no trustworthy comparison commit exists,
                    // perform a full deployment.
                    if (
                        !base ||
                        sh(
                            returnStatus: true,
                            script: "git cat-file -e '${base}^{commit}'"
                        ) != 0 ||
                        sh(
                            returnStatus: true,
                            script: "git merge-base --is-ancestor '${base}' HEAD"
                        ) != 0
                    ) {
                        echo 'No valid previous successful commit. Selecting all applications.'
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

                    for (rawFile in changedFiles) {
                        // Normalize paths before matching them.
                        def file = rawFile.trim().replace('\\', '/')

                        echo "Checking changed file: '${file}'"

                        if (!file) {
                            continue
                        }

                        // Shared code or build/deployment configuration
                        // can affect every application.
                        if (
                            file.startsWith('projects/shared/') ||
                            file == 'package.json' ||
                            file == 'package-lock.json' ||
                            file == 'angular.json' ||
                            file == 'tsconfig.json' ||
                            file == 'tsconfig.app.json' ||
                            file.startsWith('tsconfig.') ||
                            file.endsWith('.config.mjs') ||
                            file == 'firebase.json' ||
                            file == '.firebaserc'
                        ) {
                            echo "Shared/configuration change detected: ${file}"
                            deployAll = true
                            continue
                        }

                        // Application-specific source changes.
                        if (file.startsWith('projects/shell/')) {
                            echo "Matched application: shell (${file})"
                            apps.add('shell')
                        } else if (file.startsWith('projects/vixi/')) {
                            echo "Matched application: vixi (${file})"
                            apps.add('vixi')
                        } else if (file.startsWith('projects/portfolio/')) {
                            echo "Matched application: portfolio (${file})"
                            apps.add('portfolio')
                        } else if (
                            file == 'Jenkinsfile' ||
                            file == 'LICENSE' ||
                            file == '.gitignore' ||
                            file.startsWith('docs/') ||
                            file.startsWith('.github/') ||
                            file ==~ /(?i).*\\.(md|mdx)$/
                        ) {
                            echo "Ignoring documentation/pipeline-only change: ${file}"
                        } else {
                            // Unknown files may affect the build.
                            echo "Unclassified file; selecting all applications: ${file}"
                            deployAll = true
                        }
                    }

                    if (deployAll) {
                        apps = ['shell', 'vixi', 'portfolio'] as Set
                    }

                    env.DEPLOY_APPS = apps.toList().sort().join(',')

                    echo "Comparison base: ${base ?: 'none'}"
                    echo "Changed files: ${changedFiles}"
                    echo "Deploy all: ${deployAll}"
                    echo "Applications selected: ${env.DEPLOY_APPS ?: 'none'}"

                    if (!env.DEPLOY_APPS?.trim()) {
                        echo 'No frontend application changes detected; deployment will be skipped.'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            when {
                expression {
                    env.SKIP_PIPELINE != 'true' &&
                    env.DEPLOY_APPS?.trim()
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
                    env.SKIP_PIPELINE != 'true' &&
                    env.DEPLOY_APPS?.trim()
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
                    env.SKIP_PIPELINE != 'true' &&
                    env.DEPLOY_APPS?.trim()
                }
            }
            steps {
                script {
                    env.DEPLOY_APPS.split(',').each { app ->
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
                expression {
                    env.SKIP_PIPELINE != 'true' &&
                    env.DEPLOY_APPS?.trim()
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
