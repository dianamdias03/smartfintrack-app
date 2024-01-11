import { Button, Card, Col, Row, Spin, Statistic, Typography } from "antd";
import { ArrowUpOutlined,ArrowDownOutlined } from '@ant-design/icons'; 
import { ServiceContext } from "../core/service";
import { useContext, useEffect, useState } from "react";
import { Dashboard as DashboardModel } from "../model/dashboard";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
    userLoginId: number | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ userLoginId }) => {

    const { Title } = Typography;
    
    const { getDashboard } = useContext(ServiceContext);

    const [dashboard, setDashboard] = useState<DashboardModel>();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        getDashboard(userLoginId).then((response) => {
            setDashboard(response);
        }).finally(() => setIsLoading(false));
    }, []);

    return(
        <>
            <Title level={3} style={{ textAlign: 'center'}}>Dashboard</Title>
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
            <div style={{ marginTop: '20px', marginBottom: '40px' }}> {/* Espaçamento em relação ao componente acima */}
            <Title level={3} style={{ textAlign: 'center', marginBottom: '40px', marginTop: '40px' }}>Acesso rápido</Title> {/* Título alinhado ao centro com espaço abaixo */}
            
                <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}> {/* Espaçamento entre os botões e abaixo da linha */}
                    <Col span={8}>
                    <Button block onClick={() => navigate('/expense')}>Despesas</Button>
                    </Col>
                    <Col span={8}>
                    <Button block onClick={() => navigate('/revenue')}>Receitas</Button>
                    </Col>
                    <Col span={8}>
                    <Button block onClick={() => navigate('/cashFlow')}>Fluxo de Caixa</Button>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}> {/* Espaçamento entre os botões */}
                    <Col span={8}>
                    <Button block onClick={() => navigate('/report')}>Relatórios</Button>
                    </Col>
                    <Col span={8}>
                    <Button block onClick={() => navigate('/categories')}>Categorias</Button>
                    </Col>
                    <Col span={8}>
                    <Button block onClick={() => navigate('/budgetGroups')}>Grupos de orçamento</Button>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Dashboard;