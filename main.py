from flask import Flask, render_template, request
import os

app = Flask(__name__)
# app.config.from_object('config')


@app.route('/')
@app.route('/index')
@app.route('/home')
def home():
	return render_template('index.html')

@app.route('/upload', methods = ['POST'])
def get_post_javascript_data():
    jsdata = request.form['data']
    print("asdfasdfs")
    return ('', 204)


if __name__ == '__main__':
	app.run(debug=True);
