const app = Vue.createApp({
  data() {
    return {
      accounts: [
        {
          name: 'admin',
          password: 'adm1'
        },
        {
          name: 'secretary',
          password: 'scr1'
        },
        {
          name: 'seller',
          password: 'sll1'
        },
        {
          name: 'assembler',
          password: 'asb1'
        }
      ],
      userLogged: '',
      activeLogin: true,
      activeAdmin: false,
      activeSeller: false,
      activeSecretary: false,
      activeAssembler: false,
      activePayroll: false,
      isError: false,
      messageError: '',
      type: '',
      user: '',
      password: '',
      isChange: false,
      btnChange: 'Change',
      positionSelect: null,
      salary: null,
      maxQuantyShoes: null,
      priceShoes: null,
      commision: null,
      transportationAllowance: 140606,
      monthlyHours: 160,
      generalPayroll: [],
      overtime: 0,
      sales: 0,
      producedShoes: 0,
      children: 0,
      commission5: 0,
      commission10: 0,
      totalPayrolll: null,
      usersData: [
        {
          name: 'assembler',
          salary: null,
          maxQuantyShoes: null,
          shoesProduced: null,
          priceShoes: null,
          overtime: null,
          children: null
        },
        {
          name: 'secretary',
          salary: null,
          overtime: null
        },
        {
          name: 'seller',
          salary: null,
          sales: null,
          commission5: null,
          commission10: null
        }
      ]
    }
  },

  watch: {
    positionSelect (newValue) {
      this.isChange = false
      const dataStored = JSON.parse(localStorage.getItem('usersData'))
      const arrayWithData = []
      arrayWithData.push(dataStored)
      this.changeBtnChangeName()
      if (this.positionSelect) {
        const user = arrayWithData[0].find(element => element.name === newValue)
        if (user) {
          this.salary = user.salary
          this.quantyShoes = null
          this.priceShoes = null
          switch (user.name) {
            case 'assembler':
              this.maxQuantyShoes = user.maxQuantyShoes
              this.priceShoes = user.priceShoes
              break
            case 'seller':
              this.commision5 = user.commision5
              this.commision10 = user.commision510
              break
          }
        }
      }
    },
  },
  methods: {
    /*--GENERAL-- */
    launchError (message, type) {
      this.isError = true
      this.messageError = message
      this.type = type
      setTimeout(() => {
        this.isError = false;
        this.messageError = "";
      }, 2000);
    },
    onLoadPage () {
      console.log('page refreshed')
      this.checkIsAlreadyLogged()
    },
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
    modifyLocalStorage (user) {
      const dataToModify = JSON.parse(localStorage.getItem('usersData'))
      const objectToModify = dataToModify.find(
        userToModify => userToModify.name === user.name
      )
      Object.assign(objectToModify, user)
      localStorage.setItem('usersData', JSON.stringify(dataToModify))
    },
        clearForm () {
      this.positionSelect = null
      this.quantyShoes = null
      this.priceShoes = null
      this.commision = null
    },
    /*--LOGIN--*/
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
    checkFields () {
      if (this.user === '' || this.password === '') {
        this.launchError('You must fill all the fields to continue', 'ERROR')
      } else {
        this.checkData();
      }
    },
    /*--ADMIN--*/
    save (user) {
      switch (user) {
        case 'admin':
          const user = this.usersData.find(
            element => element.name === this.positionSelect
          )
          if (user) {
            if (user.name === 'secretary') {
              user.salary = this.salary
              this.modifyLocalStorage(user)
            }
            if (user.name === 'assembler') {
              user.salary = this.salary
              user.maxQuantyShoes = this.maxQuantyShoes
              user.priceShoes = this.priceShoes
              this.modifyLocalStorage(user)
            }
            if (user.name === 'seller') {
              user.salary = this.salary
              user.commission5 = this.commission5
              user.commission10 = this.commission10
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
          secretary.overtime = this.overtime
          this.modifyLocalStorage(secretary)
          this.overtime=''
          this.launchError('Changes saved', 'SUCCESSFUL')
          break
        case 'seller':
          const seller = this.usersData.find(
            element => element.name === 'seller'
          )
          seller.sales = this.sales
          this.modifyLocalStorage(seller)
          this.sales=''
          this.launchError('Changes saved', 'SUCCESSFUL')
          break
        case 'assembler':
          const assembler = this.usersData.find(
            element => element.name === 'assembler'
          )
    
          if (this.producedShoes > assembler.maxQuantyShoes) {
            this.launchError(
              `The production is higher than allowed: ${assembler.maxQuantyShoes}`,
              'ERROR'
            )
          } else {
            assembler.overtime = this.overtime
            assembler.shoesProduced = this.producedShoes
            assembler.children = this.children
            this.modifyLocalStorage(assembler)
            this.overtime=''
            this.producedShoes=''
            this.children=''
            this.launchError('Changes saved', 'SUCCESSFUL')
          }
          break
      }
    },
    change() {
      this.isChange = !this.isChange;
      this.changeBtnChangeName();
    },
    changeBtnChangeName() {
      this.isChange
        ? (this.btnChange = "No Change")
        : (this.btnChange = "Change");
    },
    /*--PAYROLL--*/
    liquidateSeller () {
      let commission = 0
      const sellerData = this.usersData.find(
        employee => employee.name === 'seller'
      )
      if (sellerData.sales > 10000000) {
        commission = (sellerData.salary * sellerData.commission10) / 100
      } else if (sellerData.sales > 5000000) {
        commission = (sellerData.salary * this.commission5) / 100
      } else {
        commission = 0
      }
      const totalSeller =
        sellerData.salary + commission + this.transportationAllowance
      const reportData = {
        baseSalary: sellerData.salary,
        totalSales: sellerData.sales,
        bonusBySales: commission,
        totalSalary: totalSeller
      }
      return reportData
    },

    liquidateAssembler () {
      const assemblerData = this.usersData.find(
        employee => employee.name === 'assembler'
      )
      let hourCost = assemblerData.salary / this.monthlyHours
      let overtimeHourCost = (hourCost * 220) / 100
      let productionBonusByShoe = 0
      let childrenBonus = 0

      if (assemblerData.shoesProduced > 3000) {
        productionBonusByShoe =
          (assemblerData.priceShoes * 30) / 100 + assemblerData.priceShoes
      } else if (assemblerData.shoesProduced > 2000) {
        productionBonusByShoe =
          (assemblerData.priceShoes * 20) / 100 + assemblerData.priceShoes
      } else if (assemblerData.shoesProduced > 1700) {
        productionBonusByShoe =
          (assemblerData.priceShoes * 15) / 100 + assemblerData.priceShoes
      } else if (assemblerData.shoesProduced > 1000) {
        productionBonusByShoe =
          (assemblerData.priceShoes * 10) / 100 + assemblerData.priceShoes
      } else {
        productionBonusByShoe = 0
      }
      if (assemblerData.children === 1) {
        childrenBonus = 80000
      } else if (assemblerData.children >= 2) {
        childrenBonus = 60000 * assemblerData.children
      }

      const totalAssembler =
        assemblerData.salary +
        overtimeHourCost * assemblerData.overtime +
        productionBonusByShoe * assemblerData.shoesProduced +
        this.transportationAllowance +
        childrenBonus

      const reportData = {
        baseSalary: assemblerData.salary,
        overtimeCost: overtimeHourCost,
        overtimeHours: assemblerData.overtime,
        overtimeTotal: overtimeHourCost * assemblerData.overtime,
        shoesProduced: assemblerData.shoesProduced,
        bonusPerShoe: productionBonusByShoe,
        CostShoesProduced: productionBonusByShoe * assemblerData.shoesProduced,
        transportationAllowance: this.transportationAllowance,
        childrenBonus: childrenBonus,
        totalSalary: totalAssembler
      }

      return reportData
    },

    liquidateSecretary () {
      const secretaryData = this.usersData.find(
        employee => employee.name === 'secretary'
      )
      let hourCost = secretaryData.salary / this.monthlyHours
      let overtimeHourCost = (hourCost * 180) / 100
      const totalSecretary =
        secretaryData.salary + overtimeHourCost * secretaryData.overtime

      const reportData = {
        baseSalary: secretaryData.salary,
        overtimeCost: overtimeHourCost,
        overtimeHours: secretaryData.overtime,
        overtimeTotal: overtimeHourCost * secretaryData.overtime,
        totalSalary: totalSecretary
      }

      return reportData
    },

    liquidateAll () {
      this.generalPayroll.push(this.liquidateAssembler())
      this.generalPayroll.push(this.liquidateSecretary())
      this.generalPayroll.push(this.liquidateSeller())
      this.totalPayroll = 0
      this.generalPayroll.map(g => (this.totalPayroll += g.totalSalary))
    },
    checkForCompleteEmployeesInfo () {
      let missingInfo = []
      this.usersData.map(userData => {
        values = Object.values(userData)
        isComplete = values.find(value => value === null)
        isComplete === null ? missingInfo.push(userData.name) : ''
      })
      return missingInfo
    },
    generatePayroll () {
      const missingInfo = this.checkForCompleteEmployeesInfo()
      if (missingInfo.length) {
        this.launchError(
          `Failed generating payrolls. There is some missing information in ${missingInfo}`,
          'ERROR'
        )
      } else {
        this.liquidateAll()
        this.activeAdmin = false
        this.activePayroll = true
      }
    }
  },
  created: function () {
    this.onLoadPage()
  }
})

app.mount("#app");
