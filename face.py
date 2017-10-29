import cognitive_face as CF
import httplib, urllib, base64, requests, json
import os

KEY = '91004f08c5ab47989e1ec0c7720e2dfb'  # Replace with a valid subscription key (keeping the quotes in place).
BASE_URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/'

def parse_image(image):
    """Parse the image smartly and return metadata for request.
    First check whether the image is a URL or a file path or a file-like object
    and return corresponding metadata.
    Args:
        image: A URL or a file path or a file-like object represents an image.
    Returns:
        a three-item tuple consist of HTTP headers, binary data and json data
        for POST.
    """
    if hasattr(image, 'read'):  # When image is a file-like object.
        headers = {'Content-Type': 'application/octet-stream'}
        data = image.read()
        return headers, data, None
    elif os.path.isfile(image):  # When image is a file path.
        headers = {'Content-Type': 'application/octet-stream'}
        data = open(image, 'rb').read()
        return headers, data, None
    else:  # Default treat it as a URL (string).
        headers = {'Content-Type': 'application/json'}
        json = {'url': image}
        return headers, None, json

def face_cognition(image):
	params = {
	'returnFaceId': 'true',
	'returnFaceLandmarks': 'false',
	'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
	}
	headers,data,js = parse_image(image)
	headers['Ocp-Apim-Subscription-Key'] = KEY
	# response = requests.request('POST', BASE_URL, params=params, data=data, json=json, headers=headers)
	try:
		# Execute the REST API call and get the response.
		if (js == None):
			response = requests.request('POST', BASE_URL+ 'detect' , data=data, json=None, headers=headers, params=params)
		else:
			response = requests.request('POST', BASE_URL+ 'detect' , data=None, json=js, headers=headers, params=params)
		print('Response:')
		parsed = json.loads(response.text)[0]
		print(parsed['faceAttributes']['emotion'])
		return parsed
		# print (json.dumps(parsed, sort_keys=True, indent=2))
	except Exception as e:
	    print('Error:')
	    print(e)

