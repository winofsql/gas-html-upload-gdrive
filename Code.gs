// 配列定義
var targetFolderId = [];

// ************************************
// メニューの追加
// ************************************
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('アップロード')
     .addItem('複数ターゲットへアップロード', 'uploadTargets')
     .addToUi();
  
}

// ************************************
// メニューの実行部分
// ************************************
function uploadTargets() {
  var html = HtmlService.createHtmlOutputFromFile('index.html')
     .setWidth(750)
     .setHeight(480);
  
  SpreadsheetApp.getUi().showModalDialog(html, '複数ターゲットへアップロード');
  
}

// ************************************
// 対象フォルダ ID 配列の取得
// ************************************
function gettargetFolderId() {
  var spreadsheet = SpreadsheetApp.getActive();
  var target = ""; 

  var sheet=SpreadsheetApp.getActiveSheet();
  var values=sheet.getDataRange().getValues();
  var count=values.length;
  for(var i=1; i<= 100; i++ ) {
    spreadsheet.getRange('A' + i).activate();
    target = spreadsheet.getCurrentCell().getValue();
    if ( target != '' ) {
       targetFolderId.push(target.toString());
    }
    else {
      break;
    }
  }  

  console.log(targetFolderId);
  return targetFolderId;
}


// ************************************
// アップロード
// ************************************
function processForm(formObject) {
  console.log(formObject);

  var formBlob = formObject.myFile;
  var folderTargts = formObject.folders;
  var targets = folderTargts.split(",")
  
  console.log(targets.length);

  for( i = 0; i < targets.length; i++ ) {

    console.log(targets[i]);
    var uploadFolder = DriveApp.getFolderById(targets[i]);

    console.log(formBlob);
    var driveFile = uploadFolder.createFile(formBlob); //アップロード
    
  }
 
  return driveFile.getName();
}
