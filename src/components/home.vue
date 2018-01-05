<template>
  <div class="home-wrapper">
    <div class="article-list">
      <article class="article-item" :key="item.uniqueId" v-for="item in articles">
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
        count: 0
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
      }
    },
    mounted () {
      this.refresh()
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
        padding:0 10px 30px 10px;
        transition: all 0.3s ease-in-out;
        &:hover{
          box-shadow: 5px 5px 30px gray;
        }
        .header {
          .title {
            font-size: 30px;
            font-weight: 400;
            text-align: center;
            display: inline-block;
            a {
              text-decoration: none;
              color: black;
            }
          }
          .time {
            display: inline-block;
            color: gray;
            font-size: 14px;
            padding: 3px 0;
            & > span:first-child{
              margin-right: 20px;
            }
          }
        }
        .description{
          margin-top:30px;
          align-self: flex-start;
          font-size:20px;
        }
        .footer{
          margin-top:20px;

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

</style>

