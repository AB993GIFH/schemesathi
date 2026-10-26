from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)

with open("schemes.json", encoding="utf-8") as f:
    SCHEMES = json.load(f)

def check(age, income, occupation, gender):
    found = []
    for s in SCHEMES:
        if age < s["min_age"] or age > s["max_age"]:
            continue
        if s["max_income"] is not None and income > s["max_income"]:
            continue
        if s["occupations"] != ["any"] and occupation not in s["occupations"]:
            continue
        if s["gender"] != "any" and gender != s["gender"]:
            continue
        found.append(s)
    return found

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/check")
def check_route():
    age = int(request.args.get("age", 0))
    income = int(request.args.get("income", 0))
    occupation = request.args.get("occupation", "").lower()
    gender = request.args.get("gender", "").lower()
    return jsonify(check(age, income, occupation, gender))

if __name__ == "__main__":
    app.run(debug=True)
