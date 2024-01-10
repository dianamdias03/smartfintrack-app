import Table, { ColumnsType } from 'antd/es/table';
import { useContext, useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined,DeleteOutlined,ExclamationCircleFilled } from '@ant-design/icons'; 
import ModalAddCategory from './ModalAddCategory';
import { ServiceContext } from '../core/service';
import { useCategories } from '../hooks/useCategories';
import { Category } from '../model/category';

interface CategoriesProps {
    userLoginId: number | undefined;
}

const Categories: React.FC<CategoriesProps> = ({ userLoginId }) => {    
    const [selectedCategories, setSelectedCategories] = useState<React.Key[]>([]);

    const {categories, setCategories, isLoading} = useCategories(userLoginId);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { deleteCategory } = useContext(ServiceContext);

    const { confirm } = Modal;

    const showConfirm = () => {
        confirm({
            title: 'Atenção',
            icon: <ExclamationCircleFilled />,
            content: 'Deseja deletar esses itens?',
            onOk() {
                deleteCategory(selectedCategories as Number[]);
                setCategories(categories.filter(category => !selectedCategories.includes(category.id)));
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };    
      
    const columns: ColumnsType<Category> = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description'
        }
    ];

    //hasRelatedData

    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button danger icon={<DeleteOutlined />} onClick={showConfirm} style={{marginRight: '10px'}}>
                    Deletar
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Nova Categoria
                </Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={categories} 
                key="table-categories" 
                rowKey="id" 
                style={{paddingTop: '10px'}}
                loading={isLoading}
                rowSelection={{
                    onChange: (selectedRowKeys: React.Key[]) => {
                        setSelectedCategories(selectedRowKeys);
                    },
                    getCheckboxProps: (record: Category) => ({
                      disabled: record.hasRelatedData
                    }),
                }}
            />
            <ModalAddCategory isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setListCategories={setCategories} listCategories={categories} userLoginId={userLoginId}></ModalAddCategory>
        </div>
    );
}

export default Categories;