sudo curl -sL https://deb.nodesource.com/setup_current.x -o nodesource_setup.sh && bash nodesource_setup.sh

#NODE INSTALLATION
sudo apt-get install nodejs -y 

#NPM INSTALLATION
sudo apt install npm -y

#GIT INSTALLATION
sudo apt install git

#NGINX INSTALLATION
sudo apt-get install nginx python3-certbot-nginx -y 

#CLONE THE APPLICATION
git clone https://github.com/kishore007015/healthami-react.git

#MOVING TO THE APPLICATION DIRECTORY
cd /root/healthami-react

#NPM PACKAGES INSTALLATION
sudo npm install

#BUILDING THE APPLICATION
sudo npm run build

#CREATING A DIRECTORY FOR DEPLOYING THE APPLICATION IN NGINX
sudo mkdir /var/www/html/react

#COPYING THE BUILD ARTIFACTS TO NGINX 
cp -r /root/healthami-react/build/* /var/www/html/react/

#SET OWNERSHIP OF THE REACT DIRECTORY
chown -R www-data:www-data /var/www/html/react

#CREATING A NGINX CONFIG FILE
touch /etc/nginx/conf.d/react.conf

#COPYING THE LOCAL CONFIG FILE TO NGINX DEFAULT CONFIG
cp -r /root/healthami-react/nginx.conf  /etc/nginx/conf.d/react.conf

#RESTART THE NGINX SERVER
systemctl reatart nginx
	
