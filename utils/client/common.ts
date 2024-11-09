export const getName = (firstName: string, lastName: string) => {
  if (!firstName || !lastName) {
    const name = firstName || lastName
    return {
      name,
      shortName: name?.charAt(0)?.toUpperCase()
    }
  }
  if (firstName && lastName) { 
    return {
      name: `${firstName} ${lastName}`,
      shortName: `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }
  }
  return {
    name: '',
    shortName: ''
  }
}