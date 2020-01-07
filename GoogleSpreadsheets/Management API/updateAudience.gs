function updateAudience (){
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('compradores');
  var Row = sheet.getLastRow();
  var Column = sheet.getLastColumn();
  var range = sheet.getRange(1,1,Row,Column);
  var values = range.getValues();
  
  var audience = Analytics.Management.RemarketingAudience.list("4164580","UA-1234567-1");
  
  for(var i = 1; i < values.length; i++) {
    var name = values[i][0];
    var duration = values[i][1];
    var daysToLookBack = values[i][2];
    var productName = values[i][3];
    
    var str= "users::condition::";    
    
    //productName - D
    if (productName != '')
      str = str + 'ga:productName=~'+productName+',';
    
    //productCategoryLevel1   
    var productCategoryLevel1 = values[i][4];
    if (productCategoryLevel1 != '')
      str = str + 'ga:productCategoryLevel1=~'+productCategoryLevel1+',';
    
    //productCategoryLevel2   
    var productCategoryLevel2 = values[i][5];
    if (productCategoryLevel2 != '')
      str = str + 'ga:productCategoryLevel2=~'+productCategoryLevel2+',';        
    
    //productCategoryLevel4   
    var productCategoryLevel4 = values[i][6];
    if (productCategoryLevel4 != '')
      str = str + 'ga:productCategoryLevel4=~'+productCategoryLevel4+',';       
    
    //If  Character
    var Character = str.slice(-1);
    console.log(' character:' + Character);
    if (Character == ','){ 
      str = str.slice(0,-1);
    } 
    
    var strMetrics= ""; 
    var transactions = values[i][8];   
    
    
    strMetrics = 'users::condition::perSession::ga:transactions'+transactions;    
    
    var audienceDestination = values[i][10]; 
    var linkedAccountId = values[i][11];  
    var propertyID = values[i][12];
    var linkedView = values[i][13];
    var accountId = values[i][14];
    var finalStr = str + ';' +  strMetrics;
    var name = values[i][0];
    var new_name = values[i][15];
    
    var audienceId = 0;
    for(var j = 0; j < audience.items.length; j++) {       
      if (audience.items[j].name == name) {
        var audienceId = audience.items[j].id;  
        break;
      }      
    }
    if (audienceId != 0) {
    
      Analytics.Management.RemarketingAudience.update(
        {
          
          'name': new_name,
          'linkedViews': [linkedView],
          'linkedAdAccounts': [{
            'type': audienceDestination,
            'linkedAccountId': linkedAccountId,
          }],
          'audienceType': 'SIMPLE',
          'audienceDefinition': {
            'includeConditions': {
              'daysToLookBack': daysToLookBack,
              'segment': finalStr, 
              'membershipDurationDays': duration,
              'isSmartList': false
            }
          }
        } ,
        accountId,
        propertyID,
        audienceId);
      console.log(' Audience ' + name + ' has been updated to ' + new_name);
      }
  } 
  
}