import { EC2Params } from "../../types/AWS";

export const getEC2Instances = async () => {
  const res = await fetch("/api/aws/ec2");
  const json = await res.json();
  return json;
};

export const createEC2Instances = async () => {
  const res = await fetch("/api/aws/ec2/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const json = await res.json();
  return json;
};

export const createWordpressEc2Params = (
  clientName: string,
  DB_ROOT_PASS: string,
  DB_WORDPRESS_PASS: string
): EC2Params & {
  clientName: string;
} => {
  return {
    clientName: clientName,
    ImageId: "ami-05bfbece1ed5beb54",
    InstanceType: "t2.micro",
    MinCount: 1,
    MaxCount: 1,
    KeyName: "kevin-root",
    SecurityGroupIds: ["sg-28cb7741"],
    TagSpecifications: [
      {
        ResourceType: "instance",
        Tags: [
          {
            Key: "client",
            Value: clientName,
          },
        ],
      },
    ],
    NetworkInterfaceId: "eni-0b1f57dd6d472ea94",
    SubnetId: "subnet-81218fe8",
    UserData: `
#!/bin/bash 
echo '####################################################'
echo SETTING UP LAMP SERVER AND WORDPRESS ON EC2 INSTANCE
echo '####################################################'
yum update -y
yum install -y httpd
amazon-linux-extras enable php7.4
yum clean metadata
yum install -y php php-{pear,cgi,common,curl,mbstring,gd,mysqlnd,gettext,bcmath,json,xml,fpm,intl,zip,imap,devel}
yum -y install gcc ImageMagick ImageMagick-devel ImageMagick-perl
pecl install imagick
chmod 755 /usr/lib64/php/modules/imagick.so
cat <<EOF >>/etc/php.d/20-imagick.ini

extension=imagick

EOF
systemctl restart php-fpm.service
sudo yum install mariadb-server -y
systemctl start httpd
sudo systemctl start mariadb.service
usermod -a -G apache ec2-user
chown -R ec2-user:apache /var/www
find /var/www -type d -exec chmod 2775 {} \;
find /var/www -type f -exec chmod 0664 {} \;
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
cp -r wordpress/* /var/www/html/
chown ec2-user:apache /var/log/mariadb/mariadb.log
chown mysql:mysql /var/log/mariadb/mariadb.log
mysql -u root -e "SET PASSWORD FOR root@'localhost' = PASSWORD('${DB_ROOT_PASS}');"
mysql -u root -p'${DB_ROOT_PASS}' -e "DELETE FROM mysql.user WHERE User='';"
mysql -u root -p'${DB_ROOT_PASS}' -e "DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');"
mysql -u root -p"${DB_ROOT_PASS}" -e "GRANT ALL PRIVILEGES ON *.* TO 'wordpress_user'@'localhost' IDENTIFIED BY '${DB_WORDPRESS_PASS}';FLUSH PRIVILEGES;"
mysql -u wordpress_user -p"${DB_WORDPRESS_PASS}" -e "CREATE DATABASE wordpress_db;"
cd /var/www/html
cp wp-config-sample.php wp-config.php
sed -i "s/database_name_here/wordpress_db/g" wp-config.php
sed -i "s/username_here/wordpress_user/g" wp-config.php
sed -i "s/password_here/${DB_WORDPRESS_PASS}/g" wp-config.php
sed -i "s/put your unique phrase here/rh_wp_${clientName}/g" wp-config.php
cat <<EOF >>/var/www/html/wp-config.php

define('FS_METHOD', 'direct');
define('WP_MEMORY_LIMIT', '256M');
define( 'WP_HOME', 'https://${clientName}.robo-house.com' );
define( 'WP_SITEURL', 'https://${clientName}.robo-house.com' );
EOF
chown -R ec2-user:apache /var/www/html
chmod -R 774 /var/www/html
sudo sed -i '/<Directory "\/var\/www\/html">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/httpd/conf/httpd.conf
systemctl enable httpd.service
sudo systemctl enable mariadb.service
systemctl restart httpd.service
echo '#############################################################'
echo FINISHED SETTING UP LAMP SERVER AND WORDPRESS ON EC2 INSTANCE
echo '#############################################################'
  `,
  };
};

// sudo yum search docker
// sudo yum info docker
// sudo yum install docker -y
// sudo yum install python3-pip -y
// sudo pip3 install docker-compose
// sudo systemctl start docker.service
// cd ~
// sudo cat <<EOF > docker-compose.yaml
//  services:
//   db:
//    image: mariadb:10.6.4-focal
//    command: '--default-authentication-plugin=mysql_native_password'
//    volumes:
//     - db_data:/var/lib/mysql
//    restart: always
//    environment:
//     - MYSQL_ROOT_PASSWORD=\${DB_ROOT_PASS}
//     - MYSQL_DATABASE=wordpress
//     - MYSQL_USER=wordpress
//     - MYSQL_PASSWORD=\${DB_WORDPRESS_PASS}
//    expose:
//     - 3306
//     - 33060
//   wordpress:
//    image: wordpress:latest
//    ports:
//     - 80:80
//    restart: always
//    environment:
//     - WORDPRESS_DB_HOST=db
//     - WORDPRESS_DB_USER=wordpress
//     - WORDPRESS_DB_PASSWORD=\${DB_WORDPRESS_PASS}
//     - WORDPRESS_DB_NAME=wordpress
//  volumes:
//   db_data:
// EOF
