import sys
import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt
# import tensorflow as tf
#import cv2

sys.path.append('src')
from ocr.normalization import word_normalization
from ocr import page, words
#from ocr.helpers import implt, resize
from ocr.tfhelpers import Model
from ocr.datahelpers import idx2char

IMG = 'data/test4.jpg'    # 1, 2, 3
LANG = 'en'
# You can use only one of these two
# You HABE TO train the CTC model by yourself using word_classifier_CTC.ipynb
#MODEL_LOC_CHARS = f'../models/char-clas/{LANG}/CharClassifier'
MODEL_LOC_CTC = 'models/word-clas/CTC/Classifier1'

#CHARACTER_MODEL = Model(MODEL_LOC_CHARS)
CTC_MODEL = Model(MODEL_LOC_CTC, 'word_prediction')
def recognise(img):
    """Recognising words using CTC Model."""
    img = word_normalization(
        img,
        64,
        border=False,
        tilt=False,
        hyst_norm=False)
    length = img.shape[1]
    # Input has shape [batch_size, height, width, 1]
    input_imgs = np.zeros(
            (1, 64, length, 1), dtype=np.uint8)
    input_imgs[0][:, :length, 0] = img

    pred = CTC_MODEL.eval_feed({
        'inputs:0': input_imgs,
        'inputs_length:0': [length],
        'keep_prob:0': 1})[0]

    word = ''
    for i in pred:
        word += idx2char(i + 1)
    return word

# implt(crop)
def predict(image):
    # image = cv2.cvtColor(cv2.imread(IMG), cv2.COLOR_BGR2RGB)
    # implt(image)
    # Crop image and get bounding boxes
    crop = page.detection(image)
    # implt(crop)
    boxes = words.detection(crop)
    lines = words.sort_words(boxes)
    result=""
    for line in lines:
        #print(" ".join([recognise(crop[y1:y2, x1:x2]) for (x1, y1, x2, y2) in line]))
        result=result+(" ".join([recognise(crop[y1:y2, x1:x2]) for (x1, y1, x2, y2) in line]))
        result=result+"\n"
    return result