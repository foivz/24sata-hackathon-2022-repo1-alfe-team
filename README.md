## Stack

- `prisma` - ORM
- `react-hook-form` - forms
- `chakra` - ui
- `react-query` - querys/mutations
- `axios` - fetching
- `date-fns` - dates

## Demos

CRUD API - pages/api/complaint.ts

## Setup

```
pnpm i
```

```
pnpm dev
```

```
pnpm prisma generate
```

Pozz svima!

## API

### Teams

- za dobit teamove usera -> api/teams/
- za dodat team -> POST : api/teams/ -> name
- za kupnje teama -> GET : api/spending/
- za dodat kupnje teams -> POST : api/spending/ -> amount, teamdId, itemId
- za join u team - GET -> /api/teams/join?teamId=id
- za mog usera PATCH -> /api/me/

GPT3 za shopping list: http://localhost:3000/api/openai?type=items_recommend_for_event&event=ro%C5%A1tilj&manual_add=kobasica,votka,%C4%8Devapi,ulje, 

http://localhost:3000/api/openai?type=items_recommend_for_event&manual_add=kobasica,votka,%C4%8Devapi,ulje, //može i bez eventa onda samo nastavlja.

GPT3 za team: http://localhost:3000/api/openai?type=items_recommend_for_team&teamId=cl1i3gox50045z0vcvdi9m2f6
