/**
 * Calculate the file size of a Base64 encoded string
 * @param file fil as a Base64 encoded string
 * @returns file size in bytes
 */
export function base64FileSize(file: string) {
  return file.length * (3 / 4) - (file.indexOf('=') > 0 ? file.length - file.indexOf('=') : 0)
}

/**
 * Convert bytes to a base64 string length
 * @param bytes file size in bytes
 * @returns string length
 */
export function bytesToString(bytes: number) {
  return bytes * (4 / 3)
}
