import React from 'react'

const Feature = () => {
  return (
    <>
      <h3 className="mb-2 feature__title">機能紹介</h3>
      <dl className="mb-4 feature__dl">
        <dt className="feature__dt">弱点・耐性表示</dt>
        <dd className="mb-2 feature__dd">表示されているポケモンを押すと、そのポケモンの弱点・耐性が表示されます。</dd>
        <dt className="feature__dt">お気に入り</dt>
        <dd className="feature__dd">ポケモンの右上に表示されているハートマークを押すと、ハートがピンク色になるとお気に入り登録完了です。<br />下記で紹介する絞り込み機能で使用します。</dd>
      </dl>
      <h3 className="mb-3 feature__title">絞り込み機能</h3>
      <p className="mb-3 feature__description">ページ右上のメニューボタンより、表示したいポケモンを絞り込み検索が可能です。</p>
      <dl>
        <dt className="feature__dt">お気に入りボケモンで絞り込み</dt>
        <dd className="mb-2 feature__dd">お気に入りに登録されたポケモンを一覧で表示することが可能です。</dd>
        <dt className="feature__dt">タイプで絞り込み</dt>
        <dd className="mb-2 feature__dd">ポケモンのタイプにより絞り込みが可能です。2タイプ持つポケモンの場合は、一つでも該当のタイプを持って入れば表示されます。<br />また、複数選択も可能になっています。</dd>
        <dt className="feature__dt">シリーズで絞り込み</dt>
        <dd className="feature__dd">選択されたシリーズのポケモンのみに絞り込み表示します。※複数選択は不可。</dd>
      </dl>
      <style jsx>{`
        .feature__title {
          font-size: 1.25rem;
          font-weight: 700;
          text-align: center;
        }
        .feature__dt {
          margin-bottom: 0.25rem;
          font-weight: 700;
        }
        .feature__dd,
        .feature__description {
          font-size: 0.875rem;
        }
      `}</style>
    </>
  )
}

export default Feature
