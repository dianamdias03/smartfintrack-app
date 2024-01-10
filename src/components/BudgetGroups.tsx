import Table, { ColumnsType } from 'antd/es/table';
import { useContext, useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined,DeleteOutlined,ExclamationCircleFilled } from '@ant-design/icons'; 
import { ServiceContext } from '../core/service';
import { useGroups } from '../hooks/useGroups';
import ModalAddCategory from './ModalAddCategory';
import ModalAddGroup from './ModalAddGroup';
import { BudgetGroup } from '../model/budgetGroups';

interface BudgetGroupsProps {
    userLoginId: number | undefined;
}

const BudgetGroups: React.FC<BudgetGroupsProps> = ({ userLoginId }) => { 
    const [selectedGroups, setSelectedGroups] = useState<React.Key[]>([]);

    const {groupsWithBudget, setGroupsWithBudget, isLoading} = useGroups(userLoginId);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { deleteBudgetGroups } = useContext(ServiceContext);

    const { confirm } = Modal;

    const showConfirm = () => {
        confirm({
            title: 'Atenção',
            icon: <ExclamationCircleFilled />,
            content: 'Deseja deletar esses itens?',
            onOk() {
                deleteBudgetGroups(selectedGroups as Number[]);
                setGroupsWithBudget(groupsWithBudget.filter(group => !selectedGroups.includes(group.id)));
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };    

    interface DataType {
        name: string;
        description: string;
    }
      
    const columns: ColumnsType<BudgetGroup> = [
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
            title: 'Orçamento',
            dataIndex: 'budget',
            key: 'budget'
        }
    ];

    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button danger icon={<DeleteOutlined />} onClick={showConfirm} style={{marginRight: '10px'}}>
                    Deletar
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Novo Grupo
                </Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={groupsWithBudget} 
                key="table-groups" 
                rowKey="id" 
                style={{paddingTop: '10px'}}
                loading={isLoading}
                rowSelection={{
                    onChange: (selectedRowKeys: React.Key[]) => {
                        setSelectedGroups(selectedRowKeys);
                    },
                    getCheckboxProps: (record: BudgetGroup) => ({
                      disabled: record.hasRelatedData
                    }),
                }}
            />
            <ModalAddGroup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setListGroups={setGroupsWithBudget} listGroups={groupsWithBudget} userLoginId={userLoginId}></ModalAddGroup>
        </div>
    );
}

export default BudgetGroups;