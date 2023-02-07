# Bugs & Recommended fixes in Wowza Video REST API Spec JSON (swagger.json)

Wowza Video REST API endpoint provides OpenAPI Specification v3 JSON file at the URL, [https://api.docs.video.wowza.com/](https://api.docs.video.wowza.com/). You can download an Open API Specification JSON file by clicking "**Download**" button. But, there are some problems (or bugs) in the Wowza Video's Open API Specification JSON file, when using it to generate source codes with OpenAPI Generator tools. Some of this problems and/or bugs are related with Open API Specification compliances.

This document describes the details of bugs and problems in Wowza Video OpenAPI Specification file.

## Major bugs

### Non-Compliance bugs (grammatical bugs)

#### 1. No "**items**" property under "**array**" type

Under the following schema definitions in Wowza's API Specs, there are non-compliance "**array**" type definitions without "**items**" property.

* *components/schemas/asset*
* *components/schemas/asset_report_uploaded_output*
* *components/schemas/asset_report_upload_failed_output*
* *components/schemas/asset_tags*
* *components/schemas/asset_update_input*
* *components/schemas/asset_update_output*

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

### 2. Needless "**allOf**" directives in the schema definitions

The following schema definitions use "**allOf**" directives but there is no requirement of "**allOf**" since all "**allOf**" occurences contains only one object.
We don't know an intention of the Wowza's spec what they want to do. But, it can be removed to make it simple for code generator.

* *components/schemas/url_create_input*
* *components/schemas/url_update_input*
* *components/schemas/custom_stream_target_create_input*
* *components/schemas/fastly_stream_target_create_input*
* *components/schemas/output_create_input*
* *components/schemas/output_update_input*
* *components/schemas/output_stream_target_create_input*
* *components/schemas/output_stream_target_update_input*

Below is a fix of the original schema definition and recommended fixes.

* Original schema:

```json
      "fastly_stream_target_create_input": {
        "description": "",
        "allOf": [
          {
            "$ref": "#/components/schemas/fastly_stream_target_input"
          }
        ],
          ...
      },
```

* Fixed schema:

```json
      "fastly_stream_target_create_input": {
        "description": "",
        "$ref": "#/components/schemas/fastly_stream_target_input",
        ...
      },
```

### Mismatch bugs (mismatch type definitions between specs and examples)

#### 1. Property naming for "**usage_transcoder**" schema

Below is a fix of the original schema definition and recommended fixes.

* Original schema:

```json
      "usage_transcoder": {
        "type": "object",
        "title": "transcoders",
        "description": "",
        ...
```

* Fixed schema:

```json
      "usage_transcoder": {
        "type": "object",
        "title": "transcoder",
        "description": "",
        ...
```

#### 1. Invalid schema definitions for "**delivery_protocols**"

Under the following schema definitions in Wowza's API Specs, there are invalid schema bugs.

* *components/schemas/fastly_stream_target_input*
* *components/schemas/fastly_stream_target_update_input*

Concretely, **delivery_protocols** property for a request body against the following APIs seem to require containing *Array of string* according to Wowza's intended API Specs, but the schema defines **delivery_protocols** property as *Array of object*.

* POST */stream_targets/fastly*
* PATCH */stream_targets/fastly/{id}*

Below is an example of the original schema definition and recommended fixes.

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

#### 2. Single object type definitions instead of "array" type definition

Under the following schema definitions in Wowza's API Specs, there are single object type definitions, while API expects **Array** response at the target properties.
This is because examples of API responses explain in the Wowza Video REST API Specification file (swagger.json) that it returns **Array** but the schema does not define **Array**.

* **countries** @ *components/schemas/usage_accounts_countries*
* **trend** @ *components/schemas/usage_accounts_trend*
* **account**/**countries** @ *components/schemas/usage_accounts_viewer_data*
* **account**/**trends** @ *components/schemas/usage_accounts_viewer_data*
* **trend** @ *components/schemas/usage_transcoder_trend*
* **countries** @ *components/schemas/usage_transcoder_countries*
* **summary**/**configurations** @ *components/schemas/usage_transcoder_summary*
* **trend** @ *components/schemas/usage_transcoder_trend*
* **transcoder**/**countries** @ *components/schemas/usage_transcoders_viewer_data*
* **transcoder**/**trends** @ *components/schemas/usage_transcoders_viewer_data*
* **stream_targets** @ *components/schemas/usage_stream_targets*
* **stream_target**/**zones** @ *components/schemas/usage_stream_target*
* **summary**/**zones** @ *components/schemas/usage_stream_target_summary*
* **countries** @ *components/schemas/usage_stream_target_countries*
* **renditions** @ *components/schemas/usage_stream_target_renditions*
* **stream_target**/**countries** @ *components/schemas/usage_stream_target_viewer_data*
* **stream_target**/**viewer_trend** @ *components/schemas/usage_stream_target_viewer_data*
* **vod_streams** @ *components/schemas/usage_vod_streams*
* **vod_streams** @ *components/schemas/usage_vod_stream_egress*
* **countries** @ *components/schemas/usage_vod_stream_countries*
* **renditions** @ *components/schemas/usage_vod_stream_renditions*
* **trend** @ *components/schemas/usage_vod_stream_trend*
* **vod_stream**/**countries** @ *components/schemas/usage_vod_streams_viewer_data*
* **vod_stream**/**viewer_trend** @ *components/schemas/usage_vod_streams_viewer_data*
* **real_time_streams** @ *components/schemas/usage_real_time_streams*
* maybe more or less... (under investigation with Wowza product support)

Below is an example of the original schema definition and recommended fixes.

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

## Other Recommended modifications

There are some recommended fixes in Wowza Video REST API Specifications (swagger.json) for OpenAPI Generator Tools to create API client source code templates, since schema names, schema object titles, and operation ids are not appropriate.

### 1. Recommended inline schema "**title**" changes in API definitions

The inline schemas (under "*paths/[APIs]/responses/200/contents/schemas/properties*") which are contained in the following API definitions use the same value of "**title**" property even for different schema structures. Thus, OpenAPI Generator Tools will generate codes with ambiguous naming, such as FooBar, FooBar1, FooBar2, and so on. To avoid this, the following changes will be recommended.

#### For Live Streams APIs

| APIs ("*paths*") | Target Property | Original "*title*" | Recommended "*title*" |
| ---------------- | --------------- | ------------------ | --------------------- |
| /live_streams/{id}/start | live_stream | live_stream | live_stream_control_state |
| /live_streams/{id}/stop | live_stream | live_stream | live_stream_control_state |
| /live_streams/{id}/reset | live_stream | live_stream | live_stream_control_state |
| /live_streams/{id}/regenerate_connection_code | live_stream | live_stream | live_stream_connection_code |
| /live_streams/{id}/thumbnail_url | live_stream | live_stream | live_stream_thumbnail_url |
| /live_streams/{id}/state | live_stream | live_stream | live_stream_state |

#### For Players APIs

| APIs ("*paths*") | Target Property | Original "*title*" | Recommended "*title*" |
| ---------------- | --------------- | ------------------ | --------------------- |
| /players/{id}/rebuild | player | player | player_rebuild_state |
| /players/{id}/state | player | player | player_state |

#### For Transcoders APIs

| APIs ("*paths*") | Target Property | Original "*title*" | Recommended "*title*" |
| ---------------- | --------------- | ------------------ | --------------------- |
| /transcoders/{id}/enable_all_stream_targets | transcoder | transcoder | transcoder_stream_targets |
| /transcoders/{id}/enable_all_stream_targets | transcoder/stream_targets | stream_targets | stream_targets_state |
| /transcoders/{id}/disable_all_stream_targets | transcoder | transcoder | transcoder_stream_targets |
| /transcoders/{id}/disable_all_stream_targets | transcoder/stream_targets | stream_targets | stream_targets_state |
| /transcoders/{id}/start | transcoder | transcoder | transcoder_control_state |
| /transcoders/{id}/stop | transcoder | transcoder | transcoder_control_state |
| /transcoders/{id}/reset | transcoder | transcoder | transcoder_control_state |
| /transcoders/{id}/start_recording | transcoder | transcoder | transcoder_recording_state |
| /transcoders/{id}/stop_recording | transcoder | transcoder | transcoder_recording_state |
| /transcoders/{id}/thumbnail_url | transcoder | transcoder | transcoder_thumbnail_url |
| /transcoders/{id}/state | transcoder | transcoder | transcoder_state |
| /transcoders/{transcoder_id}/uptimes/{id}/metrics/historic | limits | limits | limits_with_range |
| /transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets/{stream_target_id}/enable | stream_target | stream_target | output_stream_target_control_state |
| /transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets/{stream_target_id}/disable | stream_target | stream_target | output_stream_target_control_state |
| /transcoders/{transcoder_id}/outputs/{output_id}/output_stream_targets/{stream_target_id}/restart | stream_target | stream_target | output_stream_target_control_state |

#### For Stream Targets APIs

| APIs ("*paths*") | Target Property | Original "*title*" | Recommended "*title*" |
| ---------------- | --------------- | ------------------ | --------------------- |
| /stream_targets/{id}/regenerate_connection_code | stream_target | stream_target | stream_target_connection_code |

#### For Recordings APIs

| APIs ("*paths*") | Target Property | Original "*title*" | Recommended "*title*" |
| ---------------- | --------------- | ------------------ | --------------------- |
| /recordings/{id}/state | recording | recording | recording_state |

#### For Schedules APIs

| APIs ("*paths*") | Target Property | Original "*title*" | Recommended "*title*" |
| ---------------- | --------------- | ------------------ | --------------------- |
| /schedules/{id}/enable | schedule | schedule | schedule_state |
| /schedules/{id}/disable | schedule | schedule | schedule_state |
| /schedules/{id}/state | schedule | schedule | schedule_state |

### 2. Recommended inline schema "**title**" changes in Schema type definitions

The inline schemas (under "*components/schemas*") which are contained in the following schema definitions use the same value of "**title**" property even for different schema structures. Thus, OpenAPI Generator Tools will generate codes with ambiguous naming, such as FooBar, FooBar1, FooBar2, and so on. To avoid this, the following changes will be recommended.

| Schema ("*components/schemas*") | Target Property | Original "*title*" | Recommended "*title*" |
| ------------------------------- | --------------- | ------------------ | --------------------- |
| live_stream_create_input | live_stream | live_stream | live_stream_create_input_inner |
| live_stream | live_stream/stream_targets/items | stream_targets | stream_target_ids |
| live_stream_update_input | live_stream | live_stream | live_stream_update_input_inner |
| player_update_input | player | player | player_update_input_inner |
| url_input | url | url | player_url_input_inner |
| asset_create_input | asset | asset | asset_create_input_inner |
| asset_update_input | asset | asset | asset_update_input_inner |
| asset_report_uploaded_input | asset | asset | asset_report_uploaded_input_inner |
| asset_report_upload_failed_input | asset | asset | asset_report_upload_failed_input |
| schedule_create_input | schedule | schedule | schedule_create_input_inner |
| schedule_update_input | schedule | schedule | schedule_update_input_inner |
| wowza_stream_source_create_input | stream_source_wowza | stream_source_wowza | stream_source_wowza_create_input_inner |
| wowza_stream_source_update_input | stream_source_wowza | stream_source_wowza | stream_source_wowza_update_input_inner |
| custom_stream_target_input | stream_target_custom | stream_target_custom | stream_target_custom_input_inner |
| custom_stream_target_input | stream_target_custom/playback_urls | "Hash of playback URLs" | playback_urls |
| custom_stream_target_update_input | stream_target_custom | stream_target_custom | stream_target_custom_update_input_inner |
| custom_stream_target_update_input | stream_target_custom/playback_urls | "Hash of playback URLs" | playback_urls |
| fastly_stream_target_input | stream_target_fastly | stream_target_fastly | stream_target_fastly_input_inner |
| fastly_stream_target_update_input | stream_target_fastly | stream_target_fastly | stream_target_fastly_update_input_inner |
| vod_streams | vod_streams/items | vod_streams | index_vod_stream |
| wowza_akamai_stream_target_update_input | stream_target_akamai | stream_target_akamai | stream_target_akamai_update_input_inner |
| transcoder_create_input | transcoder | transcoder | transcoder_create_input_inner |
| transcoder_update_input | transcoder | transcoder | transcoder_update_input_inner |
| output_input | output | output | output_input_inner |
| output_stream_target_input | output_stream_target | output_stream_target | output_stream_target_input_inner |
| usage_accounts | account | account | usage_viewers_data_per_account |
| usage_accounts | limits/resources | resources | usage_limits_resources |
| usage_accounts_countries | countries/items | countries | usage_viewers_data_by_country |
| usage_accounts_countries | limits/resources | resources | usage_limits_resources |
| usage_accounts_trend | trend/items | "Array of trends" | usage_viewers_trends_details |
| usage_accounts_trend | limits/resources | resources | usage_limits_resources |
| usage_accounts_viewer_data | account | account | usage_viewers_data_current |
| usage_accounts_viewer_data | account/countries/items | countries | usage_viewers_country |
| usage_accounts_viewer_data | account/viewer_trend/items | "Array of viewer trends" | usage_viewers_trends |
| usage_transcoder_countries | countries/items | countries | usage_viewers_data_by_country |
| usage_transcoder_trend | trend/items | "Array of trends" | usage_viewers_trends_details |
| usage_transcoders_viewer_data | transcoder | transcoder | usage_viewers_data_current |
| usage_transcoders_viewer_data | transcoder/countries/items | countries | usage_viewers_country |
| usage_transcoders_viewer_data | transcoder/viewer_trend/items | "Array of viewer trends" | usage_viewers_trends |
| usage_stream_target | stream_target | stream_target | usage_viewers_data_per_stream_target_with_zones |
| usage_stream_target | stream_target/zones/items | "Hash of zones" | usage_viewers_zone |
| usage_stream_target_summary | summary | summary | usage_stream_target_summary_data |
| usage_stream_target_summary | summary/zones/items | "Hash of zones" | usage_viewers_zone |
| usage_stream_target_countries | countries/items | countries | usage_viewers_data_by_country_with_zones |
| usage_stream_target_countries | countries/items/zones/items | "Hash of zones" | usage_viewers_zone |
| usage_stream_target_renditions | renditions/items | renditions | usage_viewers_data_by_rendition_with_zones |
| usage_stream_target_renditions | renditions/items/zones/items | "Hash of zones" | usage_viewers_zone |
| usage_stream_target_viewer_data | stream_target | stream_target | usage_viewers_data_current |
| usage_stream_target_viewer_data | stream_target/countries/items | countries | usage_viewers_country |
| usage_stream_target_viewer_data | stream_target/viewer_trend/items | "Array of viewer trends" | usage_viewers_trends |
| usage_vod_stream | vod_stream | vod_stream | usage_viewers_data_per_vod_stream_with_egress |
| usage_vod_stream_egress | vod_stream | vod_stream | usage_egress_data_per_vod_stream |
| usage_vod_stream_summary | summary | summary | usage_vod_stream_summary_data |
| usage_vod_stream_countries | countries/items | countries | usage_viewers_data_by_country |
| usage_vod_stream_renditions | renditions/items | renditions | usage_viewers_data_by_rendition |
| usage_real_time_stream | real_time_stream | real_time_stream | usage_real_time_stream_data |
| usage_vod_stream_egress_summary | summary | summary | usage_vod_stream_egress_summary_data |
| vod_stream_update_input | vod_stream | vod_stream | vod_stream_update_input_inner |
| usage_vod_stream_trend | trend/items | "Array of trends" | usage_viewers_trends_details |
| usage_vod_streams_viewer_data | vod_stream | vod_stream | usage_viewers_data_current |
| usage_vod_streams_viewer_data | vod_stream/countries/items | countries | usage_viewers_country |
| usage_vod_streams_viewer_data | vod_stream/viewer_trend/items | "Array of viewer trends" | usage_viewers_trends |
| real_time_stream_create | real_time_stream | real_time_stream | real_time_stream_create_input_inner |
| real_time_stream_update | real_time_stream | real_time_stream | real_time_stream_update_input_inner |

### 3. Recommended inline schema "title" additions

The inline schemas (under "*components/schemas*") which are contained in the following schema definitions does not have appropriate "**title**" property for extracted object structures. Thus, OpenAPI Generator Tools will generate codes with ambiguous naming, such as FooBar, FooBar1, FooBar2, and so on. To avoid this, the following changes will be recommended.

| Schema ("*components/schemas*") | Target Property | Recommended "*title*" for addition |
| ------------------------------- | --------------- | ---------------------------------- |
| live_stream | live_stream/direct_playback_urls | direct_playback_urls |
| transcoder | transcoder/direct_playback_urls | direct_playback_urls |
| stream_target_custom | playback_urls | stream_target_custom_playback_urls |
| custom_stream_target_patch_response | playback_urls | stream_target_custom_playback_urls |
| stream_target_fastly | playback_urls | stream_target_fastly_playback_urls |
| fastly_stream_target_patch_response | playback_urls | stream_target_fastly_playback_urls |
| stream_target_akamai | playback_urls | stream_target_akamai_playback_urls |
| wowza_akamai_stream_target_patch_response | playback_urls | stream_target_akamai_playback_urls |
| usage_accounts | limits | usage_limits_with_resources |
| usage_accounts_countries | limits | usage_limits_with_resources |
| usage_accounts_trend | limits | usage_limits_with_resources |
| usage_transcoders | transcoders/items | usage_egress_data_per_transcoder |
| usage_transcoders | pagination | usage_pagination_with_index |
| usage_transcoders | limits | usage_limits |
| usage_transcoder | transcoder | usage_viewers_data_per_transcoder |
| usage_transcoder | limits | usage_limits |
| usage_transcoder_countries | limits | usage_limits |
| usage_transcoder_summary | summary | usage_transcoder_summary_data |
| usage_transcoder_summary | summary/configurations/items | usage_transcoder_summary_data_per_configuration |
| usage_transcoder_summary | limits | usage_limits |
| usage_transcoder_trend | limits | usage_limits |
| usage_stream_targets | stream_targets/items | usage_viewers_data_per_stream_target |
| usage_stream_targets | pagination | usage_pagination |
| usage_stream_targets | limits | usage_limits |
| usage_stream_target | limits | usage_limits |
| usage_stream_target_summary | limits | usage_limits |
| usage_stream_target_countries | limits | usage_limits |
| usage_stream_target_renditions | limits | usage_limits |
| usage_storage_peak | limits | usage_limits |
| usage_vod_streams | vod_streams/items | usage_viewers_data_per_vod_stream |
| usage_vod_streams | pagination | usage_pagination |
| usage_vod_streams | limits | usage_limits |
| usage_vod_streams_egress | vod_streams/items | usage_egress_data_per_vod_stream |
| usage_vod_streams_egress | pagination | usage_pagination |
| usage_vod_streams_egress | limits | usage_limits |
| usage_vod_stream | limits | usage_limits |
| usage_vod_stream_egress | limits | usage_limits |
| usage_vod_stream_summary | limits | usage_limits |
| usage_vod_stream_countries | limits | usage_limits |
| usage_vod_stream_renditions | limits | usage_limits |
| usage_real_time_streams | real_time_streams/items | usage_real_time_stream_data |
| usage_real_time_streams | pagination | usage_pagination |
| usage_real_time_streams | limits | usage_limits |
| usage_real_time_stream | limits | usage_limits |
| usage_vod_stream_egress_summary | limits | usage_limits |
| usage_vod_stream_trend | limits | usage_limits |

### 4. Recommended "operationId" changes

The changes below are based on an better consistent naming between multiple "**operationId**" values, especially in Analytics APIs (which are for getting usage information). Some "**operationId**" values start with "*showUsage*", but others start with "*usage*". All values of "**operationId**" to get usage infomration would be recommended to start with "*showUsage*" prefix.

| Original "*operationId*" name | Recommended "*operationId*" name |
| ----------------------------- | -------------------------------- |
| indexUptimes | showTranscoderUptimesIndex |
| showUptime | showTranscoderUptime |
| showUptimeMetricsCurrent | showTranscoderUptimeMetricsCurrent |
| showUptimeMetricsHistoric | showTranscoderUptimeMetricsHistoric |
| usageAccountByCountry | showUsageAccountByCountry |
| liveUsageAccount | showUsageAccountLive |
| usageTranscodersIndex | showUsageTranscodersIndex |
| usageTranscoderByCountry | showUsageTranscoderByCountry |
| summaryUsageTranscoder | showUsageTranscodersSummary |
| liveUsageTranscoder | showUsageTranscoderLive |
| usageStreamTargetsIndex | showUsageStreamTargetsIndex |
| summmaryUsageStreamTarget | showUsageStreamTargetsSummary |
| usageStreamTargetByCountry | showUsageStreamTargetByCountry |
| usageStreamTargetByRendition | showUsageStreamTargetByRendition |
| liveUsageStreamTarget | showUsageStreamTargetLive |
| usageStoragePeakRecordingIndex | showUsageStoragePeakRecordingIndex |
| usageVODStreamsIndex | showUsageVODStreamsIndex |
| usageVODStreamsEgressIndex | showUsageVODStreamsEgressIndex |
| summmaryUsageVODStream | showUsageVODStreamsSummary |
| usageVODStreamByCountry | showUsageVODStreamByCountry |
| usageVODStreamByRendition | showUsageVODStreamByRendition |
| usageRealTimeStreamsIndex | showUsageRealTimeStreamsIndex |
| summmaryUsageVODStreamEgress | showUsageVODStreamsEgressSummmary |
| liveUsageVODStream | showUsageVODStreamLive |

### 5. Recommended Schema naming changes

The changes below are based on an better consistent naming between multiple schemas, especially for the folllowing strategies:

* "*PlayerUrl*" is better than simple "*Url*" keyword
* Avoid naming inconsistency between "Stream Target X" and "X Stream Target" and normalize with "Stream Target X"
* Avoid naming inconsistency between "Stream Source X" and "X Stream Source" and normalize with "Stream Source X"
* Avoid using naming "*Wowza Akamai*" and use "*Akamai*" simply

| Original schema name | Recommended schema name |
| -------------------- | ----------------------- |
| #/components/schemas/url | #/components/schemas/player_url |
| #/components/schemas/urls | #/components/schemas/player_urls |
| #/components/schemas/url_input | #/components/schemas/player_url_input |
| #/components/schemas/url_create_input | #/components/schemas/player_url_create_input |
| #/components/schemas/url_update_input | #/components/schemas/player_url_update_input |
| #/components/schemas/wowza_stream_source_create_input | #/components/schemas/stream_source_wowza_create_input |
| #/components/schemas/wowza_stream_source_update_input | #/components/schemas/stream_source_wowza_update_input |
| #/components/schemas/wowza_stream_source_patch_response | #/components/schemas/stream_source_wowza_patch_response |
| #/components/schemas/custom_stream_target_input | #/components/schemas/stream_target_custom_input |
| #/components/schemas/custom_stream_target_create_input | #/components/schemas/stream_target_custom_create_input |
| #/components/schemas/custom_stream_target_update_input | #/components/schemas/stream_target_custom_update_input |
| #/components/schemas/custom_stream_target_patch_response | #/components/schemas/stream_target_custom_patch_response |
| #/components/schemas/fastly_stream_target_input | #/components/schemas/stream_target_fastly_input |
| #/components/schemas/fastly_stream_target_create_input | #/components/schemas/stream_target_fastly_create_input |
| #/components/schemas/fastly_stream_target_update_input | #/components/schemas/stream_target_fastly_update_input |
| #/components/schemas/fastly_stream_target_patch_response | #/components/schemas/stream_target_fastly_patch_response |
| #/components/schemas/wowza_akamai_stream_target_update_input | #/components/schemas/stream_target_akamai_update_input |
| #/components/schemas/wowza_akamai_stream_target_patch_response | #/components/schemas/stream_target_akamai_patch_response |
| #/components/schemas/real_time_stream_create | #/components/schemas/real_time_stream_create_input |
| #/components/schemas/real_time_stream_update | #/components/schemas/real_time_stream_update_input |
| #/components/schemas/index_wowza_stream_source | #/components/schemas/index_stream_source_wowza |
| #/components/schemas/index_custom_stream_target | #/components/schemas/index_stream_target_custom |
| #/components/schemas/index_fastly_stream_target | #/components/schemas/index_stream_target_fastly |
| #/components/schemas/index_wowza_akamai_stream_target | #/components/schemas/index_stream_target_akamai |
