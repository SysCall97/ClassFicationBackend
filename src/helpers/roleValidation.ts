export const validateRole = (role: number): Boolean => {
    // Role - 1 is teacher's role and role-2 is for student role
    return [1, 2].includes(role);
}