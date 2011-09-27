from flask import Flask, url_for
app = Flask(__name__)
app.debug = True



@app.route('/')
def home():
    '''home page'''
    return 'home page'

@app.route('/make')
def make():
    '''make your lolly'''
    return 'make'

@app.route('/mint', methods=['POST'])
def mint():
    '''Mint a URI for a new lolly'''
    return 'mint'

@app.route('/<id>')
def get_lolly(id):
    '''get a lolly by its ID'''
    return id


if __name__ == '__main__':
    app.run()