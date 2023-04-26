# Tabletops & Joysticks

## Overview
Tabletops and Joysticks is a web application built with Python (Flask), SQLite3, Vite (React), and JavaScript that allows users to exchange board games and video games. The site includes features such as user registration, login and logout, game posting and filtering, messaging other users, and displaying game images and descriptions.

Users can create profiles and add games they own to their inventory, and other users can view their profiles and games. Users can message other users to propose game swaps. The Game Table includes columns for game title, type, genre, number of players, image URL, and description. Users can filter games by type, genre, number of players, and other criteria.

As stretch goals, the application includes additional features such as filtering games by distance from the user, using Google Maps API to select a neutral exchange spot, incorporating user reviews, allowing users to set their willingness to travel for a swap, adding other types of games such as RPGs, creating chat rooms for users to find others to play games with, and sending email notifications when a user receives a game swap request.


## Setup / Running the Project (on Windows)
Enter you terminal (however you have set up to do so.)
    Make sure you can run 2 terminals for this. 

### Check Python version
Type: python --version
If you are running Python 3.9.2 or higher you can skip the next section

### Install the correct python. 
Navigate to the following website and follow the instructions to install Python 3 on your system
For Windows:
https://docs.python.org/3/using/windows.html
For Mac:
https://docs.python.org/3/using/mac.html
For Unix (ie: Linux):
https://docs.python.org/3/using/unix.html

### Install the Virtual Environment
In your terminal, navigate to the root directory of this project:

Python/Flask:
Type: pipenv install
(it can take a little while, so please be patient)
Type: pipenvshell to enter the virtual environment
cd into server
Run the following commands:
    export FLASK_APP=app.py
    export FLASK_RUN_PORT=5555
    flask db init
    flask db revision --autogenerate -m 'Create tables' 
    flask db upgrade 
    chmod +x seed.py (to unlock permisions)
    python seed.py (wait a moment)
        If any of these give a hiccup, you can delete the instance and migration folders and run these again.
    chmod +x app.py (to unlock permisions) 

React:
cd into client
Run the following Commands:
    npm install

Congrats, you are now configured and ready to run this program!

## Instructions:
### How to Start the program
Python/Flask:
from the server folder run:
    python app.py

React:
in a second terminal:
from the client folder run:
    npm run start
    you will be taken to http://localhost:4000
        if that doesn't load right away, your terminal will also show another option that works more consistantly. You can navigate to it manually. It will look something like this:
            http://172.17.32.198:4000 

And it begins!

### How to access the programs Functions:
Login button 
Create a Profile
Log in
Navigate the site through the Nav Bar
Enjoy


## Project Requirements
As per the Project Pitch Template:

Overall:
[ ] One piece new tech you want to explore
    React(Vite), CSS(Tailwind), Google Maps API
[ ] Well structured ReadMe

Backend:
[ ] Auth
[ ] At least one has_many_through relationships (I’ll accept one has_many_through and one has_many/belongs_to)
[ ] Seeds from a complex data set
[ ] Custom routes (can be met with auth)
[ ] Basic database query optimizations
[ ] Sockets or email integration
[ ] Validations
[ ] Deploying (optional, but encouraged) to Render (free) or Heroku ($$)

Frontend:
[ ] Auth
[ ] Interacting with a complex API
[ ] Custom CSS (eg. styled components, Tailwind/Flowbite, MUI, Bulma, Bootstrap, Semantic, Chakra, Vanilla CSS)
[ ] Deploying (optional, but encouraged) to Render (free) or Heroku ($$)


## Project Pitch/Ideas. 
Tabletops and Joysticks is a web application built with Python (Flask), SQLite3, Vite (React), and JavaScript that allows users to exchange board games and video games. The site includes features such as user registration, login and logout, game posting and filtering, messaging other users, and displaying game images and descriptions.

Users can create profiles and add games they own to their inventory, and other users can view their profiles and games. Users can message other users to propose game swaps. The Game Table includes columns for game title, type, genre, number of players, image URL, and description. Users can filter games by type, genre, number of players, and other criteria.

As stretch goals, the application includes additional features such as filtering games by distance from the user, using Google Maps API to select a neutral exchange spot, incorporating user reviews, allowing users to set their willingness to travel for a swap, adding other types of games such as RPGs, creating chat rooms for users to find others to play games with, and sending email notifications when a user receives a game swap request.

To set up the database schema, we need to identify the entities and their relationships. Based on the requirements provided, we can identify the following entities: Users, Games, Inventories, Swaps, Messages, Locations, Reviews, Chatrooms, and Chat Messages. We can represent these entities using seven tables: Users, Games, Inventories, Swaps, Messages, Locations, and Reviews. We can then create two additional tables for Chatrooms and Chat Messages to establish a many-to-many relationship.

Here's how we can set up the tables:
Users table: id (primary key), username, _password hash, email address, address.
Games table: id (primary key), title, type, genre, number of players, image URL, description.
Inventories table: id (primary key), user_id (foreign key referencing the Users table), game_id (foreign key referencing the Games table).
Swaps table: id (primary key), loaning_user_id (foreign key referencing the Users table), receiving_user_id (foreign key referencing the Users table), game_id (foreign key referencing the Games table), length_of_borrowing, swap_status.
Messages table: id (primary key), sender_id (foreign key referencing the Users table), receiver_id (foreign key referencing the Users table), message_content, timestamp.
Locations table: id (primary key), user_id (foreign key referencing the Users table), location_address, latitude, longitude.
Reviews table: id (primary key), user_id (foreign key referencing the Users table being reviewed), review_content, stars_per_review, reviewer_id (foreign key referencing the Users table).
Chatrooms table: id (primary key), chatroom_name, creating_user_id (foreign key referencing the Users table).
Chat Messages table: id (primary key), chatroom_id (foreign key referencing the Chatrooms table), sender_id (foreign key referencing the Users table), message_text.

In this schema, the Users table has a one-to-many relationship with the Inventories, Swaps, Messages, Locations, Reviews, and Chatrooms tables since a user can have multiple inventories, swaps, messages, locations, reviews, and chatrooms. The Games table also has a one-to-many relationship with the Inventories and Swaps tables since a game can belong to multiple inventories and swaps. The Swaps table also establishes a many-to-many relationship between users and games since a user can swap multiple games, and a game can be swapped by multiple users.

The Locations table allows for filtering games by distance from the user, and the Reviews table incorporates user reviews to establish trustworthiness. The Chatrooms and Chat Messages tables allow users to create and participate in chat rooms to find others to play games with.

Overall, the Tabletops and Joysticks application provides a comprehensive platform for users to exchange board games and video games with others, while incorporating useful features such as game filtering, messaging, and user reviews. The database schema efficiently stores and retrieves information for the application while maintaining data integrity and minimizing redundancy.
