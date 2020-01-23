import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showWeakResistModal, toggleFavarite } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import pokedex from '../pokedex.json'

const useZukan = () => {
  const dispatch = useDispatch()

  const handlePokemonClick = (index) => {
    dispatch(showWeakResistModal(index))
  }

  return { handlePokemonClick }
}

const Zukan = () => {
  const { handlePokemonClick } = useZukan()
  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-0">
      <ul className="flex flex-wrap justify-between sm:justify-start pt-20 sm:pt-24 zukan__list">
        {pokedex.map((item, index) => {
          return (
            <li key={item.id} className="mb-3 zukan__item">
              <div className="sm:mx-2 shadow-md">
                <div className="flex justify-end pt-2 pr-2">
                  <button className="leading-none" type="button">
                    <FontAwesomeIcon className="text-pink-400" icon={faHeart} />
                    <FontAwesomeIcon className="text-pink-400" icon={farHeart} />
                  </button>
                </div>
                <div className="pb-1 sm:pb-2 cursor-pointer text-center zukan__btn" onClick={() => {handlePokemonClick(index)}}>
                  <div className={`mx-auto icon-${item.id}MS`} />
                  <span className="inline-block text-xs">{`No.${item.id}`}</span>
                  <ul className="inline-block">
                    {item.type.map((types) => {
                      return (
                        <li key={types} className="inline-block ml-1">
                          <img src={`/static/img/icon/type-${types}.png`} width="15" />
                        </li>
                      )
                    })}
                  </ul>
                  <span className="block text-sm">{item.jname}</span>
                  <span className="block text-gray-400 text-xs">{item.ename}</span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <style jsx>{`
      .zukan__item {
        width: 31%;
      }
      @media (min-width: 640px) {
        .zukan__item {
          width: 20%;
        }
      }
      .zukan__btn {
        transition: opacity 0.2s ease-in-out;
      }
      .zukan__btn:hover {
        opacity: 0.7;
      }
      `}</style>
    </div>
  )
}

export default Zukan