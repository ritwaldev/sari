# Live demo

https://sari.vercel.app/

# How to run this project locally:

1- clone repo

2- add .env.local file in the project directory with the following environment variable:

```
NEXT_PUBLIC_SITE_URL = "http://localhost:3000/"
```

3- run

```
npm install
```

4- run

```
npm run dev
```

# Stack

This project was built using [React.js](https://reactjs.org/), [Next.js](https://nextjs.org/), and [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/). There is no particular reason as to why I included Next.js into the mix. Its mainly a wrapper around React.js that adds some powerful features like SSR.

# Notes

- [https://github.com/fabian7593/CountryAPI](https://github.com/fabian7593/CountryAPI) was down at the time of building this project. I uploaded [their data](https://github.com/fabian7593/CountryAPI/blob/master/Files/Data/json%202.txt) directly to the project and used Next.js API to fetch date from file in the backend.

- One thing I wanted to add is a horizontal scrollbar on the top of the Heros table to make it easier for mobile users to know the table is horizontally scrollable. However, I imagine something like that would be out of the scope of this test.
