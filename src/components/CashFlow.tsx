import { Table, Tag } from "antd";
import { ColumnsType } from 'antd/es/table';
import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../core/service";
import { CashFlow as cashFlow } from "../model/cashFlow";

interface CashFlowProps {
    userLoginId: number | undefined;
}

const CashFlow: React.FC<CashFlowProps> = ({ userLoginId }) => { 

    const [listCashFlows, setListCashFlows] = useState<cashFlow[]>([]);

    const { getCashFlows } = useContext(ServiceContext);


    useEffect(() => {
        getCashFlows(userLoginId).then((response) => {
            setListCashFlows(response);
        });
    }, []);

    interface DataType {
        name: string;
        description: string;
        revenue: boolean;
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
                return <Tag color={record.revenue ? 'green' : 'volcano'}>{record.revenue ? "+ " + text : "- " + text}</Tag>
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
            <Table 
                columns={columns} 
                dataSource={listCashFlows} 
                key="table-cashFlows" 
                rowKey="id" 
                style={{ paddingTop: '10px', padding: '8px' }} 
                
                /*rowSelection={{
                    onChange: (selectedRowKeys: React.Key[]) => {
                        setSelectedCashFlows(selectedRowKeys);
                    }
                }}*/
                scroll={{ x: 1500, y: 500 }}
            />
        </div>
    );
}

export default CashFlow;