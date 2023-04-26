#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from faker.providers.internet import *
from app import app
from models import db, User, Classname

fake = Faker()

with app.app_context():

    print("Deleting Classname(User) data...")
    User.query.delete()

##########################################################

    print("Creating Classname(User) data...")
    new_user_1 = User(username="Admin", email="Admin@flatironschool.com", address="2228 Blake St. Denver, CO 80205", admin=True)
    new_user_1.password_hash = "Admin"
    new_user_2 = User(username="Matthew", email="Matthew@flatironschool.com", address="2228 Blake St. Denver, CO 80205", admin=False)
    new_user_2.password_hash = "Matthew" 
    new_user_3 = User(username="Preston", email="Preston@flatironschool.com", address="2282 Blake St. Denver, CO 80205", admin=False)
    new_user_3.password_hash = "Preston"
    new_user_4 = User(username="Dylan", email="Dylan@flatironschool.com", address="2822 Blake St. Denver, CO 80205", admin=False)
    new_user_4.password_hash = "Dylan"
    new_user_5 = User(username="Sarah", email="Sarah@flatironschool.com", address="8222 Blake St. Denver, CO 80205", admin=False)
    new_user_5.password_hash = "Sarah"
    users = [new_user_1,new_user_2,new_user_3,new_user_4,new_user_5]
    usernames = ['Admin', 'Matthew', 'Preston', 'Dylan', 'Sarah']
    for n in range(20):
        username=fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)
        password = username
        new_user = User(username=username, email=fake.email(), address=fake.address(), admin=False)
        new_user.password_hash = password
        users.append(new_user)
    print('Adding User objects...')
    db.session.add_all(users)


    
    



