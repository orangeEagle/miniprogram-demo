Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})
  },
  onShareAppMessage() {
    return {
      title: '开发中，敬请期待',
      path: 'page/component/index'
    }
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../class/classroom'
    })
  },
  
  /**
   * 展开、折叠效果
  */
 show: function () {
  this.setData({
    isshow: !this.data.isshow
  })
},

  getTeam() {

    var that = this
      if( that.data.showGetTeamText == false )
      {
        that.setData({
           buttonGetTeamText:'隐藏开发团队',
           showGetTeamText:true
        })
    }else{
      that.setData({
        buttonGetTeamText:'显示开发团队',
        showGetTeamText:false
     })
   }

    wx.cloud.callFunction({
      name:'testCloudFunction',
      success(res){
        console.log("请求云函数成功",res)
        that.setData({
          teamList: res.result.data
        })
        },
      fail(res) {
         console.log("请求云函数失败", res)
         }
    })
  },
  data: {
    buttonGetTeamText:'显示开发团队',
    showGetTeamText:false,
    headerst: ['姓名','性别','角色','年龄'],
    isshow: false,

    teamList: [],

    list: [
      {
        id: 'view',
        name: '视图容器',
        open: false,
        pages: ['view', 'scroll-view', 'swiper', 'movable-view', 'cover-view']
      }, {
        id: 'content',
        name: '基础内容',
        open: false,
        pages: ['text', 'icon', 'progress', 'rich-text']
      }, {
        id: 'form',
        name: '表单组件',
        open: false,
        pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'picker-view', 'radio', 'slider', 'switch', 'textarea', 'editor']
      }, {
        id: 'nav',
        name: '导航',
        open: false,
        pages: ['navigator']
      }, {
        id: 'media',
        name: '媒体组件',
        open: false,
        pages: ['image', 'video', 'camera', 'live-pusher', 'live-player']
      }, {
        id: 'map',
        name: '地图',
        open: false,
        pages: ['map']
      }, {
        id: 'canvas',
        name: '画布',
        open: false,
        pages: ['canvas', 'canvas-2d', 'webgl']
      }, {
        id: 'open',
        name: '开放能力',
        open: false,
        pages: ['ad', 'open-data', 'web-view']
      }, {
        id: 'obstacle-free',
        name: '无障碍访问',
        open: false,
        pages: ['aria-component']
      }
    ],
    theme: 'light'
  },

  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
  }
})
