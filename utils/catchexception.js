export async function tryCatch(promise) {
  return promise
    .then((data) => [data, null])
    .catch((error) => {
      return [null, error];
    });
}
