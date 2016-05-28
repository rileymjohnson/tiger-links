from flask import Flask, render_template, request, redirect, session, Response, send_file, make_response
import MySQLdb as mdb
import json
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app)

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RTDALKSFJLDSKJFKLSDJF'

import tornado.web
from tornado.websocket import WebSocketHandler
from tornado.ioloop import PeriodicCallback,IOLoop
import tornado.wsgi
import sockjs.tornado

def getTigers():
    con = mdb.connect('localhost', 'root', 'visibilitymatters', 'tigerlink')
    query = "select * from tigers"
    with con:
        cur = con.cursor(mdb.cursors.DictCursor)
        cur.execute(query)
        rows = cur.fetchall()
    return rows

def updateTiger(id):
    con = mdb.connect('localhost', 'root', 'visibilitymatters', 'tigerlink')
    query = "update tigers set value = 1 where id = " + id
    with con:
        cur = con.cursor(mdb.cursors.DictCursor)
        cur.execute(query)
        
def resetTigers():
    con = mdb.connect('localhost', 'root', 'visibilitymatters', 'tigerlink')
    query = "update tigers set value = 0"
    with con:
        cur = con.cursor(mdb.cursors.DictCursor)
        cur.execute(query)
        
def getWord():
    con = mdb.connect('localhost', 'root', 'visibilitymatters', 'tigerlink')
    query = "select word from word"
    with con:
        cur = con.cursor(mdb.cursors.DictCursor)
        cur.execute(query)
        rows = cur.fetchall()
    return rows[0]["word"]

def updateWord(word):
    con = mdb.connect('localhost', 'root', 'visibilitymatters', 'tigerlink')
    query = "update word set word = '" + word + "'"
    with con:
        cur = con.cursor(mdb.cursors.DictCursor)
        cur.execute(query)

@app.route("/")
def index():
	return json.dumps(getTigers())

@app.route("/auth", methods=["GET", "POST"])
def auth():
    if request.method == "GET":
        if "admin" in session:
            return "true"
        else:
            return "false"
    if request.method == "POST":
        password = request.form["password"]
        return "asdfsf"

@app.route("/reset")
def reset():
    resetTigers()
    updateWord(request.args["word"])
    return "true"

listeners = []

class ChatConnection(sockjs.tornado.SockJSConnection): #websocket tornado class
    def on_open(self, info):
        listeners.append(self)
    def on_message(self, message):
        data = json.loads(message)
        id = str(data["name"])
        word = data["word"]
        if word == getWord():
            updateTiger(id)
            self.broadcast(listeners, message)
        else:
            self.send("false")
    def on_close(self):
        listeners.remove(self)

wsgi_app=tornado.wsgi.WSGIContainer(app)
ChatRouter = sockjs.tornado.SockJSRouter(ChatConnection, '/chat') #class for websocket
application=tornado.web.Application(
	ChatRouter.urls +
	[(r'.*',tornado.web.FallbackHandler,{'fallback':wsgi_app })]
	)

application.listen(3000)
IOLoop.instance().start()
