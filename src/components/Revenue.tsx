import { Button, Modal, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined,DeleteOutlined,ExclamationCircleFilled } from '@ant-design/icons'; 
import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../core/service";
import { CashFlow } from "../model/cashFlow";
import ModalAddRevenue from "./ModalAddRevenue";
import {
    ExclamationCircleOutlined
} from '@ant-design/icons';

interface RevenueProps {
    userLoginId: number | undefined;
}

const Revenue: React.FC<RevenueProps> = ({ userLoginId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { deleteCashFlow } = useContext(ServiceContext);

    const [listCashFlows, setListCashFlows] = useState<CashFlow[]>([]);

    const [selectedCashFlows, setSelectedCashFlows] = useState<React.Key[]>([]);

    const { getRevenues } = useContext(ServiceContext);

    const { confirm } = Modal;

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const showConfirm = () => {
        confirm({
            title: 'Atenção',
            icon: <ExclamationCircleFilled />,
            content: 'Deseja deletar esses itens?',
            onOk() {
                deleteCashFlow(selectedCashFlows as Number[]);
                setListCashFlows(listCashFlows.filter(cashFlow => !selectedCashFlows.includes(cashFlow.id)));
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    useEffect(() => {
        getRevenues(userLoginId).then((response) => {
            setListCashFlows(response);
        }).finally(() => setIsLoading(false));
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };    

    interface DataType {
        name: string;
        description: string;
    }
    
    const columns: ColumnsType<DataType> = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Data de Criação',
            dataIndex: 'creationDate',
            align: 'center',
            key: 'creationDate'
        },
        {
            title: 'Data de Entrada',
            dataIndex: 'transactionDate',
            align: 'center',
            key: 'transactionDate'
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
            align: 'center',
            render: item => <Tag color="geekblue">{item.name}</Tag>,
        },
        {
            title: 'Orçamento Inicial',
            dataIndex: 'budgetGroup',
            key: 'budgetGroup',
            align: 'center',
            render: item => <>{item.budget}</>,
        },
        {
            title: 'Valor',
            dataIndex: 'cashFlowValue',
            key: 'cashFlowValue',
            align: 'center',
            render: (text, record) => {
                return <Tag color={'green'}>{"+ " + text}</Tag>
            }
        },
        {
            title: 
                <>
                    <Tooltip placement="topRight" title={"O valor do total restante leva em consideração as receitas e despesas do grupo de recurso"}>
                        <ExclamationCircleOutlined />    
                    </Tooltip>                    
                    <span style={{ marginLeft: '8px' }}>Restante do orçamento</span>
                </>,
            dataIndex: 'remainingBudget',
            key: 'remainingBudget',
            align: 'center'
        }
        
    ];

    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button danger icon={<DeleteOutlined />} onClick={showConfirm} style={{marginRight: '10px'}}>
                    Deletar
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Nova Receita
                </Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={listCashFlows} 
                key="table-cashFlows" 
                rowKey="id" 
                style={{paddingTop: '10px'}}
                loading={isLoading}
                rowSelection={{
                    onChange: (selectedRowKeys: React.Key[]) => {
                        setSelectedCashFlows(selectedRowKeys);
                    }
                }}
                scroll={{ x: 1500, y: 500 }}
            />
            <ModalAddRevenue isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setListCashFlows={setListCashFlows} listCashFlows={listCashFlows} userLoginId={userLoginId}></ModalAddRevenue>
        </div>
    );
}

export default Revenue;