import Table, { ColumnsType } from 'antd/es/table';
import { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Modal, Row } from 'antd';
import { PlusOutlined,DeleteOutlined,ExclamationCircleFilled } from '@ant-design/icons'; 
import { ServiceContext } from '../core/service';
import { useGroups } from '../hooks/useGroups';
import ModalAddGroup from './ModalAddGroup';
import { CashFlow } from '../model/cashFlow';
import { PaymentStatus, paymentStatusDetails } from '../model/paymentStatus';
import jsPDF from 'jspdf';
import { Moment } from 'moment';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';

interface ReportProps {
    userLoginId: number | undefined;
}

const Report: React.FC<ReportProps> = ({ userLoginId }) => {

    return(
        <>
            <ExportToCsv userLoginId={userLoginId}/>
        </>
    );
}

const { RangePicker } = DatePicker;

const headerTitles = {
    id: 'Código',
    name: 'Nome',
    description: 'Descrição',
    creationDate: 'Data de Criação',
    entryDate: 'Data de Entrada',
    transactionDate: 'Data de Expiração',
    paymentStatus: 'Status do Pagamento',
    category: 'Categoria',
    budgetGroup: 'Grupo de Orçamento',
    cashFlowValue: 'Valor do Fluxo de Caixa',
    remainingBudget: 'Orçamento Restante',
    revenue: 'Receita'
};

interface ExportToCsvProps {
    userLoginId: number | undefined;
}

const ExportToCsv: React.FC<ExportToCsvProps> = ({ userLoginId }) => {    
    const [listCashFlows, setListCashFlows] = useState<CashFlow[]>([]);
    const [selectedDates, setSelectedDates] = useState<RangeValue<Dayjs>>(null);
    const [includeRevenue, setIncludeRevenue] = useState(true);
    const [includeExpenses, setIncludeExpenses] = useState(true);
    const { getCashFlows } = useContext(ServiceContext);

    useEffect(() => {
        getCashFlows(userLoginId).then(response => {
            setListCashFlows(response);
        });
    }, []);

    const handleDateChange: RangePickerProps['onChange'] = (dates: RangeValue<Dayjs>) => {
        setSelectedDates(dates);
    };

    const handleRevenueChange = (e: CheckboxChangeEvent) => {
        setIncludeRevenue(e.target.checked);
    };

    const handleExpensesChange = (e: CheckboxChangeEvent) => {
        setIncludeExpenses(e.target.checked);
    };

    const headerTitles: HeaderTitles = {
        id: 'Código',
        name: 'Nome',
        description: 'Descrição',
        creationDate: 'Data de Criação',
        transactionDate: 'Data',
        paymentStatus: 'Status do Pagamento',
        category: 'Categoria',
        budgetGroup: 'Orçamento Inicial',
        cashFlowValue: 'Valor do Fluxo de Caixa',
        remainingBudget: 'Orçamento Restante',
    };

    type HeaderTitles = { [K in keyof CashFlow]?: string };

    const filteredCashFlows = listCashFlows.filter(cashFlow => {
        const transactionDate = dayjs(cashFlow.transactionDate);

        // Verifica se a data de transação está dentro do intervalo selecionado
        const isWithinRange = !selectedDates ||
            (selectedDates[0] && selectedDates[1] &&
             transactionDate.isAfter(selectedDates[0].subtract(1, 'day')) &&
             transactionDate.isBefore(selectedDates[1].add(1, 'day')));

        // Verifica se o registro é uma receita ou despesa, conforme selecionado
        const isRevenue = cashFlow.revenue;
        const include = (includeRevenue && isRevenue) || (includeExpenses && !isRevenue);

        return isWithinRange && include;
    });


    const downloadCsv = () => {
        if (filteredCashFlows.length === 0) {
            alert('Nenhum dado para exportar.');
            return;
        }
    
        const csvRows: string[] = [];
        const headers: (keyof CashFlow)[] = ['id', 'name', 'description', 'creationDate', 'transactionDate', 'paymentStatus', 'cashFlowValue', 'remainingBudget', 'category', 'budgetGroup'];

        const headerRow = headers.map(header => headerTitles[header] || header);
        csvRows.push(headerRow.join(','));

        for (const row of filteredCashFlows) {
            const values = headers.map(header => {
                if (header === 'category' || header === 'budgetGroup') {
                    return `"${row[header]?.name}"`;
                }

                if (header === 'paymentStatus') {
                    const status = row.revenue ? 'COMPLETE' : row[header];
                    return `"${paymentStatusDetails[status]?.name}"`;
                }

                if (header === 'cashFlowValue') {
                    return row['revenue'] ? `"+${row[header]}"` : `"-${row[header]}"`;
                }

                const property = row[header];
                const escaped = ('' + property).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });

            csvRows.push(values.join(','));
        }

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'report.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    


    return (
        <div style={{ margin: '20px 0' }}>
            <Row gutter={16}>
                <Col>
                    <RangePicker onChange={handleDateChange} />
                </Col>
                <Col>
                    <Checkbox checked={includeRevenue} onChange={handleRevenueChange}>Receitas</Checkbox>
                </Col>
                <Col>
                    <Checkbox checked={includeExpenses} onChange={handleExpensesChange}>Despesas</Checkbox>
                </Col>
            </Row>
            <Row gutter={16} style={{paddingTop: '20px'}}>
                <Col>
                    <Button onClick={downloadCsv}>Export to CSV</Button>
                </Col>
            </Row>
        </div>
    );
};


export default Report;