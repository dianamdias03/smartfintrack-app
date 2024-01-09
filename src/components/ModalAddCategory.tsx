import { Form, Input, Modal } from "antd";
import { ServiceContext } from "../core/service";
import { useContext } from "react";

interface ModalAddCategoryProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setListCategories: React.Dispatch<React.SetStateAction<any | null>>;
    listCategories: any | null;
    userLoginId: number | undefined;
}

const ModalAddCategory: React.FC<ModalAddCategoryProps> = ({ isModalOpen, setIsModalOpen,setListCategories, listCategories, userLoginId }) => {
    const { saveCategory } = useContext(ServiceContext);

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
        saveCategory({
            ...form.getFieldsValue().category,
            userLogin: {id: userLoginId}
        }).then((data) => {
            setListCategories((listCategories: any) => [...listCategories, data]);
            setIsModalOpen(false);
        })
    };

    return(
        <Modal title="Nova Categoria" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
            <Form
                preserve={false}
                name="new-category"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
                layout="vertical"
                form={form}
            >
                <Form.Item name={['category', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['category', 'description']} label="Descrição" rules={[{ required: true }]}>
                    <Input.TextArea rows={4}/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalAddCategory;