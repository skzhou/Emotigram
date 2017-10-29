from flask import Flask, render_template, request
import os
import base64
from PIL import Image
from io import BytesIO

app = Flask(__name__)
# app.config.from_object('config')


@app.route('/')
@app.route('/index')
@app.route('/home')
def home():
	return render_template('index.html')

@app.route('/upload', methods = ['POST'])
def get_post_javascript_data():
	url = str(request.form['url'])
	print(url)
	# img_data = url
	# with open("imageToSave.png", "wb") as fh:
	# 	fh.write(base64.decodebytes(img_data))
	im = Image.open(BytesIO(base64.b64decode(url[22:])))
	return ('', 204)

# @app.route('/get_img')
# def get_post_javascript_data():
# 	request.args.get('url', '', type=str)


if __name__ == '__main__':
	app.run(debug=True);
