# Tabletops & Joysticks

## Overview
Tabletops and Joysticks is a web application built with Python (Flask), SQLite3, Vite (React), and JavaScript that allows users to exchange board games and video games. The site includes features such as user registration, login and logout, game posting and filtering, messaging other users, and displaying game images and descriptions.

Users can create profiles and add games they own to their inventory, and other users can view their profiles and games. Users can message other users to propose game swaps. The Game Table includes columns for game title, type, genre, number of players, image URL, and description. Users can filter games by type, genre, number of players, and other criteria.

As stretch goals, the application will someday include additional features such as filtering games by distance from the user, using Google Maps API to select a neutral exchange spot, incorporating user reviews, allowing users to set their willingness to travel for a swap, adding other types of games such as RPGs, creating chat rooms for users to find others to play games with, and sending email notifications when a user receives a game swap request.


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
    npm run dev
    you will be taken to http://localhost:3000
        if that doesn't load right away, try: 
        npm run dev -- --host
            your terminal will also show another option that works more consistantly. You can navigate to it manually. It will look something like this:
            http://172.17.32.198:3000 

And it begins!

### How to access the programs Functions:
Click the Icon in the middle to go to the login screen.
Create a Profile, or log in if you already have one. 
Navigate the site through the Nav Bar, or enter your profile with the Icon to the upper right.
Look at Games and Users, and add some to your profile. Send another user a message...

Enjoy

## Project Requirements
As per the Project Pitch Template:

Overall:
[ DONE! ] One piece new tech you want to explore
        React(Vite)-Yes, CSS(Tailwind)-Yes, Google Maps API-No(maybe later)
[ DONE! ] Well structured ReadMe
        You reading it now.

Backend:
[ DONE! ] Auth
        Login, Signup, CheckSession, LogOut, Encryptions, etc.... 
[ DONE! ] At least one has_many_through relationships 
    (I’ll accept one has_many_through and one has_many/belongs_to)
        Many to Many for Users to other Users in Messages
        Many to Many for Users & Games through both Inventories, and Swaps
[ DONE! ] Seeds from a complex data set
        My seed file is quite... involved and flesshed out
[ DONE! ] Custom routes (can be met with auth)
        Auth Routes, UserNew, UserList, UserDetails, GameNew, GameList, GameDetails
[ DONE! ] Basic database query optimizations
        Full CRUD through Fetches to the sources set up by my app.py and models.py
[ ] Sockets or email integration
[ DONE! ] Validations
        All 8 of my Tables have several validations and constraints. Not even counting Auth.
[ ] Deploying (optional, but encouraged) to Render (free) or Heroku ($$)

Frontend:
[ DONE! ] Auth
        Login, Logout, CheckSession, Signup are all accessed from the front end, and restricts unauthorized users. 
[ ] Interacting with a complex API
[ DONE! ] Custom CSS (eg. styled components, Tailwind/Flowbite, MUI, Bulma, Bootstrap, Semantic, Chakra, Vanilla CSS)
        Tailwind... 
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


### Seeded Games (so far)

"7 Wonders", "7 Wonders Duel", "Agricola", "Arkham Horror: The Card Game", "Azul", "Bandido", "Betrayal at Baldur's Gate", "Betrayal at House on the Hill", "Betrayal Legacy", "Blood Rage", "Blokus", "Boss Monster: The Dungeon Building Card Game", "Burgle Bros.", "Carcassonne", "Captain Sonar", "Catan: Starfarers", "Cards Against Humanity", "Century: Spice Road", "Clank!", "Clank! In! Space!", "Codenames", "Codenames Duet", "Concept", "Coup", "Coup: Rebellion G54", "Dead Man's Cabal", "Dead of Winter", "Deadwood 1876", "Diamant", "Dixit", "Dobble/Spot It!", "Dominant Species", "Dominion", "Dominion: Intrigue", "Don't Mess with Cthulhu", "Dungeons & Dragons", "Dungeons & Dragons: The Legend of Drizzt", "Escape Room: The Game", "Escape Room: The Game 2", "Exploding Kittens", "Forbidden Desert", "Forbidden Island", "Forbidden Sky", "Fury of Dracula", "Ganz schön clever/That's Pretty Clever", "Gizmos", "Gloom", "Gloomhaven", "Gloomhaven: Forgotten Circles", "Gloomhaven: Jaws of the Lion", "Gwent: The Witcher Card Game", "Hanabi", "Hanamikoji", "Hive", "Ingenious", "Jaipur", "K2", "Kanagawa", "King of Tokyo", "Kingdom Builder", "Kingdomino", "Lords of Waterdeep", "Love Letter", "Lovecraft Letter", "Machi Koro", "Machi Koro: Bright Lights, Big City", "Magic Maze", "Magic: The Gathering Arena", "Mint Works", "Monopoly", "Munchkin", "Mysterium", "Onirim", "Onitama", "One Night Ultimate Werewolf", "Pandemic", "Pandemic Legacy: Season 1", "Pandemic Legacy: Season 2", "Pandemic: Reign of Cthulhu", "Photosynthesis", "Quacks of Quedlinburg, The", "Race for the Galaxy", "Red Dead Redemption 2", "Risk", "Root", "Sagrada", "Santorini", "Scrabble", "Scythe", "Secret Hitler", "Settlers of Catan", "Sheriff of Nottingham", "Sims 4", "Specter Ops", "Splendor", "Spirit Island", "Spyfall", "Super Smash Bros. Ultimate", "Sushi Go!", "T.I.M.E Stories", "Tales of the Arabian Nights", "Talisman", "Takenoko", "Terra Mystica", "Terraforming Mars", "Terraforming Mars: Ares Expedition", "The Castles of Burgundy", "The Crew: The Quest for Planet Nine", "The Mind", "The Resistance", "The Resistance: Avalon", "Through the Ages", "Ticket to Ride", "Ticket to Ride: Asia", "Ticket to Ride: Europe", "Ticket to Ride: London", "Ticket to Ride: New York", "Ticket to Ride: Nordic Countries", "Ticket to Ride: Rails and Sails", "Time's Up!", "Tiny Epic Galaxies", "Tokaido", "Twilight Imperium", "Twilight Struggle", "Tzolk'in: The Mayan Calendar", "Ultimate Werewolf", "Unstable Unicorns", "Valley of the Kings", "Villages of Valeria", "Viticulture", "Wavelength", "Wingspan", "Werewolf", "Werewolf: The Apocalypse - Heart of the Forest", "Wingspan", "Zombie Dice"
