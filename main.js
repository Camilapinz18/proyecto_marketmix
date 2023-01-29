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
      userLogged: '',
      activeLogin: true,
      activeAdmin: false,
      activeSeller: false,
      activeSecretary: false,
      activeAssembler: false,
      activePayroll: false,
      isError: false,
      messageError: '',
      user: '',
      password: '',
      isChange: false,
      btnChange: 'Change',
      loader: false,
      messageLoader: '',
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
      commission5: 10,
      commission10: 20,
      // usersData: [
      //   {
      //     name: 'assembler',
      //     salary: 10,
      //     maxQuantyShoes: null,
      //     shoesProduced: null,
      //     priceShoes: null,
      //     overtime: null,
      //     children: null
      //   },
      //   {
      //     name: 'seller',
      //     salary: null,
      //     sales: null,
      //     commission: null
      //   },
      //   {
      //     name: 'secretary',
      //     salary: null,
      //     overtime: null
      //   }
      // ],
      usersData: [
        {
          name: 'assembler',
          salary: 1100000,
          maxQuantyShoes: 3100,
          shoesProduced: 1200,
          priceShoes: 10000,
          overtime: 3,
          children: 3
        },
        {
          name: 'secretary',
          salary: 1500000,
          overtime: 10
        },
        {
          name: 'seller',
          salary: 1200000,
          sales: 6200300,
          commission5: 10,
          commission10: 20
        }
      ]
    }
  },

  watch: {
    positionSelect (newValue) {
      console.log('Positionselected', this.positionSelect)
      this.isChange = false

      const dataStored = JSON.parse(localStorage.getItem('usersData'))
      const arrayWithData = []
      arrayWithData.push(dataStored)

      console.log('arrayWithData', arrayWithData)
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
    }
  },
  methods: {
    /*--GENERAL-- */
    launchError (message) {
      this.isError = true
      this.messageError = message
      setTimeout(() => {
        this.isError = false
        this.messageError = ''
      }, 1000)
    },
    onLoadPage () {
      console.log('page refreshed')
      this.checkIsAlreadyLogged()
    },
    logout (active) {
      this.activeLogin = true
      localStorage.clear()
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
          localStorage.setItem('usersData', JSON.stringify(this.usersData))
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
          this.launchError('Wrong password')
        }
      } else {
        this.launchError('The username is wrong or doesnt exists')
      }
    },
    checkFields () {
      if (this.user === '' || this.password === '') {
        this.launchError('You must fill all the fields to continue')
      } else {
        this.checkData()
      }
    },
    /*--ADMIN--*/
    save (user) {
      this.messageLoader = 'Please wait...'
      this.changeLoaderState()

      switch (user) {
        case 'admin':
          setTimeout(() => {
            const user = this.usersData.find(
              element => element.name === this.positionSelect
            )

            if (user) {
              // this.modifyLocalStorage(user)

              if (user.name === 'secretary') {
                console.log('name', user)
                user.salary = this.salary
                console.log('zzz', user)
                this.modifyLocalStorage(user)
              }
              if (user.name === 'assembler') {
                console.log('name', user)
                user.salary = this.salary
                user.maxQuantyShoes = this.maxQuantyShoes
                user.priceShoes = this.priceShoes
                console.log('ssss', user)
                this.modifyLocalStorage(user)
              }
              if (user.name === 'seller') {
                console.log('name', user)
                user.salary = this.salary
                user.commission5 = this.commission5
                user.commission10 = this.commission10
                console.log('llll', user)
                this.modifyLocalStorage(user)
              }
            }

            this.changeLoaderState()
            this.changeBtnChangeName()
            this.clearForm()
          }, 300)
          break

        case 'secretary':
          console.log('secretary')
          const secretary = this.usersData.find(
            element => element.name === 'secretary'
          )
          secretary.overtime = this.overtime
          console.log('secreaty', secretary)

          break

        case 'seller':
          console.log('secretary')
          const seller = this.usersData.find(
            element => element.name === 'seller'
          )
          seller.sales = this.sales
          console.log('seller', seller)

          break

        case 'assembler':
          console.log('assembler')
          const assembler = this.usersData.find(
            element => element.name === 'assembler'
          )
          assembler.overtime = this.overtime
          assembler.shoesProduced = this.producedShoes
          assembler.children = this.children

          console.log('assembler', assembler)

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
      console.log('añadido')
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
    changeLoaderState () {
      this.loader = !this.loader
    },
    clearForm () {
      this.positionSelect = null
      this.quantyShoes = null
      this.priceShoes = null
      this.commision = null
    },
    /*--LIQUIDAACION--*/

    liquidateSeller () {
      let commission = 0
      const sellerData = this.usersData.find(
        employee => employee.name === 'seller'
      )
      if (sellerData.sales > 10000000) {
        console.log('mayores a 10p')
        commission = (sellerData.salary * 20) / 100
      } else if (sellerData.sales > 5000000) {
        console.log('mayores a 5p')
        commission = (sellerData.salary * 10) / 100
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

      var hourCost = assemblerData.salary / this.monthlyHours
      var overtimeHourCost = (hourCost * 220) / 100
      var productionBonusByShoe = 0
      var childrenBonus = 0

      if (assemblerData.shoesProduced > 3000) {
        productionBonusByShoe =
          (assemblerData.priceShoes * 30) / 100 + assemblerData.priceShoes
        console.log('productionBonusByShoe', productionBonusByShoe)
      } else if (assemblerData.shoesProduced > 2000) {
        productionBonusByShoe =
          (assemblerData.priceShoes * 20) / 100 + assemblerData.priceShoes
        console.log('productionBonusByShoe', productionBonusByShoe)
      } else if (assemblerData.shoesProduced > 1700) {
        productionBonusByShoe =
          (assemblerData.priceShoes * 15) / 100 + assemblerData.priceShoes
        console.log('productionBonusByShoe', productionBonusByShoe)
      } else if (assemblerData.shoesProduced > 1000) {
        productionBonusByShoe =
          (assemblerData.priceShoes * 10) / 100 + assemblerData.priceShoes
        console.log('productionBonusByShoe', productionBonusByShoe)
      } else {
        productionBonusByShoe = 0
        console.log('productionBonusByShoe', productionBonusByShoe)
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
        totalCostShoesProduced:
          productionBonusByShoe * assemblerData.shoesProduced,
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
      var hourCost = secretaryData.salary / this.monthlyHours
      var overtimeHourCost = (hourCost * 180) / 100
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

      return this.generalPayroll.reduce((acc, cur) => acc + cur)
    },

    checkForCompleteEmployeesInfo () {
      this.usersData.map(userData => {
        console.log('userdata', userData)

        const values = Object.values(userData)
        values.map(value =>
          value === null
            ? this.launchError('There is some missing information')
            : ''
        )
      })
    },
    generatePayroll (employee) {
      this.checkForCompleteEmployeesInfo()

      switch (employee) {
        case 'seller':
          console.log('totalseller', this.liquidateSeller())
          break

        case 'secretary':
          console.log('totalassembler', this.liquidateSecretary())
          break

        case 'assembler':
          console.log('totalsecreatry', this.liquidateAssembler())
          break

        case 'all':
          console.log('totalEmoresa', this.liquidateAll())
          break
      }
      this.activeAdmin = false
      this.activePayroll = true
    }
  },
  created: function () {
    this.onLoadPage()
  }
})

app.mount('#app')
