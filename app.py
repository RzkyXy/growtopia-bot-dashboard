from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO
import json
import time
import random
import threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Load bot data
def load_bots():
    with open("data/bots.json") as f:
        return json.load(f)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/bots")
def bots():
    return jsonify(load_bots())

# Fake realtime update (simulate bot activity)
def update_loop():
    while True:
        bots = load_bots()
        for b in bots:
            b["ping"] = random.randint(80, 200)
            b["status"] = random.choice(["online", "offline", "banned"])
        socketio.emit("update", bots)
        time.sleep(3)

threading.Thread(target=update_loop).start()

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
