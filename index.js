// imports json data from accounts.json
const accountsData = require('./accounts.json');



function mergeAccounts(accounts) {
    // adds bool property for use later to keep track of processing
    accounts.forEach(account => account.isHandled = false);

    // initializes empty array to return after complete merge event
    let mergedAccountsArr = [];

    // iterates through imported JSON data
    accounts.forEach((acc, accIndex, accArr) => {
        // checks if current account has been marked as handled and moves onto next iteration if so
        if (acc.isHandled) return;

        // if current account is not marked as handled, new object is created
        let newAccObj = {
            // ensures elements are added to the application array as strings
            applications: [String(acc.application)],
            emails: acc.emails,
            name: acc.name,
        };

        // marks current account as handled
        acc.isHandled = true;


        // loops through all of the emails ([acc.emails]) within the current account (acc)
        let emailArr = [...acc.emails]

        while (emailArr.length > 0) {
            // grabs first email in array

            let email = emailArr.shift();            

            // filters through all acounts to get array of those that have both 1) not been previously handled and 2) whose emails include the current email in the iteration
            let acctsToMerge = accArr.filter(acc => !acc.isHandled && acc.emails.includes(email));
            acctsToMerge.forEach((mergeAcc, i) => {

                if (mergeAcc.isHandled) return;

                // application property: maintains string data type if single value, converts to array if multiple applications. pushes # and sorts array numerically
                newAccObj.applications.push(String(mergeAcc.application))
                if (newAccObj.applications.length >= 1) {
                    newAccObj.applications.sort((a,b) => a-b)
                }

                // emails property: Set constructor used to avoid adding duplicates to an account
                    newAccObj.emails.push(...mergeAcc.emails)
                    newAccObj.emails = [... new Set(newAccObj.emails)].sort();

                // adds other emails connected to same person but on a separare account
                mergeAcc.emails.forEach(email => emailArr.push(email));
                

                // marks account as handled
                mergeAcc.isHandled = true;
            });

        }
        // pushes account obj to returning array
        mergedAccountsArr.push((newAccObj));

    })

    // returns same structure as in instructions.txt example output:
    // return mergedAccountsArr

    // returns JSON structure
    return JSON.stringify(mergedAccountsArr, undefined, 2);

}


console.log(mergeAccounts(accountsData))