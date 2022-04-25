type StringGetter = (key: string) => string

export function derefenceKeys(
  errors: any, 
  keyFormatter?: StringGetter): Record<string, string> {
  
  const flattened = (key: string) => key.slice(key.lastIndexOf('.') + 1)
  const result = Object.entries(errors).reduce((acc, [key, value]) => ({
      ...acc,
      [keyFormatter?.(flattened(key)) || flattened(key)]: value,
    }), {});
  return result
}

export function matchFromEntity(source: any): StringGetter {
  const sample = Array.isArray(source) && source?.[0] || source
  const sampleKeys = flattenKeys(sample)

  return (key: string): string => {
    const match = sampleKeys.find(smKey => smKey.toLowerCase().includes(key.toLowerCase()))
    return match || key
  }
}

function flattenKeys(object: any): string[] {
  if (!object) return []
  
  let keys: string[] = []
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'object' && value) keys = [...keys, ...flattenKeys(value)]
    else keys.push(key)
  })
  return keys
}
