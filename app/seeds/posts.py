from app.models import db, Post


def seed_posts():
    posts = [
    {
        "post_url": "https://images.squarespace-cdn.com/content/v1/59b8646aa803bb682a0789da/1651015840903-FQYQ4F81A6I0AH4F46Q1/IMG_1678.jpg?format=2500w",
        "owner_id": 1,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "prettiest cake ever!"
    },
    {
        "post_url": "https://cdn.shopify.com/s/files/1/0015/1185/0042/files/Pretty_In_Pink_Cake.jpg?v=1593511923",
        "owner_id": 1,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Love the aesthetic"
    },
    {
        "post_url": "https://img.delicious.com.au/pkTPC5NE/w1200/del/2016/11/peach-melba-cake-39925-1.jpg",
        "owner_id": 2,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Peach cake!"
    },
    {
        "post_url": "https://cdn.shopify.com/s/files/1/0258/7387/5019/products/image_e08ba804-5083-48ee-83bf-0e2ec5229cf1_1000x1000.jpg?v=1602372350",
        "owner_id": 2,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Delicious"
    },
    {
        "post_url": "https://kevsbest.co.uk/wp-content/uploads/2021/07/Bite-Me-Cakes-Birmingham.jpg",
        "owner_id": 3,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "CAKE CAKE CAKE"
    },
    {
        "post_url": "https://img.taste.com.au/k6Xh6BRd/taste/2018/02/toffee-apple-and-cinnamon-sponge-cake-135183-1.jpg",
        "owner_id": 3,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Best cake ever"
    },
    {
        "post_url": "https://kevsbest.com/wp-content/uploads/2021/07/5-Best-Cakes-in-Milwaukee.png",
        "owner_id": 4,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "best chocolate cake in the city"
    },
    {
        "post_url": "https://cdn.pickuplimes.com/cache/e8/d2/e8d2767ce7ba58f8bf0ffb62b17415c8.jpg",
        "owner_id": 4,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Super rich chocolate!"
    },
    {
        "post_url": "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg",
        "owner_id": 5,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "og chocolate chip cookies"
    },
    {
        "post_url": "https://www.simplyrecipes.com/thmb/nkHqbpnu2Qzuen4oRWwV-AGeXRM=/2000x1333/filters:no_upscale():max_bytes(150000):strip_icc()/Holiday-Sugar-Cookies-LEAD-4-1f0b28eae31a478292424b32446b7a4a.jpg",
        "owner_id": 5,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "best cookies"
    },
    {
        "post_url": "https://www.cookingclassy.com/wp-content/uploads/2012/08/red-velvet-cookies-8-500x500.jpg",
        "owner_id": 6,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "classy cookies"
    },
    {
        "post_url": "https://preppykitchen.com/wp-content/uploads/2021/07/Peanut-Butter-Cookie-Recipe-n-500x500.jpg",
        "owner_id": 6,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "kuki man"
    },
    {
        "post_url": "https://simplelivingrecipes.com/wp-content/uploads/2022/03/fudgy-chocolate-cookies-with-cocoa-powder-s.jpg",
        "owner_id": 7,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "love these cookies"
    },
    {
        "post_url": "https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Thumbprint-cookies-baf69cf.jpg",
        "owner_id": 7,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Best cookies in the city"
    },
    {
        "post_url": "https://images.squarespace-cdn.com/content/v1/54d1122be4b02f398945d9b0/1615579041830-J4UE5C8AW61Y77FLJMB1/image-asset.jpeg",
        "owner_id": 8,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Best ice cream"
    },
    {
        "post_url": "https://jfsneny.org/wp-content/uploads/2015/07/icecream.jpg",
        "owner_id": 8,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Hole in the wall"
    },
    {
        "post_url": "https://images.seattletimes.com/wp-content/uploads/2022/07/1010482.jpg?d=1560x1170",
        "owner_id": 9,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Best ice cream bars"
    },
    {
        "post_url": "https://handelsicecream.com/wp-content/uploads/2021/08/cones_dishes.jpg",
        "owner_id": 9,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Favorite flavor"
    },
    {
        "post_url": "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/4/30/0/FNK_Ice-Cream-in-a-Bag_s4x3.jpg.rend.hgtvcom.406.305.suffix/1525105614384.jpeg",
        "owner_id": 10,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Best ice cream in LA"
    },
    {
        "post_url": "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x512_center,f_auto,q_auto:best/newscms/2021_27/1746707/ice-cream-day-mc-main-210709.jpeg",
        "owner_id": 10,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Fav spot"
    },
    {
        "post_url": "https://www.biggerbolderbaking.com/wp-content/uploads/2020/01/2-Ingredient-Ice-cream-Thumbnail-scaled.jpg",
        "owner_id": 11,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "I love ice cream"
    },
    {
        "post_url": "https://www.foodbusinessnews.net/ext/resources/2022/06/27/IceCreamSurvey_Lead.jpg?t=1656349101&width=1080",
        "owner_id": 11,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "This place has the best ice cream"
    },
    {
        "post_url": "https://insanelygoodrecipes.com/wp-content/uploads/2021/01/White-Chocolate-Oreo-Cookie-Balls.png",
        "owner_id": 11,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Icecream is life"
    },
    {
        "post_url": "https://cdn.loveandlemons.com/wp-content/uploads/2021/06/summer-desserts-500x500.jpg",
        "owner_id": 11,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "caption": "Love this place has the best desserts!"
    }]

    for post in posts:
        new_post = Post(
            post_url = post["post_url"],
            owner_id = post["owner_id"],
            city = post["city"],
            state = post["state"],
            country = post["country"],
            caption = post["caption"]
        )

        db.session.add(new_post)

    db.session.commit()
    print('posts was succesfully seeded')




# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
