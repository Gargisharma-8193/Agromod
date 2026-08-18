from flask import Flask, render_template
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
from datetime import datetime
import crops
import random
import os

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/ticker": {"origins": "*"}})

# ---------------------------------------------------------
# BASE DIRECTORY
# ---------------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------
# COMMODITY CSV FILES
# ---------------------------------------------------------

commodity_dict = {
    "arhar": "static/Arhar.csv",
    "bajra": "static/Bajra.csv",
    "barley": "static/Barley.csv",
    "copra": "static/Copra.csv",
    "cotton": "static/Cotton.csv",
    "sesamum": "static/Sesamum.csv",
    "gram": "static/Gram.csv",
    "groundnut": "static/Groundnut.csv",
    "jowar": "static/Jowar.csv",
    "maize": "static/Maize.csv",
    "masoor": "static/Masoor.csv",
    "moong": "static/Moong.csv",
    "niger": "static/Niger.csv",
    "paddy": "static/Paddy.csv",
    "ragi": "static/Ragi.csv",
    "rape": "static/Rape.csv",
    "jute": "static/Jute.csv",
    "safflower": "static/Safflower.csv",
    "soyabean": "static/Soyabean.csv",
    "sugarcane": "static/Sugarcane.csv",
    "sunflower": "static/Sunflower.csv",
    "urad": "static/Urad.csv",
    "wheat": "static/Wheat.csv"
}

# ---------------------------------------------------------
# RAINFALL DATA
# ---------------------------------------------------------

annual_rainfall = [
    29,
    21,
    37.5,
    30.7,
    52.6,
    150,
    299,
    251.7,
    179.2,
    70.5,
    39.8,
    10.9
]

# ---------------------------------------------------------
# BASE PRICE
# ---------------------------------------------------------

base = {
    "Paddy": 1245.5,
    "Arhar": 3200,
    "Bajra": 1175,
    "Barley": 980,
    "Copra": 5100,
    "Cotton": 3600,
    "Sesamum": 4200,
    "Gram": 2800,
    "Groundnut": 3700,
    "Jowar": 1520,
    "Maize": 1175,
    "Masoor": 2800,
    "Moong": 3500,
    "Niger": 3500,
    "Ragi": 1500,
    "Rape": 2500,
    "Jute": 1675,
    "Safflower": 2500,
    "Soyabean": 2200,
    "Sugarcane": 2250,
    "Sunflower": 3700,
    "Urad": 4300,
    "Wheat": 1350
}

commodity_list = []


# =========================================================
# COMMODITY CLASS
# =========================================================

class Commodity:

    def __init__(self, csv_name):

        self.name = csv_name

        # Convert relative CSV path into absolute path
        csv_path = os.path.join(BASE_DIR, csv_name)

        dataset = pd.read_csv(csv_path)

        self.X = dataset.iloc[:, :-1].values
        self.Y = dataset.iloc[:, 3].values

        # Decision Tree Regression
        from sklearn.tree import DecisionTreeRegressor

        depth = random.randrange(7, 18)

        self.regressor = DecisionTreeRegressor(
            max_depth=depth,
            random_state=42
        )

        self.regressor.fit(self.X, self.Y)

    def getPredictedValue(self, value):

        if value[1] >= 2019:

            fsa = np.array(value).reshape(1, 3)

            return self.regressor.predict(fsa)[0]

        else:

            c = self.X[:, 0:2]

            x = []

            for row in c:
                x.append(row.tolist())

            fsa = [value[0], value[1]]

            ind = 0

            for i in range(len(x)):

                if x[i] == fsa:
                    ind = i
                    break

            return self.Y[ind]

    def getCropName(self):

        a = self.name.split('.')

        return a[0]


# =========================================================
# INITIALIZE ALL COMMODITIES
# IMPORTANT:
# This MUST run even when app.py is imported by WSGI.
# =========================================================

def initialize_commodities():

    global commodity_list

    commodity_list = []

    commodity_list.append(Commodity(commodity_dict["arhar"]))
    commodity_list.append(Commodity(commodity_dict["bajra"]))
    commodity_list.append(Commodity(commodity_dict["barley"]))
    commodity_list.append(Commodity(commodity_dict["copra"]))
    commodity_list.append(Commodity(commodity_dict["cotton"]))
    commodity_list.append(Commodity(commodity_dict["sesamum"]))
    commodity_list.append(Commodity(commodity_dict["gram"]))
    commodity_list.append(Commodity(commodity_dict["groundnut"]))
    commodity_list.append(Commodity(commodity_dict["jowar"]))
    commodity_list.append(Commodity(commodity_dict["maize"]))
    commodity_list.append(Commodity(commodity_dict["masoor"]))
    commodity_list.append(Commodity(commodity_dict["moong"]))
    commodity_list.append(Commodity(commodity_dict["niger"]))
    commodity_list.append(Commodity(commodity_dict["paddy"]))
    commodity_list.append(Commodity(commodity_dict["ragi"]))
    commodity_list.append(Commodity(commodity_dict["rape"]))
    commodity_list.append(Commodity(commodity_dict["jute"]))
    commodity_list.append(Commodity(commodity_dict["safflower"]))
    commodity_list.append(Commodity(commodity_dict["soyabean"]))
    commodity_list.append(Commodity(commodity_dict["sugarcane"]))
    commodity_list.append(Commodity(commodity_dict["sunflower"]))
    commodity_list.append(Commodity(commodity_dict["urad"]))
    commodity_list.append(Commodity(commodity_dict["wheat"]))


# =========================================================
# HOME ROUTE
# =========================================================

@app.route('/')
def index():

    context = {
        "top5": TopFiveWinners(),
        "bottom5": TopFiveLosers(),
        "sixmonths": SixMonthsForecast()
    }

    return render_template(
        'index.html',
        context=context
    )


# =========================================================
# CROP PROFILE
# =========================================================

@app.route('/commodity/<name>')
def crop_profile(name):

    max_crop, min_crop, forecast_crop_values = TwelveMonthsForecast(name)

    prev_crop_values = TwelveMonthPrevious(name)

    forecast_x = [i[0] for i in forecast_crop_values]
    forecast_y = [i[1] for i in forecast_crop_values]

    previous_x = [i[0] for i in prev_crop_values]
    previous_y = [i[1] for i in prev_crop_values]

    current_price = CurrentMonth(name)

    crop_data = crops.crop(name)

    context = {
        "name": name,
        "max_crop": max_crop,
        "min_crop": min_crop,
        "forecast_values": forecast_crop_values,
        "forecast_x": str(forecast_x),
        "forecast_y": forecast_y,
        "previous_values": prev_crop_values,
        "previous_x": previous_x,
        "previous_y": previous_y,
        "current_price": current_price,
        "image_url": crop_data[0],
        "prime_loc": crop_data[1],
        "type_c": crop_data[2],
        "export": crop_data[3]
    }

    return render_template(
        'commodity.html',
        context=context
    )


# =========================================================
# TICKER API
# =========================================================

@app.route('/ticker/<item>/<number>')
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def ticker(item, number):

    n = int(number)
    i = int(item)

    data = SixMonthsForecast()

    context = str(data[n][i])

    if i == 2 or i == 5:
        context = '₹' + context

    elif i == 3 or i == 6:
        context = context + '%'

    return context


# =========================================================
# TOP FIVE WINNERS
# =========================================================

def TopFiveWinners():

    current_month = datetime.now().month
    current_year = datetime.now().year

    current_rainfall = annual_rainfall[current_month - 1]

    # Handle January safely
    prev_month = current_month - 1

    if prev_month == 0:
        prev_month = 12

    prev_rainfall = annual_rainfall[prev_month - 1]

    current_month_prediction = []
    prev_month_prediction = []

    change = []

    for i in commodity_list:

        current_predict = i.getPredictedValue([
            float(current_month),
            current_year,
            current_rainfall
        ])

        current_month_prediction.append(current_predict)

        prev_predict = i.getPredictedValue([
            float(prev_month),
            current_year,
            prev_rainfall
        ])

        prev_month_prediction.append(prev_predict)

        if prev_predict != 0:

            percentage_change = (
                (current_predict - prev_predict)
                * 100
                / prev_predict
            )

        else:
            percentage_change = 0

        change.append(
            (
                percentage_change,
                commodity_list.index(i)
            )
        )

    sorted_change = sorted(
        change,
        reverse=True
    )

    to_send = []

    for j in range(min(5, len(sorted_change))):

        perc, i = sorted_change[j]

        name = commodity_list[i].getCropName().split('/')[1]

        to_send.append([
            name,
            round(
                (current_month_prediction[i] * base[name]) / 100,
                2
            ),
            round(perc, 2)
        ])

    return to_send


# =========================================================
# TOP FIVE LOSERS
# =========================================================

def TopFiveLosers():

    current_month = datetime.now().month
    current_year = datetime.now().year

    current_rainfall = annual_rainfall[current_month - 1]

    prev_month = current_month - 1

    if prev_month == 0:
        prev_month = 12

    prev_rainfall = annual_rainfall[prev_month - 1]

    current_month_prediction = []
    prev_month_prediction = []

    change = []

    for i in commodity_list:

        current_predict = i.getPredictedValue([
            float(current_month),
            current_year,
            current_rainfall
        ])

        current_month_prediction.append(current_predict)

        prev_predict = i.getPredictedValue([
            float(prev_month),
            current_year,
            prev_rainfall
        ])

        prev_month_prediction.append(prev_predict)

        if prev_predict != 0:

            percentage_change = (
                (current_predict - prev_predict)
                * 100
                / prev_predict
            )

        else:
            percentage_change = 0

        change.append(
            (
                percentage_change,
                commodity_list.index(i)
            )
        )

    sorted_change = sorted(change)

    to_send = []

    for j in range(min(5, len(sorted_change))):

        perc, i = sorted_change[j]

        name = commodity_list[i].getCropName().split('/')[1]

        to_send.append([
            name,
            round(
                (current_month_prediction[i] * base[name]) / 100,
                2
            ),
            round(perc, 2)
        ])

    return to_send


# =========================================================
# SIX MONTHS FORECAST
# =========================================================

def SixMonthsForecast():

    month1 = []
    month2 = []
    month3 = []
    month4 = []
    month5 = []
    month6 = []

    for i in commodity_list:

        crop = SixMonthsForecastHelper(
            i.getCropName()
        )

        k = 0

        for j in crop:

            time = j[0]
            price = j[1]
            change = j[2]

            if k == 0:

                month1.append(
                    (
                        price,
                        change,
                        i.getCropName().split("/")[1],
                        time
                    )
                )

            elif k == 1:

                month2.append(
                    (
                        price,
                        change,
                        i.getCropName().split("/")[1],
                        time
                    )
                )

            elif k == 2:

                month3.append(
                    (
                        price,
                        change,
                        i.getCropName().split("/")[1],
                        time
                    )
                )

            elif k == 3:

                month4.append(
                    (
                        price,
                        change,
                        i.getCropName().split("/")[1],
                        time
                    )
                )

            elif k == 4:

                month5.append(
                    (
                        price,
                        change,
                        i.getCropName().split("/")[1],
                        time
                    )
                )

            elif k == 5:

                month6.append(
                    (
                        price,
                        change,
                        i.getCropName().split("/")[1],
                        time
                    )
                )

            k += 1

    month1.sort()
    month2.sort()
    month3.sort()
    month4.sort()
    month5.sort()
    month6.sort()

    crop_month_wise = []

    if month1:
        crop_month_wise.append([
            month1[0][3],
            month1[-1][2],
            month1[-1][0],
            month1[-1][1],
            month1[0][2],
            month1[0][0],
            month1[0][1]
        ])

    if month2:
        crop_month_wise.append([
            month2[0][3],
            month2[-1][2],
            month2[-1][0],
            month2[-1][1],
            month2[0][2],
            month2[0][0],
            month2[0][1]
        ])

    if month3:
        crop_month_wise.append([
            month3[0][3],
            month3[-1][2],
            month3[-1][0],
            month3[-1][1],
            month3[0][2],
            month3[0][0],
            month3[0][1]
        ])

    if month4:
        crop_month_wise.append([
            month4[0][3],
            month4[-1][2],
            month4[-1][0],
            month4[-1][1],
            month4[0][2],
            month4[0][0],
            month4[0][1]
        ])

    if month5:
        crop_month_wise.append([
            month5[0][3],
            month5[-1][2],
            month5[-1][0],
            month5[-1][1],
            month5[0][2],
            month5[0][0],
            month5[0][1]
        ])

    if month6:
        crop_month_wise.append([
            month6[0][3],
            month6[-1][2],
            month6[-1][0],
            month6[-1][1],
            month6[0][2],
            month6[0][0],
            month6[0][1]
        ])

    return crop_month_wise


# =========================================================
# SIX MONTHS FORECAST HELPER
# =========================================================

def SixMonthsForecastHelper(name):

    current_month = datetime.now().month
    current_year = datetime.now().year

    current_rainfall = annual_rainfall[current_month - 1]

    name = name.split("/")[1]
    name = name.lower()

    commodity = commodity_list[0]

    for i in commodity_list:

        if name == str(i):

            commodity = i
            break

    month_with_year = []

    for i in range(1, 7):

        if current_month + i <= 12:

            month_with_year.append(
                (
                    current_month + i,
                    current_year,
                    annual_rainfall[current_month + i - 1]
                )
            )

        else:

            month_with_year.append(
                (
                    current_month + i - 12,
                    current_year + 1,
                    annual_rainfall[current_month + i - 13]
                )
            )

    wpis = []

    current_wpi = commodity.getPredictedValue([
        float(current_month),
        current_year,
        current_rainfall
    ])

    change = []

    for m, y, r in month_with_year:

        current_predict = commodity.getPredictedValue([
            float(m),
            y,
            r
        ])

        wpis.append(current_predict)

        if current_wpi != 0:

            percentage_change = (
                (current_predict - current_wpi)
                * 100
                / current_wpi
            )

        else:
            percentage_change = 0

        change.append(percentage_change)

    crop_price = []

    for i in range(len(wpis)):

        m, y, r = month_with_year[i]

        x = datetime(y, m, 1)
        x = x.strftime("%b %y")

        crop_price.append([
            x,
            round(
                (wpis[i] * base[name.capitalize()]) / 100,
                2
            ),
            round(change[i], 2)
        ])

    return crop_price


# =========================================================
# CURRENT MONTH PRICE
# =========================================================

def CurrentMonth(name):

    current_month = datetime.now().month
    current_year = datetime.now().year

    current_rainfall = annual_rainfall[current_month - 1]

    name = name.lower()

    commodity = commodity_list[0]

    for i in commodity_list:

        if name == str(i):

            commodity = i
            break

    current_wpi = commodity.getPredictedValue([
        float(current_month),
        current_year,
        current_rainfall
    ])

    current_price = (
        base[name.capitalize()]
        * current_wpi
    ) / 100

    return current_price


# =========================================================
# TWELVE MONTHS FORECAST
# =========================================================

def TwelveMonthsForecast(name):

    current_month = datetime.now().month
    current_year = datetime.now().year

    current_rainfall = annual_rainfall[current_month - 1]

    name = name.lower()

    commodity = commodity_list[0]

    for i in commodity_list:

        if name == str(i):

            commodity = i
            break

    month_with_year = []

    for i in range(1, 13):

        if current_month + i <= 12:

            month_with_year.append(
                (
                    current_month + i,
                    current_year,
                    annual_rainfall[current_month + i - 1]
                )
            )

        else:

            month_with_year.append(
                (
                    current_month + i - 12,
                    current_year + 1,
                    annual_rainfall[current_month + i - 13]
                )
            )

    max_index = 0
    min_index = 0

    max_value = 0
    min_value = 9999

    wpis = []
    change = []

    current_wpi = commodity.getPredictedValue([
        float(current_month),
        current_year,
        current_rainfall
    ])

    for m, y, r in month_with_year:

        current_predict = commodity.getPredictedValue([
            float(m),
            y,
            r
        ])

        if current_predict > max_value:

            max_value = current_predict

            max_index = month_with_year.index(
                (m, y, r)
            )

        if current_predict < min_value:

            min_value = current_predict

            min_index = month_with_year.index(
                (m, y, r)
            )

        wpis.append(current_predict)

        if current_wpi != 0:

            percentage_change = (
                (current_predict - current_wpi)
                * 100
                / current_wpi
            )

        else:
            percentage_change = 0

        change.append(percentage_change)

    max_month, max_year, r1 = month_with_year[max_index]
    min_month, min_year, r2 = month_with_year[min_index]

    min_value = (
        min_value
        * base[name.capitalize()]
        / 100
    )

    max_value = (
        max_value
        * base[name.capitalize()]
        / 100
    )

    crop_price = []

    for i in range(len(wpis)):

        m, y, r = month_with_year[i]

        x = datetime(y, m, 1)
        x = x.strftime("%b %y")

        crop_price.append([
            x,
            round(
                (wpis[i] * base[name.capitalize()]) / 100,
                2
            ),
            round(change[i], 2)
        ])

    x = datetime(
        max_year,
        max_month,
        1
    )

    x = x.strftime("%b %y")

    max_crop = [
        x,
        round(max_value, 2)
    ]

    x = datetime(
        min_year,
        min_month,
        1
    )

    x = x.strftime("%b %y")

    min_crop = [
        x,
        round(min_value, 2)
    ]

    return max_crop, min_crop, crop_price


# =========================================================
# TWELVE MONTHS PREVIOUS
# =========================================================

def TwelveMonthPrevious(name):

    name = name.lower()

    current_month = datetime.now().month
    current_year = datetime.now().year

    current_rainfall = annual_rainfall[current_month - 1]

    commodity = commodity_list[0]

    wpis = []
    crop_price = []

    for i in commodity_list:

        if name == str(i):

            commodity = i
            break

    month_with_year = []

    for i in range(1, 13):

        if current_month - i >= 1:

            month_with_year.append(
                (
                    current_month - i,
                    current_year,
                    annual_rainfall[current_month - i - 1]
                )
            )

        else:

            month_with_year.append(
                (
                    current_month - i + 12,
                    current_year - 1,
                    annual_rainfall[current_month - i + 11]
                )
            )

    for m, y, r in month_with_year:

        current_predict = commodity.getPredictedValue([
            float(m),
            2013,
            r
        ])

        wpis.append(current_predict)

    for i in range(len(wpis)):

        m, y, r = month_with_year[i]

        x = datetime(y, m, 1)
        x = x.strftime("%b %y")

        crop_price.append([
            x,
            round(
                (wpis[i] * base[name.capitalize()]) / 100,
                2
            )
        ])

    new_crop_price = []

    for i in range(
        len(crop_price) - 1,
        -1,
        -1
    ):

        new_crop_price.append(
            crop_price[i]
        )

    return new_crop_price


# =========================================================
# IMPORTANT:
# INITIALIZE COMMODITIES WHEN WSGI IMPORTS THIS FILE
# =========================================================

initialize_commodities()


# =========================================================
# LOCAL SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=int(
            os.environ.get(
                "PORT",
                5050
            )
        ),
        debug=False
    )