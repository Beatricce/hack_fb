import build_vqa_model
#from build_vqa_model import BuildVQAModel
import pandas as pd
from PIL import Image

vqa_model = build_vqa_model.BuildVQAModel()

image_text = "http://images.cocodataset.org/train2017/000000505539.jpg"

question_text = "where is this place?"

image_path = vqa_model.get_actual_image(image_text)

image = Image.open(image_path)

scores, predictions = vqa_model.predict(image_text, question_text)
scores = [score * 100 for score in scores]

df = pd.DataFrame({
    "Prediction": predictions,
    "Confidence": scores
})

print(df)
