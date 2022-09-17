from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
    {
        "email": "user1@gmail.com",
        "first_name": "Taylor",
        "last_name": "Yang",
        "password": "password",
        "username": "joebob",
        "bio": "Sunny Weather",
        "profile_pic_url": "https://i.pinimg.com/736x/68/7e/1e/687e1e0b4222be2efd236dd911dbc632.jpg"
    },
    {
        "email": "user2@gmail.com",
        "first_name": "Janie",
        "last_name": "Foster",
        "password": "password",
        "username": "jaanief",
        "bio": "Sun and Fun",
        "profile_pic_url": "https://i.pinimg.com/736x/7c/88/cd/7c88cdaf2a7d75995969b73eb42bf268.jpg"
    },
    {
        "email": "user3@gmail.com",
        "first_name": "Rap",
        "last_name": "Monster",
        "password": "password",
        "username": "the_official_rm",
        "bio": "Sunshine",
        "profile_pic_url": "https://www.studyinternational.com/wp-content/uploads/2020/06/063_1207755182.jpg"
    },
    {
        "email": "user4@gmail.com",
        "first_name": "Ryan",
        "last_name": "Garcia",
        "password": "password",
        "username": "kingryan",
        "bio": "The rock",
        "profile_pic_url": "https://img.olympicchannel.com/images/image/private/t_16-9_3200/primary/bong9k31tfacws17yomo"
    },
    {
        "email": "user5@gmail.com",
        "first_name": "John",
        "last_name": "Hoffmann",
        "password": "password",
        "username": "johnbob",
        "bio": "CA",
        "profile_pic_url": ""
    },
    {
        "email": "user6@gmail.com",
        "first_name": "Jay",
        "last_name": "Park",
        "password": "password",
        "username": "moresojuplease",
        "bio": "Kpop idol",
        "profile_pic_url": "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/methode/2020/04/22/6108be60-839e-11ea-8863-2139a14b0dea_image_hires_181328.jpg?itok=k4oWhTc_&v=1587550414"
    },
    {
        "email": "user7@gmail.com",
        "first_name": "Mohammad",
        "last_name": "Ali",
        "password": "password",
        "username": "jball",
        "bio": "East Side",
        "profile_pic_url": "https://cdn.britannica.com/86/192386-050-D7F3126D/Muhammad-Ali-American.jpg?w=400&h=300&c=crop"
    },
    {
        "email": "user8@gmail.com",
        "first_name": "Pikachu",
        "last_name": "de los Rios",
        "password": "password",
        "username": "detective_pikachu",
        "bio": "CA",
        "profile_pic_url": "https://imageio.forbes.com/specials-images/imageserve/5d4e3c3bec8b3e00086d4298/Pokemon-Detective-Pikachu/960x0.jpg?format=jpg&width=960"
    },
    {
        "email": "user9@gmail.com",
        "first_name": "James",
        "last_name": "Johnson",
        "password": "password",
        "username": "jamesj",
        "bio": "NYC",
        "profile_pic_url": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*"
    },
    {
        "email": "user10@gmail.com",
        "first_name": "Naruto",
        "last_name": "Uzumaki",
        "password": "password",
        "username": "7thHokage",
        "bio": "I am the 7th Hokage",
        "profile_pic_url": "https://cdn.staticneo.com/w/naruto/Nprofile2.jpg"
    },
    {
        "email": "user11@gmail.com",
        "first_name": "Jennie",
        "last_name": "Kim",
        "password": "password",
        "username": "the_real_jk",
        "bio": "BlackPink",
        "profile_pic_url": "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/methode/2020/04/21/00e9c17e-7ede-11ea-8736-98edddd9b5ca_image_hires_115812.jpg?itok=sYrAXKko&v=1587441500"
    },
    {
        "email": "user12@gmail.com",
        "first_name": "Lisa",
        "last_name": "Manoban",
        "password": "password",
        "username": "lalalalisa",
        "bio": "BlackPink",
        "profile_pic_url": "https://cdn.asiatatler.com/generationt/i/ap/2019/06/19135555-lalisa-manoban-afp_cover_1331x1999.jpg"
    },
    {
        "email": "user13@gmail.com",
        "first_name": "Rose",
        "last_name": "Park",
        "password": "password",
        "username": "maryjane",
        "bio": "Marvel",
        "profile_pic_url": "http://pm1.narvii.com/7253/224cfc14df7df113f648d7c2268531b73237a64br1-1080-1350v2_uhq.jpg"
    },
    {
        "email": "user14@gmail.com",
        "first_name": "Gordon",
        "last_name": "Ramsey",
        "password": "password",
        "username": "the_real_Gordon_Ramsey",
        "bio": "Marvel",
        "profile_pic_url": "https://variety.com/wp-content/uploads/2017/09/gordon_ramsay.png?w=1024"
    },
    {
        "email": "user15@gmail.com",
        "first_name": "Claudio",
        "last_name": "Aprile",
        "password": "password",
        "username": "claudioaprile",
        "bio": "Marvel",
        "profile_pic_url": "https://i0.wp.com/inbetween.ca/wp-content/uploads/2018/03/Claudio.jpg?fit=1024%2C712&ssl=1"
    },
    {
        "email": "user16@gmail.com",
        "first_name": "Monkey D.",
        "last_name": "Luffy",
        "password": "password",
        "username": "pirateking",
        "bio": "I am going to be the king of pirates",
        "profile_pic_url": "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/04/One-Piece-Luffy.jpg"
    }]

    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    for user in users:
        new_user = User(
            email = user["email"],
            first_name = user["first_name"],
            last_name = user["last_name"],
            password = user["password"],
            username = user["username"],
            bio = user["bio"],
            profile_pic_url = user["profile_pic_url"]
        )

        db.session.add(new_user)

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)

    db.session.commit()
    print('users was succesfully seeded')


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
