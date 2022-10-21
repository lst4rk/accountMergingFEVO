// import JSON data from accounts.json
const accountsData = require('./accounts.json');

function mergeAccounts(accounts){
    // initialize empty array to console.log after complete merge event
    let peopleArr = [];
    // add false bool on objects for tracking processing
    accounts.forEach(account => account.isHandled = false);
    // iterate through objects for non-processed accounts (isHandled = false)
    findNonHandledAcc(accounts, peopleArr);
    // return JSON structure as specified in instructions of instructions.txt 
    // console.log(JSON.stringify(peopleArr, undefined, 2));
    // return same structure as in instructions.txt example output
    console.log(peopleArr);
}

function isHandled(account) {
    account.isHandled = true;
}

function findNonHandledAcc(accounts, peopleArr){
    accounts.forEach((account, accIndex, accArr) => {
        // check if current account has not been handled, create new obj for the associated person
        if (account.isHandled) return;
        createNewPerson(account, accArr, peopleArr);
    })

}

function createNewPerson(account, accArr, peopleArr){
    let newPersonObj = {
        applications: [String(account.application)],
        emails: account.emails,
        name: account.name,
    };
    // mark account as now handled
    isHandled(account);

    // loop through emails within current account
    matchEmails(newPersonObj, accArr, peopleArr);
}

function matchEmails(newPersonObj, accArr, peopleArr){
    // add all emails within current account to an array as ref for matches
    let emailArr = [...newPersonObj.emails];

    // find all matching emails in unprocessed accts
    compareAllEmails(emailArr, newPersonObj, accArr);
    // after data is merged to newPersonObj, push new person to peopleArray
    addNewPerson(newPersonObj, peopleArr);
}

function compareAllEmails(emailArr, newPersonObj, accArr){
    while (emailArr.length > 0){
        let email = emailArr.shift();  
          
        // for every email in ref account, create array of accounts that haven't been processed and have matching emails to ref email
        findMatchingAndUnhandled(email, emailArr, newPersonObj, accArr);
    }
}

function findMatchingAndUnhandled(email, emailArr, newPersonObj, accArr){
    let acctsToMerge = accArr.filter(acc => !acc.isHandled && acc.emails.includes(email));

    // using array of matching accounts, combine application and email data to newPersonObj
    combineAccountData(emailArr, newPersonObj, acctsToMerge);
}

function combineAccountData(emailArr, newPersonObj, acctsToMerge){
    acctsToMerge.forEach((accToMerge) => {
        // if matching account has not been handled, combine emails and application #s
        if (accToMerge.isHandled) return;

        mergeApplications(newPersonObj, accToMerge);
        mergeEmails(emailArr, newPersonObj, accToMerge);

        // mark accounts merged as handled
        isHandled(accToMerge);
    })
}

function mergeApplications(newPersonObj, accToMerge){
    // add application # and put in increasing order
    newPersonObj.applications.push(String(accToMerge.application))
    if (newPersonObj.applications.length >= 1) {
        newPersonObj.applications.sort((a,b) => a-b)
    }
}

function mergeEmails(emailArr, newPersonObj, accToMerge){
    // add unique emails and alphabetize
    newPersonObj.emails.push(...accToMerge.emails)
    newPersonObj.emails = [... new Set(newPersonObj.emails)].sort();

    // add all new emails associated with newPersonObj to reference array
    accToMerge.emails.forEach(email => emailArr.push(email));
}

function addNewPerson(newPersonObj, peopleArr) {
    // add new fully merged and unique person to array of people objects
    peopleArr.push((newPersonObj));
}

mergeAccounts(accountsData)