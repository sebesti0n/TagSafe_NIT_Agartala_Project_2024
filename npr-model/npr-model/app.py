from flask import Flask, jsonify, request
from ultralytics import YOLO
from pymongo import MongoClient
import os
import time
from datetime import datetime
import pytz
from dotenv import load_dotenv


app = Flask(__name__)
load_dotenv()
uri = os.getenv("MONGO_URI")
client = MongoClient(uri) 
db = client.camDetails 
collection = db.predictedData
base_dir = os.getcwd()

    
@app.route('/predict',methods=['POST'])
def index():
    try:
        cam_id = request.form.get('camID')
        longitude = request.form.get('longitude')
        latitude = request.form.get('latitude')
        image_file = request.files['image']
        image_file.save(f"uploads/{image_file.filename}")
        print('TAG',image_file.filename)
        directory_path = os.path.join(base_dir+'/results')
        initial_files = set(os.listdir(directory_path))
        india_timezone = pytz.timezone('Asia/Kolkata')
        utc_now = datetime.utcnow()
        india_time = utc_now.replace(tzinfo=pytz.utc).astimezone(india_timezone)
        yolo = YOLO('best.pt')
        image = os.path.join(base_dir+'/uploads/'+image_file.filename)
        detection = yolo.predict(image,save=True)
        print(detection)
        os.remove(image)
        updated_files = set(os.listdir(directory_path))
        new_files = updated_files - initial_files
        if new_files:
            print("New files detected:")
            for new_file in new_files:
                path = os.path.join(directory_path, new_file)
                with open(path,'r') as file:
                    text_ocr=file.read()
                    license_plate_text=str(text_ocr)

                    data = {
                        'licensePlate':license_plate_text,
                        'camID':cam_id,
                        'latitude':latitude,
                        'longitude':longitude,
                        'timestamp':str(india_time.strftime("%Y-%m-%d %H:%M:%S"))
                    }
                    collection.insert_one(data)
                os.remove(str(path))
                initial_files = updated_files
        else:
            print('No new Files Detected')
        return jsonify({"message": "Image uploaded successfully!"}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Internal Server Error!"}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
