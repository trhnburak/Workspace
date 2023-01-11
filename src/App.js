import './App.css';
import './Assets/scss/App.scss'
import tweet from './Assets/img/tweet.png'
import {Avatar, Breadcrumb, Layout, Menu, Table} from "antd";
import Sider from "antd/es/layout/Sider";
import {
    BranchesOutlined,
    CalendarOutlined, LinkedinOutlined,
    MenuOutlined,
    PartitionOutlined,
    PlayCircleOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Card, Col, Divider, Row} from 'antd';
import {Content, Footer, Header} from "antd/es/layout/layout";
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState([]);

    const toLocalDate = (dateInMillis) => {
        let actualDate = new Date((dateInMillis - new Date().getMilliseconds()));
        return actualDate.getFullYear() + "-" + (actualDate.getMonth() + 1) + "-" + actualDate.getDate();
    }

    useEffect(() => {
        axios("http://18.197.228.183:1923/marks")
            .then((res) => {
                console.log(res.data);
                const dataTemp = [];
                for (let i = 0; i < res.data.keyphrase.length; i++) {
                    dataTemp.push({
                        keyphrase: res.data.keyphrase[i],
                        Text: res.data.Text[i],
                        Date: toLocalDate(res.data.Date[i]),
                        URL: res.data.url[i],
                        key: i
                    });
                }
                setData(dataTemp);
                console.log(dataTemp);
            })
            .catch((err) => console.log(err))
    }, []);

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem('Workspaces', '1', <MenuOutlined/>),
        getItem('Subscriptions', '2', <PlayCircleOutlined/>),
        getItem('Calendar', '3', <CalendarOutlined/>),
        getItem('Suggester', '3', <PartitionOutlined/>),
        getItem('Reports', '3', <LinkedinOutlined/>),
    ];

    const columns = [
        {
            title: 'Keyphrase',
            dataIndex: 'keyphrase',
            key: 'key',
        },
        {
            title: 'Text',
            dataIndex: 'Text',
            key: 'key',
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'key',
        },
        {
            title: 'URL',
            dataIndex: 'URL',
            key: 'key',
            render: (url) => <a href={url} target="_blank">{url}</a>,
        },
    ]


    return (
        <div className="App">
            <Layout style={{minHeight: '100vh'}}>
                <Sider width={'20%'}>
                    <Avatar size={64} icon={<UserOutlined/>}/>
                    <Menu theme="dark" widdefaultSelectedKeys={['1']} mode="inline"
                          items={items}/>
                </Sider>
                <Layout className="site-layout">
                    <Header/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Workspace Report</Breadcrumb.Item>
                        </Breadcrumb>
                        <div>
                            <Table dataSource={data} columns={columns}/>
                        </div>

                        <Row gutter={16}>
                            <Col className="gutter-row" span={24}>
                                <h3 style={{textAlign: "left"}}>Tweets</h3>
                            </Col>

                            <Col className="gutter-row" span={12}>
                                <Card style={{width: 500}}>
                                    <Row gutter={16}>
                                        <Col className="gutter-row" span={8}>
                                            <img src={tweet} style={{width: 50}}/>
                                        </Col>
                                        <Col className="gutter-row" span={14}>
                                            <h3 style={{textAlign: 'left'}}>b2v gupta <span
                                                style={{color: '#888', fontSize: '12px'}}>@b2v gupta</span></h3>
                                        </Col>
                                        <Col className="gutter-row" span={24}>
                                            <p style={{textAlign: 'left'}}>Why would #DaleSteyn even say that? He wants
                                                to be on Big Boss or something? PS:
                                                No disrespect (like he used to have for the batsmen's stumps) meant for
                                                legend!</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Card style={{width: 500}}>
                                    <Row gutter={16}>
                                        <Col className="gutter-row" span={8}>
                                            <img src={tweet} style={{width: 50}}/>
                                        </Col>
                                        <Col className="gutter-row" span={14}>
                                            <h3 style={{textAlign: 'left'}}>b2v gupta <span
                                                style={{color: '#888', fontSize: '12px'}}>@b2v gupta</span></h3>
                                        </Col>
                                        <Col className="gutter-row" span={24}>
                                            <p style={{textAlign: 'left'}}>Why would #DaleSteyn even say that? He wants
                                                to be on Big Boss or something? PS:
                                                No disrespect (like he used to have for the batsmen's stumps) meant for
                                                legend!</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                    </Content>


                    <Footer style={{textAlign: 'center'}}></Footer>
                </Layout>
            </Layout>


        </div>
    );
}

export default App;
