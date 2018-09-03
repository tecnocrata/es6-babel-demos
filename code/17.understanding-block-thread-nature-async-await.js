function doSomethingAsync() {
  return new Promise((resolve) => {
      setTimeout(() => resolve('I did something'), 3000)
  })
}
async function doSomething() {
  console.log(await doSomethingAsync())
}
console.log('Before')
doSomething();
console.log('After')
console.log('Waiting 3 seconds... and...');
//WHY?
//doSomething() is async and if we really want to block the thread at main level is not possible
