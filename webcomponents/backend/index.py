import main
import cv2
import sys
sys.path.append('src')
#from ocr.helpers import implt

image = cv2.cvtColor(cv2.imread('data/test3.jpg'), cv2.COLOR_BGR2RGB)
#implt(image)
text = main.predict(image)
print(text)