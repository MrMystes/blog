<template>
  <div class="main-wrapper">
    <div class="sidebar">
      <div class="wrap">
        <div class="profile">
          <img src="../assets/images/head.jpg" alt="">
          <p>Mystes's Blog</p>
        </div>
        <div class="buttons" refs="buttons">
          <div class="button" :key="key" v-for="(button,key) in buttons" @click="jump(key)">
            <i :class="key | iconFilter" aria-hidden="true"></i>
            <span>{{button}}</span>
          </div>
        </div>
        <div class="links">
          <a class="link" target="_blank" href="https://github.com/MrMystes">
            <i class="fa fa-github" aria-hidden="true"></i>
          </a>
          <router-link to="/main/search" class="link">
            <i class="fa fa-search" aria-hidden="true"></i>
          </router-link>

        </div>
      </div>
    </div>
    <div class="header">
      <div class="left">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      <span class="title">Mystes's Blog</span>
      <div class="right">
        <img src="../assets/images/head.jpg" alt="">
      </div>
    </div>
    <router-view class="content" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        buttons: {
          'home': '首页',
          'archive': '归档',
          'tag': '标签',
          'user': '关于',
          'link': '友链'
        }
      }
    },
    filters: {
      iconFilter (val) {
        return `fa fa-${val}`
      }
    },
    methods: {
      jump (name) {
        this.$router.replace({name: name})
      }
    },
    mounted () {
      this.$router.replace({name: 'home'})
    }
  }
</script>

<style lang="scss" scoped>
  .main-wrapper {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    .sidebar {
      background: #202020;
      box-shadow: 0px 10px 5px #888888;
      flex: 0 0 250px;
      height: 100%;
      color: #999;
      .wrap {
        .profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 40px;
          img {
            border-radius: 50%;
          }
          p {
            font-size: 25px;
          }
        }
        .buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          .button {
            padding: 20px 10px;
            font-size: 20px;
            cursor: pointer;
          }
        }
        .links {
          display: flex;
          flex-direction: row;
          justify-content: center;
          font-size: 20px;
          .link {
            padding: 20px 10px;
            text-decoration: none;
            color:#fff
          }
        }
      }
    }
    .header {
      display: none;
    }
    .content {
      flex: 1 1 auto;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

  @media screen and (max-width:1024px) {
    .main-wrapper {
      .sidebar {
        flex: 0 0 75px;
        .profile {
          padding-top: 20px;
          padding-bottom: 20px;
          img {
            width: 40px;
            height: 40px;
          }
          p {
            display: none
          }
        }
        .buttons {
          span {
            display: none;
          }
        }
        .links {
          flex-direction: column !important;
          align-items: center;
        }
      }
    }
  }

  @media screen and (max-width:768px) {
    .main-wrapper {
      flex-direction: column;
      .sidebar {
        position: absolute;
        top: 0;
        left: 0;
        flex: none;
        width: 250px;
        transform: translate3d(-250px, 0, 0);
      }
      .header {
        display: flex;
        flex: 0 0 50px;
        align-self: flex-start;
        width: 100%;
        background: #202020;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #999;
        font-size:25px;
        .left{
          margin-left:10px;
          font-size:30px;
        }
        .right {
          margin-right:10px;
          display: flex;
          align-items: center;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
      }
    }
  }

</style>
