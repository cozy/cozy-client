const TERMS_DOCTYPE = 'io.cozy.terms'

/* TODO Use collection terms */
async function save(client, terms) {
  const { id, ...termsAttributes } = terms
  const { data: savedTermsDocs } = await client.query({
    doctype: TERMS_DOCTYPE,
    selector: {
      termsId: id,
      version: termsAttributes.version
    },
    limit: 1
  })

  if (savedTermsDocs && savedTermsDocs.length) {
    // we just update the url if this is the same id and same version
    // but the url changed
    const savedTerms = savedTermsDocs[0]
    if (
      savedTerms.termsId == id &&
      savedTerms.version == termsAttributes.version &&
      savedTerms.url != termsAttributes.url
    ) {
      const termsToSave = {
        _type: TERMS_DOCTYPE,
        ...savedTerms,
        url: termsAttributes.url
      }
      await client.save(termsToSave)
    }
  } else {
    const termsToSave = {
      _type: TERMS_DOCTYPE,
      ...termsAttributes,
      termsId: id,
      accepted: true,
      acceptedAt: new Date()
    }
    await client.save(termsToSave)
  }
}

export default {
  save
}
