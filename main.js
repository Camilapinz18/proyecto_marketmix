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
          name: 'aassembler',
          password: 'asb1'
        }
      ],
      userLogged: '',
      activeLogin: true,
      activeAdmin: false,
      activeSeller: false,
      activeSecretary: false,
      activeAssembler: false,
      isError: true,
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
      usersData: [
        {
          name: 'assembler',
          salary: 1300000,
          maxQuantyShoes: 500,
          shoesProduced: 1001,
          priceShoes: 25000,
          overtime: 7,
          children: 3
        },
        {
          name: 'seller',
          salary: 1400000,
          sales: 1000000,
          commission: 600
        },
        {
          name: 'secretary',
          salary: 1500000,
          overtime: 7
        }
      ]
    }
  },

  watch: {
    positionSelect (newValue, oldValue) {
      this.isChange = false
      this.changeBtnChangeName()
      if (this.positionSelect) {
        const user = this.usersData.find(element => element.name === newValue)
        if (user) {
          this.salary = user.salary
          maxQhis.quantyShoes = null
          this.priceShoes = null
          this.commision = null
          switch (user.name) {
            case 'assembler':
              maxQhis.quantyShoes = user.quantyShoes
              this.priceShoes = user.priceShoes
              break
            case 'seller':
              this.commision = user.commision
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
      }, 2000)
    },
    onLoadPage () {
      console.log('page refreshed')
      this.checkIsAlreadyLogged()
      this.generatePayroll('all')
    },
    /*--LOGIN--*/
    checkIsAlreadyLogged () {
      if (localStorage.getItem('userLogged')) {
        this.userLogged = JSON.parse(localStorage.getItem('userLogged'))
        switch (this.userLogged.name) {
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
          ;(this.user = ''), (this.password = '')
          this.activeLogin = false
          this.activeAdmin = true
          this.launchError('Successful login')
          console.log('isUser', isUser)
          localStorage.setItem('userLogged', JSON.stringify(isUser))
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
    save () {
      console.log('posotionmselect', this.positionSelectChanged)
      this.messageLoader = 'Please wait...'
      this.changeLoaderState()
      setTimeout(() => {
        const user = this.usersData.find(
          element => element.name === this.positionSelect
        )
        if (user) {
          user.salary = this.salary
          switch (user.name) {
            case 'assembler':
              maxQser.quantyShoes = this.quantyShoes
              user.priceShoes = this.priceShoes
              break
            case 'seller':
              user.commision = this.commision
              break
          }
          this.usersData.splice(
            this.usersData.findIndex(u => u.name === this.positionSelect),
            1,
            user
          )
        }
        this.changeLoaderState()
        this.changeBtnChangeName()
        this.clearForm()
      }, 1000)
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

      return totalSeller
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

      return totalAssembler
    },

    liquidateSecretary () {
      const secretaryData = this.usersData.find(
        employee => employee.name === 'secretary'
      )
      var hourCost = secretaryData.salary / this.monthlyHours
      var overtimeHourCost = (hourCost * 180) / 100
      const totalSecretary =
        secretaryData.salary + overtimeHourCost * secretaryData.overtime
      return totalSecretary
    },

    liquidateAll () {
      this.generalPayroll.push(this.liquidateAssembler())
      this.generalPayroll.push(this.liquidateSecretary())
      this.generalPayroll.push(this.liquidateSeller())
      return this.generalPayroll.reduce((acc, cur) => acc + cur)
    },
    generatePayroll (employee) {
      const transportationAllowance = 140606
      const totalSeller = 0
      const totalSecretary = 0
      const totalAssembler = 0

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
    }
  },
  created: function () {
    this.onLoadPage()
  }
})

app.mount('#app')
