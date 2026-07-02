#!/bin/bash
# ============================================================
# EC2 setup script — installs and runs the portfolio API.
# Runs as root (via AWS SSM or sudo). Safe to run again later:
# it pulls the newest code and restarts the service.
#
# Secrets (MONGO_URI, ADMIN_KEY) are NOT in this file.
# They are read from AWS Parameter Store at run time.
# ============================================================
set -e
export DEBIAN_FRONTEND=noninteractive

REGION="ap-southeast-1"
REPO="https://github.com/Sanlong-15/portfolio-fullstack.git"
APP_DIR="/home/ubuntu/portfolio-fullstack"

echo "--- 1. Install Node.js, git, AWS CLI ---"
apt-get update -y
apt-get install -y git nodejs npm
snap install aws-cli --classic 2>/dev/null || true

echo "--- 2. Get the code ---"
if [ ! -d "$APP_DIR" ]; then
  git clone "$REPO" "$APP_DIR"
else
  cd "$APP_DIR" && git pull
fi
cd "$APP_DIR/server"

echo "--- 3. Install dependencies ---"
npm install --omit=dev

echo "--- 4. Build .env from Parameter Store ---"
MONGO_URI=$(aws ssm get-parameter --name /portfolio/MONGO_URI --with-decryption --region "$REGION" --query Parameter.Value --output text)
ADMIN_KEY=$(aws ssm get-parameter --name /portfolio/ADMIN_KEY --with-decryption --region "$REGION" --query Parameter.Value --output text)
CLIENT_ORIGIN=$(aws ssm get-parameter --name /portfolio/CLIENT_ORIGIN --region "$REGION" --query Parameter.Value --output text 2>/dev/null || echo "http://localhost:5173")

cat > .env << ENV
PORT=5000
MONGO_URI=$MONGO_URI
ADMIN_KEY=$ADMIN_KEY
CLIENT_ORIGIN=$CLIENT_ORIGIN
ENV
chmod 600 .env
chown -R ubuntu:ubuntu "$APP_DIR"

echo "--- 5. Create the systemd service ---"
cat > /etc/systemd/system/portfolio-api.service << UNIT
[Unit]
Description=Portfolio REST API
After=network.target

[Service]
WorkingDirectory=$APP_DIR/server
ExecStart=/usr/bin/node server.js
Restart=always
User=ubuntu

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable portfolio-api
systemctl restart portfolio-api
sleep 3
systemctl --no-pager status portfolio-api || true
echo "--- Done. API should answer on port 5000 ---"
