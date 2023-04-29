# Google Search Plugin API

This is an API for a Google Search plugin that can be used with chat-gpt. It allows users to search Google and fetch HTML content from the results.
I opted for t3-stack because the input and output of the plugin are pretty simple


## Get your API keys from Google

Create API credentials: https://console.cloud.google.com/apis/credentials
Get your Programmable Search Engine Key: https://programmablesearchengine.google.com/controlpanel/create
Use these in your .env

This plugin is basically a port from https://github.com/Sogody/google-chatgpt-plugin 

## OpenAPI Specification

This API is documented using the OpenAPI specification (version 3.0.3). The specification file is located in the `yaml` file named `google-search-plugin-api.yaml`.

## Getting Started

### Servers

This API has one server, which is located at `http://localhost:3000`.

### Paths

This API has one path, which is `/api/search`. 

#### `GET /api/search`

This endpoint searches Google using the provided query and returns the search results, along with the inner text of the first link. 

##### Parameters

The endpoint requires one parameter, which is the `q` parameter. This parameter is a query string that represents the search query. 

##### Responses

This endpoint has three possible responses:

- `200`: Successful operation. Returns an array of search results, with each result containing the title, link, and snippet of the search result.
- `400`: Bad request. This occurs when no query is provided.
- `default`: Error fetching search results.

### Example

An example response from this API is shown below:

```json
{
    "results": [
        {
            "title": "GitHub: Let's build from here · GitHub",
            "link": "https://www.github.com/",
            "snippet": "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, ..."
        },
        {
            "title": "GitHub - Wikipedia",
            "link": "https://en.wikipedia.org/wiki/GitHub",
            "snippet": "GitHub, Inc is an Internet hosting service for software development and version control using Git. It provides the distributed version control of Git plus ..."
        }
    ]
}
```
## License
This API is released under the MIT License.