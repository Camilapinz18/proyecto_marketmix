# MarketMix project

## Contents Table
- [Link](#Link)
- [Description](#Description)
- [Use](#Use)
- [Documentation](#Documentation)

## Link

https://camilapinz18.github.io/proyecto_marketmix/

## Description:

Development exercise proposed by MarketMix. Its goal is to show the final payrolls of each company employee.

It is composed by:

- Login screen
- Administrator screen
- Secretary screen
- Seller screen
- Assembler screen

## Use:

The project is initialized with most of the varibles empty, so it is necessary to fill all the information before generating the payroll.

## Login Screen:

![login](https://user-images.githubusercontent.com/83082880/215371114-a5658555-a741-48b9-9dda-af9bb19ccd66.png)

The login screen has two input fields, one for the username and antoher for the password.
To access the system you could use the following usernames and passwords:

- admin adm1
- secretary scr1
- assembler asb1
- seller sll1

If the LOGIN button is clicked and some input is empty, the username is wrong or doesnt exists or the password is wrong, it will throw an error.

## Administrator screen:
![admin2P](https://user-images.githubusercontent.com/83082880/215372419-3b49faae-ef10-4097-bfc5-cefa04d47b58.png)
 
To use the Administrator screen start by pressing the "POSITION" selector and select the employee to modify, then click the CHANGE button; depending on the employee selected, there will be activated some options or another. Once changed the values, click on SAVE to store the modified data. An alert will be shown.

IF you want to generate the payrolls, then click on the GENERATE PAYROLLS button, if there is missing some information, it will be displayed an alert window. The payrolls reports will only be genertaed if the admin and employes information is complete.

## Payroll report:

![payroll](https://user-images.githubusercontent.com/83082880/215373175-50166ae6-9dea-42ee-89d2-22ceec1b0c3a.png)

The payroll report shows detailed information about the salary of each employee and the global payroll.

## Seller screen:
Write the required information and click the SAVE button, an alert window will be displayed.
![seller](https://user-images.githubusercontent.com/83082880/215373976-54ddcdcb-dbd7-4291-84a8-3b1a02ec76e1.png)

## Secretary screen:
Write the required information and click the SAVE button, an alert window will be displayed.
![secreatry](https://user-images.githubusercontent.com/83082880/215374019-f64fa6d1-f75a-455d-8c5a-989ed3916d61.png)

## Assembler screen:
Write the required information and click the SAVE button, an alert window will be displayed.

![assembler](https://user-images.githubusercontent.com/83082880/215374099-3883f8c9-fa65-401a-97f1-36b88b449751.png)

# Documentation:
### When the page is charged:

Once the page has been opened, it is defined the 'created' Hook, who calls the onLoadPage() function:
```
 created: function () {
    this.onLoadPage()
  }
```

The onLoadPage function check if a user is already logged by calling the checkIsAlreadyLogged() method:
```
 onLoadPage () {
      console.log('page refreshed')
      this.checkIsAlreadyLogged()
    }
 ```
 
 checkIsAlreadyLogged function verifies if there is any information stored in the key 'userLogged' in the Local Storage. If there is information, it 
 retrieves the user that is already logged and changes the activeLogin variable to false, and the corresponding user variable to true, in order to display the required user interface. This verification is usefull in order to keep active the session of an user, even if the page is reloaded or the browser closed:
 ```
 checkIsAlreadyLogged () {
      if (localStorage.getItem('userLogged')) {
        this.userLogged = JSON.parse(localStorage.getItem('userLogged'))
        switch (this.userLogged) {
          case 'admin':
            this.activeLogin = false
            this.activeAdmin = true
            break
          case 'seller':
            this.activeLogin = false
            this.activeSeller = true
            break
          case 'secretary':
            this.activeLogin = false
            this.activeSecretary = true
            break
          case 'assembler':
            this.activeLogin = false
            this.activeAssembler = true
            break
        }
      }
    },
 ```
 
## Login Screen:

In the login screen, once the LOGIN button is clicked are runned various verifications. 
The first check is by running the checkFields function. The function check that the input fields are both fullfiled. If there is any empty input field, it throws an error by calling the launchError function. If there is not any empty input field, it calls the checkData function:
 ```
checkFields () {
      if (this.user === '' || this.password === '') {
        this.launchError('You must fill all the fields to continue', 'ERROR')
      } else {
        this.checkData()
      }
    },
```

The checkData function checks for the existence of the user. It looks through the accounts array to find the username.
If the username exists, then it verifies that the password is correct. If it is correct, it routes the user to the corresponding user interface and adds the username to the LocalStorage key 'userLogged'. If the password is wrong, then it throws an error (Wrong password).
If the username doesnt exists it throws an error (he username is wrong or doesnt exists).

When the user login successfully, the usersData information is stored in the LocalStorage 'usersData' key, in order to use that information in the future.
 ```
checkData () {
      const isUser = this.accounts.find(user => user.name === this.user.trim())
      if (isUser) {
        if (isUser.password.trim() === this.password) {
          localStorage.setItem(
            'usersData',
            JSON.stringify(localStorage.getItem('usersData'))
          ) || localStorage.setItem('usersData', JSON.stringify(this.usersData))
          switch (isUser.name) {
            case 'admin':
              this.activeLogin = false
              this.activeAdmin = true
              break
            case 'seller':
              this.activeLogin = false
              this.activeSeller = true
              break
            case 'secretary':
              this.activeLogin = false
              this.activeSecretary = true
              break
            case 'assembler':
              this.activeLogin = false
              this.activeAssembler = true
              break
          }
          ;(this.user = ''), (this.password = '')
          localStorage.setItem('userLogged', JSON.stringify(isUser.name))
        } else {
          this.launchError('Wrong password', 'ERROR')
        }
      } else {
        this.launchError('The username is wrong or doesnt exists', 'ERROR')
      }
    },
```
### Assembler Screen:

This screen allows the assembler employee to add the overtime worked, the quantuty of produced shoes and the children that the employee has.
When the button SAVE is clicked, it calls the save function, that will be explained later.

### Secretary Screen:

This screen allows the secretary employee to add the overtime worked. 
When the button SAVE is clicked, it calls the save function, that will be explained later.

### Seller Screen:

This screen allows the seller employee to add the sales done. 
When the button SAVE is clicked, it calls the save function, that will be explained later.

### Administrator Screen:

The goal of the Administrator screen is to modify and save cretrain infromation realted to the employees, like salaries, maximum shoes production, production cost by shoe and the seller commission percentages.

This functionality is supported by four computed properties: currentSeller, currentAssembler, currentSecretary and currentUser. These properties allows to update instantly certain variables stored in usersData:
```
 computed: {
    currentSeller () {
      return this.usersData.find(user => user.name === 'seller')
    },
    currentAssembler () {
      return this.usersData.find(user => user.name === 'assembler')
    },
    currentSecretary () {
      return this.usersData.find(user => user.name === 'secretary')
    },
    currentUser () {
      return this.usersData.find(user => user.name === this.positionSelect)
    }
  },
```

When the SAVE button is clicked, it sends to the save function a parameter with the username that is being modified. The save function recevies the parameter and runs the corresponding code of that user in order to save the infromation.
The information is saved in usersData array, and also in the localStorage:
```
save (user) {
      switch (user) {
        case 'admin':
          const user = this.usersData.find(
            element => element.name === this.positionSelect
          )
          if (user) {
            if (user.name === 'secretary') {
              user.salary = this.currentSecretary.salary
              this.modifyLocalStorage(user)
            }
            if (user.name === 'assembler') {
              user.salary = this.currentAssembler.salary
              user.maxQuantyShoes = this.currentAssembler.maxQuantyShoes
              user.priceShoes = this.currentAssembler.priceShoes
              this.modifyLocalStorage(user)
            }
            if (user.name === 'seller') {
              user.salary = this.currentSeller.salary
              user.commission5 = this.currentSeller.commission5
              user.commission10 = this.currentSeller.commission10
              this.modifyLocalStorage(user)
            }
            this.launchError('Changes saved', 'SUCCESSFUL')
          }
          this.changeBtnChangeName()
          this.clearForm()
          break
        case 'secretary':
          const secretary = this.usersData.find(
            element => element.name === 'secretary'
          )
          secretary.overtime = this.currentSecretary.overtime
          this.modifyLocalStorage(secretary)
          this.launchError('Changes saved', 'SUCCESSFUL')
          break
        case 'seller':
          const seller = this.usersData.find(
            element => element.name === 'seller'
          )
          seller.sales = this.currentSeller.sales
          this.modifyLocalStorage(this.currentSeller)
          this.launchError('Changes saved', 'SUCCESSFUL')
          break
        case 'assembler':
          const assembler = this.usersData.find(
            element => element.name === 'assembler'
          )
          if (this.currentAssembler.shoesProduced > assembler.maxQuantyShoes) {
            this.launchError(
              `The production is higher than allowed: ${assembler.maxQuantyShoes}`,
              'ERROR'
            )
          } else {
            assembler.overtime = this.currentAssembler.overtime
            assembler.shoesProduced = this.currentAssembler.shoesProduced
            assembler.children = this.currentAssembler.children
            this.modifyLocalStorage(assembler)
            this.launchError('Changes saved', 'SUCCESSFUL')
          }
          break
      }
      this.userData = JSON.parse(localStorage.getItem('usersData'))
      this.positionSelect = 'assembler'
    },
```

By clicking the GENERATE PAYROLLS button it is called the generatePayroll function.
This function check if the employees infromation is complete, in order to generate the reports. If the information is incomplete it throws an error (Failed generating payrolls. There is some missing information in ....), the error message shows whose employee information is missing:
```
checkForCompleteEmployeesInfo () {
      this.dataToModify = JSON.parse(localStorage.getItem('usersData'))
      let missingInfo = []
      this.dataToModify.map(userData => {
        values = Object.values(userData)
        isComplete = values.find(value => value === null)
        isComplete === null ? missingInfo.push(userData.name) : ''
      })
      return missingInfo
    },
```
If the employees information is complete, then it calls the liquidateAll function, which in turn calls the liquidateAssembler, liquidateSecretary and liquidateSeller functions. Each of this functions runs a certain logic specified for each employee according to the requirements, then return an object with the full information of each employee; each returned object is pushed to the generalPayroll array in order to get the total payroll that the company has to pay by running a .map function:
```
 liquidateAll () {
      this.generalPayroll.push(this.liquidateAssembler())
      this.generalPayroll.push(this.liquidateSecretary())
      this.generalPayroll.push(this.liquidateSeller())
      this.totalPayroll = 0
      this.generalPayroll.map(g => (this.totalPayroll += g.totalSalary))
    },
```

When liquidateAll function has finished its job, then it can be showed to user by accessing the generalPayroll information in the HTML file.

By clicking the LOGOUT button, the active session is closed and the Local Storage key 'userLogged' is removed:
```
logout (active) {
      this.activeLogin = true
      localStorage.removeItem('userLogged')
      switch (active) {
        case 'admin':
          this.activeAdmin = false
          break
        case 'seller':
          this.activeSeller = false
          break
        case 'secretary':
          this.activeSecretary = false
          break
        case 'assembler':
          this.activeAssembler = false
          break
      }
    },

```



