//送出文字訊息的function
function sendTextMessage(recipientId, messageText)
{
   var url = "https://us-central1-hahamut-8888.cloudfunctions.net/messagePush?access_token="+ACCESS_TOKEN;
   
    var response = UrlFetchApp.fetch(url, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      'method': 'post',
      'payload': JSON.stringify({
        'recipient':{
          'id': recipientId
        },
        'message':{
          'type': 'text',
          'text': messageText
        }
      }),
    });
   
    Logger.log(response);
}

//送出貼圖訊息的function
function sendStickerMessage(recipientId, stickerGroup, stickerID)
{
   var url = "https://us-central1-hahamut-8888.cloudfunctions.net/messagePush?access_token="+ACCESS_TOKEN;
   
    var response = UrlFetchApp.fetch(url, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      'method': 'post',
      'payload': JSON.stringify({
        'recipient':{
          'id': recipientId
        },
        'message':{
          'type': 'sticker',
          'sticker_group': stickerGroup,
          'sticker_id': stickerID
        }
      }),
    });
   
    Logger.log(response);
}


//送出特殊介面訊息的function
function sendExMessage(jsonData)
{
  
   var url = "https://us-central1-hahamut-8888.cloudfunctions.net/messagePush?access_token="+ACCESS_TOKEN;
   
    var response = UrlFetchApp.fetch(url, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      'method': 'post',
      'payload': jsonData
    });
  
    Logger.log(response);
}


function exMessage(senderID, messageObj)
{
  var jsonData = {};
  var recipient = {}; //回覆對象的物件
  
  recipient["id"] = senderID;
  jsonData["recipient"] = recipient;
  jsonData["message"] = messageObj;
    
  jsonData = JSON.stringify(jsonData);
  return jsonData;
}

function textMessageObj(messageText)
{
  var message = {}; //回覆訊息物件
  message["type"] = "text";
  message["text"] = messageText;
  
  return message;
}

function stickerMessageObj(stickerGroup, stickerID)
{
  var message = {}; //回覆訊息物件
  message["type"] = "sticker";
  message["sticker_group"] = stickerGroup;
  message["sticker_id"] = stickerID;
  
  return message;
  
}

function imageMessageObj(imageID, imageExt, imageWidth, imageHeight)
{
  var message = {}; //回覆訊息物件
  message["type"] = "img";
  message["id"] = imageID;
  message["ext"] = imageExt;
  message["width"] = imageWidth;
  message["height"] = imageHeight;
  
//  Logger.log(message);
  
  return message;
}

function botStartMessageObj(sImageID, sImageExt, initObj)
{
  var message = {}; //回覆訊息物件
  message["type"] = "botStart";
  message["start_img"] = sImageID + '.' + sImageExt; //start_img 要是一個字串
  message["init"] = initObj; 
  
  return message;
}

function setInitObj(imageObj, hpObj, textObj, buttonObj)
{
  var initObj = {}; //物件，一開始看到的特殊介面

  
  initObj["image"] = imageObj;
  initObj["hp"] = hpObj;
  initObj["text"] = textObj;
  initObj["button"] = buttonObj;
  
  return initObj;
}

function botEventMessageObj(eventID, changeObj)
{
  var message = {}; //回覆訊息物件
  message["type"] = "botEvent";
  message["event_id"] = eventID; //event_id 要是一個字串
  
  message["image"] = changeObj.image;
  message["hp"] = changeObj.hp;
  message["text"] = changeObj.text;
  message["button"] = changeObj.button;
  
  Logger.log(message);
  
  return message;
}

function setImageObj(imageID, imageExt, hidden)
{
  
  if(hidden)
  {
    var imageObj = {};//回覆圖片物件，因為hidden要放物件裡
    imageObj["hidden"] = hidden;
    return imageObj;
  }
  else
  {
    var image;
    image = imageID + '.' + imageExt; //image 要是一個字串
    return image;
  }
}

function setHpObj(maxHp, currentHp, hpColor, hidden)
{
  var hpObj = {}; //hp物件
  
  if(hidden)
  {
    hpObj["hidden"] = hidden;
    return hpObj;
  }
  else
  {
    hpObj["max"] = maxHp; //max 是一個數字值
    hpObj["current"] = currentHp; //current 是一個數字值
    hpObj["color"] = hpColor;  //color 是一個字串
  }

  
  return hpObj;
}

function setTextObj(message, backgroundColor, hidden)
{
  var textObj = {}; //文字物件
  if(hidden)
  {
    textObj["hidden"] = hidden;
    return textObj;
  }
  else
  {
    textObj["message"] = message;
    textObj["color"] = backgroundColor; //color 是一個字串
  }

  
  return textObj;
}

function setButtonObj(buttonStyle, buttonSetting, hidden)
{
  var buttonObj = {}; //文字物件
  if(hidden)
  {
    buttonObj["hidden"] = hidden;
    return buttonObj;
  }
  else
  {
    buttonObj["style"] = buttonStyle; // style 是一個數字值
    buttonObj["setting"] = buttonSetting; // setting 是一個array

  }
  
  
  return buttonObj;
}

function addButton(buttonArray, isDisabled, buttonText, buttonCommand)
{
  var bSettings = {}; //每個按鈕的設定物件
  bSettings["disabled"] = isDisabled; // disabled 是一個布林值
  bSettings["order"] = buttonArray.length; // order 是一個數字值， buttonArray 是一個array
  bSettings["text"] = buttonText;  // text 是一個字串
  bSettings["command"] = buttonCommand;  // command 是一個字串


  buttonArray.push(bSettings);
  
  
  return buttonArray;
}

function test()
{
  

}
