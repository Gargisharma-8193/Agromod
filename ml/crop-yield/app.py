from flask import Flask, request, render_template
import numpy as np
import pickle
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load models
with open(os.path.join(BASE_DIR, "dtr.pkl"), "rb") as f:
    dtr = pickle.load(f)

with open(os.path.join(BASE_DIR, "preprocessor.pkl"), "rb") as f:
    preprocessor = pickle.load(f)

# Flask app
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    Year = request.form["Year"]
    average_rain_fall_mm_per_year = request.form["average_rain_fall_mm_per_year"]
    pesticides_tonnes = request.form["pesticides_tonnes"]
    avg_temp = request.form["avg_temp"]
    Area = request.form["Area"]
    Item = request.form["Item"]

    features = np.array(
        [[
            Year,
            average_rain_fall_mm_per_year,
            pesticides_tonnes,
            avg_temp,
            Area,
            Item
        ]],
        dtype=object
    )

    transformed_features = preprocessor.transform(features)

    prediction = dtr.predict(transformed_features)

    return render_template(
        "index.html",
        prediction=prediction[0]
    )