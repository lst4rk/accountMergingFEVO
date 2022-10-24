const mergeAccounts = require('./index');

    test('given data', () => {
        const accounts = [
            {
              "application": 1,
              "emails": ["a@gmail.com", "b@gmail.com"],
              "name": "A"
            },
            {
              "application": 1,
              "emails": ["c@gmail.com", "d@gmail.com"],
              "name": "C"
            },
            {
              "application": 2,
              "emails": ["a@yahoo.com"],
              "name": "A"
            },
            {
              "application": 3,
              "emails": ["a@gmail.com", "a@yahoo.com"],
              "name": "A"
            }
          ];
        expect(mergeAccounts(accounts)).toEqual([
            {
              applications: [ '1', '2', '3' ],
              emails: [ 'a@gmail.com', 'a@yahoo.com', 'b@gmail.com' ],
              name: 'A'
            },
            {
              applications: [ '1' ],
              emails: [ 'c@gmail.com', 'd@gmail.com' ],
              name: 'C'
            }
          ]);
    });

    test('two diff merges', () => {
        const accounts = [
            {
                "application": "1",
                "emails": ["b@gmail.com", "c@gmail.com"],
                "name": "A"
            },
            {
                "application": "2",
                "emails": ["e@gmail.com", "c@gmail.com"],
                "name": "C"
            },
            {
                "application": "2",
                "emails": ["a@yahoo.com", "a@gmail.com"],
                "name": "A"
            },
            {
                "application": "3",
                "emails": ["f@gmail.com", "a@gmail.com"],
                "name": "C"
            }
        ];

        expect(mergeAccounts(accounts)).toEqual([
            {
                applications: ["1","2"],
                emails: ['b@gmail.com', 'c@gmail.com', 'e@gmail.com'],
                name: 'A'
            },
            {
                applications: ["2","3"],
                emails: [ 'a@gmail.com', 'a@yahoo.com', 'f@gmail.com'],
                name: 'A'
            }
        ]);
    });

    test('accounts with same name', () => {
        const accounts = [
            {
                "application": "1",
                "emails": ["a@gmail.com", "b@gmail.com"],
                "name": "A"
            },
            {
                "application": "2",
                "emails": ["c@gmail.com", "d@gmail.com"],
                "name": "A"
            },
            {
                "application": "2",
                "emails": ["a@yahoo.com", "a@gmail.com"],
                "name": "A"
            },
            {
                "application": "3",
                "emails": ["c@gmail.com"],
                "name": "A"
            }
        ];

        expect(mergeAccounts(accounts)).toEqual([
            {
                applications: ["1","2"],
                emails: ['a@gmail.com', 'a@yahoo.com', 'b@gmail.com'],
                name: 'A'
            },
            {
                applications: ["2","3"],
                emails: [ 'c@gmail.com', 'd@gmail.com'],
                name: 'A'
            }
        ]);
    });