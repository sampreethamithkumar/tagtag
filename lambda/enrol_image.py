import json
import boto3
from urllib.parse import unquote_plus
import base64
import os
import copy
import time
import sys
import botocore
import uuid
import datetime
from decimal import Decimal

# Initialize AWS resources
S3 = boto3.client('s3')
DYNAMODB = boto3.resource("dynamodb")
LAMBDA = boto3.client("lambda")

# URL to access image bucket
BUCKET_URL = "https://tagtag-image-storage.s3.amazonaws.com"

def lambda_handler(event, context):
    # Get event information
    tagtag_image_storage = event['Records'][0]['s3']['bucket']['name']
    tagtag_image_key = event['Records'][0]['s3']['object']['key']
    tagtag_image_url = os.path.sep.join([BUCKET_URL, tagtag_image_key])
    try:
        upload_response = S3.get_object(Bucket=tagtag_image_storage, Key=tagtag_image_key)
        image_bytes = upload_response['Body'].read()
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')

        object_detection_request = {
            "EventType": "Enrol Image",
            "Image"    : image_base64
        }

        object_detection_response = LAMBDA.invoke(
            FunctionName = 'arn:aws:lambda:us-east-1:347306512408:function:detect_objects',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(object_detection_request)
        )

        enrol_image_response = {
            'name': tagtag_image_key,
            'url': tagtag_image_url,
            'tags': json.load(object_detection_response['Payload'], parse_float=Decimal)
        }

        write_tags(enrol_image_response)
        return enrol_image_response

    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(tagtag_image_key, tagtag_image_storage))
        raise e

def convert_datetime(date_time):
    if isinstance(date_time, datetime.datetime):
        return date_time.__str__()

def write_tags(enrol_image_response):

    response=""
    id = str(uuid.uuid4()) # Generating id for data

    try:
        table = DYNAMODB.Table("tagtag")    # To get the table from dynamodb
        response = table.put_item(
           Item={
                'id':id,
                'tags': enrol_image_response['tags'],
                'url': enrol_image_response['url'],
                }
        )
        print("response",response)
    except Exception as e:
        response = e
        print("exception",e)
    return response

