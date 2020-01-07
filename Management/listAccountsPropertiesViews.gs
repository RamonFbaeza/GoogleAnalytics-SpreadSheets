function listAccounts() {
    var accounts = Analytics.Management.Accounts.list();
    if (accounts.items && accounts.items.length) {
        for (var i = 0; i < accounts.items.length; i++) {
            var account = accounts.items[i];
            console.log('Account: name "%s", id "%s".', account.name, account.id);

            // List web properties in the account.
            listWebProperties(account.id);
        }
    } else {
        console.log('No accounts found.');
    }
}

function listWebProperties(accountId) {
    var webProperties = Analytics.Management.Webproperties.list(accountId);
    if (webProperties.items && webProperties.items.length) {
        for (var i = 0; i < webProperties.items.length; i++) {
            var webProperty = webProperties.items[i];
            console.log('\tWeb Property: name "%s", id "%s".', webProperty.name,
            webProperty.id);

            // List profiles in the web property.
            listProfiles(accountId, webProperty.id);
        }
    } else {
        console.log('\tNo web properties found.');
    }
}

function listProfiles(accountId, webPropertyId) {
    // Note: If you experience "Quota Error: User Rate Limit Exceeded" errors
    // due to the number of accounts or profiles you have, you may be able to
    // avoid it by adding a Utilities.sleep(1000) statement here.

    var profiles = Analytics.Management.Profiles.list(accountId,
    webPropertyId);
    if (profiles.items && profiles.items.length) {
        for (var i = 0; i < profiles.items.length; i++) {
            var profile = profiles.items[i];
            console.log('\t\tProfile: name "%s", id "%s".', profile.name,
            profile.id);
        }
    } else {
        console.log('\t\tNo web properties found.');
    }
}
