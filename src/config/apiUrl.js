let ipUrl = 'http://localhost:8080/'

let servicePath = {
    login : ipUrl + 'login',             //登录接口
    type  : ipUrl + 'type',              //获取文章类别信息
    addArticle : ipUrl + 'addArticle',   //添加文件接口 
    articleList : ipUrl + 'article',     //文章列表 
    deleteArticle : ipUrl + 'deleteArticle',    //删除文章
}

export default servicePath