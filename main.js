const app = Vue.createApp({
  data () {
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
      dataToModify: [],
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
      positionSelect: 'seller',
      transportationAllowance: 140606,
      monthlyHours: 160,
      generalPayroll: [],
      totalPayrolll: null,
      usersData: [
        {
          name: 'assembler',
          salary: null,
          maxQuantyShoes: 3100,
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
          commission5: 10,
          commission10: 20
        }
      ],
    }
  },
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
  watch: {
    positionSelect () {
      this.isChange = false
      this.changeBtnChangeName()
    }
  },
  methods: {
    /*--GENERAL-- */
    launchError (message, type) {
      this.isError = true
      this.messageError = message
      this.type = type
      setTimeout(() => {
        this.isError = false
        this.messageError = ''
      }, 2000)
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
      this.dataToModify = JSON.parse(localStorage.getItem('usersData'))
      const objectToModify = this.dataToModify.find(
        userToModify => userToModify.name === user.name
      )
      Object.assign(objectToModify, user)
      localStorage.setItem('usersData', JSON.stringify(this.dataToModify))
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
        this.checkData()
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
    change () {
      this.isChange = !this.isChange
      this.changeBtnChangeName()
    },
    changeBtnChangeName () {
      this.isChange
        ? (this.btnChange = 'No Change')
        : (this.btnChange = 'Change')
    },
    /*--PAYROLL--*/
    liquidateSeller () {
      this.dataToModify = JSON.parse(localStorage.getItem('usersData'))
      let commission = 0
      const sellerData = this.dataToModify.find(
        employee => employee.name === 'seller'
      )
      if (sellerData.sales > 10000000) {
        commission = (sellerData.salary * sellerData.commission10) / 100
      } else if (sellerData.sales > 5000000) {
        commission = (sellerData.salary * sellerData.commission5) / 100
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
      this.dataToModify = JSON.parse(localStorage.getItem('usersData'))
      const assemblerData = this.dataToModify.find(
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
      this.dataToModify = JSON.parse(localStorage.getItem('usersData'))
      const secretaryData = this.dataToModify.find(
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
      this.dataToModify = JSON.parse(localStorage.getItem('usersData'))
      let missingInfo = []
      this.dataToModify.map(userData => {
        values = Object.values(userData)
        isComplete = values.find(value => value === null)
        isComplete === null ? missingInfo.push(userData.name) : ''
      })
      return missingInfo
    },
    generatePayroll () {
      this.usersData = JSON.parse(localStorage.getItem('usersData'))
      console.log('usersdata',this.usersData)
      this.generalPayroll=[]
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

app.mount('#app')
