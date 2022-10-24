// import JSON data from accounts.json
const accountsData = require('./accounts.json');

let peopleArr = [];
mergeAccounts(accountsData);

function mergeAccounts(accounts) {
    peopleArr = [];
    // add bool set to false on objects to track processing status
    accounts.forEach(account => account.isHandled = false);

    findAcctsToMerge(accounts);

    // return JSON.stringify(peopleArr, undefined, 2);     // return array of people data in JSON structure as requested at (./instructions.txt):14
    // console.log(peopleArr);                                // to return same structure as shown at (./instructions.txt):46
    return peopleArr;
}

function markHandled(account) {
    account.isHandled = true;
}

function findAcctsToMerge(accounts) {
    accounts.forEach((account, index, accArr) => {
        // check if current account has not been handled, create new obj for the associated person
        if (!account.isHandled) createNewPerson(account, accArr);
    })
}

function createNewPerson(account, accArr) {
    let newPersonObj = {
        applications: [String(account.application)],
        emails: account.emails,
        name: account.name,
    };

    markHandled(account)
    findMatchingEmails(newPersonObj, accArr);
    // after data is merged to newPersonObj, push new person to peopleArray
    addNewPerson(newPersonObj);
}

function findMatchingEmails(newPersonObj, accArr) {
    // create arr from all emails within current account to serve as ref
    let emailArr = [...newPersonObj.emails]
    // find all matching emails in unprocessed accts
    compareAllEmails(newPersonObj, accArr, emailArr);
}

function compareAllEmails(newPersonObj, accArr, emailArr) {
    let email = emailArr.pop();

    findMatchingAndUnhandled(email, emailArr, newPersonObj, accArr);
    if (emailArr.length > 0)  compareAllEmails(newPersonObj, accArr, emailArr)
}

function findMatchingAndUnhandled(email, emailArr, newPersonObj, accArr) {
    let acctsToMerge = accArr.filter(acc => !acc.isHandled && acc.emails.includes(email));
    // using array of matching accounts, combine application and email data to newPersonObj
    combineAccountData(emailArr, newPersonObj, acctsToMerge);
}

function combineAccountData(emailArr, newPersonObj, acctsToMerge) {
    acctsToMerge.forEach((accToMerge) => {
        // if matching account has not been handled, merge account and update email refs
        if (!accToMerge.isHandled) {
            mergeAcctsToPerson(newPersonObj, accToMerge);
            updateReferenceEmails(emailArr, accToMerge);
        }
    })
}

function mergeAcctsToPerson(newPersonObj, accToMerge) {
    mergeApplications(newPersonObj, accToMerge);
    mergeEmails(newPersonObj, accToMerge);

    // mark accounts merged as handled
    markHandled(accToMerge);
}


function mergeApplications(newPersonObj, accToMerge) {
    newPersonObj.applications.push(String(accToMerge.application))
    newPersonObj.applications.sort((a,b) => a-b);
}

function mergeEmails(newPersonObj, accToMerge) {
    newPersonObj.emails.push(...accToMerge.emails)
    newPersonObj.emails = [... new Set(newPersonObj.emails)].sort();
}

function updateReferenceEmails(emailArr, accToMerge) {
    accToMerge.emails.forEach(email => emailArr.push(email));
}

function addNewPerson(newPersonObj) {
    // add new fully merged and unique person to array of people objects
    peopleArr.push((newPersonObj));
}

module.exports = mergeAccounts;