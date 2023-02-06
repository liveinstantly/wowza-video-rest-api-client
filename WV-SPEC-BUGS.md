# Bugs & Recommended fixes in Wowza Video REST API spec JSON (swagger.json)

Wowza Video REST API endpoint provides OpenAPI spec v3 JSON file at the URL, [https://api.docs.video.wowza.com/]](https://api.docs.video.wowza.com/). You can download an Open API spec JSON file by clicking "**Download**" button. But, there are some problems (or bugs) in the Wowza Video's Open API spec JSON file, when using it to generate source codes with OpenAPI Generator tools. Some of this problems and/or bugs are related with Open API spec compliances.

This document describes the details of bugs and problems in Wowza Video OpenAPI spec file.

## Major bugs

### Non-Compliance bugs (grammatical bugs)

#### 1. No "items" property under "array" type

Under the following schema definitions in the spec, there are non-compliance "array" type definitions without "items" property.

* components/schemas/asset
* components/schemas/asset_report_uploaded_output
* components/schemas/asset_report_upload_failed_output
* components/schemas/asset_tags
* components/schemas/asset_update_input
* components/schemas/asset_update_output

Below is an example of the non-compliance definition and recommended fixes.

* Original schema:

```json
      "asset": {
        "type": "object",
        "description": "",
        "properties": {
            ...
          "tags": {
            "type": "array",
            "description": "A list of tags associated with the asset.",
            "example": [
              "Tag1",
              "Tag2",
              "Tag3"
            ]
          },
            ...
        }
      },
```

* Fixed schema:

```json
      "asset": {
        "type": "object",
        "description": "",
        "properties": {
            ...
          "tags": {
            "type": "array",
            "description": "A list of tags associated with the asset.",
            "example": [
              "Tag1",
              "Tag2",
              "Tag3"
            ]
            "items": {
              "description": "An asset tag.",
              "type": "string"
            }
          },
            ...
        }
      },
```

### 2. Invalid schema definitions

Under the following schema definitions in the spec, there are invalid schema bugs.

* fastly_stream_target_input
* fastly_stream_target_update_input

Concretely, **delivery_protocols** property for a request against the following API must contains *Array of string* according to the intended API spec, but the schema defines **delivery_protocols** property as *Array of object*.

* POST /stream_targets/fastly
* PATCH /stream_targets/fastly/{id}

Below is an example of the non-compliance definition and recommended fixes.

* Original schema:

```json
        "properties": {
          "stream_target_fastly": {
              ...
            "properties": {
                ...
              "delivery_protocols": {
                "type": "array",
                "description": "Specifies the protocols sent to the stream target. Valid values are **hls** and **dash** (MPEG-DASH). The default is **hls**. Available from version 1.7.\n\n**Note:** If you enable more than one protocol, you'll incur egress charges for each protocol you select.\n\nSee <a href=\"https://www.wowza.com/docs/protect-streams-for-google-widevine-and-microsoft-playready-devices-with-ezdrm-and-the-wowza-video-rest-api\">Protect streams for Google Widevine and Microsoft PlayReady devices with EZDRM and the Wowza Video REST API</a> for an example of setting MPEG-DASH as a delivery protocol for digital rights management (DRM) use.\n\n**Example:** See response body sample",
                "items": {
                  "type": "string",
                  "properties": {
                    "hls": {
                      "type": "string",
                      "description": "Sends an HLS stream to the stream target."
                    },
                    "dash": {
                      "type": "string",
                      "description": "Sends a MPEG-DASH stream to the target."
                    }
                  }
                }
              },
                ...
            },
              ...
          }
        }
```

* Fixed schema:

```json
      "fastly_stream_target_update_input": {
          ...
        "properties": {
          "stream_target_fastly": {
              ...
            "properties": {
                ...
              "delivery_protocols": {
                "type": "array",
                "description": "Specifies the protocols sent to the stream target. Valid values are **hls** and **dash** (MPEG-DASH). The default is **hls**. Available from version 1.7.\n\n**Note:** If you enable more than one protocol, you'll incur egress charges for each protocol you select.\n\nSee <a href=\"https://www.wowza.com/docs/protect-streams-for-google-widevine-and-microsoft-playready-devices-with-ezdrm-and-the-wowza-video-rest-api\">Protect streams for Google Widevine and Microsoft PlayReady devices with EZDRM and the Wowza Video REST API</a> for an example of setting MPEG-DASH as a delivery protocol for digital rights management (DRM) use.\n\n**Example:** See response body sample",
                "items": {
                  "type": "string",
                  "enum": [
                    "dash",
                    "hls"
                  ]
                }
              },
                ...
            },
              ...
          }
        }
      },

```

### 3. Single object type definitions instead of "array" type definition

Under the following schema definitions in the spec, there are single object type definitions, while API expects **Array** response at the target properties.
This is because examples of API responses explain in the Wowza Video REST API spec file (swagger.json) that it returns **Array** but the schema does not define **Array**.

* countries @ usage_accounts_countries
* trend @ usage_accounts_trend
* account/countries @ usage_accounts_viewer_data
* account/trends @ usage_accounts_viewer_data
* trend @ usage_transcoder_trend
* countries @ usage_transcoder_countries
* summary/configurations @ usage_transcoder_summary
* trend @ usage_transcoder_trend
* transcoder/countries @ usage_transcoders_viewer_data
* transcoder/trends @ usage_transcoders_viewer_data
* stream_targets @ usage_stream_targets
* stream_target/zones @ usage_stream_target
* summary/zones @ usage_stream_target_summary
* countries @ usage_stream_target_countries
* renditions @ usage_stream_target_renditions
* stream_target/countries @ usage_stream_target_viewer_data
* stream_target/viewer_trend @ usage_stream_target_viewer_data
* vod_streams @ usage_vod_streams
* countries @ usage_vod_stream_countries
* renditions @ usage_vod_stream_renditions
* trend @ usage_vod_stream_trend
* vod_stream/countries @ usage_vod_streams_viewer_data
* vod_stream/viewer_trend @ usage_vod_streams_viewer_data
* real_time_streams @ usage_real_time_streams
* maybe more or less... (under investigation with Wowza product support)

Below is an example of the non-compliance definition and recommended fixes.

* Original schema:

```json
        "properties": {
          "trend": {
            "type": "object",
            "title": "Array of trends",
            "description": "An array of trend data",
            "properties": {
              ...
            }
          }
        }
```

* Fixed schema:

```json
        "properties": {
          "trend": {
            "type": "array",
            "description": "An array of trend data",
            "items": {
              "type": "object",
              "title": "an_appropriate_for_this_object",
              "properties": {
                ...
              }
            }
          }
        }
```

## Recommended fixes

There are some recommended fixes in Wowza Video REST API spec (swagger.json) for OpenAPI Generator Tools to create API client source code templates, since schema names, schema object titles, and operation ids are not appropriate.

This will be described in this document more in detail soon.
