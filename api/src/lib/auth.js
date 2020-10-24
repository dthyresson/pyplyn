import { logger } from 'src/lib/logger'

import { AuthenticationError, ForbiddenError, parseJWT } from '@redwoodjs/api'

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param {string=, string[]=} role - An optional role
 *
 * @example - No role-based access control.
 *
 * export const getCurrentUser = async (decoded) => {
 *   return await db.user.findOne({ where: { decoded.email } })
 * }
 *
 * @example - User info is contained in the decoded token and roles extracted
 *
 * export const getCurrentUser = async (decoded, { _token, _type }) => {
 *   return { ...decoded, roles: parseJWT({ decoded }).roles }
 * }
 *
 * @example - User record query by email with namespaced app_metadata roles
 *
 * export const getCurrentUser = async (decoded) => {
 *   const currentUser = await db.user.findOne({ where: { email: decoded.email } })
 *
 *   return {
 *     ...currentUser,
 *     roles: parseJWT({ decoded: decoded, namespace: NAMESPACE }).roles,
 *   }
 * }
 *
 * @example - User record query by an identity with app_metadata roles
 *
 * const getCurrentUser = async (decoded) => {
 *   const currentUser = await db.user.findOne({ where: { userIdentity: decoded.sub } })
 *   return {
 *     ...currentUser,
 *     roles: parseJWT({ decoded: decoded }).roles,
 *   }
 * }
 */
export const getCurrentUser = async (decoded, { token, type }) => {
  logger.debug({ decoded, token, type }, 'in getCurrentUser')
  return { ...decoded, roles: parseJWT({ decoded }).roles }
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param {string=} roles - An optional role or list of roles
 * @param {string[]=} roles - An optional list of roles

 * @example
 *
 * // checks if currentUser is authenticated
 * requireAuth()
 *
 * @example
 *
 * // checks if currentUser is authenticated and assigned one of the given roles
 * requireAuth({ role: 'admin' })
 * requireAuth({ role: ['editor', 'author'] })
 * requireAuth({ role: ['publisher'] })
 */
export const requireAuth = ({ role } = {}) => {
  logger.debug({ role }, 'in requireAuth')

  if (!context.currentUser) {
    logger.error("You don't have permission to do that.")
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (
    typeof role !== 'undefined' &&
    typeof role === 'string' &&
    !context.currentUser.roles?.includes(role)
  ) {
    logger.error(
      { currentUser: context.currentUser, role },
      "You don't have access to do that."
    )
    throw new ForbiddenError("You don't have access to do that.")
  }

  if (
    typeof role !== 'undefined' &&
    Array.isArray(role) &&
    !context.currentUser.roles?.some((r) => role.includes(r))
  ) {
    logger.error(
      { currentUser: context.currentUser, role },
      "You don't have access to do that."
    )
    throw new ForbiddenError("You don't have access to do that.")
  }
}
