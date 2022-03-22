// components/timer/timer.js
import { mapState, mapMutations } from 'tina-weapp'

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
    count: function (newVal, oldVal) {
      console.log('comoponentData', newVal, 'oldVal', oldVal)
    }
  },

  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo,
      count: state => state.count,
    }),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    send() {
      const info = {
        name: 'Andy',
        age: 22,
      }

      this.submit(info)
    },
    ...mapMutations('user', {
      submit: 'SET_USER_INFO'
    })
  }
})
