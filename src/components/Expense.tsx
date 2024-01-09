import { Button, Modal, Table, Tag } from "antd";
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined,DeleteOutlined,ExclamationCircleFilled } from '@ant-design/icons'; 
import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../core/service";
import { CashFlow } from "../model/cashFlow";
import { paymentStatusDetails } from "../model/paymentStatus";
import ModalAddCashFlow from "./ModalAddExpense";

interface ExpenseProps {
    userLoginId: number | undefined;
}

const Expense: React.FC<ExpenseProps> = ({ userLoginId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { deleteCashFlow } = useContext(ServiceContext);

    const [listCashFlows, setListCashFlows] = useState<CashFlow[]>([]);

    const [selectedCashFlows, setSelectedCashFlows] = useState<React.Key[]>([]);

    const { getExpenses } = useContext(ServiceContext);

    const { confirm } = Modal;

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
        getExpenses(userLoginId).then((response) => {
            setListCashFlows(response);
        });
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
            title: 'Data',
            dataIndex: 'transactionDate',
            align: 'center',
            key: 'transactionDate'
        },
        {
            title: 'Status Pagamento',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            align: 'center',
            render: (paymentStatus: string) => {
                const statusDetails = paymentStatusDetails[paymentStatus];
                return (
                  <Tag color={statusDetails?.color || 'default'}>
                    {statusDetails?.name || paymentStatus}
                  </Tag>
                );
            },
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
                return <Tag color={'volcano'}>{"- " + text}</Tag>
            }
        },
        {
            title: 'Restante orçamento',
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
                    Nova Despesa
                </Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={listCashFlows} 
                key="table-cashFlows" 
                rowKey="id" 
                style={{paddingTop: '10px'}}
                rowSelection={{
                    onChange: (selectedRowKeys: React.Key[]) => {
                        setSelectedCashFlows(selectedRowKeys);
                    }
                }}
                scroll={{ x: 1500, y: 500 }}
            />
            <ModalAddCashFlow isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setListCashFlows={setListCashFlows} listCashFlows={listCashFlows} userLoginId={userLoginId}></ModalAddCashFlow>
        </div>
    );
}

export default Expense;