import { Form, Input, InputNumber, Modal } from "antd";
import { ServiceContext } from "../core/service";
import { useContext } from "react";

interface ModalAddGroupProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setListGroups: React.Dispatch<React.SetStateAction<any | null>>;
    listGroups: any | null;
    userLoginId: number | undefined;
}

const ModalAddGroup: React.FC<ModalAddGroupProps> = ({ isModalOpen, setIsModalOpen,setListGroups, listGroups, userLoginId }) => {
    const { saveBudgetGroups } = useContext(ServiceContext);

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
        saveBudgetGroups({
            ...form.getFieldsValue().budgetGroup,
            userLogin: {id: userLoginId}
        }).then((data) => {
            setListGroups(() => [...listGroups, data]);
            setIsModalOpen(false);
        })
    };

    return(
        <Modal title="Novo Grupo de Orçamento" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
            <Form 
                preserve={false}
                name="new-budgetGroup"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
                layout="vertical"
                form={form}
            >
                <Form.Item name={['budgetGroup', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['budgetGroup', 'description']} label="Descrição" rules={[{ required: true }]}>
                    <Input.TextArea rows={4}/>
                </Form.Item>
                <Form.Item name={['budgetGroup', 'budget']} label="Valor do Orçamento" rules={[{ required: true }]}>
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

export default ModalAddGroup;