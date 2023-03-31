#TO DEPLOY APPLICATION USING DOCKER WITH NGINX

#REMOVE ANY DOCKER FILES THAT ARE RUNNING IN THE SYSTEM
sudo apt-get remove docker docker-engine docker.io

#LINUX OS PACKAGES UPGRADATION
sudo apt-get update

#DOCKER INSTALLATION
sudo apt install docker.io

#You’ll then get a prompt asking you to choose between y/n - choose y

#Install All The Dependency Packages Using The Following Command
sudo snap install docker

#CLONE THE REPO FROM GIT
git clone https://github.com/kishore007015/healthami-react.git

#MAKE SURE THAT nginx.conf and dockerfile EXIST

#NAVIGATE TO THE APPLICATION DIRECTORY WHERE DOCKERFILE EXIST
cd /root/healthami-react

#BUILD THE DOCKERFILE TO CREATE A IMAGE
docker build -t IMAGE-NAME:tag .

#RUN THE IMAGE TO CREATE CONTAINER
docker run -d -p 80:80 imagename/imge-id

#TO KNOW DETAILS OF A CONTAINER
docker inspect container-id/name

#TO LIST RUNNING IMAGES
docker images

#TO LIST ALL IMAGES
docker images -a

#TO LIST RUNNING CONTAINERS
docker ps

#TO LIST ALL CONTAINERS
docker ps -a
