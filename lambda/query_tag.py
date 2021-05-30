import json
import boto3

# Initialize AWS resources
DYNAMODB = boto3.resource("dynamodb")
LAMBDA = boto3.client("lambda")

def lambda_handler(event, context):
    
    '''
    Task 01: Read the event generated by lambda proxy
        - Extract the Image ID
        - Extract the Image Body
    '''
    # tagtag_image_body = event['queryStringParameters']['imageBody'] # will be base64
    tagtag_image_body_string = event['body'] # will be base64

    contentJson = json.loads(tagtag_image_body_string)
    
    tagtag_image_body = contentJson['image']
    
    '''
    Task 02: Detect the tags from the uploaded image
        - Get the image as base64
        - Pass the base64 string to detect_objects
        - Store the detected labels as tags
    '''
    try:
        # get the image as base64 from REST API
        image_base64 = tagtag_image_body

        # create lambda request for object detection
        object_detection_request = {
            "EventType": "Enrol Image",
            "Image"    : image_base64
        }

        # send the request to lambda function: detect_objects
        object_detection_response = LAMBDA.invoke(
            FunctionName = 'arn:aws:lambda:us-east-1:347306512408:function:detect_objects',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(object_detection_request)
        )
        # receive the response from lambda function: detect_objects
        enrol_image_response = json.load(object_detection_response['Payload'])

    except Exception as e:
        print(e)
        print('Error invoking detect_objects lambda function from query_tags lambda function.')
        raise e

    #####################TASK03####################
    '''
    Task 03: Get all the URLs for images similar to the uploaded image
        - Get all the tags enrolled to DynamoDB
        - Get the subset of tags match the tags from the image uploaded
        - Get the URLs from the images with the matching tags
    '''
    try:
        # get the table of tags from DynamoDB
        table = DYNAMODB.Table("tagtag")
        tableData = table.scan() 
        items = tableData["Items"]

        # list of the urls of all the images with matching tags
        similar_image_urls = [] 

        # parse through the list of tags already enrolled
        for item in items:
            tagsRet = item["tags"]
            # check if all tags input matches tags of image in DB
            if set(enrol_image_response).issubset(set(tagsRet)): 
                similar_image_urls.append(item["url"])
         
    except Exception as e:
        print(e)
        print('Error getting tags from DynamoDB {}. Make sure they exist and your DynamoDB is in the same region as this function.'.format("tagtag"))
        raise e 
               
    ###################ep##TASK03####################
    '''
    Task 04: Generate the response of this lambda function
        - Return a JSON of all the image URLs extracted in Task 03
        - What if it does not have any matching tags?
    '''
    response = ','.join(map(str, similar_image_urls))
    return {
        'statusCode': 200,
        'body':json.dumps(response)
        # 'body':json.dumps(enrol_image_response)
        # 'body': tagtag_image_body
    }

            