pipeline {
  agent { label 'playwright' }

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
        sh 'npm ci'
        sh 'npx playwright install chromium'
      }
    }

    stage('Run tests') {
      steps {
        sh 'npm test'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**, allure-results/**, test-results.json, test-results/**', allowEmptyArchive: true
    }
  }
}