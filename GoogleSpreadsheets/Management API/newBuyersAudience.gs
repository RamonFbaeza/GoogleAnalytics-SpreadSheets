//SCRIPT PARA CREAR NUEVAS AUDIENCIAS DE 'COMPRADORES'

function compradores() {

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('compradores');
  var Row = sheet.getRow();
  var Column = sheet.getColumn();
  var range = sheet.getRange(1,1,Row,Column);
  var values = range.getValues();
     
  console.log(values.length);

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
  //  console.log(' character:' + Character);
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
    
    var newAudience = Analytics.Management.RemarketingAudience.insert(
      {
        'name': name,
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
      },
    accountId,
    propertyID);

   console.log(i + ' Audience ' + name + ' has been created');
  };
}
