#!/usr/bin/env python3

import datetime
from random import randint, choice as rc
from faker import Faker
from faker.providers.internet import *
from app import app
from models import db, User, Game, Inventory, Swap, Message, Review, Chat_Room, Chat_Message

fake = Faker()

with app.app_context():

    print("Deleting User data...")
    User.query.delete()
    print("Deleting Game data...")
    Game.query.delete()
    print("Deleting Inventory data...")
    Inventory.query.delete()
    print("Deleting Swap data...")
    Swap.query.delete()
    print("Deleting Message data...")
    Message.query.delete()
    print("Deleting Review data...")
    Review.query.delete()
    print("Deleting Chat_Room data...")
    Chat_Room.query.delete()
    print("Deleting Chat_Message data...")
    Chat_Message.query.delete()
    
##########################################################

    print("Creating User data...")
    new_user_1 = User(username="Admin", email="Admin@flatironschool.com", address="2228 Blake St. Denver, CO 80205", avatar_url=fake.image_url(width=200, height=200), avatar_blob="TBD", stars=3, travel_distance=5, is_active = False, admin=True)
    new_user_1.password_hash = "Admin"
    new_user_2 = User(username="Matthew", email="Matthew@flatironschool.com", address="2228 Blake St. Denver, CO 80205", avatar_url=fake.image_url(width=200, height=200), avatar_blob="TBD", stars=3, travel_distance=5, is_active = False, admin=False)
    new_user_2.password_hash = "Matthew" 
    new_user_3 = User(username="Preston", email="Preston@flatironschool.com", address="2282 Blake St. Denver, CO 80205", avatar_url=fake.image_url(width=200, height=200), avatar_blob="TBD", stars=3, travel_distance=5, is_active = False, admin=False)
    new_user_3.password_hash = "Preston"
    new_user_4 = User(username="Dylan", email="Dylan@flatironschool.com", address="2822 Blake St. Denver, CO 80205", avatar_url=fake.image_url(width=200, height=200), avatar_blob="TBD", stars=3, travel_distance=5, is_active = False, admin=False)
    new_user_4.password_hash = "Dylan"
    new_user_5 = User(username="Sarah", email="Sarah@flatironschool.com", address="8222 Blake St. Denver, CO 80205", avatar_url=fake.image_url(width=200, height=200), avatar_blob="TBD", stars=3, travel_distance=5, is_active = False, admin=False)
    new_user_5.password_hash = "Sarah"
    users = [new_user_1,new_user_2,new_user_3,new_user_4,new_user_5]
    usernames = ['Admin', 'Matthew', 'Preston', 'Dylan', 'Sarah']
    images=[fake.image_url(width=200, height=200), ""]
    for n in range(20):
        username=fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)
        password = username
        new_user = User(username=username, email=fake.email(), address=fake.address(), avatar_url=rc(images), avatar_blob="TBD", stars=3, travel_distance=5, is_active = False, admin=False)
        new_user.password_hash = password
        users.append(new_user)
    print('Adding User objects...')
    db.session.add_all(users)

##########################################################

    print("Creating Game data...")
    games = []
    types = [
        "Board Games", "Card Games", "Video Games", 
        "Tabletop Role-playing Games", "Casino Games"]
    genres = [
        "Action", "Adult", "Adventure", "Battle Royale", 
        "City-building", "Educational", "Escape Room", 
        "Fighting", "Gambling", "Horror", "Incremental/Idle", 
        "Interactive Fiction", "JRPG", "Life Simulator", "Management", 
        "MMORPG (massively multiplayer online role playing game)", 
        "MOBA (multiplayer online battle arena)", 
        "Music", "Other", "Party", "Platformer", "Puzzle", 
        "Racing", "Role-playing", "Roguelike", "Rhythm", "Sandbox", 
        "Science Fiction", "Shooter", "Simulation", "Sports", 
        "Strategy", "Survival", "Tactical", "Trading Card", 
        "Trivia", "Vehicle Simulator", "Visual Novel"]
    platforms = ["NES", "SNES", "Nintendo 64", "GameCube", "Wii",
        "Wii U", "Nintendo Switch", "GameBoy", "GameBoy Advance",
        "Nintendo DS", "Nintendo 3DS", "XBox", "XBox 360",
        "XBox One", "XBox Series X/S", "PlayStation", "PlayStation 2",
        "PlayStation 3", "PlayStation 4", "PlayStation 5", "PSP",
        "PS Vita", "Genesis", "DreamCast", "PC"]
    for n in range(100):
        game = Game(
            title=fake.sentence(),
            type=rc(types),
            genre1=rc(genres),
            genre2=rc(genres),
            platform=rc(platforms),
            player_num_min=randint(1,4),
            player_num_max=randint(5,10),
            image_url=fake.image_url(width=200, height=200),
            image_blob="nope",
            description=fake.paragraph(nb_sentences=3),
        )
        games.append(game)
    print('Adding Game objects...')
    db.session.add_all(games)

##########################################################

    print("Creating Inventory data...")
    inventories = []
    for user in users:
        for n in range(randint(1, 10)):
            inventory = Inventory(
                user=user,
                game=rc(games))
            inventories.append(inventory)
    print('Adding Inventory objects...')
    db.session.add_all(inventories)

##########################################################

    print("Creating Swap data...")
    swaps = []
    statuses = ["Pending", "In Progess", "Completed"]
    for user in users:
        for n in range(randint(1,10)):
            borrow_date=fake.date(),
            swap = Swap(
                swap_status=rc(statuses), 
                borrow_date=borrow_date,
                due_date=borrow_date + datetime.timedelta(days=7),
                game_swapped=rc(games),
                loaning_user_id=rc(users),
                borrowing_user_id=rc(users)
            )
    print('Adding Swap objects...')
    db.session.add_all(swaps)

##########################################################

    print("Creating Message data...")
    messages = []
    for user in users:
        for n in range(randint(1, 10)):
            message = Chat_Message(
                message_text=f"{fake.sentence()}",
                sender_user_id=user,
                receiver_user_id=rc(users))
            messages.append(message)
    print('Adding Message objects...')
    db.session.add_all(messages)

##########################################################

    print("Creating Review data...")
    reviews = []
    for user in users:
        for n in range(randint(1, 10)):
            review = Review(
                review_content=f"{fake.sentence()}",
                review_stars=randint(1,5),
                review_sender_user_id=user,
                review_receiver_user_id=rc(users))
            reviews.append(review)
    print('Adding Review objects...')
    db.session.add_all(reviews)

##########################################################

    print("Creating Chat_Room data...")
    chat_rooms = []
    for n in range(randint(1, 10)):
        chat_room = Chat_Room(
            chat_room_name=f"{fake.word()}",
            chat_room_creator_user_id=rc(users))
        chat_rooms.append(chat_room)

    print('Adding Chat_Room objects...')
    db.session.add_all(chat_rooms)

##########################################################

    print("Creating Chat Message data...")
    chat_messages = []
    for user in users:
        for n in range(randint(1, 10)):
            chat_message = Chat_Message(
                chat_message_text=f"{fake.sentence()}",
                chat_sender_user_id=user,
                chat_room_id=rc(chat_rooms))
            chat_messages.append(chat_message)
    print('Adding Chat Message objects...')
    db.session.add_all(chat_messages)    

##########################################################
    
    print("Just collating Data, as they say...")
    for user in users:
        review= rc(reviews)
        user.review = review
        reviews.remove(review)
        swap= rc(swaps)
        user.swap = swap
        swaps.remove(swap)

    print('Committing Seed...')
    db.session.commit()

    print("Seeding Complete!")


