# cloud-commerce-best

Current Mind Map: (https://awwapp.com/b/umjc1doxf/)

[Customer]
ID, Email, created at, account status (active/disabled), [Orders]

[Order]
ID, External ID, Channel, Created_at, [customer] [variants], subtotal, shipping, status

[Product]
ID,  [variants], title, Variant1, Variant2, Variant3, Description

[Variant]
ID, SKU, Parent_id, variant1_value, variant2_value, variant3_value, price, weight, taxable

[Channel]
ID, URL API Key, API Pass, Platform

## Setup

Bring up server and db:
```
docker-compose up
```

Get prisma cli (install in npm globally):
```
npm i -g prisma
```

Deploy schema:
```
prisma deploy
```

Install all dependancies
```
npm install
```

Start graphql server:
```
npm start
```

Happy days on http://localhost:4000/
