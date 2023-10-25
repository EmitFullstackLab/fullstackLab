# fullstackLab

make .env file in node-app folder with this setup:
MYSQL_HOST=localhost
MYSQL_DATABASE=name_of_database
MYSQL_PORT=port_for_mysql
MYSQL_USER=your_user_name
MYSQL_PASSWORD=your_password

make dbenv.env file in main folder with variables for docker file:
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=lab-your_db_name

to run the containers:
go to path of the main folder on command line
command: docker-compose up --build
the site will be visible on localhost:5000
