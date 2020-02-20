import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Icon,Button ,Spin , message} from 'antd';
import '../static/css/Login.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'

function Login(props){

    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = ()=>{
        setIsLoading(true)
        if(!userName){
            message.error('用户名不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password){
            message.error('密码不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        // axios.post(servicePath.login+'?userName='+userName+'&passWord='+password).then(
        //     res=>{
        //         setIsLoading(false)
        //         console.log(res)
        //     }
        // )
        axios({
            method:'POST',
            url:servicePath.login+'?userName='+userName+'&passWord='+password,
            withCredentials:true
        }).then(
            res=>{
                
                if(res.data.status==200){
                    setIsLoading(false)
                    props.history.push('/index')
                }else{
                    setTimeout(()=>{
                        setIsLoading(false)
                    },500)
                    message.error('用户名密码错误')
                }
            }
        )
    }

    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="blog Syatem" bordered={true} style={{ width: 400 }}>
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    /> 
                     <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />     
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )

    
}

export default Login