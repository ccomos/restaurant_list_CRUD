# 餐廳清單

## Features
 - 在首頁可瀏覽所有餐廳及簡單資訊
 - 點選餐廳可進入瀏覽詳細資訊
 - 搜尋餐廳名稱或類別找到特定的餐廳
 - 使用者可以新增、修改、刪除餐廳資訊

## Screen Photo
 ![首頁](https://github.com/ccomos/restaurant_list_CRUD/blob/master/public/image/main.jpg)

## How to use
1.開啟終端機(Terminal)至要存放專案的本機位置並執行

```
git clone https://github.com/ccomos/restaurant_list_CRUD.git
```

2.初始

```
cd restaurant_list_CRUD  //切至專案資料夾
```

```
npm install  //安裝套件
```

3.載入資料seeder

```
npm run seed
```

4.開啟程式

```
npm run dev //執行程式, 成功執行下會出現 
'Express is listening on localhost:3000'
'mongodb connected!'
```

5.於任一瀏覽器網址列輸入 [http://localhost:3000](http://localhost:3000) 進行瀏覽

## Tooling
- Node.js
- express
- express-handlebars
- mongoDB
- mongoose