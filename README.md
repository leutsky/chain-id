# Chain Id

Library **Chain Id** allow you to generate unique identifiers
from an object's properties chain.

There are two methods to initialize chain id: **createId** and **createIdFromScheme**

## createId(options?)

**createId** initialize infinity chain id. This method uses Proxy inside.

**createId** is more efficient with **TypeScript**:
1. You need to define the type and apply it to createId
2. TypeScript will automatically check for correct usage
3. You don't have to do anything else. Just relax :)

You can of course use createId without TypeScript if you want.

**Example with testId for React component**

```tsx
import {createId} from 'chain-id';

type TestId = {
  signInForm: {
    field: {
      email: any;
      password: any;
    };
    submitButton: any;
  };
};

const testId = createId<TestId>();

// React component
function Component() {
  return (
    <form data-test-id={`${testId.signInForm}`}>
      <input name="email" type="text" data-test-id={`${testId.signInForm.field.email}`} />
      <input name="password" type="password" data-test-id={`${testId.signInForm.field.password}`} />
      <button type="submit" data-test-id={`${testId.signInForm.submitButton}`}>Sign In</button>
    </form>
  );
}
```
**Output html**
```html
<form data-test-id="signInForm">
  <input name="email" type="text" data-test-id="signInForm-field-email" />
  <input name="password" type="password" data-test-id="signInForm-field-password" />
  <button type="submit" data-test-id="signInForm-submitButton">Sign In</button>
</form>
```

## createIdFromScheme(scheme, options?)

***Attention!*** **createIdFromScheme** is experimental tool.

**createIdFromScheme** is helpful when:
- You use vanila JS
- You don't have type checking
- You need control over the correctness of the properties chains

**createIdFromScheme** initialize non infinity chains 

**Example**
```js
import {createIdFromScheme} from 'chain-id';

const scheme = {
  signInForm: {
    field: {
      email: '',
      password: ''
    },
    submitButton: ''
  }
}

const testId = createIdFromScheme(scheme);

// Correct usage
console.log(testId.signInForm.field.email); // -> "signInForm-field-email"

// Return undefined
console.log(testId.signInForm.field.age); // -> undefined

// Runtime error
console.log(testId.signInForm.head.title); // -> throw error because head is undefined
```

### Options

You can configure **createId** and **createIdFromScheme** by using next options:
- **prefix** - adds prefix to result id
- **separator** - separator of id parts
