var ACCESS_TOKEN = '貼上你的哈哈姆特ACCESS_TOKEN'; //引號內貼上你的ACCESS_TOKEN
var sheetID = "貼上你的google表單id";  //引號內貼上你的google表單id
var CName = '貼上你的哈哈姆特指令代號'; //引號內貼上你的指令代號
var imageId ='貼上你的圖片Id';
var imageExt ='貼上你的圖片Ext';

function doPost(e) {

  var data = JSON.parse(e.postData.contents);
  console.log(data);
  var webhook_event = data.messaging[0];
  var senderID = data.messaging[0].sender_id; //把使用者id抓出來
  var eventID = data.messaging[0].message.event_id; //把server給的特殊介面event抓出來
  var botCommand = data.messaging[0].message.bot_command; //把使用者按下的按鈕對應指令抓出來
  var reciveMessage = data.messaging[0].message.text; //把使用者丟給bot的文字抓出來
  
  Users(senderID); //記錄使用者
  
  if(reciveMessage)
  {
   replyMessage(senderID, reciveMessage); //呼叫判斷
  }
  else if(eventID)
  {
    doExCommand(senderID, eventID, botCommand); //表示有收到互動介面的事件，要對互動介面做更動
  }
  else
  {
    console.log("request fail");
  }
  
  return ContentService.createTextOutput("200 OK");
}

function replyMessage(senderID, reciveMessage)
{
  var endReply = "May the force be with you.";
  
  if(reciveMessage.indexOf("約嗎")>-1)
  { 
    sendStickerMessage(senderID,"13","06");
  }

  if(reciveMessage == CName||reciveMessage == "養成")
  {
    var messageText = "點擊圖片進行互動";
    sendTextMessage(senderID, messageText);
    startMenu(senderID); //互動介面
  }
  else
  {
    sendTextMessage(senderID, endReply);
  }
}


function startMenu(senderID) 
{
  var initMessage ='餵我吃飯，或是訓練我～'; //在這輸入主選單要出現的字 
  var textObj = setTextObj(initMessage, "#019BAD", false);  // 在這裏設定文字欄位，分別代表： (文字,文字欄位的顏色,是否隱藏文字欄位)。 
  
  var hpObj = setHpObj(100, 0,"#FF0000", true);  // 在這裏設定血條，分別代表： (血條最大值,目前值,顏色,是否隱藏血條)。 這裡設為隱藏，要有動作血條才會出現
  
  var imageObj = setImageObj(imageId, imageExt, false); // 在這裏設定圖片，分別代表： (圖片id,圖片檔名,是否隱藏圖片)。 
   
  
  var button =[]; //指令button
  button = addButton(button, false, "餵食", "FeedFood");  // 在這裏增加按鈕，分別代表： (按鈕陣列, 是否關閉按鈕, 按鈕上面的文字, 點擊按鈕對應的指令)。 
  button = addButton(button, false, "訓練", "Training");     // 加上上面，一共加了兩顆按鈕 分別代表 餵食 和 訓練
  
  if(getUserCatBp(senderID)=="")
  {
    setUserCatHp(senderID, 0); // 如果是第一次使用的人就幫他建起來資料
    setUserCatBp(senderID, 0); // 如果是第一次使用的人就幫他建起來資料
    setUserCatLv(senderID, 0); // 如果是第一次使用的人就幫他建起來資料
  }
  
  var buttonObj = setButtonObj(1, button, false);   //在這裏設定按鈕，分別代表： (橫式或是直式按鈕,按鈕陣列，是否隱藏)。
  
  var initObj = setInitObj(imageObj, hpObj, textObj, buttonObj); //打包
  
  var messageObj = botStartMessageObj(imageId, imageExt, initObj); //打包
  var jsonData = exMessage(senderID, messageObj); //打包
  
  sendExMessage(jsonData); //送出去給哈哈姆特伺服器
 
}

// 這裡判斷使用者是按下哪個按鈕，並且到對應要顯示的畫面，
// 可以此類推在這裡加判斷，然後在下面加function

function doExCommand(senderID, eventID, botCommand)
{
   if(botCommand.indexOf(";")>-1)
  {
    var command2 = '';
   
    command2 = botCommand.slice(botCommand.indexOf(";")+1);
    botCommand = botCommand.slice(0,botCommand.indexOf(";"));
   
  }
  
  switch(botCommand) {
     case "mainMenu":
        mainMenu(senderID, eventID); //呼叫主選單
        break;
     case "FeedFood": 
        FeedFood(senderID, eventID); //呼叫 餵食
        break;
     case "Feed": 
        Feed(senderID, eventID, command2); //餵了食物之後的行為
        break;
     case "Training":
        Training(senderID, eventID); //呼叫 訓練
        break;
     case "Train":
        Train(senderID, eventID, command2); //選擇了訓練 之後的行為
        break;
     case "sticker":
        sticker(senderID, eventID); //到達３級以上的功能，這裡是發貼圖
        break;
     default:
        sendTextMessage(senderID, "收到回應");
  }

}

// 這裡畫出主選單要有的元件
function mainMenu(senderID, eventID)
{
  var lv = parseInt(getUserCatLv(senderID));
  var initMessage ="你的貓貓目前等級："+lv+"   訓練來提昇等級！"; //在這輸入主選單要出現的字 
  var textObj = setTextObj(initMessage, "#019BAD", false);  // 在這裏設定文字欄位，分別代表： (文字,文字欄位的顏色,是否隱藏文字欄位)。 
  
  var hpObj = setHpObj(100, 0,"#FF0000", true);  // 在這裏設定血條，分別代表： (血條最大值,目前值,顏色,是否隱藏血條)。 這裡設為隱藏，要有動作血條才會出現
  
  var imageObj = setImageObj(imageId, imageExt, false); // 在這裏設定圖片，分別代表： (圖片id,圖片檔名,是否隱藏圖片)。 
   
  var button =[]; //指令button
  button = addButton(button, false, "餵食", "FeedFood");  // 在這裏增加按鈕，分別代表： (按鈕陣列, 是否關閉按鈕, 按鈕上面的文字, 點擊按鈕對應的指令)。 
  button = addButton(button, false, "訓練", "Training");     // 加上上面，一共加了兩顆按鈕 分別代表 餵食 和 訓練
  
  //這裡是當寵物等級超過３級，就會出現新的按鈕
  if(lv >=3)
  {
     button = addButton(button, false, "貼圖", "sticker");     // 加上上面，一共加了兩顆按鈕 分別代表 餵食 和 訓練
  }
 
  var buttonObj = setButtonObj(1, button, false);   //在這裏設定按鈕，分別代表： (橫式或是直式按鈕,按鈕陣列，是否隱藏)。
  
  var changeObj  ={}; //需要變動的obj，把要變動的元件塞給它
  changeObj["image"] = imageObj;
  changeObj["hp"] = hpObj;
  changeObj["text"] = textObj;
  changeObj["button"] = buttonObj;

  var messageObj = botEventMessageObj(eventID, changeObj); //打包此次事件要變動的元件
  var jsonData = exMessage(senderID, messageObj); //把要回傳的全打包成json
  
  sendExMessage(jsonData);
}

// 這裡畫出“餵食”畫面要有的元件
function FeedFood(senderID, eventID)
{
  
  var initMessage ="你的貓貓很餓！";
  var textObj = setTextObj(initMessage, "#019BAD", false); 
  
  var button =[]; //指令button 
  button = addButton(button, false, "牛肉麵", "Feed;"+"牛肉麵");   
  button = addButton(button, false, "臭豆腐", "Feed;"+"臭豆腐");
  button = addButton(button, false, "蛤仔煎", "Feed;"+"蛤仔煎");
  var buttonObj = setButtonObj(1, button, false);   
  
  var changeObj  ={}; //需要變動的obj，把要變動的元件塞給它
  changeObj["text"] = textObj;
  changeObj["button"] = buttonObj;

  var messageObj = botEventMessageObj(eventID, changeObj); //打包此次事件要變動的元件
  var jsonData = exMessage(senderID, messageObj); //把要回傳的全打包成json
  
  sendExMessage(jsonData);
}

// 這裡畫出 餵了什麼食物，之後的畫面
function Feed(senderID, eventID, botCommand)
{
  
  var initMessage ="你餵食了 "+botCommand;
  var textObj = setTextObj(initMessage, "#019BAD", false);  
  
  var hp = getUserCatHp(senderID);
  hp = parseInt(hp);
  hp = hp + 10;
  if(hp > 100) hp = 100;
  var hpObj = setHpObj(100, hp,"#FF0000", false);
  
  setUserCatHp(senderID, hp); //把貓貓的血量記錄下來
  
  var button =[]; //指令button 
  button = addButton(button, false, "繼續餵食", "FeedFood");  
  button = addButton(button, false, "回主畫面", "mainMenu");
  var buttonObj = setButtonObj(1, button, false);   
  
  var changeObj  ={}; //需要變動的obj，把要變動的元件塞給它
  changeObj["button"] = buttonObj;
  changeObj["hp"] = hpObj;
  changeObj["text"] = textObj;

  var messageObj = botEventMessageObj(eventID, changeObj); //打包此次事件要變動的元件
  var jsonData = exMessage(senderID, messageObj); //把要回傳的全打包成json
  
  sendExMessage(jsonData);
}

// 這裡畫出“訓練”畫面要有的元件
function Training(senderID, eventID)
{

  var initMessage = "要做什麼訓練好呢?";
  var textObj = setTextObj(initMessage, "#4A90E2", false);   
  
  var button =[]; //指令button
   
  button = addButton(button, false, "跳格子", "Train;"+"跳格子");   
  button = addButton(button, false, "抓魚", "Train;"+"抓魚");
  button = addButton(button, false, "玩耍", "Train;"+"玩耍");
  var buttonObj = setButtonObj(1, button, false);   
  
  var changeObj  ={}; //需要變動的obj，把要變動的元件塞給它
  changeObj["text"] = textObj;
  changeObj["button"] = buttonObj;
  
  var messageObj = botEventMessageObj(eventID, changeObj); //打包此次事件要變動的元件
  var jsonData = exMessage(senderID, messageObj); //把要回傳的全打包成json
  
  sendExMessage(jsonData);
}

// 這裡畫出了當我選擇訓練動作後要畫的畫面還有對ＨＰ增減
function Train(senderID, eventID, botCommand)
{
  var hp = getUserCatHp(senderID);
  hp = parseInt(hp);
  hp = hp - 10;
  if(hp < 0) hp = 0;
  
  setUserCatHp(senderID, hp); //把貓貓的血量記錄下來
  var hpObj = setHpObj(100, hp,"#FF0000", false);

  var initMessage = '';
  var textObj = {};

  if(hp != 0)
  {
    var Bp = getUserCatBp(senderID);
    Bp = parseInt(Bp);
    Bp = Bp + 10;
    
    if(Bp >100) 
    {
      addUserCatLv(senderID);
      Bp = 0;
     }
    
    setUserCatBp(senderID, Bp); //把貓貓的戰鬥力記錄下來
    
    initMessage ="執行了："+botCommand+"訓練，你的貓貓能力提升了10點！";
    textObj = setTextObj(initMessage, "#019BAD", false);  
  }
  else
  {
    initMessage ="你的貓貓很餓！餵他吃點東西吧！";
    textObj = setTextObj(initMessage, "#019BAD", false);  
  }
  
  
  var button =[]; //指令button
   
  button = addButton(button, false, "繼續訓練", "Training");   
  button = addButton(button, false, "回主選單", "mainMenu");
  var buttonObj = setButtonObj(1, button, false);  
  
  var changeObj  ={}; //需要變動的obj，把要變動的元件塞給它
  changeObj["hp"] = hpObj;
  changeObj["text"] = textObj;
  changeObj["button"] = buttonObj;

  var messageObj = botEventMessageObj(eventID, changeObj); //打包此次事件要變動的元件
  var jsonData = exMessage(senderID, messageObj); //把要回傳的全打包成json
  
  sendExMessage(jsonData);
}

//這裡很簡單地發出貼圖，而且只有等級３以上的寵物能做這個動作
function sticker(senderID, eventID)
{
  sendStickerMessage(senderID,"67","16");
}
