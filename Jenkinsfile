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
            sh 'npm install'
          } else {
            bat 'npm ci'
            bat 'npm install'
          }
        }
      }
    }
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
            sh 'npx playwright test --list'
          } else {
            bat 'npx playwright test --list'
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
      // Publish Playwright HTML report
        publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                useWrapperFileDirectly: true
            ])
      // Generate the Allure Report targeting the results directory
            allure includeProperties: false, 
                   jdk: '', 
                   results: [[path: 'allure-results']]
    }
  }
}