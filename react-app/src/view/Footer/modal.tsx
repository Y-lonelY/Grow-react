import React, { useState, useEffect, useContext } from 'react'
import { Modal } from 'antd'
import { LocaleContext } from '@/cluster/context';

interface ModalData {
    visible: boolean;
}

function FooterModal(props) {
    const [modalData, setModalData] = useState<ModalData>({
        visible: true
    })

    useEffect(() => {
        
    })

    return (
        <Modal
            title='about'
            visible={modalData.visible}
        >
            <p>test</p>
        </Modal>
    )
}
