<h1 align="center">Food Scraper API</h1>
<p>This is a RESTful API of recipe data</p>

<h2>End Points</h2>
<h3><code>"/recipes"</code></h3>
<p>Returns a list of Recipes, by default it will return all indian recipes.</p>
<p><code>/recipes?category="maxican"</code> Will return all the Maxican recipes</p>

```js
// Example response
{
    status: "success",
    recipes: [
        {
        recipe_id: "chilli-idli-956384",
        title: "Chilli Idli",
        time_to_prepare: " 20   mins",
        image: {
            url: "url_of_the_image",
            alt: "Chilli Idli Recipe",
            title: "Chilli Idli Recipe"
            }
        },
    ]
},
```

<h3><code>/recipes/:recipe_id</code></h3>
<p>
</p>

```js
// Example response
{
    status: "success",
    data: {
        recipe_id: string,
        title: string,
        image: {
            url: string,
            alt: string,
        }
        description: string,
        meta: [
            {
                label: string,
                value: string
            }
        ],
        ingredients: string[],
        steps: [
            {
                step: string,
                to_do: string
            }
        ],
    }

}
```

<h2>Tech Stack</h2>
<p>
    This API is built with Node.js, Express.js, Axios and JSDOM. The API is hosted on Heroku. </p>
