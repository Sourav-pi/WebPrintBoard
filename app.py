from flask import Flask, request, jsonify, send_from_directory,session
import requests
from ttgLib.TextToGcode import ttg

app = Flask(__name__, static_url_path='', static_folder='static')
app.secret_key ='sourav'


@app.route('/')
def index():
    session['gcode'] = '#unknown'
    session['last_text'] = 'NA'
    return send_from_directory('static', 'index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    user_input = data.get('text')

    gcodeList = ttg(user_input,1,0,"return",1).toGcode("M02 S500","M05 S0","G0","G1")
    gcode=''
    for i in gcodeList: gcode+=i+'\n'
    gcode=gcode.rstrip()
    session['gcode'] = gcode

    session["last_text"] = user_input
    print('Received input:', user_input)
    print('GCODE :',gcode)
    return jsonify({'message': f'You submitted: {user_input} \n GCODE : {gcode}'})

@app.route('/data/')
def message():
    return jsonify({'text': session['gcode']})

@app.route('/last_text/')
def last_text():
    return jsonify({'last_text': session['last_text']})



if __name__ == '__main__':
    app.run(port=8080,debug=True)
