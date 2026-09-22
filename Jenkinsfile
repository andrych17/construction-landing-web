pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Deploy WWCONS to Production') {
            steps {
                sh '''
                    echo "===> Deploying WWCONS to Production Server (/opt/wwcons)..."
                    nsenter -t 1 -m -u -n -i bash -c "
                        set -e
                        mkdir -p /opt/wwcons /var/www/storage/wwcons
                        cd /opt/wwcons
                        if [ ! -d .git ]; then
                            git init
                            git remote add origin https://github.com/andrych17/construction-landing-web.git
                        fi
                        git fetch origin main
                        git reset --hard origin/main

                        # Pastikan permission folder storage file server wwcons
                        chown -R andry:andry /var/www/storage/wwcons
                        chmod -R 775 /var/www/storage/wwcons

                        # Copy .env jika belum ada
                        if [ ! -f .env ]; then
                            cp .env.production.example .env
                        fi

                        # Jalankan migrasi database ke qualiv_postgres
                        for f in prisma/migrations/*/migration.sql; do
                            if [ -f "$f" ]; then
                                docker exec -i qualiv_postgres psql -U qualiv -d wwcons_db < "$f" 2>/dev/null || true
                            fi
                        done

                        # Build dan restart container Next.js
                        docker compose up -d --build --remove-orphans
                    "
                    echo "===> WWCONS Deployment completed successfully!"
                '''
            }
        }
    }
}
