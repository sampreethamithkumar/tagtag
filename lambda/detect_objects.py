import json
import boto3
import cv2
import numpy as np
import base64
import os
import copy
import time
import sys
import uuid
import botocore
import boto3

# Initialize AWS resources
S3 = boto3.client('s3')

# Bucket to store the YOLOv3
BUCKET_NAME = "tagtag-configuration-files"

# List of YOLOv3 configuration files
CONFIGS = ['yolo-tiny-configs/coco.names', 'yolo-tiny-configs/yolov3-tiny.cfg', 'yolo-tiny-configs/yolov3-tiny.weights']

# Create directory to store the files downloaded from S3
if not os.path.exists('/tmp/yolo-tiny-configs'):
    os.makedirs('/tmp/yolo-tiny-configs')

for CONFIG in CONFIGS:
    try:
        FILE_NAME = '/tmp/'+ CONFIG
        S3.download_file(BUCKET_NAME, CONFIG, FILE_NAME)
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(CONFIG, BUCKET_NAME))
        else:
            raise

# Paths on drive
LABELS_PATH = "/tmp/yolo-tiny-configs/coco.names"
CONFIG_PATH = "/tmp/yolo-tiny-configs/yolov3-tiny.cfg"
WEIGHTS_PATH = "/tmp/yolo-tiny-configs/yolov3-tiny.weights"

# Thresholds
CONF_THRES = 0.3
NUMS_THRES = 0.1

# load the COCO class labels our YOLO model was trained on
def get_labels(labels_path):
    LABELS = open(labels_path).read().strip().split("\n")
    return LABELS

# derive the paths to the YOLO weights
def get_weights(weights_path):
    return weights_path

# derive the paths to the YOLO model configuration
def get_config(config_path):
    return config_path

# load our YOLO object detector trained on COCO dataset (80 classes)
def load_model(configpath,weightspath):
    print("[INFO] loading YOLO from disk...")
    net = cv2.dnn.readNetFromDarknet(configpath, weightspath)
    return net

# funciton to predict the objects from the images
def do_prediction(image,net,LABELS):

    (H, W) = image.shape[:2]
    # determine only the *output* layer names that we need from YOLO
    ln = net.getLayerNames()
    ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

    # construct a blob from the input image and then perform a forward
    # pass of the YOLO object detector, giving us our bounding boxes and
    # associated probabilities
    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
                                 swapRB=True, crop=False)
    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)
    #print(layerOutputs)
    end = time.time()

    # show timing information on YOLO
    print("[INFO] YOLO took {:.6f} seconds".format(end - start))

    # initialize our lists of detected bounding boxes, confidences, and
    # class IDs, respectively
    boxes = []
    confidences = []
    classIDs = []

    # initialize the prediction template
    pred_objects = []
    pred_rectangle = {
        "height": None,
        "left": None,
        "top": None,
        "width": None
    }


    # loop over each of the layer outputs
    for output in layerOutputs:
        # loop over each of the detections
        for detection in output:
            # extract the class ID and confidence (i.e., probability) of
            # the current object detection
            scores = detection[5:]
            # print(scores)
            classID = np.argmax(scores)
            # print(classID)
            confidence = scores[classID]

            # filter out weak predictions by ensuring the detected
            # probability is greater than the minimum probability
            if confidence > CONF_THRES:
                # scale the bounding box coordinates back relative to the
                # size of the image, keeping in mind that YOLO actually
                # returns the center (x, y)-coordinates of the bounding
                # box followed by the boxes' width and height
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")

                # use the center (x, y)-coordinates to derive the top and
                # and left corner of the bounding box
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                # update our list of bounding box coordinates, confidences,
                # and class IDs
                boxes.append([x, y, int(width), int(height)])

                confidences.append(float(confidence))
                classIDs.append(classID)

    # apply non-maxima suppression to suppress weak, overlapping bounding boxes
    idxs = cv2.dnn.NMSBoxes(boxes, confidences, CONF_THRES,
                            NUMS_THRES)

    if len(idxs) > 0:
        # loop over the indexes we are keeping
        for i in idxs.flatten():

            pred_objects.append(LABELS[classIDs[i]])

    return pred_objects

# Convert the base64 string into numpy array for OpenCV to read
def readb64(base64_string):
    image_bytes = base64.b64decode(base64_string.encode("ascii"))
    np_array = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    return img

# Load the dowloaded configuration files
Lables = get_labels(LABELS_PATH)
CFG = get_config(CONFIG_PATH)
Weights = get_weights(WEIGHTS_PATH)

# Lambda function to call the handler
def lambda_handler(event, context):

    nets = load_model(CFG, Weights)
    try:
        image_base64 = event['Image']
        np_image = readb64(image_base64)
        image = np_image.copy()
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        return do_prediction(image, nets, Lables)
    except Exception as e:
        print(e)
        print('detect_objects.py: Error getting object from event. Make sure they exist and your bucket or api is in the same region as this function.')
        raise e
