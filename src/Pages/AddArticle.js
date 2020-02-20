import React, { useState , useEffect } from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { Row , Col , Input , Select , Button , DatePicker, message } from 'antd'
import Title from 'antd/lib/skeleton/Title';
const { Option } = Select //对象解析
const { TextArea } = Input


function AddArticle(){

    const [ articleId , setArticleId ] = useState(0)            //文章ID
    const [ articleTitle , setArticleTitle] = useState('')      //文章标题
    const [ articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [ markdownContent , setMarkdownContent ] = useState('预览内容') //html内容
    const [ introducemd , setIntroducemd ] = useState()         //简介的markdown内容
    const [ introducehtml , setIntroducehtml ] = useState('等待编辑') //简介的html内容
    const [ showData , setShowData ] = useState()   //发布日期
    const [ updateDate , setUpdateDate] = useState() //修改日期
    const [ typeInfo , setTypeInfo ] = useState([])   //文章类别信息
    const [ selectedType , setSelectedType] = useState('请选择类型') //选择文章类型    

    //[] 就是只执行一次
    useEffect(()=>{
        getTypeInfo()
    },[])

    const renderer = new marked.Renderer();

    //markdown设置
    marked.setOptions({
        renderer:renderer,
        gfm:true,
        pedantic:false,
        sanitize:false,
        tables:true,
        breaks:false,
        smartLists:true,
        smartypants:false
    })

    const changeContext = (e)=>{
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfo = ()=>{
        axios({
            method:'get',
            url:servicePath.type,
        }).then(
            res=>{
                
                setTypeInfo(res.data['date'])
            }
        )
    }

    const selectTypeHandler = (value)=>{
        setSelectedType(value)
    }

    const saveArticle = ()=>{
        if(selectedType==='请选择类型'){
            message.error("必须选择文章类型")
            return false
        }else if(!articleTitle){
            message.error("必须填写文章标题")
            return false
        }else if(!articleContent){
            message.error("必须填写文章内容")
            return false
        }else if(!introducemd){
            message.error("必须填写文章简介")
            return false
        }else if(!showData){
            message.error("必须填写发布时间")
            return false
        }
        
        axios({
            method:'POST',
            url:servicePath.addArticle+'?type_id='+selectedType+'&title='+articleTitle+'&article_content='+articleContent+'&introduce='+introducemd+'&addTime='+showData
        }).then(
            res=>{
                if(res.data['status']==200){
                    message.success(res.data['msg'])
                    setSelectedType('请选择类型')
                    setMarkdownContent('预览内容')
                    setIntroducehtml('等待编辑')
                    setArticleTitle('')
                    setArticleContent('')
                    setIntroducemd('')
                    
                }else{
                    message.error(res.data['msg'])
                }
            }
        )
    }



    return(
        <div>
            <Row gutter={5}>
                <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                    <Row gutter={10}>
                        <Col xs={24} sm={24} md={24} lg={18} xl={19}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={e=>{setArticleTitle(e.target.value)}}
                            />
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={6} xl={5}> 
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange = {selectTypeHandler} value={selectedType}>
                                {
                                    // console.log(typeInfo)
                                    typeInfo.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <TextArea 
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                value={articleContent}
                                onChange={changeContext}
                                />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="show-html"
                                value={markdownContent}
                                dangerouslySetInnerHTML={{__html:markdownContent}}
                            >
                                
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={6}>
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={0} xl={24}>
                                <Button  size="large">暂存文章</Button>&nbsp;
                                <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                                <br/>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={24}>
                            <br/>
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                                value={introducemd}
                            >
                            </TextArea>
                            <br/><br/>
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{__html:introducehtml}}
                            ></div>
                        </Col>
                        
                        <Col xs={0} sm={0} md={0} lg={0} xl={12}>
                            <br/>
                            <div className="data-select">
                                <DatePicker 
                                    
                                    onChange={(date,dateString)=>{setShowData(dateString)}}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle