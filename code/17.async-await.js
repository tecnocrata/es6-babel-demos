const fetchSomething = () => new Promise((resolve) => {
  setTimeout(() => resolve('future value'), 500);
});

async function asyncFunction() {
  const result = await fetchSomething(); // returns promise

  // waits for promise and uses promise result
  return result + ' 2';
}

asyncFunction().then(result => console.log(result));