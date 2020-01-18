import React from 'react'
import Feature from './modal/feature'
import WeekResist from './modal/weekresist'
import { useSelector, useDispatch } from 'react-redux'
import { hideModal } from '../actions'

const useModal = () => {
  const isShowModal = useSelector((state) => state.isShowModal)
  const switchModalContent = useSelector((state) => state.switchModalContent)
  const dispatch = useDispatch()

  const close = () => {
    dispatch(hideModal())
  }

  return { isShowModal, switchModalContent, close }
}

const Modal = () => {
  const { isShowModal, switchModalContent, close } = useModal()
  let modalClass = 'modal'
  if (isShowModal === true) {
    modalClass = `${modalClass} is-open`
  }
  const content = switchModalContent === 'FEATURE' ? Feature() : WeekResist()
  return (
    <div className={modalClass}>
      <div className="modal__overlay" onClick={close} />
      <div className="modal__content">
        {content}
      </div>
      <style jsx>{`
        .modal {
          display: none;
          height: 100vh;
        }
        .modal__overlay {
          position: fixed;
          top: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0);
          transition: all 0.5s;
          z-index: 49;
        }
        .modal__content {
          position: fixed;
          left: 50%;
          top: 50%;
          margin: auto;
          padding: 15px;
          overflow-y: scroll;
          max-width: 500px;
          width: 85%;
          max-height: 90vh;
          background: #FFF;
          border-radius: 8px;
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: all 0.5s;
          z-index: 50;
        }
        .modal.is-open {
          position: fixed;
          display: block;
          z-index: 4;
        }
        .modal.is-open .modal__overlay {
          background: rgba(0, 0, 0, 0.5);
        }
        .modal.is-open .modal__content {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default Modal