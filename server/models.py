from datetime import datetime
from sqlalchemy.orm import validates, backref, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt,db

# class SerializerMixin:
#     def to_dict(self, max_depth=1, current_depth=0):
#         if current_depth > max_depth:
#             return None
#         result = {}
#         for key in self.__mapper__.c.keys():
#             value = getattr(self, key)
#             if isinstance(value, datetime):
#                 value = str(value)
#             result[key] = value
#         for key, relation in self.__mapper__.relationships.items():
#             related_obj = getattr(self, key)
#             if related_obj is not None:
#                 if relation.direction.name == 'ONETOMANY':
#                     result[key] = [obj.to_dict(max_depth=max_depth, current_depth=current_depth + 1) for obj in related_obj]
#                 elif relation.direction.name == 'MANYTOONE':
#                     result[key] = related_obj.to_dict(max_depth=max_depth, current_depth=current_depth + 1)
#         return result

###############################################################

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_only = ('id', 'username', '_password_hash', 'email', 'address', 'city', 'state', 'country', 'zipcode', 'avatar_url', 'stars', 'travel_distance', 'is_active', 'is_admin', 'inventories', 'sent_messages', 'received_messages', 'theme')
    serialize_rules = ('-inventories.user', '-chat_rooms.user', '-chat_messages.user', '-loaned_games.loaner', '-borrowed_games.borrower', '-swap.users', '-sent_messages.sender', '-received_messages.receiver', '-message.users', '-sent_review.review_sender', '-recieved_review.review_receiver', '-review.users', '-created_at', '-updated_at',)
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False, default='')
    state = db.Column(db.String, nullable=False, default='')
    country = db.Column(db.String, nullable=False, default='')
    zipcode = db.Column(db.String, nullable=False, default='')
    avatar_url = db.Column(db.String)
    # avatar_blob = db.Column(db.Blob)
    stars = db.Column(db.Integer)
    travel_distance = db.Column(db.Integer)
    theme = db.Column(db.String)
    is_active = db.Column(db.Boolean)
    is_admin = db.Column(db.Boolean)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    inventories = db.relationship('Inventory', back_populates='user', cascade="all, delete, delete-orphan")
    chat_rooms = db.relationship('Chat_Room', backref='user', cascade="all, delete, delete-orphan")
    chat_messages = db.relationship('Chat_Message', backref='user', cascade="all, delete, delete-orphan")
    loaned_games = db.relationship('Swap', foreign_keys='Swap.loaning_user_id', cascade="all, delete, delete-orphan")
    borrowed_games = db.relationship('Swap', foreign_keys='Swap.borrowing_user_id', cascade="all, delete, delete-orphan")
    sent_messages = db.relationship('Message', foreign_keys='Message.sender_user_id', cascade="all, delete, delete-orphan")
    received_messages = db.relationship('Message', foreign_keys='Message.receiver_user_id', cascade="all, delete, delete-orphan")
    sent_review = db.relationship('Review', foreign_keys='Review.review_sender_user_id', cascade="all, delete, delete-orphan")
    recieved_review = db.relationship('Review', foreign_keys='Review.review_receiver_user_id', cascade="all, delete, delete-orphan")
    
    games = association_proxy('swaps', 'game')
    games = association_proxy('inventories', 'game')

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')) 
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('username')
    def validate_username(self, key, username):
        users = User.query.all()
        usernames = [user.username for user in users]
        if not username:
            raise ValueError("User must have a Username")
        if username in usernames:
            raise ValueError("User Username must be unique")
        return username

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError("User must have a email")
        if '@' not in email:
            raise ValueError("User failed simple email validation")
        return email
    
    @validates('address')
    def validate_shipping_address(self, key, address):
        if not address:
            raise ValueError("User must have a address")
        return address
    
    @validates('avatar_url')
    def validate_avatar_url(self, key, avatar_url):
        # if 'https://' not in avatar_url:
        #     raise ValueError("Avatar must be a URL link")
        return avatar_url

    # @validates('avatar_blob')
    # def validate_avatar_blob(self, key, avatar_blob):
    #     if not avatar_blob:
    #         raise ValueError("Game must have an Avatar")
    #     if '.png' not in avatar_blob:
    #         raise ValueError("Avatar must be a png file")
    #     return avatar_blob
    
    @validates('travel_distance')
    def validate_willing_travel_distance(self, key, travel_distance):
        if not isinstance(travel_distance, int):
            raise ValueError("Distance must be an Integer")
        return travel_distance
    
    def __repr__(self):
        return f'User ID: {self.id}, Username: {self.username}, Email: {self.email}, Address: {self.address}, Avatar: {self.avatar_url}, Travel Distance: {self.travel_distance}, Is Admin: {self.is_admin}, Is Active: {self.is_active}>'

###############################################################

class Game(db.Model, SerializerMixin): 
    __tablename__ = 'games'

    serialize_only = ('id', 'title', 'type', 'genres', 'platforms', 'player_num_min', 'player_num_max', 'image_url', 'description', 'inventories')
    # serialize_rules = ('-inventory.games', '-swap.games', '-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    genres = db.Column(db.String, nullable=False)
    platforms = db.Column(db.String, nullable=False)
    player_num_min = db.Column(db.Integer, db.CheckConstraint('player_num_min >=1 ', name='min_player_number'), nullable=False)
    player_num_max = db.Column(db.Integer, db.CheckConstraint('player_num_max >= player_num_min', name='max_player_number'), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    # image_blob = db.Column(db.Blob, nullable=False)
    description = db.Column(db.String, db.CheckConstraint('len(description) <= 500', name='max_description_length'), nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    inventories = db.relationship('Inventory', back_populates='game', cascade="all, delete, delete-orphan")
    swaps = db.relationship('Swap', backref='game', cascade="all, delete, delete-orphan")
    
    users = association_proxy('swaps', 'user')
    users = association_proxy('inventories', 'user')

    @validates('title')
    def validate_game_title(self, key, title):
        if not title:
            raise ValueError("Game must have a Title")
        return title

    _type = None                                            ## Class-level variable for storing type value
    
    @validates('type')
    def validate_type(self, key, type):
        types = [
            "Board Games", "Card Games", "Casino Games", "Deck Building Games", "Dice Games", "Escape Room Games", 
            "Miniatures Games", "Mobile Games", "Party Games", "Puzzles", "Social Deduction Games", "Sports Games", 
            "Tabletop Role-playing Games", "Virtual Reality Games", "Video Games", "Word Games"
            ]
        if not type:
            raise ValueError("Game must have a Type")
        if type not in types:
            raise ValueError("Game Type not found")
        self._type = type                                   ## Update class-level variable
        return type

    @validates('genres')
    def validate_genre(self, key, genre):
        genres = [
            "Abstract", "Action", "Adult", "Adventure", "Alternate History", "Area Control", "Asymmetric", "Bag Building", "Battle", "Battle Royale", 
            "Bluffing", "Campaign", "Card Drafting", "Card Game", "City-building", "Civilization", "Cooperative", "Deck Building", 
            "Deduction", "Dice Rolling", "Drafting", "Economic", "Educational", "Engine Building", 
            "Epic", "Escape Room", "Espionage", "Evolution", "Exploration", "Family", "Fantasy", "Farming", "Fighting", "Gambling", "Heist", "Horror", "Incremental/Idle", 
            "Interactive Fiction", "Investigation", "JRPG", "Life Simulator", "Management", 
            "Massively Multiplayer Online Role Playing Game (MMORPG)", "Medieval", "Mini-games", "Multiplayer", "Multiplayer Online Battle Arena (MOBA)", 
            "First-Person Shooter (FPS)", "Music", "Nature", "Other", "Party", "Pattern Building", "Platformer", "Politics", "Push Your Luck", 
            "Puzzle", "Racing", "Real-time", "Resource Management", "Role-playing", "Roll-and-Write", "Roguelike", "Route Building", "Rhythm", 
            "Sandbox", "Science Fiction", "Set Collection", "Shooter", "Simulation", "Social Deduction", "Sports", "Stealth", "Strategy", "Storytelling", 
            "Survival", "Tactical", "Tile Placement", "Trading", "Trading Card", "Trains", "Trick-taking", "Trivia", 
            "Vehicle Simulator", "Visual Novel", "Vocabulary", "War", "Western", "Word", "Worker Placement"
        ]
        if not genre:
            raise ValueError("Game must have a Genre")
        genre_list = genre.split(', ')
        for g in genre_list:
            if g not in genres:
                raise ValueError(f"Genre '{g}' not found")
        return genre
    
    @validates('platforms')
    def validate_platform(self, key, platform):
        if self._type == "Video Games":
            platforms = [
                "Digital", "DreamCast", "GameBoy", "GameBoy Advance", "GameCube", "Genesis", "Mac", 
                "Mobile", "NES", "Nintendo 3DS", "Nintendo 64", "Nintendo DS", "Nintendo Switch", "PC", 
                "PS Vita", "PlayStation", "PlayStation 2", "PlayStation 3", "PlayStation 4", 
                "PlayStation 5", "PSP", "Wii", "Wii U", "XBox", "XBox 360", 
                "XBox One", "XBox Series X/S", "Other"
            ]
            if not platform:
                raise ValueError("Video Games must have a Platform")
            platform_list = platform.split(', ')
            for p in platform_list:
                if p not in platforms:
                    raise ValueError(f"Platform '{p}' not found")
            return platform
        else:
            platforms=["Tabletop", "Digital", "Mobile", "Other"]
            if not platform:
                raise ValueError("Games must have a Platform")
            platform_list = platform.split(', ')
            for p in platform_list:
                if p not in platforms:
                    raise ValueError(f"Platform '{p}' not found")
            return platform
    
    _player_num_min = None                                  ## Class-level variable for storing player_num_min value
   
    @validates('player_num_min')
    def validate_player_num_min(self, key, player_num_min):
        if not player_num_min:
            raise ValueError("Game must have the Minimum Number of Players.")
        if not isinstance(player_num_min, int):
            raise ValueError("Game Minimum Number of Players must be an Integer")
        if int(player_num_min) < 1:
            raise ValueError("Game must have 1 or more Players.")
        self._player_num_min = int(player_num_min)          ## Update class-level variable
        return player_num_min
    
    @validates('player_num_max')
    def validate_player_num_max(self, key, player_num_max):
        if not player_num_max:
            raise ValueError("Game must have the Maximum Number of Players.")
        if not isinstance(player_num_max, int):
            raise ValueError("Game Maximum Number of Players must be an Integer")
        if int(player_num_max) < self._player_num_min:      ## Comparison against class-level variable
            raise ValueError("Game Maximum Number of Players cannot be less than Minimum Players.")
        return player_num_max
    
    @validates('image_url')
    def validate_image_url(self, key, image_url):
        if not image_url:
            raise ValueError("Game must have an Image")
        # if 'https://' not in image_url:
        #     raise ValueError("Image must be a URL link")
        return image_url
    
    # @validates('image_blob')
    # def validate_image_blob(self, key, image_blob):
    #     if not image_blob:
    #         raise ValueError("Game must have an Image")
    #     if '.png' not in image_blob:
    #         raise ValueError("Image must be a png file")
    #     return image_blob

    @validates('description')
    def validate_description_length(self, key, description):
        if not description:
            raise ValueError("Game must have a Description")
        if len(description) >= 500:
            raise ValueError("Game Description must be less than or equal to 500 characters long.")
        return description
    
    def __repr__(self):
        return f'<Game ID#{self.id}, Title: {self.title}, Type: {self.type}, Genres: {self.genres}, Minimum # of Players: {self.player_num_min}, Maximum # of Players: {self.player_num_max}, Description: {self.description}>'

###############################################################

class Inventory(db.Model, SerializerMixin):
    __tablename__ = 'inventories'

    serialize_only = ('id', 'user_id', 'game_id', 'user', 'game')
    serialize_rules = ('-user.inventories', '-game.inventories', '-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    user = db.relationship('User', back_populates='inventories')
    game = db.relationship('Game', back_populates='inventories')

    @validates('user_id')
    def validate_user_id(self, key, user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not user_id:
            raise ValueError("Inventory must have a User")
        if int(user_id) not in ids:
            raise ValueError('Inventory User must exist.')
        return user_id
    
    @validates('game_id')
    def validate_game_id(self, key, game_id):
        games = Game.query.all()
        ids = [game.id for game in games]
        if not game_id:
            raise ValueError("Inventory must have a Game")
        if int(game_id) not in ids:
            raise ValueError('Inventory Game must exist.')
        return game_id

    def __repr__(self):
        return f'<Inventory #{self.id}, User: {self.user.username}, Game: {self.game.title}, Inventory Date: {self.created_at}>'
    
###############################################################

class Swap(db.Model, SerializerMixin): 
    __tablename__ = 'swaps'

    serialize_only = ('id', 'swap_status', 'borrow_date', 'due_date', 'game_swapped_id', 'loaning_user_id', 'borrowing_user_id')
    # serialize_rules = ('-user.swaps', '-loaner.loaned_games', '-borrower.borrowed_games', '-game.swaps', '-created_at', '-updated_at',)

    id = db.Column(db.Integer, primary_key=True)
    swap_status = db.Column(db.String, nullable=False)
    borrow_date = db.Column(db.String, nullable=False)
    due_date = db.Column(db.String, nullable=False)
        
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    game_swapped_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    
    loaning_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    borrowing_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    @validates('swap_status')
    def validate_task_status(self, key, swap_status):
        if not swap_status:
            raise ValueError("Swap must have a Status")
        return swap_status

    _borrow_date = None                                     ## Class-level variable for storing borrow_date value

    @validates('borrow_date')
    def validate_swap_borrow_date(self, key, borrow_date):
        if not borrow_date:
            raise ValueError("Swap must have a Borrow Date")
        self._borrow_date = borrow_date                     ## Update class-level variable
        return borrow_date
    
    @validates('due_date')
    def validate_swap_due_date(self, key, due_date):
        if not due_date:
            raise ValueError("Swap must have a Due Date")
        if due_date < self._borrow_date:                    ## Comparison against class-level variable
            raise ValueError("Due Date must be after the Borrow Date.")
        return due_date
       
    @validates('loaning_user_id')
    def validate_loaning_user_id(self, key, loaning_user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not loaning_user_id:
            raise ValueError("Swap must have an Loaning User")
        if int(loaning_user_id) not in ids:
            raise ValueError('Swap Loaning User must exist.')
        return loaning_user_id
    
    @validates('borrowing_user_id')
    def validate_borrowing_user_id(self, key, borrowing_user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not borrowing_user_id:
            raise ValueError("Swap must have an Borrowing User")
        if int(borrowing_user_id) not in ids:
            raise ValueError('Swap Borrowing User must exist.')
        return borrowing_user_id
    
    @validates('game_swapped_id')
    def validate_game_swapped_id(self, key, game_swapped_id):
        games = Game.query.all()
        ids = [game.id for game in games]
        if not game_swapped_id:
            raise ValueError("Swap must have a Game")
        if int(game_swapped_id) not in ids:
            raise ValueError('Swap Game must exist.')
        return game_swapped_id

    def __repr__(self):
        return f'<Swap #{self.id}, Game: {self.game.title}, Game Loaned By: {self.loaner.username}, Swap Borrow Date: {self.borrow_date}, Swap Due Date: {self.due_date}, Swap Status: {self.swap_status}, >'

###############################################################

class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'

    serialize_only = ('id', 'message_text', 'sender_user_id', 'receiver_user_id', 'created_at',)
    # serialize_rules = ('-sender.sent_messages', '-receiver.received_messages',)
    
    id = db.Column(db.Integer, primary_key=True)
    message_text = db.Column(db.String, db.CheckConstraint('len(message_text) <= 250', name='max_chat_message_length'))
     
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    sender_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    @validates('message_text')
    def validate_event_description_length(self, key, message_text):
        if not message_text:
            raise ValueError("Chat Message must have Message Text")
        if len(message_text) >= 250:
            raise ValueError("Chat Message Message Text must be less than or equal to 250 characters long.")
        return message_text

    @validates('sender_user_id')
    def validate_sender_user_id(self, key, sender_user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not sender_user_id:
            raise ValueError("Message must have a Sending User")
        if int(sender_user_id) not in ids:
            raise ValueError('Message Sending User must exist.')
        return sender_user_id
    
    @validates('receiver_user_id')
    def validate_receiver_user_id(self, key, receiver_user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not receiver_user_id:
            raise ValueError("Message must have a Receiving User")
        if int(receiver_user_id) not in ids:
            raise ValueError('Message Receiving User must exist.')
        return receiver_user_id

    def __repr__(self):
        return f'<Message #{self.id}, Message Text: {self.message_text}, Message Date: {self.created_at}, Sender: {self.sender_user_id.username}, Receiver: {self.receiver_user_id.username}>'

###############################################################

###################
## STRETCH GOALS ##
###################

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_only = ('id', 'review_content', 'review_stars', 'review_date', 'review_sender_user_id', 'review_receiver_user_id')
    # serialize_rules = ('-review_sender.sent_review', '-review_receiver.recieved_review', '-updated_at', '-review_date',)
    
    id = db.Column(db.Integer, primary_key=True)
    review_content = db.Column(db.String, db.CheckConstraint('len(review_content) <= 250', name='max_review__content_length'))
    review_stars = db.Column(db.Integer)
     
    review_date = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now()) 

    review_sender_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    review_receiver_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    @validates('review_content')
    def validate_review_content(self, key, review_content):
        if not review_content:
            raise ValueError("Review must have Content")
        if len(review_content) >= 250:
            raise ValueError("Review Content must be less than or equal to 250 characters long.")
        return review_content
    
    @validates('review_stars')
    def validate_review_stars(self, key, review_stars):
        if not review_stars:
            raise ValueError("Review must have Stars.")
        if int(review_stars) < 1:
            raise ValueError("Review Stars cannot be empty.")
        return review_stars

    @validates('review_sender_user_id')
    def validate_review_sender_user_id(self, key, review_sender_user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not review_sender_user_id:
            raise ValueError("Review must have a Sending User")
        if int(review_sender_user_id) not in ids:
            raise ValueError('Review Sending User must exist.')
        return review_sender_user_id
    
    @validates('review_receiver_user_id')
    def validate_review_receiver_user_id(self, key, review_receiver_user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not review_receiver_user_id:
            raise ValueError("Review must have a Receiving User")
        if int(review_receiver_user_id) not in ids:
            raise ValueError('Review Receiving User must exist.')
        return review_receiver_user_id

    def __repr__(self):
        return f'<Review #{self.id}, Review Content: {self.review_content}, Review Stars: {self.review_stars}, Review Date: {self.review_date}, Review Sender: {self.review_sender_user_id.username}, Review Receiver: {self.review_receiver_user_id.username}>'
    
###############################################################

class Chat_Room(db.Model, SerializerMixin):
    __tablename__ = 'chat_rooms'

    serialize_only = ('id', 'chat_room_name', 'chat_room_creator_user_id')
    # serialize_rules = ('-user.chat_rooms', '-chat_messages.chat_room', '-updated_at',)
   
    id = db.Column(db.Integer, primary_key=True)
    chat_room_name = db.Column(db.String, db.CheckConstraint('len(chat_room_name) <= 25', name='max_chat_room_name_length'))
     
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now()) 

    chat_room_creator_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    chat_messages = db.relationship('Chat_Message', backref='chat_room', cascade="all, delete, delete-orphan")

    @validates('chat_room_name')
    def validate_chat_room_name_length(self, key, chat_room_name):
        if not chat_room_name:
            raise ValueError("Chat Room must have Name")
        if len(chat_room_name) >= 25:
            raise ValueError("Chat Room Name must be less than or equal to 25 characters long.")
        return chat_room_name

    @validates('chat_room_creator_user_id')
    def validate_chat_room_creator_user_id(self, key, chat_room_creator_user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not chat_room_creator_user_id:
            raise ValueError("Chat Room must have a Creating User")
        if int(chat_room_creator_user_id) not in ids:
            raise ValueError('Chat Room Creating User must exist.')
        return chat_room_creator_user_id

    def __repr__(self):
        return f'<Chat Room #{self.id}, Chat Room Name: {self.chat_room_name}, Chat Room Date: {self.created_at}, Chat Room Creator: {self.chat_room_creator_user_id.username}>'

###############################################################

class Chat_Message(db.Model, SerializerMixin):
    __tablename__ = 'chat_messages'

    serialize_only = ('id', 'chat_message_text', 'chat_message_date', 'chat_sender_user_id', 'chat_room_id')
    # serialize_rules = ('-user.chat_messages', '-chat_room.chat_messages', '-updated_at',)
   
    id = db.Column(db.Integer, primary_key=True)
    chat_message_text = db.Column(db.String, db.CheckConstraint('len(chat_message_text) <= 250', name='max_chat_message_length'))
     
    chat_message_date = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now()) 

    chat_sender_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    chat_room_id = db.Column(db.Integer, db.ForeignKey('chat_rooms.id'))

    @validates('chat_message_text')
    def validate_event_description_length(self, key, chat_message_text):
        if not chat_message_text:
            raise ValueError("Chat Message must have Message Text")
        if len(chat_message_text) >= 250:
            raise ValueError("Chat Message Message Text must be less than or equal to 250 characters long.")
        return chat_message_text

    @validates('chat_sender_user_id')
    def validate_sender_user_id(self, key, chat_sender_user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not chat_sender_user_id:
            raise ValueError("Chat Message must have a Sending User")
        if int(chat_sender_user_id) not in ids:
            raise ValueError('Chat Message Sending User must exist.')
        return chat_sender_user_id

    def __repr__(self):
        return f'<Chat Message #{self.id}, Chat Message Text: {self.chat_message_text}, Chat Message Date: {self.chat_message_date}, Chat Message Sender: {self.chat_sender_user_id.username}>'