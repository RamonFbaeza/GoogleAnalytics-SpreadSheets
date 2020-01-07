function categoria_basica() {

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('categoria');
  var Row = sheet.getRow();
  var Column = sheet.getColumn();
  var range = sheet.getRange(1,1,Row,Column);
  var values = range.getValues();
     
  console.log(values.length);

  for(var i = 1; i < values.length; i++) {
    var name = values[i][0];
    var duration = values[i][1];
    var daysToLookBack = values[i][2];
    var pageCategory = values[i][3];
    
    var str= "";
    
    //pageCategory - D
    if (pageCategory != '')

       str = str + 'ga:dimension40=~'+pageCategory+',';
       
    //pageSubCategory   
    var pageSubCategory = values[i][4];
        if (pageSubCategory != '')
        str = str + 'ga:dimension41=~'+pageSubCategory+',';
    
    //pagePath
    var pagePath = values[i][5];
    if (pagePath != ''){
        str = str + 'ga:pagePath=~'+pagePath+',';  
    }
    
    //navigationCategory
    var navigationCategory = values[i][6];
    if (navigationCategory != ''){
        str = str + 'ga:dimension43=~'+navigationCategory+',';     
    }
    
    //navigationSubCategory
    var navigationSubCategory = values[i][7];
    if (navigationSubCategory != ''){
        str= str + 'ga:dimension44=~'+navigationSubCategory+',';
    }
       
    //If  Character
    var Character = str.slice(-1);
    console.log(' character:' + Character);
    if (Character == ','){ 
      str = str.slice(0,-1);
    } 

    
    var linkedAccountId = values[i][10];  
    var propertyID = values[i][11];
    var linkedView = values[i][12];
    var accountId = values[i][13];

    
    var newAudience = Analytics.Management.RemarketingAudience.insert(
      {
        'name': name,
        'linkedViews': [linkedView],
        'linkedAdAccounts': [{
            'type': 'MCC_LINKS',
            'linkedAccountId': linkedAccountId,

        }],
        'audienceType': 'SIMPLE',
        'audienceDefinition': {
          'includeConditions': {
            'daysToLookBack': daysToLookBack,
            'segment': 'users::condition::'+str, 
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