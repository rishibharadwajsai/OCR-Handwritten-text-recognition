# from flask import Flask , render_template

# app = Flask(__name__)

# @app.route('/',methods=['GET'])
# def index():
#     return render_template("index_1.html")
# if __name__=="__main__":
#     app.run(port=3000,debug=True)
from flask import Flask, render_template, request
import os
import main
import cv2
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/index', methods=['GET'])
def rediret():
    return render_template('index.html')
    
@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the uploaded file
        file = request.files['file']
        file_path = "./static/"+file.filename
        # Save the file to a folder
        file.save(os.path.join('static', file.filename))
        image = cv2.cvtColor(cv2.imread(file_path), cv2.COLOR_BGR2RGB)
        result = main.predict(image)
        if len(result)==0:
            result="empty"
        #print(result)
        # Redirect to a success page
        #return redirect(url_for('index'),prediction=result)
        os.remove(file_path)
        return render_template('output.html',prediction=result)
    return render_template('upload.html')

if __name__ == '__main__':
    app.run(port=3000,debug=True)
