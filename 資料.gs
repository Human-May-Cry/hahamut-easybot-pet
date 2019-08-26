//使用者的判斷寫在這裡，主要是要避免重複紀錄使用者的id
function Users(userID) 
{
  //如果從試算表裡面找到使用者(這個使用者有發過話了)，不做任何事，沒找到(第一次發話)就把id記錄下來
  if(findUser(userID)){
  }
  else{
    addUser(userID);
  }
}

function checkUsers(SpreadSheet, userID) 
{
  var name = "user";
  var Sheet = SpreadSheet.getSheetByName(name);
  var lastRow = Sheet.getLastRow();
  var data = Sheet.getDataRange().getValues();
  
  for(var i = 0; i<data.length;i++){
    if(data[i][1] == userID){
      return i+1;
    }
  }
  
}

// 找看看試用者
function findUser(userID)
{
  var SpreadSheet = SpreadsheetApp.openById(sheetID);
  var name = "user";
  var Sheet = SpreadSheet.getSheetByName(name);
  var data = Sheet.getDataRange().getValues();
  
  for(var i = 0; i<data.length;i++){
    if(data[i][1] == userID){ 
      return i+1;
    }
  }
}

// 把使用者的id記下來
function addUser(userID)  
{
  var SpreadSheet = SpreadsheetApp.openById(sheetID);
  var name = "user";
  var Sheet = SpreadSheet.getSheetByName(name);
  var lastRow = Sheet.getLastRow()+1;
  
  Sheet.getRange(lastRow, 1).setValue(new Date());
  Sheet.getRange(lastRow, 2).setValue(userID);
}

function setUserCatHp(userID, catHp)
{
  var SpreadSheet = SpreadsheetApp.openById(sheetID);
  var name = "user";
  var Sheet = SpreadSheet.getSheetByName(name);

  var index = checkUsers(SpreadSheet, userID);
  Sheet.getRange(index, 4).setValue(catHp);
}


function getUserCatHp(userID)
{
  var SpreadSheet = SpreadsheetApp.openById(sheetID);
  var name = "user";
  var Sheet = SpreadSheet.getSheetByName(name);
  var lastRow = Sheet.getLastRow();
  var range = Sheet.getRange(1, 2, lastRow);
  var values = range.getValues();
  
//  Logger.log(flag); 
  
  for(var i = 1; i<lastRow;i++)
  {
    if(values[i] == userID)
    {
     var index = i;
     Logger.log(index);
    }
  }
  
  range = Sheet.getRange(1, 4, lastRow);
  values = range.getValues();
  var hp = values[index];
  Logger.log(hp);
  
  return hp;
}

function setUserCatBp(userID, catBp)
{
  var SpreadSheet = SpreadsheetApp.openById(sheetID);
  var name = "user";
  var Sheet = SpreadSheet.getSheetByName(name);
  var index = checkUsers(SpreadSheet, userID);
  Sheet.getRange(index, 5).setValue(catBp);
}

function getUserCatBp(userID)
{
  var SpreadSheet = SpreadsheetApp.openById(sheetID);
  var name = "user";
  var Sheet = SpreadSheet.getSheetByName(name);
  var lastRow = Sheet.getLastRow();
  var range = Sheet.getRange(1, 2, lastRow);
  var values = range.getValues();
  
  for(var i = 1; i<lastRow;i++)
  {
    if(values[i] == userID)
    {
     var index = i;
     Logger.log(index);
    }
  }
  
  range = Sheet.getRange(1, 5, lastRow);
  values = range.getValues();
  var Bp = values[index];
  return Bp;
}

function addUserCatLv(userID)
{
  var lv = parseInt(getUserCatLv(userID));
  
  var SpreadSheet = SpreadsheetApp.openById(sheetID);
  var name = "user";
  var Sheet = SpreadSheet.getSheetByName(name);
  var index = checkUsers(SpreadSheet, userID);
  Sheet.getRange(index, 3).setValue(lv+1);
}

function setUserCatLv(userID,lv)
{ 
  var SpreadSheet = SpreadsheetApp.openById(sheetID);
  var name = "user";
  var Sheet = SpreadSheet.getSheetByName(name);
  var index = checkUsers(SpreadSheet, userID);
  Sheet.getRange(index, 3).setValue(lv);
}

function getUserCatLv(userID)
{
  var SpreadSheet = SpreadsheetApp.openById(sheetID);
  var name = "user";
  var Sheet = SpreadSheet.getSheetByName(name);
  var lastRow = Sheet.getLastRow();
  var range = Sheet.getRange(1, 2, lastRow);
  var values = range.getValues();
  
  for(var i = 1; i<lastRow;i++)
  {
    if(values[i] == userID)
    {
     var index = i;
     Logger.log(index);
    }
  }
  range = Sheet.getRange(1, 3, lastRow);
  values = range.getValues();
  var Lv = values[index];
  return Lv;
    
}
