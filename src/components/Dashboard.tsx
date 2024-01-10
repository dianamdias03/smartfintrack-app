import { Card, Col, Row, Spin, Statistic, Typography } from "antd";
import { ArrowUpOutlined,ArrowDownOutlined } from '@ant-design/icons'; 
import { ServiceContext } from "../core/service";
import { useContext, useEffect, useState } from "react";
import { Dashboard as DashboardModel } from "../model/dashboard";

interface DashboardProps {
    userLoginId: number | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ userLoginId }) => {

    const { Title } = Typography;
    
    const { getDashboard } = useContext(ServiceContext);

    const [dashboard, setDashboard] = useState<DashboardModel>();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    console.log(dashboard)

    useEffect(() => {
        getDashboard(userLoginId).then((response) => {
            setDashboard(response);
        }).finally(() => setIsLoading(false));
    }, []);

    return(
        <>
            <Title level={3}>Dashboard</Title>
            <Row gutter={16}>
                <Col span={12}>
                <Card bordered={false}>
                    <Spin spinning={isLoading}>
                        <Statistic
                            title="Total de receitas"
                            value={dashboard?.totalRevenue}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Spin>
                </Card>
                </Col>
                <Col span={12}>
                <Card bordered={false}>
                    <Spin spinning={isLoading}>
                        <Statistic
                        title="Total de despesas"
                        value={dashboard?.totalExpense}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        />
                    </Spin>
                </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Spin spinning={isLoading}>
                            <Statistic
                                title="Total de receitas nos últimos 30 dias"
                                value={dashboard?.totalRevenueLast30Days}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Spin>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Spin spinning={isLoading}>
                            <Statistic
                                title="Total de despesas nos últimos 30 dias"
                                value={dashboard?.totalExpenseLast30Days}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                            />
                        </Spin>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Card bordered={false}>
                        <Spin spinning={isLoading}>
                            <Statistic
                                title="Orçamento total restante"
                                value={dashboard?.remainingBalance}
                                precision={2}
                                valueStyle={dashboard?.remainingBalance !== undefined && dashboard?.remainingBalance < 0 ? { color: '#cf1322' } : { color: '#3f8600' }}
                                prefix={dashboard?.remainingBalance !== undefined && dashboard?.remainingBalance < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                            />
                        </Spin>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Spin spinning={isLoading}>
                            <Statistic
                                title="Porcentagem de despesas em relação às receitas"
                                value={dashboard?.expensePercentage}
                                precision={2}
                                valueStyle={dashboard?.expensePercentage !== undefined && dashboard?.expensePercentage > 70 ? { color: '#cf1322' } : { color: '#3f8600' }}
                                prefix={dashboard?.expensePercentage !== undefined && dashboard?.expensePercentage > 70 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                                suffix={"%"}
                            />
                        </Spin>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;