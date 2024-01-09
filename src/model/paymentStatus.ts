export enum PaymentStatus {
    PENDING = 'Pendente',
    COMPLETE = 'Completo',
    FAILED = 'Falha',
    ABANDONED = 'Abandonado',
    PREAPPROVED = 'Pré Aprovado',
    CANCELLED = 'Cancelado',
    OTHER = 'Outro',
  }
  
type PaymentStatusDetails = Record<string, { name: string; color: string }>;

export const paymentStatusDetails: PaymentStatusDetails = {
    PENDING: {
        name: 'Pendente',
        color: 'geekblue',
    },
    COMPLETE: {
        name: 'Completo',
        color: 'green',
    },
    FAILED: {
        name: 'Falha',
        color: 'red',
    },
    ABANDONED: {
        name: 'Abandonado',
        color: 'gray',
    },
    PREAPPROVED: {
        name: 'Pré Aprovado',
        color: 'gold',
    },
    CANCELLED: {
        name: 'Cancelado',
        color: 'orange',
    },
    OTHER: {
        name: 'Outro',
        color: 'black',
    },
};

export const paymentStatusOptions = Object.keys(PaymentStatus).map((key) => ({
    label: PaymentStatus[key as keyof typeof PaymentStatus],
    value: key,
}));