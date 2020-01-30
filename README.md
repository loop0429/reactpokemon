# ポケモンGO図鑑(React版)

## 開発環境
```
yarn // モジュールのインストール
yarn dev // 開発モード
yarn spritesmith // .spritesmith.jsを元にスプライト画像を生成
```

## 注意
- すべてのstateがlocalstorageに保持されているため、ページをリロードなどして再度開くと前回と全く同じ状態で開かれる
  - デフォルトでredux-persistのサンプルを使わなかったので、書き直すのがめんどくさくなったので諦めた

## データについて
- 図鑑データ https://github.com/fanzeyi/pokemon.json
- tailwindcss https://tailwindcss.com/
- fontAwesome https://fontawesome.com/
