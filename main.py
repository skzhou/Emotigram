from flask import Flask, render_template, request, jsonify
import os
import base64
import face

app = Flask(__name__)
# app.config.from_object('config')


@app.route('/')
@app.route('/index')
@app.route('/home')
def home():
	return render_template('index2.html')

@app.route('/upload', methods = ['POST', 'GET'])
def get_post_javascript_data():
	url = str(request.form['url'])
	image_64_decode = base64.decodestring(url[22:]) 
	img_name = 'decoded.png'
	image_result = open(img_name, 'wb') # create a writable image and write the decoding result
	image_result.write(image_64_decode)
	data = face.face_cognition(img_name)
	if data == None:
		return jsonify({ 'emotion': 'none' })
	emotions = data['faceAttributes']['emotion']
	c = 0
	max_emotion = 'none'
	for e in emotions.keys():
		if emotions[e] > c:
			c = emotions[e]
			max_emotion = e
	return jsonify({ 'emotion': max_emotion })

# @app.route('/get_img')
# def get_post_javascript_data():
# 	request.args.get('url', '', type=str)


if __name__ == '__main__':
	app.run(debug=True);
