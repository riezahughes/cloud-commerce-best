# cloud-commerce-best
A simple what-if scenario in which this repo will ask: "What if Cloud Commerce Pro was Good?"

Current Mind Map: (https://awwapp.com/b/umjc1doxf/)

[Customer]
ID, Email, created at, account status (active/disabled), [Orders]

[Order]
ID, External ID, Channel, Created_at, [customer] [variants], subtotal, shipping, status

[Product]
ID,  [variants], title, Variant1, Variant2, Variant3, Description

[Variant]
ID, SKU, Parent_id, variant1_value, variant2_value, variant3_value, price, weight, taxabl

## Setup

Bring up server and db:
```
docker-compose up
```

Get prisma cli:
```
npm i -g prisma
```

Deploy schema:
```
prisma deploy
```

Start graphql server:
```
npm start
```

Happy days on http://localhost:4000/
