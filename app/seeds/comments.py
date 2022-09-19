from random import seed
from app.models import db, Comment

# post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
# user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
# content = db.Column(db.String(250), nullable=False)


def seed_comments():
  comments = [
    {
      "post_id": 1,
      "user_id": 1,
      "content": "Finally mastering this!"
    },
    {
      "post_id": 1,
      "user_id": 5,
      "content": "What's the recipe?"
    },
    {
      "post_id": 1,
      "user_id": 7,
      "content": "Did you really make that?"
    },
    {
      "post_id": 2,
      "user_id": 3,
      "content": "Nice cake!"
    },
    {
      "post_id": 2,
      "user_id": 6,
      "content": "Chocolate is my favorite."
    },
    {
      "post_id": 3,
      "user_id": 2,
      "content": "Looks really good!"
    },
    {
      "post_id": 4,
      "user_id": 8,
      "content": "Looks store bought."
    },
    {
      "post_id": 6,
      "user_id": 4,
      "content": "How did you do it?"
    },
    {
      "post_id": 8,
      "user_id": 6,
      "content": "Looks really good!"
    },
    {
      "post_id": 8,
      "user_id": 10,
      "content": "Looks really good!"
    },
    {
      "post_id": 9,
      "user_id": 11,
      "content": "Looks really good!"
    },
    {
      "post_id": 9,
      "user_id": 5,
      "content": "Looks really good!"
    },
    {
      "post_id": 9,
      "user_id": 13,
      "content": "Looks really good!"
    },
    {
      "post_id": 10,
      "user_id": 14,
      "content": "Looks really good!"
    },
    {
      "post_id": 11,
      "user_id": 1,
      "content": "Looks really good!"
    },
    {
      "post_id": 12,
      "user_id": 15,
      "content": "Looks really good!"
    },
    {
      "post_id": 14,
      "user_id": 2,
      "content": "Looks really good!"
    }]

  for comment in comments:
    new_comment = Comment(
      post_id = comment["post_id"],
      user_id = comment["user_id"],
      content = comment["content"]
    )

    db.session.add(new_comment)

  db.session.commit()
  print('comments was succesfully seeded')




# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
  db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
  db.session.commit()
