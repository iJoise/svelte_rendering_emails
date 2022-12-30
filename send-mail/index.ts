import { Examples } from '../build/mails'
import { render } from '../build'

// const html = render(HelloWorld, {
//   // This is type-checked!
//   name: "World",
// });
const html = render(Examples, {})
console.log(html)
