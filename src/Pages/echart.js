import React, { Component , useEffect, useState } from 'react';
// 引入 ECharts 主模块
import Echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
//引入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import axios from 'axios'
import servicePath from '../config/apiUrl'


function Echart(){

    const [EchartsDate , setEchartsDate] = useState([])

    const initDate = ()=>{

        axios({
            method:'get',
            url:servicePath.type,
        }).then(
            res=>{
                setEchartsDate([
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ])
            }
        )

        
    }

    const initChart = ()=>{
        console.log('初始化图标')
        let element = document.getElementById('main');
        let myChart = Echarts.init(element );
        let option = {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: EchartsDate
        };
        myChart.setOption(option);
        
    }

    //去后台请求数据
    useEffect(()=>{
        initDate()
    },[])

    //更新图标
    useEffect(()=>{
        initChart()
    },[EchartsDate])


    return (
        <div>
            <div id={'main'} style={{ width: 1000, height: 500 }}></div>
        </div>
    )
}



export default Echart