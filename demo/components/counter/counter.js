// components/counter/counter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  watch: {
    number: function (newVal, oldVal) {
      console.log('comoponentData', newVal, 'oldVal', oldVal)
    }
  },

  computed: {
    number: we => we.$store.state.user.count
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
