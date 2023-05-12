userRoutes:
    Post:
        {
        "username": "PunMaster",
        "name": "Al Betta",
        "email": "Al.Betta@example.com",
        "password": "password1",
        "address": "123 Pun Street",
        "phone": "1234567890",
        "birthday": "1990-01-01",
        "termsofservice": true,
        "privatepolicyagreement": true
        }
    Login:
        {
        "email": "Al.Betta@example.com",
        "password": "password1"
        }

userProductRoutes:
    Post:
        { 
        "user_id": 1, //Int, must match a valid user_id 
        "product_name": "Oranges",
        "description": "Sweet and tangy oranges from Florida.",
        "category": "Fruit",
        "quantity": 8, //Int
        "price": 2.49, //Float
        "image_url": "https://images.unsplash.com/photo-1603337013576-7b08f1c93d7d"
        }

userShoppingCartRoutes:
    Post:
        {
        "user_id": 1, //Int
        }
    
    Note: Pulls data from cartProduct, when deleted, all associated cartProducts are deleted

cartProductRoutes:
    Post:
        {
        "cart_id": 1, //Int
        "product_id": 3, //Int
        "quantity": 3 //Int
        }

    Note: Many to Many accociation with userShoppingCart and userProduct

