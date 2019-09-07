from flask import Flask, request
from flask_restful import Resource, Api
import requests #pip install requests
#import PIL.Image #pip install Pillow
from io import BytesIO 

import build_vqa_model
#from build_vqa_model import BuildVQAModel
import pandas as pd
from PIL import Image

app = Flask(__name__)
api = Api(app)

class Predict(Resource):
	def get(self):
		url_name = request.args.get('url')
		question_name = request.args.get('question')
		#fp = open(url_name,"rb")
		#img = PIL.Image.open(fp) 
		#img.show()

		question_name = question_name.replace("%20", " ")
		
		print(question_name)

		image_path = vqa_model.get_actual_image(url_name)

		image = Image.open(image_path)

		scores, predictions = vqa_model.predict(url_name, question_name)
		scores = [score * 100 for score in scores]

		df = pd.DataFrame({
			"Prediction": predictions,
			"Confidence": scores
		})


		print(df)
		df_json = df.to_json(orient="index")
		print(df_json)

		#add model prediction here
		return df_json


api.add_resource(Predict, '/predict')

if __name__ == '__main__':
	vqa_model = build_vqa_model.BuildVQAModel()
	app.run(debug=True)
	#hack_fb 

