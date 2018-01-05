<template>
  <div class="home-wrapper">
    <div class="article-list">
      <article class="article-item" @click.stop="jumpToArticle(item.uniqueId)" :key="item.uniqueId" v-for="item in articles">
        <header class="header">
          <h3 class="title">
            <router-link :to="'/article/'+item.uniqueId">{{item.title}}</router-link>
          </h3>
          <time class="time">
            <span class="date">{{item.createAt | timeFilter}} </span>
            <span class="tag"> {{item.tag}}</span>
          </time>
        </header>
        <p class="description">{{item.description}}</p>
        <footer class="footer">
          <router-link :to="'/article/'+item.uniqueId">阅读全文 <i class="fa fa-chevron-circle-right" aria-hidden="true"></i></router-link>
        </footer>
      </article>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        articles: [],
        count: 0,
        isSamllScreen: false
      }
    },
    filters: {
      timeFilter (timeStamp) {
        let createAt = new Date(parseInt(timeStamp))
        return createAt.toLocaleDateString()
      }
    },
    methods: {
      refresh () {
        this.$http.get(`/posts?status=0&fields=title,lastUpdate,readCount,tag,status,description,uniqueId`)
          .then(res => {
            this.articles = res.data
            this.count = res.data.length
          })
          .catch(err => {
            console.log(err)
          })
      },
      jumpToArticle (uniqueId) {
        if (this.isSamllScreen) {
          this.$router.push({path: `/article/${uniqueId}`})
        }
      },
      onReSize () {
        const screenSize = document.body.scrollWidth
        console.log(screenSize)
        if (screenSize < 768) {
          this.isSamllScreen = true
        } else {
          this.isSamllScreen = false
        }
      }
    },
    mounted () {
      this.refresh()
      this.onReSize()
      window.onresize = this.onReSize
    }
  }
</script>
<style lang="scss" scoped>
  .home-wrapper {
    .article-list {
      .article-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: #fafafa;
        margin:10px 20px;
        border-radius: 10px;
        padding:0 10px 20px 10px;
        transition: all 0.3s ease-in-out;
        max-width: 1120px;
        &:hover{
          box-shadow: 5px 5px 30px gray;
        }
        .header {
          display: flex;
          flex-direction: row;
          justify-content:space-between;
          width:100%;
          margin: 10px 0;
          .title {
            font-size: 30px;
            font-weight: 550;
            margin:0;
            a {
              text-decoration: none;
              color: black;
            }
          }
          .time {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            color: gray;
            font-size: 14px;
            padding: 3px 0;
            & > span:first-child{
              margin-bottom: 10px;

            }
          }
        }
        .description{
          margin-top:30px;
          align-self: flex-start;
          font-size:20px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;

        }
        .footer{
          margin-top:20px;
          align-self: flex-end;
          border-radius: 5px;
          background-color:#16a085;
          padding:10px 15px;
          transition: background-color .2s ease-in-out;
          &:hover{
            background-color:#1abc9c
          }

          a{
            text-decoration: none;
            color:#fff;
          }
        }
      }
    }
  }

  @media screen and (max-width : 768px) {
    .title{
      font-size:20px!important;
    }
    .description{
      font-size:16px!important;
    }
    .footer{
      display:none;
    }
  }

</style>

