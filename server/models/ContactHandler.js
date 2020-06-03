const fs = require('fs')


class ContactHandler {
    constructor() {
        this.contacts = []
        this.fillContacts()

    }

    fillContacts() {
        fs.readFile('../contact.json', function (err, data) {
            this.contacts = JSON.parse(data)
        }.bind(this))
    }

    commitContact() {
        fs.writeFile('../contact.json', JSON.stringify(this.contacts, null, 2), (err) => {
            if (err) {
                return 'there is an error'
            }
            console.log('successfully saved')
        })
    }

    //addContacts
    addContactText(text) {
        this.contacts.push(text)
        this.commitContact()
    }
}

module.exports = ContactHandler