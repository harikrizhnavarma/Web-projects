from flask import Flask, render_template
from crypto import CryptoScraper as cr_scrape

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home_page():
    return render_template("main.html", title = "Home Page")

@app.route("/getcryptoinfo")
def scrape_coin():
    response = cr_scrape.scrape_coin()
    return response

@app.route("/getcryptonews")
def scrape_news():
    response = cr_scrape.scrape_news()
    return response

if __name__ == "__main__":
    app.run(debug=True)