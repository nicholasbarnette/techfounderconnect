# Tech Founder Connect

## Adding Articles

To add an article, follow the following steps.

1. Create a new HTML file based on `./src/articles/shared/__example__.html`.
2. Open `./src/articles/articles.json` and add a new object with the following properties:

```json
{
	"path": "./path/to/article.html",
	"title": "Article Title"
}
```

#### Notes:

-   The path property is relative to the `articles.json` file.
