/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listAudios = /* GraphQL */ `
  query ListAudios(
    $filter: ModelAudioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAudios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        s3key
        subtitlekey
        owner
      }
      nextToken
    }
  }
`;
