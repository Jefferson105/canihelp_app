import React from 'react';

import { useSelector } from '@context/index';

import { BoxConfirm } from '@styles/layout/box-confirm';
import { BoxReport } from '@styles/layout/box-report';
import Toast from './ToastContainer/Toast/index';

const Base = () => {
    const { layout } = useSelector(({ layout }) => ({
        layout
    }));

    if (layout.boxConfirm) return <BoxConfirm {...layout.boxConfirm} />;
    if (layout.boxReport) return <BoxReport {...layout.boxReport} />;
    if (layout.toast?.length > 0)
        return layout.toast.map((toast, index) => (
            <Toast key={toast.id} message={toast} index={index} />
        ));
    return <></>;
};

export default Base;
