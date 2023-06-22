/**
 * Checks if the instance can auth with OIDC
 *
 * @param {import("../CozyClient").default} client - The CozyClient instance
 * @returns {boolean} - Returns true if the instance can auth with OIDC
 */
export const isOIDC = client => {
  return client.capabilities.can_auth_with_oidc ?? false
}

/**
 * Checks if the instance can auth with magic link
 *
 * @param {import("../CozyClient").default} client - The CozyClient instance
 * @returns {boolean} - Returns true if the instance can auth with magic link
 */
export const isMagicLink = client => {
  return client.capabilities.can_auth_with_magic_links ?? false
}
