import React from 'react'
import Feature from './feature'
import WeekResist from './weekresist'
import { useSelector, useDispatch } from 'react-redux'

const useModal = () => {
  const isShowModal = useSelector((state) => state.isShowModal)
  const isFeature = useSelector((state) => state.isFeature)
  const dispatch = useDispatch()
  const modal = () => {
    dispatch({
      type: 'MODAL'
    })
  }

  return { isShowModal, modal, isFeature }
}

const Modal = () => {
  const { isShowModal, isFeature, modal } = useModal()
  let modalClass = 'modal'
  if (isShowModal === true) {
    modalClass = `${modalClass} is-open`
  }
  const content = isFeature ? Feature() : WeekResist()
  return (
    <div className={modalClass}>
      <div className="modal__overlay" onClick={modal} />
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
