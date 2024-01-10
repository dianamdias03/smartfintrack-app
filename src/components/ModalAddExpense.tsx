import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { ServiceContext } from "../core/service";
import { useContext } from "react";
import { paymentStatusOptions } from "../model/paymentStatus";
import { useCategories } from "../hooks/useCategories";
import { useGroups } from "../hooks/useGroups";

interface ModalAddExpenseProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setListCashFlows: React.Dispatch<React.SetStateAction<any | null>>;
    listCashFlows: any | null;
    userLoginId: number | undefined
}

const ModalAddExpense: React.FC<ModalAddExpenseProps> = ({ isModalOpen, setIsModalOpen,setListCashFlows, listCashFlows, userLoginId }) => {

    const { saveCashFlow } = useContext(ServiceContext);

    const {categories, setCategories} = useCategories(userLoginId);

    const {groupsWithName, setGroupsWithName} = useGroups(userLoginId);

    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const validateMessages = {
        required: '${label} é um campo obrigatório!'
    };
    
    const onFinish = (values: any) => {
        saveCashFlow({
            ...form.getFieldsValue().cashFlow,
            userLogin: {id: userLoginId}
        }, false).then((data) => {
            setListCashFlows(() => [...listCashFlows, {...data, 
                category: {
                    id: data.category,
                    name: categories.find((item) => item.id === data.category.id)?.name
                },
                budgetGroup:{
                    id: data.budgetGroup,
                    name: groupsWithName.find((item) => item.id === data.budgetGroup.id)?.name,
                    budget: groupsWithName.find((item) => item.id === data.budgetGroup.id)?.budget
                }
            
        }]);
            setIsModalOpen(false);
        })
    };

    return(
        <Modal title="Nova Despesa" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }} destroyOnClose>
            <Form
                preserve={false}
                name="new-cashFlow"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
                layout="vertical"
                form={form}
            >
                <Form.Item name={['cashFlow', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['cashFlow', 'description']} label="Descrição" rules={[{ required: true }]}>
                    <Input.TextArea rows={4}/>
                </Form.Item>
                <Form.Item name={['cashFlow', 'transactionDate']} label="Data de Expiração" rules={[{ required: true }]}>
                    <DatePicker></DatePicker>
                </Form.Item>
                <Form.Item name={['cashFlow', 'paymentStatus']} label="Status Pagamento" rules={[{ required: true }]}>
                    <Select
                        placeholder={'Selecione status do pagamento'}
                        options={paymentStatusOptions}
                    />
                </Form.Item>
                <Form.Item name={['cashFlow', 'category']} label="Categoria" rules={[{ required: true }]}>
                    <Select
                        placeholder={'Selecione a categoria'}
                        options={categories}
                    />
                </Form.Item>
                <Form.Item name={['cashFlow', 'budgetGroup']} label="Orçamento" rules={[{ required: true }]}>
                    <Select
                        placeholder={'Selecione o orçamento'}
                        options={groupsWithName}
                    />
                </Form.Item>
                <Form.Item name={['cashFlow', 'cashFlowValue']} label="Valor" rules={[{ required: true }]}>
                    <InputNumber
                        placeholder={'0'}
                        prefix='R$'
                        min={0}
                        style={{ width: 200 }}
                        decimalSeparator = {','}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalAddExpense;