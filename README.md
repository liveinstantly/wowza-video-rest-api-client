# Wowza Video REST API Client

This repository contains source codes for Wowza Video REST API client.

This API client mainly contains the codes which are automatically generated by OpenAPI Generator tools ([openapi-generator](https://github.com/OpenAPITools/openapi-generator)). OpenAPI Generator Tool is a tool to generate API client/server codes with Open API specification file(s) (such as JSON or YAML files) which describe the Open API specs of your target REST API services.

For Wowza Video REST API, the REST API specifications are published at API endpoint URL, [https://api.docs.video.wowza.com/]](https://api.docs.video.wowza.com/). You can download an Open API spec JSON file by clicking "**Download**" button. But, there are some problems (or bugs) in the Wowza Video's Open API spec JSON file, when using it to generate source codes with OpenAPI Generator tools. Some of this problems and/or bugs are related with Open API spec compliances.

That is my motivation and background to open and publish this repository to share our insights for developers who uses Wowza Video (API).

## How to use Wowza Video REST API Client module

(Work in progress)

Currently, we are developing a NPM module package of Wowza Video REST API Client. We will publish NPM package soon...!

## Bugs and Recommended fixes in Wowza Video OpenAPI JSON

Please see the separated document [(WV-SPEC-BUGS.md)](WV-SPEC-BUGS.md).

## How to run OpenAPI Generator tools

Please run the following commands:

```shellscript
yarn
yarn run og
```

## References: Wowza Video REST API

### Release Notes

You can refer the Release Notes of WOwza Video REST API from here ([https://www.wowza.com/docs/wowza-video-rest-api-release-notes](https://www.wowza.com/docs/wowza-video-rest-api-release-notes)).
