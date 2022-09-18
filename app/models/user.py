from .db import db, likes
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    'follows',
    db.Model.metadata,
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('following_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    profile_pic_url = db.Column(db.String)
    bio = db.Column(db.String(500))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    #relationships
    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    user_likes = db.relationship("Post", back_populates="post_likes", secondary=likes, cascade="all, delete")
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin= (follows.c.following_id == id),
        backref=db.backref('following', lazy='dynamic'),
        lazy= 'dynamic'
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
            # "Posts": user_posts
            # we dont need numFollowing & numFollowers=> directly query from following table,
        }
