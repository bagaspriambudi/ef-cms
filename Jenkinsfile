#!/bin/bash groovy

pipeline {

  agent any

  options {
    buildDiscarder(logRotator(daysToKeepStr: '3', artifactDaysToKeepStr: '3'))
    disableConcurrentBuilds()
  }

  stages {
    stage('Setup') {
      steps {
        script {
          setup()
        }
      }
    }
    stage('Init') {
      steps {
        script {
          sh "./docker-init.sh"
        }
      }
    }
    stage('Components') {
      parallel {
        stage('Shared') {
          when {
            expression {
              return checkCommit('shared')
            }
          }
          steps {
            build job: 'ef-cms-shared', parameters: [
              [$class: 'StringParameterValue', name: 'sha1', value: "${GIT_COMMIT}"],
              [$class: 'StringParameterValue', name: 'target_sha1', value: "${env.CHANGE_TARGET}"],
              [$class: 'StringParameterValue', name: 'branch_name', value: "${env.BRANCH_NAME}"]
            ]
          }
        }
        stage('Web-Client') {
          when {
            expression {
              return checkCommit('web-client')
            }
          }
          steps {
            build job: 'ef-cms-ui', parameters: [
              [$class: 'StringParameterValue', name: 'sha1', value: "${GIT_COMMIT}"],
              [$class: 'StringParameterValue', name: 'target_sha1', value: "${env.CHANGE_TARGET}"],
              [$class: 'StringParameterValue', name: 'branch_name', value: "${env.BRANCH_NAME}"]
            ]
          }
        }
        stage('Efcms-Service') {
          when {
            expression {
              return checkCommit('efcms-service')
            }
          }
          steps {
            build job: 'ef-cms-api', parameters: [
              [$class: 'StringParameterValue', name: 'sha1', value: "${GIT_COMMIT}"],
              [$class: 'StringParameterValue', name: 'target_sha1', value: "${env.CHANGE_TARGET}"],
              [$class: 'StringParameterValue', name: 'branch_name', value: "${env.BRANCH_NAME}"]
            ]
          }
        }
      }
    }
    stage('Testing') {
      parallel {
        stage('Pa11y') {
          agent any
          steps {
            sh "./docker-pa11y.sh"
          }
        }
        stage('Cerebral Tests') {
          agent any
          steps {
            sh "./docker-cerebral.sh"
          }
        }
        stage('Cypress') {
          agent any
          steps {
            sh "CONTAINER_NAME=ui-cypress-${BUILD_NUMBER}-${GIT_COMMIT} ./docker-cypress.sh"
          }
          post {
            always {
              archiveArtifacts(artifacts: 'cypress/**/*.mp4', allowEmptyArchive: true)
              archiveArtifacts(artifacts: 'cypress/**/*.png', allowEmptyArchive: true)
            }
          }
        }
      }
    }
    stage('Deploy') {
      parallel {
        stage('efcms-service') {
          when {
            expression {
              shouldDeploy(env.BRANCH_NAME)
            }
          }
          steps {
            build job: 'ef-cms-api-deploy', parameters: [
              [$class: 'StringParameterValue', name: 'sha1', value: "${GIT_COMMIT}"],
              [$class: 'StringParameterValue', name: 'target_sha1', value: "${env.CHANGE_TARGET}"],
              [$class: 'StringParameterValue', name: 'branch_name', value: "${env.BRANCH_NAME}"]
            ]
          }
        }
        stage('web-client') {
          when {
            expression {
              shouldDeploy(env.BRANCH_NAME)
            }
          }
          steps {
            build job: 'ef-cms-ui-deploy', parameters: [
              [$class: 'StringParameterValue', name: 'sha1', value: "${GIT_COMMIT}"],
              [$class: 'StringParameterValue', name: 'target_sha1', value: "${env.CHANGE_TARGET}"],
              [$class: 'StringParameterValue', name: 'branch_name', value: "${env.BRANCH_NAME}"]
            ]
          }
        }
      }
    }
  }
  post {
    always {
      deleteDir()
    }
  }
}

def shouldDeploy(branchName) {
  ['develop', 'staging', 'master'].contains(branchName) == true
}


def checkCommit(folder) {
  if (env.CHANGE_TARGET) {
    def matches = sh(returnStatus:true, script: "git diff --name-only origin/${env.CHANGE_TARGET} | grep '^${folder}'")
    return !matches
  } else if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'staging' || env.BRANCH_NAME == 'master') {
    return true
  }
}

def setup() {
  def scmVars = checkout scm
  env.GIT_PREVIOUS_SUCCESSFUL_COMMIT = scmVars.GIT_PREVIOUS_SUCCESSFUL_COMMIT
  env.GIT_COMMIT = scmVars.GIT_COMMIT
}

def merge() {
  if (env.BRANCH_NAME != 'develop' && env.BRANCH_NAME != 'staging' && env.BRANCH_NAME != 'master' && env.CHANGE_TARGET) {
    sh 'git config user.name "EF-CMS Jenkins"'
    sh 'git config user.email "noop@example.com"'
    sh "git merge origin/${env.CHANGE_TARGET}"
  }
}