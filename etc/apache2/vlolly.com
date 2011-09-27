<VirtualHost *:80>

    ServerName vlolly.com
    ServerAdmin webmaster@theteam.co.uk
  
    LogLevel warn
    ErrorLog /var/log/apache2/vlolly.com.error.log
    CustomLog /var/log/apache2/vlolly.com.access.log combined
    LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i \" \"%{Cookie}i\""

    <Directory /var/www/vlolly.com>
        Order deny,allow
        Allow from all
    </Directory>
    
    DocumentRoot /var/www/vlolly.com/
    
    Alias /static /var/www/vlolly.com/static
    <Location "/static">
        SetHandler None
    </Location>

</VirtualHost>