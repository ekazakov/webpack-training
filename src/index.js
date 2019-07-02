/* eslint-disable */

import { Foo } from './Foo';

function foo() {
    console.log('foo');
}

if (process.env.NODE_ENV === 'production') {
    console.log('doo');
    const foo = new Foo();
    foo.do();
}

foo();
