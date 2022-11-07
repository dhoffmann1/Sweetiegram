from .db import db, likes, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    'follows',
    db.Model.metadata,
    db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('following_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    profile_pic_url = db.Column(db.String)
    bio = db.Column(db.String(500))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    #relationships
    posts = db.relationship("Post", back_populates="user", cascade="all, delete")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete")
    user_likes = db.relationship("Post", back_populates="post_likes", secondary=likes, cascade="all, delete")
    # changed below: primaryjoin & secondary joins
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.following_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        backref=db.backref('following', lazy='joined'),
        lazy='joined'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "profilePicUrl": self.profile_pic_url,
            "bio": self.bio,
            "numPosts": len(self.posts),
            "numFollowers": len(self.followers),
            "numFollowing": len(self.following),
            "posts": [post.to_dict() for post in self.posts],
            # added here: got ids for easy querying
            "users_following": [user.id for user in self.following],
            "followers": [user.id for user in self.followers]
        }
    # added here:


    def to_dict_for_all_posts(self):
        return {
            'id': self.id,
            'username': self.username,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "profilePicUrl": self.profile_pic_url
        }

    def to_dict_for_follows(self):
        return {
            # want to add, username and profile picture to here?
                "id": self.id,
                "followers": [user.to_dict_for_all_posts() for user in self.followers],
                "following_users": [user.to_dict_for_all_posts() for user in self.following],
                "numFollowing": len(self.following),
                "numFollowers": len(self.followers),

        }
