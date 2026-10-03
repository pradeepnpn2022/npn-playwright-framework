pipeline {
  agent any

  environment {
    CI = 'true'
  }

  options {
    timestamps()
    timeout(time: 45, unit: 'MINUTES')
  }

  stages {
    stage('Install dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm ci'
            sh 'npx playwright install'
          } else {
            bat 'npm ci'
            bat 'npx playwright install'
          }
        }
      }
    }

    stage('List all the tests') {
      steps {
        script {
          if (isUnix()) {
            sh 'npx playwright test --list & npm install -g allure'
          } else {
            bat 'npx playwright test --list & npm install -g allure'
          }
        }
      }
    }

    stage('Run tests') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm test'
          } else {
            bat 'npm test'
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**, allure-results/**, test-results.json, test-results/**', allowEmptyArchive: true
      allure commandline: 'Allure 3', includeProperties: false, jdk: '', resultPolicy: 'LEAVE_AS_IS', results: [[path: 'allure-results']]
    }
  }
}