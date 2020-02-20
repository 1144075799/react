import React, { useState , useEffect } from 'react';
import {List , Row , Col , Modal , message , Button ,Icon } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'
const { confirm } = Modal

function ArticleList (props){
    const [ Articlelist , setArticleList ] = useState([])
    
    useEffect(()=>{
        getArticleList()
    },[])

    const getArticleList = ()=>{
        axios({
            method:'get',
            url:servicePath.articleList
        }).then(
            res=>{
                console.log(res.data.date[0])
                console.log(typeof(res.data.date))
                setArticleList(res.data.date)
            }
        )
    }

    //删除文章的方法
    const deleteArticle = (id)=>{
        confirm({
            title:'确定要删除这篇文章',
            content:'如果你点击ok按钮，文章将会永远被删除，无法恢复',
            okText:'确定',
            cancelText:'取消',
            onOk(){
                axios({
                    method:'POST',
                    url:servicePath.deleteArticle+'?id='+id
                }).then(
                    res=>{
                        message.success('文章删除成功')
                        getArticleList()
                    }
                )
            },
            onCancel(){
                message.success("不进行删除文章")
            }
        });
    }

    return (
        <div>
            <List 
              // 头部
              header={
                <Row className="list-div">
                    <Col span={8}>
                        <b>标题</b>
                    </Col>
                    <Col span={4}>
                        <b>类别</b>
                    </Col>
                    <Col span={4}>
                        <b>发布时间</b>
                    </Col>
                    <Col span={4}>
                        <b>浏览量</b>
                    </Col>

                    <Col span={4}>
                        <b>操作</b>
                    </Col>
                </Row>
                }
              bordered
              //数据源
              dataSource={Articlelist}
              //每一项的设置
              renderItem={item=>(
                <List.Item>
                   <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                             {item.type}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                            <Col span={4}>
                              {item.viewCount}
                            </Col>

                            <Col span={4}>
                              <Button type="primary" >修改</Button>&nbsp;

                              <Button type="danger" onClick={()=>{deleteArticle(item.id)}}>删除 </Button>
                            </Col>
                        </Row>
                </List.Item>
              )}
            />
        </div>
    )
} 

export default ArticleList