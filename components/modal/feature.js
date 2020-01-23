import React from 'react'
import { useSelector } from 'react-redux'

const useFeature = () => {
  const weakResist = useSelector((state) => state.modalReducer.weakResist)

  return { weakResist }
}

const Feature = () => {
  const { weakResist } = useFeature()

  return (
    <>
      <h3 className="mb-2">機能紹介</h3>
      <dl className="mb-4">
        <dt>弱点・耐性表示</dt>
        <dd className="mb-2">表示されているポケモンを押すと、そのポケモンの弱点・耐性が表示されます。</dd>
        <dt>お気に入り</dt>
        <dd>ポケモンの右上に表示されているハートマークを押すと、ハートがピンク色になるとお気に入り登録完了です。<br />下記で紹介する絞り込み機能で使用します。</dd>
      </dl>
      <h3 className="mb-3">絞り込み機能</h3>
      <p className="mb-3">ページ右上のメニューボタンより、表示したいポケモンを絞り込み検索が可能です。</p>
      <dl>
        <dt>お気に入りボケモンで絞り込み</dt>
        <dd className="mb-2">お気に入りに登録されたポケモンを一覧で表示することが可能です。</dd>
        <dt>タイプで絞り込み</dt>
        <dd className="mb-2">ポケモンのタイプにより絞り込みが可能です。2タイプ持つポケモンの場合は、一つでも該当のタイプを持って入れば表示されます。<br />また、複数選択も可能になっています。</dd>
        <dt>シリーズで絞り込み</dt>
        <dd>選択されたシリーズのポケモンのみに絞り込み表示します。※複数選択は不可。</dd>
      </dl>
      <style jsx>{`
        h3 {
          font-size: 1.25rem;
          font-weight: 700;
          text-align: center;
        }
        dt {
          margin-bottom: 0.25rem;
          font-weight: 700;
        }
        dd, p {
          font-size: 0.875rem;
        }
      `}</style>
    </>
  )
}

export default Feature
