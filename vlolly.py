import sqlite3
# import zbase62
from flask import Flask, render_template, request, g
app = Flask(__name__)
app.debug = True

DATABASE = './lollies.db'

def connect_db():
    return sqlite3.connect(DATABASE)

@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.close()    

def query_db(query, args=(), one=False):
    '''sqlite db query helper'''
    cur = g.db.execute(query, args)
    rv = [dict((cur.description[idx][0], value) 
            for idx, value in enumerate(row)) for row in cur.fetchall()]
    return (rv[0] if rv else None) if one else rv


@app.route('/')
def home():
    '''home page'''
    return render_template('home.html')


@app.route('/make')
def make():
    '''make your lolly'''
    return render_template('make.html')


@app.route('/mint', methods=['POST'])
def mint():
    '''Mint a URI for a new lolly'''
    m = request.form['message']
    return 'mint: %s' % m


@app.route('/<id>')
def get_lolly(id):
    '''get a lolly by its ID'''
    # TODO convert the base62 id into an integer for querying
    lolly = query_db('select * from lollies where id = ?', [id], one=True)
    if lolly is None:
        return render_template('melted.html')
    else:
        return render_template('found.html', 
                message=lolly['message'], 
                lolly=lolly['image'])



if __name__ == '__main__':
    app.run()