<template>
  <div class="article-wrapper">
    <div class="content">
      <header class="header">
        <div class="title-wrapper">
        <h1 class="title">{{article.title}}</h1>
        <div class="tags">
          <i class="fa fa-tag" aria-hidden="true"></i>
          <div class="tag" :key="tag" v-for="tag in article.tag.split(',')">
            <div class="traingle" :style="{'border-right-color':randomColor(tag)}"></div>
            <span class="tag-content" :style="{'background-color':randomColor(tag)}">{{tag}}</span>
          </div>
        </div>
        </div>

        <div class="info">
          <time class="time">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            {{article.lastUpdate | timeFilter}}
          </time>
          <span class="comments">0 comments</span>
          <span class="read-count">{{article.readCount}} read</span>
        </div>

      </header>
      <section class="section markdown-body" v-html="article.content"></section>
    </div>
    <div class="catalogue"></div>

  </div>
</template>

<script>
  import 'github-markdown-css'
  export default {
    data () {
      return {
        uniqueId: '',
        article: {},
        tagColors: ['rgb(156, 145, 161)', 'rgb(125, 198, 230)', 'rgb(255, 170, 130)']
      }
    },
    methods: {
      randomColor (tag) {
        return this.tagColors[tag.length % 3]
      }
    },
    filters: {
      timeFilter (val) {
        let lastUpdate = new Date(Number(val))
        return lastUpdate.toLocaleString()
      }
    },
    mounted () {
      this.uniqueId = this.$route.params.id
      this.$http.get(`/posts/${this.uniqueId}`)
        .then(res => {
          this.article = res.data
        })
        .catch(err => {
          this.$message.warning(err.res.data)
        })
    }
  }
</script>

<style lang="scss" scoped>
  .article-wrapper {
    padding: 20px;
    display: flex;
    flex-direction: row;

    .content {
      width:100%;
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .title-wrapper{
          .title{
            flex:1 1 auto;
            margin:0 0 20px 0;
          }
          .tags {
            display: flex;
            flex-direction: row;
            align-items: center;
            i{
              font-size:20px;
            }
            .tag {
              margin-left: 10px;
              display: flex;
              flex-direction: row;
              align-items: center;
              .traingle {
                display: inline-block;
                width: 0;
                height: 0;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-right: 12px solid;
              }
              .tag-content {
                margin-left: 1px;
                padding: 3px 20px;
                border-radius: 5px;
                color: white;
              }
            }
          }
        }
        .info {
          flex: 0 0 200px;
          display: flex;
          flex-direction: column;
          align-items:flex-end;
          font-size: 16px;
          margin-top:10px;

          &>:nth-child(n){
            margin-bottom:10px;
          }

        }
      }
      .section{
        margin-top:20px;
      }
    }
    .catalogue{
      flex:0 0 200px;
    }
  }

  @media screen and (max-width:768px){
    .catalogue{
      display: none;
    }
    .info{
      display: none!important;
    }
  }
</style>



