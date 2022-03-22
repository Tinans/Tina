import { mapMutations } from 'tina-weapp'
module.exports = Behavior({
  data: {
    
  },
  methods: {
    ...mapMutations('user', {
      login: 'SET_USER_INFO'
    })
  }
})