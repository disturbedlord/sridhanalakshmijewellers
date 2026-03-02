# Use the official PHP image with Apache support
FROM php:7.4-apache

# Install any necessary PHP extensions (e.g., mysqli if you're using MySQL)
RUN docker-php-ext-install mysqli

# Enable Apache mod_rewrite (for URL rewriting)
RUN a2enmod rewrite

# Set the working directory inside the container to your app directory
WORKDIR /var/www/html

# Copy your local PHP files into the container
COPY . /var/www/html/

# Expose the default Apache port (80)
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]