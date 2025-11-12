import { User } from 'oidc-client-ts';

/**
 * Required group for accessing the application
 */
export const REQUIRED_GROUP = '/cicd_dev';

/**
 * Check if a user has the required group in their JWT token
 * @param user - The OIDC user object containing the JWT token
 * @returns true if the user has the required group, false otherwise
 */
export function hasRequiredGroup(user: User | null | undefined): boolean {
  if (!user || !user.profile) {
    return false;
  }

  // The groups claim can be in different formats depending on the OIDC provider
  // It could be 'groups', 'group', or a custom claim
  const groups = user.profile.groups as string[] | string | undefined;

  if (!groups) {
    return false;
  }

  // Handle both array and string formats
  if (Array.isArray(groups)) {
    return groups.includes(REQUIRED_GROUP);
  }

  if (typeof groups === 'string') {
    return groups === REQUIRED_GROUP;
  }

  return false;
}

/**
 * Get user groups from the JWT token
 * @param user - The OIDC user object containing the JWT token
 * @returns Array of group names
 */
export function getUserGroups(user: User | null | undefined): string[] {
  if (!user || !user.profile) {
    return [];
  }

  const groups = user.profile.groups as string[] | string | undefined;

  if (!groups) {
    return [];
  }

  if (Array.isArray(groups)) {
    return groups;
  }

  if (typeof groups === 'string') {
    return [groups];
  }

  return [];
}
