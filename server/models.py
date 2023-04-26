from sqlalchemy.orm import validates, backref, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt,db

# project and item = game
# transaction and file = inventory
# task = swap


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    avatar_url = db.Column(db.String)
    avatar_blob = db.Column(db.Blob)
    willing_travel_distance = db.Column(db.Integer)
    is_active = db.Column(db.Boolean)
    is_admin = db.Column(db.Boolean)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    loaned_games = db.relationship('Swap', foreign_keys='Swap.loaning_user_id', cascade="all, delete, delete-orphan", overlaps='borrowed_games')
    borrowed_games = db.relationship('Swap', foreign_keys='Swap.borrower_user_id', cascade="all, delete, delete-orphan", overlaps='loaned_games')
    inventories = db.relationship('Inventory', backref='user', cascade="all, delete, delete-orphan")
    # teams = db.relationship('Team', backref='user', cascade="all, delete, delete-orphan")
    # calendars = db.relationship('Calendar', backref='user', cascade="all, delete, delete-orphan")
    # loaned_games = db.relationship('Swap', foreign_keys='Swap.loaning_user_id', cascade="all, delete, delete-orphan", overlaps='borrowed_games')
    # borrowed_games = db.relationship('Swap', foreign_keys='Swap.borrower_user_id', cascade="all, delete, delete-orphan", overlaps='loaned_games')

    # games = association_proxy('swaps', 'game')
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
        elif username in usernames:
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
        if 'https://' not in avatar_url:
            raise ValueError("Avatar must be a URL link")
        return avatar_url
    
    @validates('willing_travel_distance')
    def validate_willing_travel_distance(self, key, willing_travel_distance):
        if not isinstance(willing_travel_distance, int):
            raise ValueError("Distance must be an Integer")
        return willing_travel_distance
    
    def __repr__(self):
        return f'User ID: {self.id}, Username: {self.username}, Email: {self.email}, Address: {self.address}, Avatar: {self.avatar_url}, Travel Distance: {self.willing_travel_distance}, Is Admin: {self.is_admin}, Is Active: {self.is_active}>'

class Game(db.Model, SerializerMixin): 
    __tablename__ = 'games'

    serialize_rules = ('-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    genre1 = db.Column(db.String, nullable=False)
    genre2 = db.Column(db.String, nullable=False)
    player_num_min = db.Column(db.Integer, db.CheckConstraint('player_num_min >=1 ', name='min_player_number'), nullable=False)
    player_num_max = db.Column(db.Integer, db.CheckConstraint('player_num_max >= player_num_min', name='max_player_number'), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    image_blob = db.Column(db.Blob, nullable=False)
    description = db.Column(db.String, db.CheckConstraint('len(description) <= 250', name='max_description_length'), nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    inventories = db.relationship('Inventory', backref='game', cascade="all, delete, delete-orphan")
    users = association_proxy('inventories', 'user')
    
    # vendoritems = db.relationship('VendorItem', back_populates='game', cascade="all, delete, delete-orphan")
    # vendors = association_proxy('vendoritems', 'vendor',
    #     creator=lambda us: VendorItem(vendor=us))

    @validates('title')
    def validate_game_title(self, key, title):
        if not title:
            raise ValueError("Game must have a Title")
        return title

    @validates('type')
    def validate_type(self, key, type):
        types = [
            "Board Games", "Card Games", "Video Games", "Tabletop Role-playing Games", "Casino Games"
            ]
        if not type:
            raise ValueError("Game must have a Type")
        if type not in types:
            raise ValueError("Game Type not found")
        return type

    @validates('genre1', 'genre2')
    def validate_genre(self, key, genre):
        genres = [
            "Action", "Adult", "Adventure", "Battle Royale", "City-building", "Educational", "Escape Room", 
            "Fighting", "Gambling", "Horror", "Incremental/Idle", "Interactive Fiction", "Management", 
            "MMO (massively multiplayer online)", "MOBA (multiplayer online battle arena)", 
            "Music", "Other", "Party", "Platformer", "Puzzle", "Racing", "Role-playing", 
            "Roguelike", "Sandbox", "Science Fiction", "Shooter", "Simulation", "Sports", 
            "Strategy", "Survival", "Tactical", "Trading Card", "Trivia", "Visual Novel"
            ]
        if not genre:
            raise ValueError("Game must have a Genre")
        if genre not in genres:
            raise ValueError("Game Genre not found")
        return genre
    
    _player_num_min = None                                  ## Class-level variable for storing player_num_min value
   
    @validates('player_num_min')
    def validate_player_num_min(self, key, player_num_min):
        if not player_num_min:
            raise ValueError("Game must have the Minimum Number of Players.")
        if not isinstance(player_num_min, int):
            raise ValueError("Game Minimum Number of Players must be an Integer")
        elif int(player_num_min) < 1:
            raise ValueError("Game must have 1 or more Players.")
        self._player_num_min = int(player_num_min)          ## Update class-level variable
        return player_num_min
    
    @validates('player_num_max')
    def validate_player_num_max(self, key, player_num_max):
        if not player_num_max:
            raise ValueError("Game must have the Maximum Number of Players.")
        if not isinstance(player_num_max, int):
            raise ValueError("Game Maximum Number of Players must be an Integer")
        elif int(player_num_max) < self._player_num_min:    ## Comparison against class-level variable
            raise ValueError("Game Maximum Number of Players cannot be less than Minimum Players.")
        return player_num_max
    
    @validates('image_url')
    def validate_image_url(self, key, image_url):
        if not image_url:
            raise ValueError("Game must have an Image")
        if 'https://' not in image_url:
            raise ValueError("Image must be a URL link")
        return image_url
    
    @validates('image_blob')
    def validate_image_blob(self, key, image_blob):
        if not image_blob:
            raise ValueError("Game must have an Image")
        if '.png' not in image_blob:
            raise ValueError("Image must be a png file")
        return image_blob

    @validates('description')
    def validate_description_length(self, key, description):
        if not description:
            raise ValueError("Game must have a Description")
        if len(description) >= 250:
            raise ValueError("Game Description must be less than or equal to 250 characters long.")
        return description
    
    def __repr__(self):
        return f'<Game ID#{self.id}, Title: {self.title}, Type: {self.type}, Genres: {self.genre1}/{self.genre2}, Minimum # of Players: {self.player_num_min}, Maximum # of Players: {self.player_num_max}, Description: {self.description}>'


class Inventory(db.Model, SerializerMixin):
    __tablename__ = 'inventories'

    serialize_rules = ('-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    refund = db.Column(db.Boolean)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    @validates('user_id')
    def validate_user_id(self, key, user_id):
        users = User.query.all()
        ids = [user.id for user in users]
        if not user_id:
            raise ValueError("Inventory must have a User")
        elif int(user_id) not in ids:
            raise ValueError('Inventory User must exist.')
        return user_id
    
    @validates('game_id')
    def validate_item_id(self, key, game_id):
        games = Game.query.all()
        ids = [game.id for game in games]
        if not game_id:
            raise ValueError("Inventory must have a Game")
        elif int(game_id) not in ids:
            raise ValueError('Inventory Game must exist.')
        return game_id

    def __repr__(self):
        return f'<Inventory #{self.id}, User: {self.user.username}, Game: {self.game.title}, Inventory Date: {self.created_at}>'



serialize_rules = ('-user.swap', '-updated_at',)

    loaning_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    borrower_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    loaner = db.relationship('User', foreign_keys=[loaning_user_id], back_populates='loaned_games')
    borrower = db.relationship('User', foreign_keys=[borrower_user_id], back_populates='borrowed_games')