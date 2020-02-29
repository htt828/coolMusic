// component/menuItem/menuItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  created(){
    console.log(this.data.item)
  },
  observer(){
    console.log(this.data)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
