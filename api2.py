from flask import Flask, request
from flask_restful import Resource, Api
import requests #pip install requests
import PIL.Image #pip install Pillow
from io import BytesIO 

app = Flask(__name__)
api = Api(app)

class Predict(Resource):
	def get(self):
		url_name = request.args.get('url')
		fp = open(url_name,"rb")
		img = PIL.Image.open(fp) 
		#img.show()

		#add model prediction here


api.add_resource(Predict, '/predict')

if __name__ == '__main__':
    app.run(debug=True)

"# hack_fb" 
