from flask import Flask, jsonify, request
from pymongo import MongoClient
from dotenv import load_dotenv
import bcrypt
import os
from flask_cors import CORS
import jwt
import datetime
from bson import ObjectId
load_dotenv()

app = Flask(__name__)
CORS(app)
mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)

db = client["tracker"]

users_collection = db["users"]
businesses_collection = db["businesses"]
expenses_collection = db["expenses"]
income_collection = db["income"]
jwt_secret = os.getenv("JWT_SECRET")

@app.route("/")
def home():
    return jsonify({
        "message": "Backend Running"
    })

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    full_name = data.get("fullName")
    email = data.get("email")
    password = data.get("password")

    # Check existing user
    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:

        return jsonify({
            "message": "User already exists"
        }), 400

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    # User object
    user = {
        "fullName": full_name,
        "email": email,
        "password": hashed_password
    }

    # Insert user
    users_collection.insert_one(user)

    return jsonify({
        "message": "User registered successfully"
    })
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    # Find user by email
    user = users_collection.find_one({
        "email": email
    })

    # If user not found
    if not user:

        return jsonify({
            "message": "User not found"
        }), 404

    # Check password
    is_password_correct = bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    )

    # Wrong password
    if not is_password_correct:

        return jsonify({
            "message": "Invalid password"
        }), 401

    # Login success
    token = jwt.encode({
    "email": user["email"],
    "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
}, jwt_secret, algorithm="HS256")
    
    return jsonify({
        "message": "Login successful",
        "token": token,
        "user_id": str(user["_id"]),
        
    })

@app.route("/business", methods=["POST"])
def create_business():

    data = request.json

    business = {
        "user_id": data.get("user_id"),

        "businessName":
            data.get("businessName"),

        "businessType":
            data.get("businessType"),

        "currency":
            data.get("currency")
    }

    businesses_collection.insert_one(
        business
    )

    return jsonify({
        "message":
        "Business created successfully"
    })

@app.route("/businesses/<user_id>",
methods=["GET"])

def get_businesses(user_id):

    businesses = []

    for business in businesses_collection.find(
        {"user_id": user_id}
    ):

        businesses.append({
            "_id":
              str(business["_id"]),

            "businessName":
              business["businessName"],

            "businessType":
              business["businessType"],

            "currency":
              business["currency"]
        })

    return jsonify(
        businesses
    )

@app.route("/expense", methods=["POST"])
def add_expense():

    try:

        data = request.json

        expense = {

            "business_id":
                data.get("business_id"),

            "title":
                data.get("title"),

            "amount":
                float(data.get("amount")),

            "category":
                data.get("category"),

            "date":
                data.get("date"),

            "description":
                data.get("description")
        }

        expenses_collection.insert_one(
            expense
        )

        return jsonify({
            "message":
            "Expense added successfully"
        }), 201

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    

@app.route("/expenses/<business_id>", methods=["GET"])
def get_expenses(business_id):

    expenses = list(
        expenses_collection.find(
            {"business_id": business_id}
        )
    )

    for expense in expenses:

        expense["_id"] = str(
            expense["_id"]
        )

    return jsonify(expenses)
@app.route("/expense/<expense_id>", methods=["PUT"])
def update_expense(expense_id):

    data = request.json

    expenses_collection.update_one(
        {"_id": ObjectId(expense_id)},
        {
            "$set": {
                "title": data["title"],
                "amount": data["amount"],
                "category": data["category"],
                "date": data["date"],
                "description": data["description"]
            }
        }
    )

    return jsonify({
        "message": "Expense Updated"
    })
@app.route("/expense/<expense_id>", methods=["DELETE"])
def delete_expense(expense_id):

    expenses_collection.delete_one(
        {"_id": ObjectId(expense_id)}
    )

    return jsonify({
        "message": "Expense Deleted"
    })

@app.route("/income", methods=["POST"])
def add_income():

    data = request.json

    income = {
        "businessId": data["businessId"],
        "source": data["source"],
        "amount": data["amount"],
        "category": data["category"],
        "date": data["date"],
        "description": data["description"]
    }

    income_collection.insert_one(income)

    return jsonify({
        "message": "Income Added"
    }), 201

@app.route("/income/<business_id>", methods=["GET"])
def get_income(business_id):

    income = list(
        income_collection.find(
            {"businessId": business_id}
        )
    )

    for item in income:
        item["_id"] = str(item["_id"])

    return jsonify(income)

@app.route("/income/<income_id>", methods=["PUT"])
def update_income(income_id):

    data = request.json

    income_collection.update_one(
        {"_id": ObjectId(income_id)},
        {
            "$set": {
                "source": data["source"],
                "amount": data["amount"],
                "category": data["category"],
                "date": data["date"],
                "description": data["description"]
            }
        }
    )

    return jsonify({
        "message": "Income Updated"
    })

@app.route("/income/<income_id>", methods=["DELETE"])
def delete_income(income_id):

    income_collection.delete_one(
        {"_id": ObjectId(income_id)}
    )

    return jsonify({
        "message": "Income Deleted"
    })


@app.route("/business/<business_id>", methods=["PUT"])
def update_business(business_id):
    try:
        data = request.json

        businesses_collection.update_one(
            {"_id": ObjectId(business_id)},
            {
                "$set": {
                    "businessName": data["businessName"],
                    "businessType": data["businessType"],
                    "currency": data["currency"]
                }
            }
        )

        return jsonify({
            "message": "Business updated successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
    
@app.route("/business/<business_id>", methods=["DELETE"])
def delete_business(business_id):
    try:

        # Delete all expenses of this business
        expenses_collection.delete_many(
            {"business_id": business_id}
        )

        # Delete all income records of this business
        income_collection.delete_many(
            {"business_id": business_id}
        )

        # Delete business itself
        businesses_collection.delete_one(
            {"_id": ObjectId(business_id)}
        )

        return jsonify({
            "message": "Business and related data deleted successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
    
if __name__ == "__main__":
    app.run(debug=True)