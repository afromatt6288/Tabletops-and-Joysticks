#!/usr/bin/env python3

import os 
from flask import jsonify, make_response, request, session, g, current_app, redirect, abort
from flask_restful import Resource
import json
from sqlalchemy.exc import IntegrityError
from config import app,db,api
from models import User, Game, Inventory, Swap, Message, Review, Chat_Room, Chat_Message
from flask_cors import CORS
CORS(app)

    ###########################################
    ##                Home API               ##
    ###########################################

class Home(Resource):
    def get(self):
        andez_dict = '''
            <h1>"message": "Welcome to the Tabletops & Joysticks RESTful API"</h1>
        '''
        response = make_response(andez_dict, 200)
        return response
api.add_resource(Home, '/')

    ###########################################
    ##            Logging in/Out             ##
    ##   Session, Authenticating, Password   ##
    ###########################################

# @app.before_request
# def check_if_logged_in():
#     access_list = ['clear', 'signup', 'check_session', 'login', ]
#     if (request.endpoint) not in access_list and (not session.get('user_id')):   
#         return {'error': 'Unauthorized'}, 401

class ClearSession(Resource):                   ## DEV Only. Don't want users to be able to clear their cookies. 
    def delete(self):    
        session['user_cart'] = None
        session['user_id'] = None
        return {}, 204
api.add_resource(ClearSession, '/clear', endpoint='clear')  

class Signup(Resource):
    def post(self):
        username = request.get_json()['username']  
        password = request.get_json()['password']
        email = request.get_json()['email']
        address = request.get_json()['address']
        avatar_url = request.get_json()['avatar_url']
        # avatar_blob = request.get_json()['avatar_blob']
        if username and password:
            new_user = User(username=username, email=email, address=address, avatar_url=avatar_url, 
                # avatar_blob=avatar_blob, 
                stars=3, travel_distance=5, is_active = False, is_admin = False)
            new_user.password_hash = password
            try:
                db.session.add(new_user)
                db.session.commit()
                session['user_id'] = new_user.id
                return new_user.to_dict(), 201
            except IntegrityError:
                return {'error': '422 Unprocessable Entity'}, 422
        return {'error': '422 Unprocessable Entity'}, 422
api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):
    def get(self):
        print("app.py Line 64 - CheckSession")
        print(session)
        if session.get('user_id'):
            print(session['user_id'])
            user = User.query.filter(User.id == session.get('user_id')).first()
            return user.to_dict(), 200 
        return {'message': '401 Unauthorized'}, 401 
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200 
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    def delete(self):                           ## Different from Deleting a User. 
        if session.get('user_id'):
            session['user_id'] = None
            return {'message': '204: No Content'}, 204
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Logout, '/logout', endpoint='logout')

    ###########################################
    ##        GET, POST, PATCH, DELETE       ##
    ###########################################

##########
## USER ##
##########

class Users(Resource):          
    def get(self):                              ## DEV Only. Don't want Users to be able to look up all other users
        user_dict_list = []
        for user in User.query.all(): 
            user_dict_list.append(user.to_dict())
        if user_dict_list != []:
            response = make_response(jsonify(user_dict_list), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query User data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):                             ## DEV Only. Users will use the Signup above for these functions
        data=request.get_json()
        try:                                            
            new_user = User(
                username=data['username'], 
                email=data['email'],
                address=data['address'], 
                avatar_url = data['avatar_url'],
                # avatar_blob = data['avatar_blob'],
                stars=3,
                travel_distance=5,
                is_active = False,
                is_admin = False,
                ) 
            new_user.password_hash = data['password'],
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        user_dict = new_user.to_dict()
        response = make_response(jsonify(user_dict), 201) 
        return response 
    
api.add_resource(Users, '/users', endpoint='user')

class UserById(Resource):                       ## For Users to see profiles
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            user_dict = user.to_dict()
            response = make_response(jsonify(user_dict, 200))
            return response
        return make_response(jsonify({"error": "User Record not found"}), 404)

    def patch(self, id):                        ## For Updating email, address, travel_distance, is_active, is_admin, and stars (when people give reviews)
        user = User.query.filter(User.id == id).first()
        if user:
            data=request.get_json() 
            try:                                        
                for attr in data:
                    setattr(user, attr, data[attr]) 
                db.session.add(user) 
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            user_dict = user.to_dict()
            response = make_response(jsonify(user_dict), 201)
            return response 
        return make_response(jsonify({"error": "User Record not found"}), 404)

    def delete(self, id):                       ## To Delete a User (not just Logging them Out) [as well as any Transactions that relies on that user]  
        user = User.query.filter(User.id == id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            user_dict = {"message": "User Record successfully deleted"}
            return make_response(user_dict, 200)
        return make_response(jsonify({"error": "User Record not found"}), 404)

api.add_resource(UserById, '/users/<int:id>', endpoint='userbyid')

##########
## GAME ##
##########

class Games(Resource):
    def get(self):
        game_dict = []
        for game in Game.query.all():
            game_dict.append(game.to_dict())
        if game_dict != []:
            response = make_response(jsonify(game_dict), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query Game data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):
        data=request.get_json() 
        try:                                            
            new_game = Game(
                title=data['title'], 
                type=data['type'], 
                genre1=data['genre1'],
                genre2=data['genre2'],
                platform=data['platform'],
                player_num_min=data['player_num_min'],
                player_num_max=data['player_num_max'],
                image_url=data['image_url'],
                image_blob=data['image_blob'],
                description=data['description'], 
                )
            db.session.add(new_game)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        game_dict = new_game.to_dict()
        response = make_response(jsonify(game_dict), 201) 
        return response 

api.add_resource(Games, '/games', endpoint='game')

class GamesById(Resource):
    def get(self, id): 
        game = Game.query.filter(Game.id == id).first()
        if game:
            game_dict = game.to_dict()
            response = make_response(jsonify(game_dict, 200))
            return response
        return make_response(jsonify({"error": "Game Record not found"}), 404)

    def patch(self, id):
        game = Game.query.filter(Game.id == id).first()
        if game:
            data=request.get_json() 
            try:                                        
                for attr in data: 
                    setattr(game, attr, data[attr])
                db.session.add(game) 
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            game_dict = game.to_dict()
            response = make_response(jsonify(game_dict), 201)
            return response 
        return make_response(jsonify({"error": "Game Record not found"}), 404)

    def delete(self, id):
        game = Game.query.filter(Game.id == id).first()
        if game:
            db.session.delete(game)
            db.session.commit()
            game_dict = {"message": "Game Record successfully deleted"}
            return make_response(game_dict, 200)
        return make_response(jsonify({"error": "Game Record not found"}), 404)

api.add_resource(GamesById, '/games/<int:id>', endpoint='gamebyid')

###############
## INVENTORY ##
###############

class Inventories(Resource):
    def get(self):
        inventory_dict = []
        for inventory in Inventory.query.all():
            inventory_dict.append(inventory.to_dict())
        if inventory_dict != []:
            response = make_response(jsonify(inventory_dict), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query Inventory data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):
        data=request.get_json()
        try:                                            
            new_inventory = Inventory(
                user_id=int(data['user_id']),
                game_id=int(data['game_id']),
                )
            db.session.add(new_inventory)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        inventory_dict = new_inventory.to_dict()
        response = make_response(jsonify(inventory_dict), 201) 
        return response 

api.add_resource(Inventories, '/inventories', endpoint='inventory')

class InventoryById(Resource):
    def get(self, id):
        inventory = Inventory.query.filter(Inventory.id == id).first()
        if inventory:
            inventory_dict = inventory.to_dict()
            response = make_response(jsonify(inventory_dict, 200))
            return response
        return make_response(jsonify({"error": "Inventory Record not found"}), 404)

    def patch(self, id):
        inventory = Inventory.query.filter(Inventory.id == id).first()
        if inventory:
            data=request.get_json() 
            try:                                        
                for attr in data:
                    setattr(inventory, attr, data[attr])
                db.session.add(inventory)
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            inventory_dict = inventory.to_dict()
            response = make_response(jsonify(inventory_dict), 201)
            return response 
        return make_response(jsonify({"error": "Inventory Record not found"}), 404)

    def delete(self, id):
        inventory = Inventory.query.filter(Inventory.id == id).first()
        if inventory:
            db.session.delete(inventory)
            db.session.commit()
            inventory_dict = {"message": "Inventory Record successfully deleted"}
            return make_response(inventory_dict, 200)
        return make_response(jsonify({"error": "Inventory Record not found"}), 404)

api.add_resource(InventoryById, '/inventories/<int:id>', endpoint='inventorybyid')

##########
## SWAP ##
##########

class Swaps(Resource):
    def get(self):
        swap_dict = []
        for swap in Swap.query.all():
            swap_dict.append(swap.to_dict())
        if swap_dict != []:
            response = make_response(jsonify(swap_dict), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query Swap data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):
        data=request.get_json()
        try:                                            
            new_swap = Swap(
                swap_status=data['swap_status'],
                borrow_date=data['borrow_date'],
                due_date=data['due_date'],
                game_swapped_id=int(data['game_swapped_id']),
                loaning_user_id=int(data['loaning_user_id']),
                borrowing_user_id=int(data['borrowing_user_id']),
                )
            db.session.add(new_swap)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        swap_dict = new_swap.to_dict()
        response = make_response(jsonify(swap_dict), 201) 
        return response 

api.add_resource(Swaps, '/swaps', endpoint='swap')

class SwapById(Resource):
    def get(self, id):
        swap = Swap.query.filter(Swap.id == id).first()
        if swap:
            swap_dict = swap.to_dict()
            response = make_response(jsonify(swap_dict, 200))
            return response
        return make_response(jsonify({"error": "Swap Record not found"}), 404)

    def patch(self, id):
        swap = Swap.query.filter(Swap.id == id).first()
        if swap:
            data=request.get_json()
            try:                                        
                for attr in data:
                    setattr(swap, attr, data[attr])
                db.session.add(swap)
                db.session.commit()
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            swap_dict = swap.to_dict()
            response = make_response(jsonify(swap_dict), 201)
            return response 
        return make_response(jsonify({"error": "Swap Record not found"}), 404)

    def delete(self, id):
        swap = Swap.query.filter(Swap.id == id).first()
        if swap:
            db.session.delete(swap)
            db.session.commit()
            swap_dict = {"message": "Swap Record successfully deleted"}
            return make_response(swap_dict, 200)
        return make_response(jsonify({"error": "Swap Record not found"}), 404)

api.add_resource(SwapById, '/swaps/<int:id>', endpoint='swapbyid')

##############
## MESSAGE  ##
##############

class Messages(Resource):
    def get(self):
        message_dict = []
        for message in Message.query.all():
            message_dict.append(message.to_dict())
        if message_dict != []:
            response = make_response(jsonify(message_dict), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query Message data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):
        data=request.get_json()
        try:                                            
            new_message = Message(
                message_text=data['message_text'],
                sender_user_id=int(data['sender_user_id']),
                receiver_user_id=int(data['receiver_user_id']),
                )
            db.session.add(new_message)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        message_dict = new_message.to_dict()
        response = make_response(jsonify(message_dict), 201) 
        return response 

api.add_resource(Messages, '/messages', endpoint='message')

class MessageById(Resource):
    def get(self, id):
        message = Message.query.filter(Message.id == id).first()
        if message:
            message_dict = message.to_dict()
            response = make_response(jsonify(message_dict, 200))
            return response
        return make_response(jsonify({"error": "Message Record not found"}), 404)

    def patch(self, id):
        message = Message.query.filter(Message.id == id).first()
        if message:
            data=request.get_json()
            try:                                        
                for attr in data:
                    setattr(message, attr, data[attr])
                db.session.add(message)
                db.session.commit()
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            message_dict = message.to_dict()
            response = make_response(jsonify(message_dict), 201)
            return response 
        return make_response(jsonify({"error": "Message Record not found"}), 404)

    def delete(self, id):
        message = Message.query.filter(Message.id == id).first()
        if message:
            db.session.delete(message)
            db.session.commit()
            message_dict = {"message": "Message Record successfully deleted"}
            return make_response(message_dict, 200)
        return make_response(jsonify({"error": "Message Record not found"}), 404)

api.add_resource(MessageById, '/messages/<int:id>', endpoint='messagebyid')

############
## REVIEW ##
############

class Reviews(Resource):
    def get(self):
        review_dict = []
        for review in Review.query.all():
            review_dict.append(review.to_dict())
        if review_dict != []:
            response = make_response(jsonify(review_dict), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query Review data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self): 
        data=request.get_json() 
        try:                                            
            new_review = Review(
                review_content=data['review_content'], 
                review_stars=int(data['review_stars']), 
                review_sender_user_id=int(data['review_sender_user_id']),
                review_receiver_user_id=int(data['review_receiver_user_id']),
                )
            db.session.add(new_review)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        review_dict = new_review.to_dict()
        response = make_response(jsonify(review_dict), 201) 
        return response 

api.add_resource(Reviews, '/reviews', endpoint='review')

class ReviewById(Resource):
    def get(self, id): 
        review = Review.query.filter(Review.id == id).first()
        if review:
            review_dict = review.to_dict()
            response = make_response(jsonify(review_dict, 200))
            return response
        return make_response(jsonify({"error": "Review Record not found"}), 404)

    def patch(self, id):
        review = Review.query.filter(Review.id == id).first()
        if review:
            data=request.get_json() 
            try:                                        
                for attr in data: 
                    setattr(review, attr, data[attr])
                db.session.add(review) 
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            review_dict = review.to_dict()
            response = make_response(jsonify(review_dict), 201)
            return response 
        return make_response(jsonify({"error": "Review Record not found"}), 404)

    def delete(self, id): 
        review = Review.query.filter(Review.id == id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            review_dict = {"message": "Review Record successfully deleted"}
            return make_response(review_dict, 200)
        return make_response(jsonify({"error": "Review Record not found"}), 404)

api.add_resource(ReviewById, '/reviews/<int:id>', endpoint='reviewbyid')

###############
## Chat_Room ##
###############

class Chat_Rooms(Resource):
    def get(self):
        chat_room_dict = []
        for chat_room in Chat_Room.query.all():
            chat_room_dict.append(chat_room.to_dict())
        if chat_room_dict != []:
            response = make_response(jsonify(chat_room_dict), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query Chat Room data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):
        data=request.get_json()
        try:                                            
            new_chat_room = Chat_Room(
                chat_room_name=data['chat_room_name'],
                chat_room_creator_user_id=int(data['chat_room_creator_user_id']),
                )
            db.session.add(new_chat_room)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        chat_room_dict = new_chat_room.to_dict()
        response = make_response(jsonify(chat_room_dict), 201) 
        return response 

api.add_resource(Chat_Rooms, '/chat_rooms', endpoint='chat_room')

class Chat_RoomById(Resource):
    def get(self, id):
        chat_room = Chat_Room.query.filter(Chat_Room.id == id).first()
        if chat_room:
            chat_room_dict = chat_room.to_dict()
            response = make_response(jsonify(chat_room_dict, 200))
            return response
        return make_response(jsonify({"error": "Chat Room Record not found"}), 404)

    def patch(self, id):
        chat_room = Chat_Room.query.filter(Chat_Room.id == id).first()
        if chat_room:
            data=request.get_json()
            try:                                        
                for attr in data:
                    setattr(chat_room, attr, data[attr])
                db.session.add(chat_room)
                db.session.commit()
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            chat_room_dict = chat_room.to_dict()
            response = make_response(jsonify(chat_room_dict), 201)
            return response 
        return make_response(jsonify({"error": "Chat Room Record not found"}), 404)

    def delete(self, id):
        chat_room = Chat_Room.query.filter(Chat_Room.id == id).first()
        if chat_room:
            db.session.delete(chat_room)
            db.session.commit()
            chat_room_dict = {"message": "Chat Room Record successfully deleted"}
            return make_response(chat_room_dict, 200)
        return make_response(jsonify({"error": "Chat Room Record not found"}), 404)

api.add_resource(Chat_RoomById, '/chat_rooms/<int:id>', endpoint='chat_roombyid')

##################
## Chat_Message ##
##################

class Chat_Messages(Resource):
    def get(self):     
        chat_message_dict = []
        for chat_message in Chat_Message.query.all():
            chat_message_dict.append(chat_message.to_dict())
        if chat_message_dict != []:
            response = make_response(jsonify(chat_message_dict), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query Chat Message data"}                 
            return make_response(jsonify(return_obj),500)  

    def post(self):  
        data=request.get_json()
        try:                                            
            new_chat_message = Chat_Message(
                chat_message_text=data['chat_message_text'],
                chat_sender_user_id=int(data['chat_sender_user_id']),
                chat_room_id=int(data['chat_room_id']),
                )
            db.session.add(new_chat_message)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({"errors": [e.__str__()]}), 422)
        chat_message_dict = new_chat_message.to_dict()
        response = make_response(jsonify(chat_message_dict), 201) 
        return response 

api.add_resource(Chat_Messages, '/chat_messages', endpoint='chat_message')

class Chat_MessageById(Resource):
    def get(self, id):
        chat_message = Chat_Message.query.filter(Chat_Message.id == id).first()
        if chat_message:
            chat_message_dict = chat_message.to_dict()
            response = make_response(jsonify(chat_message_dict, 200))
            return response
        return make_response(jsonify({"error": "Chat Message Record not found"}), 404)

    def patch(self, id):          
        chat_message = Chat_Message.query.filter(Chat_Message.id == id).first()
        if chat_message:
            data=request.get_json() 
            try:                                        
                for attr in data:
                    setattr(chat_message, attr, data[attr])
                db.session.add(chat_message)
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            chat_message_dict = chat_message.to_dict()
            response = make_response(jsonify(chat_message_dict), 201)
            return response 
        return make_response(jsonify({"error": "Chat Message Record not found"}), 404)

    def delete(self, id):         
        chat_message = Chat_Message.query.filter(Chat_Message.id == id).first()
        if chat_message:
            db.session.delete(chat_message)
            db.session.commit()
            chat_message_dict = {"message": "Chat Message Record successfully deleted"}
            return make_response(chat_message_dict, 200)
        return make_response(jsonify({"error": "Chat Message Record not found"}), 404)

api.add_resource(Chat_MessageById, '/chat_messages/<int:id>', endpoint='chat_messagebyid')

if __name__ == '__main__':
    app.run(port=5555, debug=True)