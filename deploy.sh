#!/bin/bash
sudo apt-get update && apt-get upgrade && apt-get install curl gnupg2 gcc g++ make libssl-dev -y
sudo curl -sL https://deb.nodesource.com/setup_current.x -o nodesource_setup.sh && bash nodesource_setup.sh
sudo apt-get install nodejs -y 
sudo apt install npm -y
sudo apt install git
sudo apt-get install nginx python3-certbot-nginx -y 
sudo mkdir /var/www/html/react
git clone https://github.com/kishore007015/healthami-react.git
cd /root/healthami-react
sudo npm install
sudo npm run build
cp -r /root/healthami-react/build/* /var/www/html/react/
chown -R www-data:www-data /var/www/html/react
touch /etc/nginx/conf.d/react.conf
cp -r /root/healthami-react/nginx.conf  /etc/nginx/conf.d/react.conf
systemctl reatart nginx
