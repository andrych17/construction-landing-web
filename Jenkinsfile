pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Deploy WWCONS to Production') {
            steps {
                // Runs on the host (PID 1 namespaces). git runs as andry, who owns /opt/wwcons; the rest lives in
                // scripts/deploy.sh so no shell code is nested inside a quoted string here.
                sh 'nsenter -t 1 -m -u -n -i bash -c "set -e; cd /opt/wwcons; runuser -u andry -- git fetch origin main; runuser -u andry -- git reset --hard origin/main; bash scripts/deploy.sh"'
            }
        }
    }
}
