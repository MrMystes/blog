<template>
  <div class="article-wrapper">
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
          <router-link :to="'/article/'+item.uniqueId">阅读全文</router-link>
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
        return createAt.toLocaleString()
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
  .article-wrapper {
    .article-list {
      .article-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fafafa;
        margin:10px 20px;
        border-radius: 10px;
        padding:0 10px 30px 10px;
        transition: all 0.3s ease-in-out;
        &:hover{
          box-shadow: 5px 5px 30px gray;
        }
        .header {
          align-self: flex-start;
          .title {
            font-size: 30px;
            font-weight: 400;
            text-align: center;
            a {
              text-decoration: none;
              color: black;
            }
          }
          .time {
            color: gray;
            font-size: 14px;
            border-top: 1px solid gray;
            border-bottom: 1px solid gray;
            padding: 3px 0;
            & > span:first-child{
              margin-right: 20px;
            }
          }
        }
        .description{
          margin-top:30px;
          align-self: flex-start;
        }
        .footer{
          margin-top:30px;
          align-self: flex-end;
        }
      }
    }
  }

</style>

