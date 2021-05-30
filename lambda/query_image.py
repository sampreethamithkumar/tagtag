import json
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    # TODO implement
    
    # To get all data from table 
    client = boto3.resource("dynamodb")
    table = client.Table("tagtag")       # To get the table from dynamodb
    tableData = table.scan() 
    items = tableData["Items"]
        
    #Handling GET method to get image based on tags
    if event["httpMethod"] == "GET":   
        inputTagsArr = []
        
        # checking if any tag present in request        
        if event["queryStringParameters"] is  not None:
        
            #Getting parameters from thequery string parameters
            if "tag1"  in event["queryStringParameters"]:
                inputTagsArr.append(event["queryStringParameters"]["tag1"])
            if "tag2"  in event["queryStringParameters"]:
                inputTagsArr.append(event["queryStringParameters"]["tag2"])
            if "tag3"  in event["queryStringParameters"]:
                inputTagsArr.append(event["queryStringParameters"]["tag3"])
            if "tag4"  in event["queryStringParameters"]:
                inputTagsArr.append(event["queryStringParameters"]["tag4"])
            if "tag5"  in event["queryStringParameters"]:
                inputTagsArr.append(event["queryStringParameters"]["tag5"])
                       
            #print(tableData)
        
            ret = []
            
            for item in items:
                tagsRet = item["tags"]
                # Checking if all tags input matches tags of image in DB
                if set(inputTagsArr).issubset(set(tagsRet)): 
                    #ret.append(item)
                    ret.append(item["url"])
                
            #print(' '.join(map(str, ret)))
            response = ','.join(map(str, ret))
        #if not tag is present in input, all data is returned
        else:
            itemUrl=[]
            for item in items:
                itemUrl.append(item["url"])
            response =  ','.join(map(str, itemUrl))

    #Handling POST method to update tags of a image based on url
    elif event["httpMethod"] == "POST":
        content = event["body"]
        contentJson = json.loads(content) # Converting JSON string to JSON
        inTags = contentJson["tags"]      # input tags to be updated with
        url = contentJson["url"]          # url of image to update
        
        matchItem = ""
        for item in items:
            if item["url"].strip() == url.strip():
                matchItem = item;         # fetching item based on input image url
        
        if matchItem != "":
            tags = matchItem["tags"]
            # adding new tags to existing tags and removing duplicates
            #updatedTags = list(dict.fromkeys(inTags + tags)) 
            updatedTags = inTags + tags  # Not removing duplicates
            response = table.update_item(
                Key={
                    'id':matchItem['id']
                },
                UpdateExpression="set tags=:t",
                ExpressionAttributeValues={
                    ':t':updatedTags
                },
                ReturnValues="UPDATED_NEW"
                )
        else:
            response = "Image in url not found !!!"
    
    #Method to delete image based on url
    elif event["httpMethod"] == "DELETE":
        response = ""
        if event["queryStringParameters"] is  not None:
            if "url"  in event["queryStringParameters"]:
                url = event["queryStringParameters"]["url"]
                matchItem = ""
                for item in items:
                    if item["url"].strip() == url.strip():
                        matchItem = item
                        break
                try:
                    response = table.delete_item(
                    Key={
                        'id':matchItem['id']
                        },
                    ConditionExpression="#url = :val",
                    ExpressionAttributeValues={
                    ":val": url
                    },
                    ExpressionAttributeNames={
                    "#url": "url"
                    }
                    )
                except ClientError as e:
                    response = e.response
                keyId = "ASIAVBXIU2AMLY25E4ER"
                sKeyId = "ckZA5sLdazDHZj1+r6GYm2ADspKhuagRT+zvh2zo"
                sessionToken = "IQoJb3JpZ2luX2VjEMP//////////wEaCXVzLXdlc3QtMiJIMEYCIQDihck2ZA0bF3trF/ujVXdkXRpLA/c3vNH4Vmah5Ci14gIhAPtKpUq8/NAElrpAZEjpB9Z41JcWx/mqgEFKj6zc9+LDKrQCCGwQABoMMzQ3MzA2NTEyNDA4Igz/CX44swGidjJsxJkqkQKo5hmEAC6ydKHwETnKa0caFImcvnbHm8gGOUDtqeQgHiQt8KDqAvA5MDSRIaC/1EEkliLkA2eVYPTZ/F4kzWTwjivUM2Y/EuCGPJ8GBW81TAw2vYjRsBGid0CY36KCLpsLCmGjH7rrU93cilIvYioRJxeub5w74ixC8fJW4e1hwbe7Z5iS9vGuuVsmBq0zWMltSp8BrqqlCIMInEZlaFHON441vO0VJRHylCAYITtUdrs/Si/nu4+lUwBkqRSLRnW8TYp2yKSMSyCd89sodR7ceh70yXYHiMV5W8FnxisAAQ6iVPLl6EsVKPOyw24E7Os14MsHvzqQr592xNHhMUoqtkQfKljciJCxGtTp7nqIO6ww4uDGhQY6nAEL8x95L1ZC713/NNKgQ+TKc4VMFJDKL8g3NVQTTmHZHkO66tZRnAJ771W6k+aof8+NLwL111dYPsXdmRXSQ0VtzCUMkqLmJAReb3k+iAeJ1s4gBJBEwvNjEOWmZBFRcxr2XjqPkfD+rTupUUkP3cZ/4EVtlgNdroIuY7o7qGWllr8w/Zs3tvwafa2GRJH1adRaNRqy4eNSH3Z9yc4="
                srcFileName=url.split('/')[-1] #Name of the file to be deleted
                bucketName="tagtag-image-storage" #Name of the bucket, where the file resides
                client = boto3.client('s3',aws_access_key_id=keyId,aws_secret_access_key=sKeyId,aws_session_token=sessionToken) #Connect to S3
                delete_response = client.delete_object(Bucket=bucketName,Key=srcFileName)
                
            else:
                response = "Image Deleted"
            
        
        
       
    return {
        'statusCode': 200,
        'body':json.dumps(response)
    }
