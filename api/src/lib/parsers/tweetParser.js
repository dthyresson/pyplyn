export const tweetContextDataBuilder = (tweetContext) => {
  const tags = tweetContext?.entities?.map((entity) => {
    const diffbotUris = entity.allTypes
      ?.map((t) => {
        return t.diffbotUri
      })
      .filter((x) => x !== undefined)

    const dbpediaUris = entity.allTypes
      ?.map((t) => {
        return t.dbpediaUri
      })
      .filter((x) => x !== undefined)

    const uri =
      entity.diffbotUri || diffbotUris[0] || dbpediaUris[0] || 'unknown'

    const rdfTypes = dbpediaUris
    const entityTypes = entity.allTypes
      ?.map((t) => {
        return t.name
      })
      .filter((x) => x !== undefined)

    const mentions = entity.mentions?.length || 0

    const latitude = isNaN(entity.location?.latitude)
      ? null
      : entity.location?.latitude

    const longitude = isNaN(entity.location?.longitude)
      ? null
      : entity.location?.longitude

    const precision = isNaN(entity.location?.precision)
      ? null
      : entity.location?.precision

    const hasLocation = entity.location !== undefined && !isNaN(latitude)

    return {
      label: entity.name || 'N/A',
      uri: uri,
      diffbotUris: diffbotUris,
      dbpediaUris: dbpediaUris,
      rdfTypes: rdfTypes,
      entityTypes: entityTypes,
      mentions: mentions,
      confidence: entity.confidence,
      salience: entity.salience,
      sentiment: entity.sentiment,
      hasLocation: hasLocation,
      latitude: latitude,
      longitude: longitude,
      precision: precision,
    }
  })

  const data = { tags: tags }

  return data
}
